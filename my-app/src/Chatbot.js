import React, { useState } from 'react';
import { Button, TextField, Box, Paper, Typography, Avatar, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'How can we help you today?' }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State to toggle chat window

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

  // Toggle the chat window visibility
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {/* PDF document displayed in an iframe */}
      <iframe
        src="/2023-CCB-Employee-Handbook.pdf" // Replace with your PDF path
        title="PDF"
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, border: 'none' }}
      ></iframe>

      {/* Chat toggle button */}
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
          bgcolor: 'blue',
          color: 'white',
          '&:hover': { bgcolor: 'darkblue' }
        }}
        onClick={toggleChat}
      >
        <ChatIcon />
      </IconButton>

      {/* Chat window */}
      {isOpen && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            width: 400,
            height: 500,
            zIndex: 1000, // Above the PDF
            bgcolor: 'white',
            boxShadow: 3,
            borderRadius: 2,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 2,
              flex: 1,
              overflowY: 'auto', // Enable scrollbar
              display: 'flex',
              flexDirection: 'column',
            }}
          >
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

                {/* Message bubble */}
                <Box
                  sx={{
                    bgcolor: msg.type === 'bot' ? 'lightblue' : 'lightgreen',
                    color: 'black',
                    p: 1,
                    borderRadius: '10px',
                    maxWidth: '75%', // Bubbles should not take up full width
                    wordWrap: 'break-word', // Ensure long words are wrapped
                  }}
                >
                  <Typography align={msg.type === 'bot' ? 'left' : 'right'}>
                    {msg.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>

          <Box sx={{ p: 2 }}>
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
        </Box>
      )}
    </div>
  );
};

export default Chatbot;
