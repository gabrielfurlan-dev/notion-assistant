import { NotionPageType } from './../../Notion/Types/NotionPageType';
interface IResponseData {
    success: boolean,
    message: string,
    data: any
}

export interface SearchPageResponseData extends IResponseData {
    data: NotionPageType
}

export interface CreatePageResponseData extends IResponseData {
    
}