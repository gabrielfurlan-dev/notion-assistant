import axios from "axios";
import { INotionRepository } from "../Types/INotionRepository";
import { NotionPageType } from "../../../Domain/Notion/Types/NotionPageType";

const baseAPI = "https://api.notion.com/v1"

export class NotionRepository implements INotionRepository {

    SearchPage(input: string): Promise<any> {
        return axios.post(`${baseAPI}/search`, {
            headers: {
                Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
                accept: 'application/json',
                'Notion-Version': '2022-06-28',
                'content-type': 'application/json'
            },
            data: {
                query: input,
                filter: {
                    value: "database",
                    property: "object"
                },
                sort: {
                    direction: "ascending",
                    timestamp: "last_edited_time"
                }
            }
        })
    }

    CreatePage(page: NotionPageType): Promise<any> {
        return axios.post(`${baseAPI}/search`, {
            headers: {
                Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
                accept: 'application/json',
                'Notion-Version': '2022-06-28',
                'content-type': 'application/json'
            },
            data: page
        })
    }
}