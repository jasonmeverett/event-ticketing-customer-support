// components/CustomerMessage.tsx
"use client";

import React, { useEffect, useState } from 'react';
import ClassificationClient from '../lib/ClassificationClient';
import { createSpeechRecognition } from '../lib/utils';
import { Box, Typography, Divider } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart';
import SentimentClient from '../lib/SentimentClient'

const sentimentClient = new SentimentClient();

interface CustomerMessageProps {
  text: string;
  isMicrophoneMessage: boolean;
  client: ClassificationClient;
  setIsSpeaking: React.Dispatch<React.SetStateAction<boolean>>;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
}

const CustomerMessage: React.FC<CustomerMessageProps> = ({ text, isMicrophoneMessage, client, setIsSpeaking, setNewMessage }) => {
  const [messageText, setMessageText] = useState<string>(text);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [classification, setClassification] = useState<string>();
  const [sentiment, setSentiment] = useState([0.0, 0.0, 0.0]);

  useEffect(() => {
    sentimentClient.call(messageText)
      .then((response) => {
        setSentiment(
          [
            response.positive,
            response.neutral,
            response.negative
          ]
        );
      })

  }, [messageText])

  useEffect(() => {
    if (isMicrophoneMessage) {
      // Initialize and start speech recognition for microphone input
      const recognition = createSpeechRecognition((transcript, isFinal) => {
        setMessageText(transcript); // Update message text with real-time transcription

        if (isFinal) {
          setIsSpeaking(false); // Reset microphone state
          setIsLoading(false);
          recognition.stop(); // Stop recognition session
        }
      });

      setIsLoading(true);
      setIsSpeaking(true);
      recognition.start();
    }  else {
      setIsLoading(false);
    }
  }, [text, isMicrophoneMessage, client, setIsSpeaking]);

  useEffect(() => {
    if (!isLoading) {
      client.call(messageText)
        .then((response) => {
          setClassification(response);
        })
        .catch((error) => {
          console.error("Error fetching response:", error);
          setClassification("ERROR");
        });

      setNewMessage(messageText);
    }
  }, [isLoading])

  return (
    <Box display="flex" justifyContent="flex-start" mb={2}>
      <Box
        sx={{
          mt: 3,
          p: 2,
          bgcolor: 'grey',
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: '60%',
        }}
      >
        <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
          {messageText}
        </Typography>

        <Divider sx={{ my: 1 }} />
        
        {/* Blank box to specify a flex grid for the graph */}
        <Box
          sx={{
            width: '100%',
            display: 'flex'
          }}
        >
          {/* Listening and classification text */}
          <Box
            sx={{
              width: '70%',
              flexGrow: 1,
              flexDirection: 'column'
            }}
          >
            {isLoading ? (
              <Typography variant="body2" color="textSecondary">
                Listening...
              </Typography>
            ) : (
              <>
                <Typography variant="caption" color="textSecondary">
                  Possible Classification:
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {classification}
                </Typography>
              </>
            )}
          </Box>

          {/* Plot to show message sentiment data */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexGrow: 1
            }}
          >
            <BarChart 
              width={100}
              height={100}
              leftAxis={null}
              bottomAxis={null}
              sx={{ 
                borderRadius: 2,
                borderColor: 'white',
                borderWidth: 1,
                minWidth: 100,
                minHeight: 100,
                "& .MuiChartsLegend-series tspan": { fontSize: "0.7em " }, 
              }}
              margin={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
              }}
              xAxis={[
                {
                  scaleType: 'band',
                  data: ['s']
                }
              ]}
              series={[
                {
                  data: [sentiment[0]],
                  color: '#4caf50', // Green color for 'pos'
                },
                {
                  data: [sentiment[1]],
                  color: '#ff9800', // Orange color for 'neu'
                },
                {
                  data: [sentiment[2]],
                  color: '#f44336', // Red color for 'neg'
                },
              ]}
            />
          </Box>
        </Box>


        
      </Box>
    </Box>
  );
};

export default CustomerMessage;
