export class NotionPage {

}

export type File = {
    type: 'external' | 'File'
    external?: {
        url: string
    },
    file?:{
        url: string,
        expiry_time: string, //2022-10-24T22:49:22.765Z
    }
}

export type Parent = {
    database_id?: string;
    page_id?: string;
}

export type NotionPageType = {
    object: string,
    id: string,
    created_time: string, //"2022-10-24T22:54:00.000Z"
    last_edited_time: string, //"2023-03-08T18:25:00.000Z"
    created_by: {
        object: string, //"user"
        id: string,
    },
    last_edited_by: {
        object: string,
        id: string
    },
    // cover: null,
    icon: {
        type: 'emoji' | 'external' | 'file',
        emoji: string //🚀
    },
    parent: Parent,
    archieved: boolean,
    properties: {
        [key: string]: {
            title?: [{ text: { content: string } }],
            rich_text?: [{ text: { content: string } }],
            number?: number,
            select?: { name: string }
            multi_select?: {name: string}[],
            date?: {
                
            }
        }
    }
    cover: File,


}