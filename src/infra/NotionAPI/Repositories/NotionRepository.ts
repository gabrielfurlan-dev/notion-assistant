import axios, { AxiosInstance } from "axios";

import { INotionRepository } from "../../../Domain/Notion/Repositories/INotionRepository";
import { NotionPageType } from "../../../Domain/Notion/Types/NotionPageType";
import { CreatePageResponseData, SearchPageResponseData } from "../../../Domain/ResponseData/Types/ResponseDataType";


export class NotionRepository implements INotionRepository {

    private _baseAPI = "https://api.notion.com/v1"
    private _axiosInstance: AxiosInstance;

    constructor() {
        this._axiosInstance = axios.create({
            baseURL: this._baseAPI,
            headers: {
                Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
                accept: 'application/json',
                'Notion-Version': '2022-06-28',
                'content-type': 'application/json'
            }
        });
    }

    async SearchPage(input: string): Promise<SearchPageResponseData> {

        const response = await this._axiosInstance.post('/search', {
            query: input,
            filter: {
                value: "database",
                property: "object"
            },
            sort: {
                direction: "ascending",
                timestamp: "last_edited_time"
            }
        })
        console.log(response.data.page_or_database);
        return { success: response.status == 200, data: response.data.page_or_database, message: response.statusText };
    }

    async CreatePage(page: NotionPageType): Promise<CreatePageResponseData> {

        const response = await this._axiosInstance.post('/pages', page)

        console.log(response.data)
        return { success: response.status == 200, data: response.data, message: response.statusText };
    }
}