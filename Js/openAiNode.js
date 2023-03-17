const { Configuration, OpenAIApi } = require("openai");
OPENAI_API_KEY = "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"
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Say this is a test",
  max_tokens: 7,
  temperature: 0,
});
