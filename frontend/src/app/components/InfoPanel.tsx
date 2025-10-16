type CornerPosition = 'top-0' | 'bottom-0' | 'left-0' | 'right-0';

function GoldenCorner({x, y}: {x: CornerPosition, y: CornerPosition}) {
  /*Identificar a direção oposta, para definir o semicírculo marrom*/
  const opposite: Record<CornerPosition, CornerPosition> = {
    'top-0': 'bottom-0',
    'bottom-0': 'top-0',
    'left-0': 'right-0',
    'right-0': 'left-0',
  };

  /*Identificar a direção do arredondamento*/
  const roundMap: Record<string, string> = {
    'top-0 left-0': 'rounded-tl-full',
    'top-0 right-0': 'rounded-tr-full',
    'bottom-0 left-0': 'rounded-bl-full',
    'bottom-0 right-0': 'rounded-br-full'
  };

  const roundKey = `${x} ${y}`;
  const roundClass = roundMap[roundKey];

  /*Componente final*/
  return (
    <div className={`absolute ${x} ${y} w-15 h-15 bg-amber-800`}>
      <div className={`absolute ${opposite[x]} ${opposite[y]} w-10 h-10 bg-stone-900 ${roundClass}`}/>
    </div>
  );
}

export default function InfoPanel() {
  return (
    <div className="relative flex w-full md:w-80 bg-stone-900 h-full rounded-r-2xl flex-[0.25] items-center justify-center">
      {/*Cantos dourados*/}
      <GoldenCorner x={"top-0"} y={"left-0"}/>
      <GoldenCorner x={"top-0"} y={"right-0"}/>
      <GoldenCorner x={"bottom-0"} y={"left-0"}/>
      <GoldenCorner x={"bottom-0"} y={"right-0"}/>

      {/*Componentes do painel de informações*/}
      <p className="font-petitfleur text-[500%] text-stone-300 italic">P</p>
      <p className="font-bouwsma text-stone-300 italic">ainel de informacoes</p> 
    </div>
  );
}