import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const CHATGPT_API_URL = 'https://api.openai.com/v1/chat/completions';

function extractErrorsFromResponse(eslintResult: any) {
    axios.post(
        CHATGPT_API_URL,
        {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: "You are a helpful assistant designed to output JSON." },
                { role: 'user', content: 'Analyze the below one ${eslintResult}\n\n Return all the errors in Array of objects format, Where each Object should contains keys like "Error line", "Error Description", "Priority" ' }
            ],
            n: 1,
            stop: null,
            temperature: 0.5,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
        }
    ).then(response => {
        console.log(response.data.choices[0].content);
    }).catch(error => {
        console.error('Error:', error);
    });
    return;
}

export default { extractErrorsFromResponse };

