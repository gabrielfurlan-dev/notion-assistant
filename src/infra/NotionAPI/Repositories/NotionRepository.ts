//* Libraries imports
import axios from "axios";
import type { RawAxiosRequestHeaders } from "axios";

//* Local imports
import { env } from "../../../env";
import { INotionRepository } from "../Types/INotionRepository";
import { NotionPageType } from "../../../Domain/Notion/Types/NotionPageType";

const baseAPI = "https://api.notion.com/v1";

const defaultHeaders: RawAxiosRequestHeaders = {
  Authorization: `Bearer ${env.NOTION_API_KEY}`,
  accept: "application/json",
  "Notion-Version": "2022-06-28",
  "content-type": "application/json",
};

export class NotionRepository implements INotionRepository {
  SearchPage(input: string): Promise<any> {
    const url = `${baseAPI}/search`;
    return axios.post(url, {
      headers: defaultHeaders,
      data: {
        query: input,
        filter: {
          value: "database",
          property: "object",
        },
        sort: {
          direction: "ascending",
          timestamp: "last_edited_time",
        },
      },
    });
  }

  CreatePage(page: NotionPageType): Promise<any> {
    const url = `${baseAPI}/search`;
    return axios.post(url, {
      headers: defaultHeaders,
      data: page,
    });
  }
}
