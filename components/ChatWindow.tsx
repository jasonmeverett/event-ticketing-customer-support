// components/ChatWindow.tsx
"use client";

import React, { useEffect, useRef, useState } from 'react';
import CustomerMessage from './CustomerMessage';
import ResponseMessage from './ResponseMessage';
import ClassificationClient from '../lib/ClassificationClient';
import { Box, Typography, TextareaAutosize, Button, Paper, IconButton } from '@mui/material';
import MicIcon from "@mui/icons-material/Mic"

const client = new ClassificationClient();

interface ChatWindowProps {
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({setNewMessage}) => {
  const [messages, setMessages] = useState<Array<{ type: 'customer' | 'response'; text: string; isMicrophoneMessage: boolean }>>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false); // Track if microphone is active
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Function to send a text message (non-microphone input)
  const handleSendText = () => {
    if (inputText.trim()) {
      setMessages((prevMessages) => [...prevMessages, { type: 'customer', text: inputText, isMicrophoneMessage: false }]);
      setInputText('');
    }
  };

  // Function to start microphone input
  const handleMicrophoneClick = () => {
    setIsSpeaking(true); // Indicate microphone is active
    setMessages((prevMessages) => [...prevMessages, { type: 'customer', text: '', isMicrophoneMessage: true }]);
  };

  // Function to handle Enter key press for text input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendText();
    }
  };

  // Scroll to the bottom of the chat window when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Chat window box to host the window and the entry bar. Fills the space */}
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          flexGrow: 1,
        }}
      >
        {/* Title */}
        <Typography 
          variant='h6'
          sx={{
          }}
        >
          Customer Chat
        </Typography>

        {/* Chat Display Area */}
        <Paper
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden', 
            pl: 2,
            pr: 2,
          }}
        >
          
          <Box
            sx={{
              overflowY: 'auto',
              flexGrow: 1,
            }}
          >
            {messages.map((message, index) => (
              message.type === 'customer' ? (
                <CustomerMessage
                  key={index}
                  text={message.text}
                  isMicrophoneMessage={message.isMicrophoneMessage}
                  client={client}
                  setIsSpeaking={setIsSpeaking}
                  setNewMessage={setNewMessage}
                />
              ) : (
                <ResponseMessage key={index} text={message.text} />
              )
            ))}
            <div ref={chatEndRef} /> {/* Invisible div to mark the end of the chat */}
          </Box>
          
        </Paper>

        {/* Input Area */}
        <Box
          display="flex"
          alignItems="center"
          p={1}
          mt={1}
          borderTop={1}
          borderColor="divider"
          bgcolor="background.paper"
          borderRadius={1}
        >
          <TextareaAutosize
            placeholder="Simulate customer message here..."
            minRows={1}
            maxRows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              border: '1px solid #ccc',
              borderRadius: '16px',
              padding: '8px',
              marginRight: '8px',
              resize: 'none',
              overflowY: 'auto',
              maxHeight: '100px',
            }}
          />
          <Button
            variant="contained"
            onClick={handleSendText}
            disabled={isSpeaking || !inputText.trim()}
            sx={{ ml: 1, borderRadius: '16px', px: 2 }}
          >
            Send
          </Button>
          <IconButton
            color="primary"
            onClick={handleMicrophoneClick}
            disabled={isSpeaking}
            sx={{ ml: 1, borderRadius: '16px' }}
          >
            <MicIcon />
          </IconButton>
        </Box>


      </Box>
    </>
    

  );
};

export default ChatWindow;
