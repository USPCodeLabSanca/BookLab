export interface User{
    id: number;
    name: string, 
    avatarUrl: string //referência ao link da imagem
}

export interface UserText{
    user: User;
    text: string;
}
