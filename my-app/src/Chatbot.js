import React, { useState } from 'react';
import { Button, TextField, Box, Paper, Typography, Avatar } from '@mui/material';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'How can we help you today?' }
  ]);
  const [userMessage, setUserMessage] = useState('');

  const sendMessage = async () => {
    if (userMessage.trim()) {
      // Add user message to chat
      setMessages([...messages, { type: 'user', text: userMessage }]);

      // Clear input field
      setUserMessage('');

      try {
        // Send a POST request to the correct chat API endpoint
        const response = await fetch('http://localhost:5000/chatbot-request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }), // Sending user's message
        });

        // Parse the response as JSON
        const data = await response.json();

        // Add bot's response to chat using the received message
        setMessages(prevMessages => [
          ...prevMessages,
          { type: 'bot', text: data.message } // Use the message from the response
        ]);
      } catch (error) {
        console.error('Error sending message:', error);
        // Fallback response in case of an error
        setMessages(prevMessages => [
          ...prevMessages,
          { type: 'bot', text: 'Error: Unable to fetch response from the server.' }
        ]);
      }
    }
  };

  return (
    <Box sx={{ width: 300, mx: 'auto', mt: 5 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        {messages.map((msg, index) => (
          <Box 
            key={index} 
            display="flex" 
            justifyContent={msg.type === 'bot' ? 'flex-start' : 'flex-end'} 
            alignItems="center"
            sx={{ mb: 1 }}
          >
            {/* Bot Icon */}
            {msg.type === 'bot' && (
              <Avatar sx={{ bgcolor: 'blue', width: 24, height: 24, mr: 1, fontSize: 12 }}>
                bot
              </Avatar>
            )}

            <Typography align={msg.type === 'bot' ? 'left' : 'right'}>
              {msg.text}
            </Typography>
          </Box>
        ))}
        <Box mt={2}>
          <TextField
            fullWidth
            variant="outlined"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type here..."
          />
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            fullWidth
            onClick={sendMessage}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Chatbot;
