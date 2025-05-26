import React, { useContext, useEffect, useState, useRef } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import { StoreContext } from '../../context/StoreContext'
import ChatbotIcon from '../../components/Chatbot/ChatbotIcon'
import ChatMessage from '../../components/Chatbot/ChatMessage'
import ChatForm from '../../components/Chatbot/ChatForm'
import { companyinfo } from '../../components/Chatbot/comapnyinfo'
import '../../components/Chatbot/Chatbot.css'

const Home = () => {
    const [category, setCategory] = useState('All')
    const {setRoute} = useContext(StoreContext)
    const [search, setSearch] = useState("")

    useEffect(() => {
      setRoute('Home')
    }, [])

   const [chatHistory, setChatHistory] = useState([
    {
    hideInChat: true,
    role: "model",
    text: companyinfo
   }]);
   const [showChatbot, setShowChatbot] = useState(false);
   const chatBodyref = useRef();

   const generateBotResponse = async(history) =>{
      //helper function to update chat history
      const updateHistory = (text, isError = false) => {
            setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), {role:"model", text, isError}]);
      }

      //format chat history for API request
      history = history.map(({role, text})=> ({role,parts: [{text}]}));

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: history})
      }

      try{
        //Make the api call to get the bot's response
        const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
        const data = await response.json();
        if(!response.ok) throw new Error(data.error.message || "Something went wrong!");

        //clean and update chat history with bot's response
        const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        updateHistory(apiResponseText);
      }catch(error){
        updateHistory(error.message, true);
      }
   };

   useEffect(() => {
      //autoscroll whenever chat history updates
      chatBodyref.current.scrollTo({top:  chatBodyref.current.scrollHeight, behavior: "smooth"});
   }, [chatHistory]);

  return (
    <div>
        <Header />
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} search={search} setSearch={setSearch} />
        <AppDownload />


      <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
        <button onClick={() => setShowChatbot(prev => !prev)} 
        id="chatbot-toggler">
          <span className="material-symbols-rounded">mode_comment</span>
          <span className="material-symbols-rounded">close</span>
        </button>
        <div className="chatbot-popup">
        {/* Chatbot header */}
          <div className="chat-header">
            <div className="header-info">
            <ChatbotIcon />
              <h2 className="logo-text"> Chatbot </h2>
            </div>
          <button onClick={() => setShowChatbot(prev => !prev)}
          className="material-symbols-rounded">keyboard_arrow_down</button>
          </div>
          
          {/* Chatbot body */}
          <div ref={chatBodyref} className="chat-body">
              <div className="message bot-message">
                  <ChatbotIcon />
                  <p className="message-text">
                    Hey there! <br /> How can I help you today?
                  </p>
              </div>
              {/* Render the chat history dynamically */}
              {chatHistory.map((chat,index)=>(
                  <ChatMessage key={index} chat={chat}/>
              ))}         

          </div>
          
            {/* Chatbot footer */}
          <div className="chat-footer">
            <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
          </div>
        </div>
      </div>  
    </div>
  )
}

export default Home