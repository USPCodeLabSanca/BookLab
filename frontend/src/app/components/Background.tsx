import Image from 'next/image'
import pagecorner from '../assets/pagecorner.png'
import vine from '../assets/vine.png'

export default function Background(){
    return(
        <div className="relative flex-[0.75] bg-bege h-full rounded-l-2xl flex items-center justify-center">
            {/*Imagens de fundo*/}
            <Image src={pagecorner} alt='' className='absolute top-0 left-0 h-[12vw] w-auto object-scale-down border-5'/>
            <Image src={vine} alt='' className="absolute top-0 right-0 h-[23vw] w-auto rotate-180 object-contain"/>
            <Image src={vine} alt='' className="absolute bottom-0 right-0 h-[23vw] w-auto object-contain"/>
            {/*Aqui viria a componente da área do texto*/}
            <p className="font-petitfleur text-[500%] text-gray-500 italic">A</p>
            <p className="font-bouwsma text-gray-500 italic">rea do texto</p>
        </div>
    )
}