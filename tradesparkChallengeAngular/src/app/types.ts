export interface Category {
    id: number;
    name: string;
    description: string | null;
}

export interface Author {
    id: number;
    name: string;
    bio: string | null;
    date_of_birth: Date | null;
}

export interface Book {
    id: number;
    title: string;
    author: Author;
    categories: Category[] | null;
    publication_date: Date | null;
    ISBN: string | null;
}

