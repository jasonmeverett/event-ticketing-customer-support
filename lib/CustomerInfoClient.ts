// lib/CustomerInfoClient.ts

const OPENAI_API_KEY=process.env.OPENAI_API_KEY

export default class CustomerInfoClient {

  private customerInfo: Record<string, string> = {};
  private url: string;

  constructor() {
    this.url = "https://api.openai.com/v1/chat/completions"
  }
  
  async call(input: string): Promise<Record<string, string>> {
    try {
      const prompt=`
You are tasked with extracting customer information entities from a customer message to help support an automated event ticketing system. Given a current list of extracted information, and a new customer message, provide a JSON-only output of new information that can be extracted from the new message.

Rules:
* only respond with JSON-compatible output.
* only extract entities that can directly be extracted from the message.
* extract personal information, as well as information regarding the ticket, event, game, seat, or purchase.
* if there is new information that overrides an existing field, make sure you provide the updated value with the same key name.
* if there is no new information to extract, response with a blank JSON dictionary {}.

CUSTOMER INFORMATION:
${JSON.stringify(this.customerInfo)}

CUSTOMER MESSAGE:
${input}
`

      const response = await fetch(this.url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_API_KEY}`},
        body: JSON.stringify({ 
          model: 'gpt-4o-mini',
          messages: [
            {
              role: "user",
              content: prompt
            }
          ]
         })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const output_json = data.choices[0].message.content;
      try {
        this.customerInfo = {
          ...this.customerInfo,
          ...JSON.parse(output_json)
        }
      } catch (error) {
        console.log("Failed to parse output")
        console.log("output: ", output_json)
      }
      
      return this.customerInfo;  // Assuming 'response' is the field in the JSON returned from the server
    } catch (error) {
      console.error('Error during fetch:', error);
      throw error;
    }
  }
}
