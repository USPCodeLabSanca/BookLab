import BookStatusCard from "./BookStatusCard";
import Authores from "./Authors";
import SelectedText from "./SelectedText";

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
    <div className={`absolute ${x} ${y} w-15 h-15 bg-dourado`}>
      <div className={`absolute ${opposite[x]} ${opposite[y]} w-10 h-10 bg-marrom ${roundClass}`}/>
    </div>
  );
}

const usuario = {
    name: 'oioioi',
    img: 'danza kuduro'
}

export default function InfoPanel() {
  return (
    <div className="relative flex flex-col w-full bg-marrom h-full rounded-r-2xl flex-[0.25] items-center justify-center">
      {/*Cantos dourados*/}
      <GoldenCorner x={"top-0"} y={"left-0"}/>
      <GoldenCorner x={"top-0"} y={"right-0"}/>
      <GoldenCorner x={"bottom-0"} y={"left-0"}/>
      <GoldenCorner x={"bottom-0"} y={"right-0"}/>

      {/*Componentes do painel de informações*/}
      <BookStatusCard timeLeft="1h 32m" lettersLeft={123} bookTheme="shrek"/>
      <SelectedText text="labubu" user={usuario}/>
    </div>
  );
}