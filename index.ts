//* Libraries imports
import OpenAI from "openai";

//* Local imports
import { createPage, listNotebooks, listPages } from "./src/tools/pages";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const runner = client.beta.chat.completions
    .runTools({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "Crie uma página dentro do caderno de viagens, dê o nome de Kappipoca.",
        },
        {
          role: "system",
          content: `
            - For searching notebooks and pages, consider the user can type or spell wrong, allways try to find the most similar notebook or page.
            - Even if the name of the notebook or page doesn't exist, interpret the request and see if there is an equivalent page.
            - Pages are inside notebooks. A notebook can be single or multiple pages long.
            - Always verify if the notebook and page exists before create a new page.
            - Do not consider uppercase or lowercase letters coming from the user.
            - Be smart and unserstand what the user wants to do and where he wants to do.
            `,
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            function: listNotebooks,
            description: "List all notebooks",
            parameters: {}
          },
        },
        {
          type: "function",
          function: {
            function: listPages,
            description: "List all pages of a specific notebook",
            parse: JSON.parse,
            parameters: {
              type: "object",
              properties: {
                notebook: { type: "string", description: "Notebook's name" },
              },
            },
          },
        },
        {
          type: "function",
          function: {
            function: createPage,
            description: "Create a page inside a notebook",
            parse: JSON.parse,
            parameters: {
              type: "object",
              properties: {
                notebook: { type: "string", description: "Notebook's name" },
                pageName: { type: "string", description: "Page's name" },
              },
            },
          },
        },
      ],
    })
    .on("message", (message) => console.log(message))

  const finalContent = await runner.finalContent();

  console.log("response:", finalContent);
}

main();