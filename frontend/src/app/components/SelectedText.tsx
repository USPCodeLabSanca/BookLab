import { User } from "../types";

interface selectedTextInterface{
    text: string
    user: User
}

export default function SelectedText({ text, user }: selectedTextInterface) {
  return (
    // FUNDO ESCURO EXEMPLO
    <div className=" p-8 rounded-lg flex flex-col items-center gap-4 font-serif">

      <h2 className="text-xl text-[#E5D8C6] underline underline-offset-2 self-start">
        Texto selecionado
      </h2>
      
      {/* Caixa de conteúdo principal */}
      <div className="bg-[#E5D8C6] w-full text-black rounded-md p-4 border border-black/20 flex flex-col min-h-[150px]">
        
        <div className="flex-grow text-center flex items-center justify-center text-3xl">
          <span className="leading-tight">"{text}"</span>
        </div>

        <div className="flex justify-center mr-10 items-center gap-2 self-end mt-2">
          <img
            src={user.avatarUrl} 
            alt={`Avatar de ${user.name}`} 
            className="w-9 h-9 rounded-full object-cover" 
          />
          <span className="text-lg">{user.name}</span>
        </div>
      </div>

      <button className="bg-gray-200 text-black px-8 py-1 rounded-xl border border-gray-400 hover:bg-gray-100 cursor-pointer">
        Salvar
      </button>
    </div>
  );
}