import React, { useState, useContext, useEffect } from "react";
import './Feedback.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";


const FeedBack = ({ setFeedback }) => {
  const { url, token, email } = useContext(StoreContext);
  const navigate = useNavigate();

  const [text, setText] = useState('');

  useEffect(() => {
    if (!token || !email) {
      navigate('/');
      setFeedback(false);
    }
  }, [token, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/api/user/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // If needed
        },
        body: JSON.stringify({ email, text })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Feedback submitted!');
        setFeedback(false);
      } else {
        toast.error(data.message || 'Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Something went wrong');
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch(`${url}/api/user/feedback`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ text })
  //     });

  //     const data = await response.json();
  //     if (data.success) {
  //       toast.success('Feedback submitted!');
  //       setFeedback(false);
  //     } else {
  //       toast.error(data.message || 'Failed to submit feedback');
  //     }
  //   } catch (error) {
  //     console.error('Error submitting feedback:', error);
  //     toast.error('Something went wrong');
  //   }
  // };

  return (
    // <div>
    //     <p onClick={() => setFeedback(false)}>Hello</p>
    // </div>

    <div className='feedback-popup'> 
        <form onSubmit={handleSubmit} className='feedback-popup-container'>
            <div className="feedback-popup-title">
                <h2>Submit your Feedback</h2>
                <img onClick={() => setFeedback(false)} src={assets.cross_icon} alt="Close" />
            </div>
            <div className='feedback-popup-inputs'>
                <input name='email' type='email' placeholder='Your email' value={email} disabled />
                <textarea rows={8} cols={80} placeholder='Write your feedback here' value={text} onChange={(e) => setText(e.target.value)} required></textarea>
            </div>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default FeedBack