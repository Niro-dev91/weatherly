import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function askWeatherAssistant(userMessage, weatherData) {
  const prompt = `
You are a helpful weather assistant for a weather app.
Answer briefly and clearly.

User message:
${userMessage}

Weather data:
${JSON.stringify(weatherData, null, 2)}
`;

  const response = await client.responses.create({
    model: 'gpt-4.1-mini',
    input: prompt,
  });

  return response.output_text;
}