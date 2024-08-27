import React, { useState } from 'react';
import { getBotResponse } from '../services/groqApi';
import '../styles/Chat.css';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message };
    const newResponses = [...responses, userMessage];

    // Get the bot's response
    let botReply = '';
    try {
      botReply = await getBotResponse(message);
    } catch (error) {
      console.error("Error getting bot response:", error);
      botReply = "Sorry, I couldn't process your request.";
    }

    newResponses.push({ role: 'bot', content: botReply });
    setResponses(newResponses);
    setMessage('');
  };

  return (
    <div>
      <div className="chat-box">
        {responses.map((resp, index) => (
          <div key={index} className={resp.role === 'bot' ? 'bot-message' : 'user-message'}>
            {resp.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;
