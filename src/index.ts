import { NotionRepository } from './infra/NotionAPI/Repositories/NotionRepository';
import { NotionService } from './AppService/Notion/NotionService';
import OpenAI from "openai";
import { NotionPageType } from './Domain/Notion/Types/NotionPageType';

require('dotenv').config()

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let notionRepository = new NotionRepository();
let notionService = new NotionService(notionRepository);

async function SearchPage({ input }: { input: string }) {
  console.log("SEARCH: " + input)
  return notionService.SearchPage(input);
}

async function CreatePage({ title, emoji, content }: { title: string, emoji: string; content: string }) {
  console.log("PAGE: " + title + emoji + content)
  return notionService.CreatePage(title, emoji, content);
}

async function main() {
  const runner = client.beta.chat.completions.runTools({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "Crie uma página dentro da página de viagens, e dê o nome de Sampa."
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
      // {
      //   type: "function",
      //   function: {
      //     function: SearchPage,
      //     description: "Searches all parent or child pages and databases that have been shared with an integration.",
      //     parse: JSON.parse,
      //     parameters: {
      //       type: "object",
      //       properties: {
      //         input: { type: "string", description: "parent pages name, child pages name or database name" },
      //       },
      //     },
      //   },
      // },
      {
        type: "function",
        function: {
          function: CreatePage,
          description: "necessary notion page title and description to create a page",
          parse: JSON.parse,
          parameters: {
            type: "object",
            properties: {
              title: { type: "string", description: "page title" },
              emoji: { type: "string", description: "page emoji related with title page" },
              content: { type: "string", description: "content page" },
            },
          },
        },
      },
    ],
  })
  // .on("message", (message) => console.log(message))

  const finalContent = await runner.finalContent();

  // console.log("response:", finalContent);
  // console.log("SERVER IS ON");
}

main();