import { Author } from '../types';

interface AutoresProps {
    authors: Author[];
}

export default function Authores({ authors }: AutoresProps) {
    return (
        <div className="bg-[#4A2E0A] p-8 rounded-lg max-w-2xl mx-auto text-white font-sans">
            <h2 className="text-4xl font-serif font-bold mb-6 text-shadow-sm underline" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                Autores:
            </h2>

            <div className="max-h-64 overflow-y-auto pr-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">

                    {/* Mapeia o array de autores para renderizar cada um */}
                    {authors.map((author) => (
                        <div key={author.id} className="flex items-center gap-3">
                            <img
                                src={author.avatarUrl}
                                alt={`Avatar de ${author.name}`}
                                className="w-14 h-14 rounded-full object-cover border-2 border-white"
                            />
                            <span>{author.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
