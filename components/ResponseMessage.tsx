// components/ResponseMessage.tsx
"use client";

import React from 'react';
import { Box, Typography } from '@mui/material'

interface ResponseMessageProps {
  text: string;
}

const ResponseMessage: React.FC<ResponseMessageProps> = ({ text }) => {
  return (
    <Box display="flex" justifyContent="flex-end" mb={2}>
      <Box
        sx={{
          p: 2,
          mt: 3,
          bgcolor: '#bbdefb', // Light blue background
          borderRadius: 2,
          boxShadow: 1,
          maxWidth: '60%',
        }}
      >
        <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default ResponseMessage;
