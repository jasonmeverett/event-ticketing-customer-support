// lib/ClassificationClient.ts
export default class ClassificationClient {
    private url: string;
  
    constructor() {
      this.url = `https://modelservice.${process.env.NEXT_PUBLIC_CDSW_DOMAIN}/model?accessKey=${process.env.NEXT_PUBLIC_TICKETING_MODEL_ACCESS_KEY}`
    }
  
    async call(input: string): Promise<string> {
      try {

        const prompt = `
You are an event ticketing customer LLM chatbot responsible for generating a one-word, snake_case action, based on a customer input. Please provide the most relevant action based on the input from the customer below.

### CUSTOMER: ${input}
### ACTION: `;

        const response = await fetch(this.url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CDSW_APIV2_KEY}`},
          body: JSON.stringify({ request: {prompt: prompt} })
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        return data.response;  // Assuming 'response' is the field in the JSON returned from the server
      } catch (error) {
        console.error('Error during fetch:', error);
        throw error;
      }
    }
  }
  