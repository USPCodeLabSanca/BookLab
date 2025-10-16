import { GoHourglass } from "react-icons/go"
import { MdOutlineTextFields } from "react-icons/md";
import { FaPenNib } from "react-icons/fa6";


interface BookStatusCardProps {
    timeLeft: string;
    lettersLeft: number;
    bookTheme: string;
}


export default function BookStatusCard({ timeLeft, lettersLeft, bookTheme }: BookStatusCardProps) {
    return (
        <div className="bg-[#302521] text-white font-sans p-6 rounded-lg max-w-md mx-auto shadow-lg">

            {/* Tempo Restante */}
            <div className="text-center mb-6">
                <h2 className="text-sm text-gray-300 mb-2">
                    Tempo restante para finalizar o livro:
                </h2>
                <div className="flex items-center justify-center gap-2">
                    <GoHourglass />
                    <span className="bg-[#51433E] px-4 py-1 rounded-full text-lg font-semibold">
                        {timeLeft}
                    </span>
                </div>
            </div>

            <div className="flex justify-between gap-x-7 items-center text-center">
                {/* Letras Restantes */}
                <div>
                    <h3 className="text-sm text-gray-300 mb-2">Suas letras restantes:</h3>
                    <div className="flex items-center justify-center gap-2">
                        <MdOutlineTextFields />
                        <span className="bg-[#51433E] px-4 py-1 rounded-full text-lg font-semibold">
                            {lettersLeft} letras
                        </span>
                    </div>
                </div>

                {/* Tema do Livro */}
                <div>
                    <h3 className="text-sm text-gray-300 mb-2">Tema do livro:</h3>
                    <div className="flex items-center justify-center gap-2">
                        <FaPenNib />
                        <span className="bg-[#51433E] px-4 py-1 rounded-full text-lg font-semibold">
                            {bookTheme}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
