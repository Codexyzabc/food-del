import {useRef} from 'react';
import './Chatbot.css';

const ChatForm = ({chatHistory, setChatHistory, generateBotResponse}) => {
      const inputRef = useRef();

    const handleFormSubmit = (e) =>{
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if(!userMessage) return;
        inputRef.current.value="";
        
        //update chat history with the user's message
        setChatHistory((history) => [...history, {role:"user", text: userMessage}]);

        //delay 600ms before showing "Thinking..." and generating response
        setTimeout(() =>  {
            //add a thinking placeholder for the robot's response
            setChatHistory((history) => [...history, {role:"model", text: "Thinking..."}]);

            //call the user to generate the bot's response
             generateBotResponse([...chatHistory, {role:"user", text: `using the details provided above, please address this query: ${userMessage}`}]);
        },600);
    };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
        <input ref={inputRef} type="text" placeholder="Message..." className="message-input" required/>
        <button className="material-symbols-rounded">arrow_upward</button>
    </form>
  )
}

export default ChatForm
