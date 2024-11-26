
import React, { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import ChatWindow from './ChatWindow'
import CustomerInfo from './CustomerInfo';
import Box from '@mui/material/Box'

const CustomerSupport: React.FC = () => {

  const [newMessage, setNewMessage] = useState<string>('')

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        width: '100%',
        height: '100%',
      }}
    >

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '70%',
          height: '100%',
          pr: 2,
        }}
      >
        {/* Chat window box */}
        <ChatWindow setNewMessage={setNewMessage}/>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '30%',
          height: '100%',
          pl: 2,
        }}
      >
        {/* Customer Info Box */}
        <CustomerInfo newMessage={newMessage}/>

      </Box>

    </Box>
  )
}

export default CustomerSupport;