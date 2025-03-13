'use client'
import { GiftProps } from './components/gift';
import GiftShop from './components/gift-shop';
import { WeddingTimer } from './components/wedding-timer';
import Carousel from './components/carousel';
import { WeddingIntroduction } from './components/wedding-introduction';

export default function Home() {
  const gifts: GiftProps[] = [
    { id: 1, description: "Se Deus quiser, com espaço para as pernas", title: "Vôo internacional", image: "/gifts/passagem-internacional.jpg", price: 1000 },
    { id: 2, description: "Só não pode dar muita vontade de não sair do quarto", title: "Hotel chiiique", image: "/gifts/hotel-chiiique.jpg", price: 500 },
    { id: 3, description: "Ou quem sabe uma Gôndola?", title: "Passeio de barco", image: "/gifts/barco.jpg", price: 400 },
    {
      id: 4,
      description: "Café da manhã completo, com cestinhas de todo tipo de gostosura",
      title: "Café da manhã",
      image: "/gifts/cafe-da-manha.jpg",
      price: 150
    },
    { id: 5, description: "Um momento a dois degustando as novidades do cardápio", title: "Almoço romântico", image: "/gifts/almoco-romantico.jpg", price: 450 },
    { id: 6, description: "Depois de um dia longo, porque não um jantarzinho no amor?", title: "Jantar romântico", image: "/gifts/jantar-romantico.jpg", price: 700 },
    { id: 7, description: "Dependendo da paisagem, até que vai!", title: "Ônibus turístico", image: "/gifts/onibus.jpg", price: 200 },
    { id: 8, description: "Melhor que isso quase impossível ", title: "Spa day", image: "/gifts/massagem-de-casal.jpg", price: 600 },
    { id: 9, description: "Necessário!", title: "Aula de culinária à dois", image: "/gifts/aula-culinaria.jpg", price: 300 },
    { id: 10, description: "Mais necessário ainda hahahah", title: "Aula de dança", image: "/gifts/aulas-danca.jpg", price: 300 },
    { id: 11, description: "Um Jorge Amado, por favor", title: "Embebedando os noivos", image: "/gifts/embebedando-os-noivos.jpg", price: 400 },
    { id: 12, description: "Ah, impossível faltar ", title: "Souvenir para a noiva", image: "/gifts/souvenir-noiva.jpg", price: 80 },
    { id: 13, description: "Gibi da Casa Carneiro, Primeira de Seu Nome, a Selvagem, Rainha do Recreio e dos Primeiros Homens, Khaleesi de Botafogo, Quebradora de Árvores e Mãe do Sofá.", title: "Pimentas para o noivo", image: "/gifts/pimentas-noivo.jpg", price: 80 },
    { id: 15, description: "Show do Millhão?", title: "Contribuição espontânea", image: "/gifts/contribuiacao-espontanea.jpg" }
  ]

  // const images = [
  //   "/banner-manga-gibi.jpg",
  //   "/hero.jpg",
  //   "/banner-manga-gibi.jpg",
  // ];

  return (
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(od/imag--font-geist-sans)]">
        <Carousel imagesEndpoint='https://fum1lwg0v4.execute-api.us-east-1.amazonaws.com/prod/images' />
        <WeddingIntroduction />
        <WeddingTimer date={new Date("2025-05-16T16:00:00")} />
        <div className="p-10">
          <h1 className="text-4xl font-bold text-center py-6 text-casamento font-heybrights" id="lista-de-presentes">Escolha o seu presente</h1>
          <GiftShop gifts={gifts} />
        </div>
        
    </div>
  );
}
