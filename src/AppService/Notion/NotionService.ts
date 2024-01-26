import { NotionPageType } from "../../Domain/Notion/Types/NotionPageType";
import { INotionRepository } from '../../infra/NotionAPI/Types/INotionRepository';

export class NotionService {

    _repository: INotionRepository;

    constructor(repository: INotionRepository) {
        this._repository = repository;
    }

    CreatePage(page: NotionPageType) {
        this._repository.CreatePage(page);
    }

    SearchPage(input: string) {
        this._repository.SearchPage(input);
    }
}