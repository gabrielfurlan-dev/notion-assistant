import { NotionPageType } from "../../Domain/Notion/Types/NotionPageType";
import { INotionRepository } from "../../infra/NotionAPI/Types/INotionRepository";

export class NotionService {
  _repository: INotionRepository;

  constructor(repository: INotionRepository) {
    this._repository = repository;
  }

  async CreatePage(page: NotionPageType) {
    return await this._repository.CreatePage(page);
  }

  async SearchPage(input: string) {
    return await this._repository.SearchPage(input);
  }
}
