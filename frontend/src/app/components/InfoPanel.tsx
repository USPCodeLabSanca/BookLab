export default function InfoPanel() {
  return (
    <div className="relative flex w-full md:w-80 bg-stone-900 h-full rounded-r-2xl flex-[0.25] items-center justify-center">
      {/*Cantos dourados*/}
      <div className="absolute top-0 left-0 w-10 h-10 bg-amber-800 rounded-br-lg"></div>
      <div className="absolute top-0 right-0 w-10 h-10 bg-amber-800 rounded-bl-lg"></div>
      <div className="absolute bottom-0 left-0 w-10 h-10 bg-amber-800 rounded-tr-lg"></div>
      <div className="absolute bottom-0 right-0 w-10 h-10 bg-amber-800 rounded-tl-lg"></div>

      {/*Componentes do painel de informações*/}
      <p className="font-petitfleur text-[500%] text-stone-300 italic">P</p>
      <p className="font-bouwsma text-stone-300 italic">ainel de informacoes</p> 
    </div>
  );
}