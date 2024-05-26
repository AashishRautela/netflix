import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
  dangerouslyAllowBrowser: true
});

export default openai;
// import { OpenAIAPI } from "openai";

// const openai = new OpenAIAPI({
//   key: process.env.REACT_APP_OPENAI_KEY,
//   // Other configuration options if needed
// });

// export default openai;

