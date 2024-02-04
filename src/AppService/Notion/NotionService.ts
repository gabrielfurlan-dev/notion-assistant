import { NotionPageType } from "../../Domain/Notion/Types/NotionPageType";
import { INotionRepository } from '../../Domain/Notion/Repositories/INotionRepository';
import { CreatePageResponseData, SearchPageResponseData } from "../../Domain/ResponseData/Types/ResponseDataType";

export class NotionService {

    private _repository: INotionRepository;

    constructor(repository: INotionRepository) {
        this._repository = repository;
    }

    async CreatePage(title: string, emoji: string, content: string): Promise<CreatePageResponseData> {

        let page: NotionPageType = {
            icon: {
                type: "emoji",
                emoji: emoji
            },
            // parent: {
            //     type: "workspace",
            //     workspace: true 
            //      Its necessary to define the parent_id, but I've no idea how i do that 
            // },
            object: "page",
            properties: {
                "Name": {
                    title: [
                        {
                            text: {
                                content: title
                            }
                        }
                    ],
                    type: "title"
                },
                "Description": {
                    type: "rich_text",
                    rich_text: [
                        {
                            text: {
                                content: content
                            }
                        }
                    ],
                },
            },
        };


        try {
            return await this._repository.CreatePage(page);
        } catch (error) {
            console.error("Error in CreatePage:", error);
            throw error;
        }
    }

    async SearchPage(input: string): Promise<SearchPageResponseData> {
        try {
            return await this._repository.SearchPage(input);
        } catch (error) {
            console.error("Error in SearchPage:", error);
            throw error;
        }
    }
}
