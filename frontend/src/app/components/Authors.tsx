import { User } from '../types';

interface AutoresProps {
    users: User[];
}

export default function Authors({ users }: AutoresProps) {
    return (
        <div className="p-8 rounded-lg max-w-2xl mx-auto text-white font-sans">
            <h2 className="text-4xl font-serif font-bold mb-6 text-shadow-sm underline" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                Autores:
            </h2>

            <div className="max-h-64 overflow-y-auto pr-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">

                    {/* Mapeia o array de autores para renderizar cada um */}
                    {users.map((user) => (
                        <div key={user.id} className="flex items-center gap-3">
                            <img
                                src={user.avatarUrl}
                                alt={`Avatar de ${user.name}`}
                                className="w-14 h-14 rounded-full object-cover border-2 border-white"
                            />
                            <span>{user.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
