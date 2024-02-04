import { CreatePageResponseData, SearchPageResponseData } from "../../ResponseData/Types/ResponseDataType";
import { NotionPageType } from "../Types/NotionPageType";

export interface INotionRepository {
    SearchPage(input: string): Promise<SearchPageResponseData>;
    CreatePage(page: NotionPageType): Promise<CreatePageResponseData>;
}