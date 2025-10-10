
import BookStatusCard from "../components/BookStatusCard"
export default function Main() {
    return (
        <div className="min-h-screen flex items-center justify-center p-3 items-center">


            {/* Teste do componente BookStatusCard*/}
            <BookStatusCard
                timeLeft="1hr 02 min"
                lettersLeft={10}
                bookTheme="Idade Média"
            />
        </div>
    )
}
