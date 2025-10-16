
import BookStatusCard from "../components/BookStatusCard"
import Authors from '../components/Authors';
import { user } from '../types';

// Exemplos de autores
const mockAuthors: user[] = [
    { id: 1, name: 'Hornet', avatarUrl: '/authors/hornet.jpg' },
    { id: 2, name: 'Knight', avatarUrl: '/authors/knight.jpg' },
    { id: 3, name: 'Red Amongus', avatarUrl: '/authors/red_amongus.jpg' },
    { id: 4, name: 'Shrek', avatarUrl: '/authors/shrek.jpg' },

];

//Exemplo na main para testar funcionalidade
export default function Main() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
            <Authors authors={mockAuthors} />
        </div>
    );
}
