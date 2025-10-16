export interface user{
    id: number;
    name: string, 
    text: string, 
    avatarUrl: string //referência ao link da imagem
}

export interface userText{
    user: user;
    text: string;
}
