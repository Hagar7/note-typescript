
export interface NotesTypes {
    message: string;
    notes:   Note[];
}

export interface Note {
    _id:       string;
    title:     string;
    desc:      string;
    user:      string;
    createdAt: string;
    updatedAt: string;
    __v:       number;
}

export interface Ouote {
    quote:    string;
    author:   string;
    category: string;
}
