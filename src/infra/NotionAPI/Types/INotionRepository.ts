//* Local imports
import { NotionPageType } from "../../../Domain/Notion/Types/NotionPageType";
import { ResponseData } from "../../../Domain/ResponseData/Types/ResponseDataType";

export interface INotionRepository {
  SearchPage(input: string): Promise<any>;
  CreatePage(page: NotionPageType): Promise<any>;
}
