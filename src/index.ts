import { NotionRepository } from './infra/NotionAPI/Repositories/NotionRepository';
import { NotionService } from './AppService/Notion/NotionService';
import OpenAI from "openai";

require('dotenv').config()

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let notionRepository = new NotionRepository();
let notionService = new NotionService(notionRepository);

async function main() {
  const runner = client.beta.chat.completions.runTools({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "Crie uma página dentro do caderno de viagens, dê o nome de Sampa."
      },
      {
        role: "system",
        content: `- For searching notebooks and pages, consider the user can type or spell wrong, allways try to find the most similar notebook or page.
            - Even if the name of the notebook or page doesn't exist, interpret the request and see if there is an equivalent page.
            - Pages are inside notebooks. A notebook can be single or multiple pages long.
            - Always verify if the notebook and page exists before create a new page.
            - Do not consider uppercase or lowercase letters coming from the user.
            - Be smart and unserstand what the user wants to do and where he wants to do.`,
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          function: await notionService.SearchPage,
          description: "Searches all parent or child pages and databases that have been shared with an integration.",
          parse: JSON.parse,
          parameters: {
            type: "object",
            properties: {
              input: { type: "string", description: "parent pages name, child pages name or database name" },
            },
          },
        },
      },
      {
        type: "function",
        function: {
          function: await notionService.CreatePage,
          description: "Create a page inside a notebook",
          parse: JSON.parse,
          parameters: {
            type: "object",
            properties: {
              page: { type: "object", description: "Page JSON properties as type of notion page documentation" },
            },
          },
        },
      },
    ],
  }).on("message", (message) => console.log(message))

  const finalContent = await runner.finalContent();

  console.log("response:", finalContent);
  console.log("SERVER IS ON");
}

main();