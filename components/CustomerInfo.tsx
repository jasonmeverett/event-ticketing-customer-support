"use client";

import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material'
import CustomerInfoClient from '@/lib/CustomerInfoClient';
import { DataGrid } from '@mui/x-data-grid';

const customerInfoClient = new CustomerInfoClient(); 

interface CustomerInfoProps {
  newMessage: string
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({newMessage}) => {

  const [customerInfo, setCustomerInfo] = useState<Record<string, string>>({});

  useEffect(() => {
    customerInfoClient.call(newMessage)
      .then((response) => {
        setCustomerInfo(response);
        console.log(response);
      });
  }, [newMessage])



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
          <Typography 
            variant='h6'
            sx={{
            }}
          >
            Customer Information
          </Typography>

          {/* Chat Display Area */}
          <Paper
            sx={{
              backgroundColor: 'lightgrey',
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden', 
              p:2 
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
              }}
            >
              <DataGrid 
                columns = {[{field: 'Info'}, {field: 'Value'}]}
                rows={Object.keys(customerInfo).map((key, index) => ({
                  id: index + 1, // Start `id` from 1 and increment for each item
                  Info: key,
                  Value: customerInfo[key]
                }))}
              />

            </Box>
          </Paper>

          <Divider sx={{ m: 1 }} />

          <Typography variant='h4'>
            Event Ticketing Support Agent
          </Typography>

          <Typography variant='caption'>
            This is an example of an event ticketing agent that suports the following features:<br /><ul><li>CML Model used for Sentiment Analysis</li><li>CML Model hosting a fine-tuned LLM responsible for classification</li><li>Cloudera AI Inference model for generating AI responses</li></ul>
          </Typography>

          

        </Box>
    </>
  );
};

export default CustomerInfo;
