
import Background from "../components/Background"
import InfoPanel from "../components/InfoPanel"
import BookStatusCard from "../components/BookStatusCard"
import Authors from '../components/Authors';
import { user } from '../types';

export default function Main() {

// Exemplos de autores
const mockAuthors: user[] = [
    { id: 1, name: 'Hornet', avatarUrl: '/authors/hornet.jpg' },
    { id: 2, name: 'Knight', avatarUrl: '/authors/knight.jpg' },
    { id: 3, name: 'Red Amongus', avatarUrl: '/authors/red_amongus.jpg' },
    { id: 4, name: 'Shrek', avatarUrl: '/authors/shrek.jpg' },

];
    
    return (
        <div className="min-h-screen flex h-screen items-center justify-center p-3">

            {/* Teste do componente Background*/}
            <Background/>
            <InfoPanel/>
        </div>
    );
}
