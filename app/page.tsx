// app/page.tsx
"use client";

import React from 'react';
import CustomerSupport from '../components/CustomerSupport'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { Paper, Typography, Divider } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ChatWindow from '@/components/ChatWindow';
import CustomerInfo from '@/components/CustomerInfo';

export default function HomePage() {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        p: 5
      }}
    >
      
      <CustomerSupport />

    </Box>
  );
}
