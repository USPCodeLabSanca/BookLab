import Authors from "./Authors";
import { User } from "../types";
import BookStatusCard from "./BookStatusCard";
import SelectedText from "./SelectedText";

type CornerPosition = 'top-0' | 'bottom-0' | 'left-0' | 'right-0';


// Exemplos de autores
const mockAuthors: User[] = [
    { id: 1, name: 'Hornet', avatarUrl: '/authors/hornet.jpg' },
    { id: 2, name: 'Knight', avatarUrl: '/authors/knight.jpg' },
    { id: 3, name: 'Red Amongus', avatarUrl: '/authors/red_amongus.jpg' },
    { id: 4, name: 'Shrek', avatarUrl: '/authors/shrek.jpg' },
]


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

export default function InfoPanel() {
  return (
    <div className="relative flex w-full md:w-80 bg-marrom h-full rounded-r-2xl flex-[0.25] items-center justify-center">
      {/*Cantos dourados*/}
      <GoldenCorner x={"top-0"} y={"left-0"}/>
      <GoldenCorner x={"top-0"} y={"right-0"}/>
      <GoldenCorner x={"bottom-0"} y={"left-0"}/>
      <GoldenCorner x={"bottom-0"} y={"right-0"}/>

      {/*Componentes do painel de informações*/}
      <div className="flex flex-col">
        <BookStatusCard bookTheme="Tema" lettersLeft={30} timeLeft="30:30" />
        <Authors users={mockAuthors}/>
        <SelectedText text="a" user={mockAuthors[0]}/>
      </div>
    </div>
  );
}