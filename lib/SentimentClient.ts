// lib/SentimentClient.ts

export interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
}


export default class SentimentClient {
    private url: string;
    private SENTIMENT_ACCESS_KEY: string = 'm98d02iaaiakutoqab561wst6f8goqwu';
  
    constructor() {
      this.url = `https://modelservice.${process.env.NEXT_PUBLIC_CDSW_DOMAIN}/model?accessKey=${this.SENTIMENT_ACCESS_KEY}`
    }
  
    async call(input: string): Promise<SentimentData> {
      try {
        const response = await fetch(this.url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CDSW_APIV2_KEY}`},
          body: JSON.stringify({ request: {text: input} })
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        return data.response
      } catch (error) {
        console.error('Error during fetch:', error);
        throw error;
      }
    }
  }
  