// app/layout.tsx
"use client";

import { ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const metadata = {
  title: 'Event Ticketing Customer Support',
  description: 'Chat support interface for event ticketing',
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#121212', // Set specific dark colors if needed
      default: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
});


export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" style={{width: '100%', height: '100%'}}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <body style={{width: '100%', height: '100%'}}>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
