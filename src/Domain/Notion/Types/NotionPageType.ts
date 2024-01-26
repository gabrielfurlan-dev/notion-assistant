export type NotionPageType = {
    object: 'page',
    id: string,
    created_time: string, // ISO 8601 date and time
    last_edited_time: string, // ISO 8601 date and time
    archived: boolean,
    parent?: Parent,
    icon?: {
        type: 'emoji' | 'external' | 'file',
        emoji?: string,
        external?: {
            url: string
        };
        file?: {
            url: string,
            expiry_time: string
        };
    };
    cover?: {
        type: 'external' | 'file';
        external?: {
            url: string
        };
        file?: {
            url: string,
            expiry_time: string
        }
    },
    properties: {
        [propertyName: string]: NotionProperty
    },
}

type NotionProperty =
    | TitleProperty
    | RichTextProperty
    | NumberProperty
    | SelectProperty
    | MultiSelectProperty
    | DateProperty
    | CheckboxProperty
    | URLProperty
    | EmailProperty
    | PhoneNumberProperty


type Parent = {
    type?: 'database_id' | 'page_id' | 'workspace',
    database_id?: string,
    page_id?: string
}

type TitleProperty = {
    id: string;
    type: 'title';
    title: {
        plain_text: string;
    }[];
};

type RichTextProperty = {
    id: string;
    type: 'rich_text';
    rich_text: {
        plain_text: string;
        href?: string;
    }[];
};

type NumberProperty = {
    id: string;
    type: 'number';
    number: number;
};

type SelectProperty = {
    id: string;
    type: 'select';
    select: {
        name: string;
        id: string;
        color: string;
    };
};

type MultiSelectProperty = {
    id: string;
    type: 'multi_select';
    multi_select: {
        name: string;
        id: string;
        color: string;
    }[];
};

type DateProperty = {
    id: string;
    type: 'date';
    date: {
        start: string; // ISO 8601 date and time
        end?: string; // ISO 8601 date and time
    };
};

type CheckboxProperty = {
    id: string;
    type: 'checkbox';
    checkbox: boolean;
};

type URLProperty = {
    id: string;
    type: 'url';
    url: string;
};

type EmailProperty = {
    id: string;
    type: 'email';
    email: string;
};

type PhoneNumberProperty = {
    id: string;
    type: 'phone_number';
    phone_number: string;
};