import Image from "next/image";
import Main from "./pages/main";
import SelectedText from "./components/SelectedText";

export default function Home() {
  return (
    <div>
      <Main />
      <SelectedText text="Frase Muito legal dita por ai" user={{name:"aaaa", img:"https://i.imgur.com/3fA43t8.png"}} />
    </div>
  );
}
