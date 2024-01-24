export interface INotionRepository {
    SearchPage(input: string): Promise<any>;
    CreatePage(input: string): Promise<any>; //This function needs to normalize content to insert page through notion API
}