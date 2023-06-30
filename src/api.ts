import axios from 'axios';
import { API_KEY, BASE_URL } from './utils/constants';

export const openaiApi = async (message: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/chat/completions`,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
    return 1;
  }
};
