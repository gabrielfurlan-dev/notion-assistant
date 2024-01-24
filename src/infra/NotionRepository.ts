import axios from "axios";
import { INotionRepository } from "./INotionRepository";

const baseAPI = "https://api.notion.com/v1"

export class NotionRepository implements INotionRepository {
    SearchPage(input: string): Promise<any> {
        return axios.get(`${baseAPI}/search`, {
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

    CreatePage(input: string): Promise<any> {

        //TODO: This function needs a formatted data in notion json to be executed

        //TODO: Validate json format

        //TODO: Send to notion

        throw new Error("Method not implemented.");
    }
}