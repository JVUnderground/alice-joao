'use client'
import { GiftProps } from './components/gift';
import GiftShop from './components/gift-shop';
import { WeddingTimer } from './components/wedding-timer';
import Carousel from './components/carousel';
import { WeddingIntroduction } from './components/wedding-introduction';

export default function Home() {
  const gifts: GiftProps[] = [
    { id: 1, description: "hello!", title: "Vôo internacional", image: "/gifts/plane_tickets.jpeg", price: 1000 },
    { id: 2, description: "hello!", title: "Hotel chiiique", image: "/hero.jpg", price: 500 },
    { id: 3, description: "hello!", title: "Passeio de barco", image: "/hero.jpg", price: 400 },
    {
      id: 4,
      description: "Café da manhã completo, com cestinhas de todo tipo de gostosura",
      title: "Café da manhã",
      image: "/hero.jpg",
      price: 150
    },
    { id: 5, description: "hello!", title: "Almoço romântico", image: "/hero.jpg", price: 450 },
    { id: 6, description: "hello!", title: "Jantar romântico", image: "/hero.jpg", price: 700 },
    { id: 7, description: "hello!", title: "Ônibus turístico", image: "/hero.jpg", price: 200 },
    { id: 8, description: "hello!", title: "Spa day", image: "/gifts/massagem.jpeg", price: 600 },
    { id: 9, description: "hello!", title: "Aula de culinária à dois", image: "/hero.jpg", price: 300 },
    { id: 10, description: "hello!", title: "Aula de dança", image: "/hero.jpg", price: 300 },
    { id: 11, description: "hello!", title: "Embebedando os noivos", image: "/hero.jpg", price: 400 },
    { id: 12, description: "hello!", title: "Souvenir para a noiva", image: "/hero.jpg", price: 80 },
    { id: 13, description: "hello!", title: "Pimentas para o noivo", image: "/hero.jpg", price: 80 },
    { id: 14, description: "hello!", title: "Viagem de trêm", image: "/hero.jpg", price: 300 },
    { id: 15, description: "hello!", title: "Contribuição espontânea", image: "/hero.jpg" }
  ]

  const images = [
    "/banner-manga-gibi.jpg",
    "/hero.jpg",
    "/banner-manga-gibi.jpg",
  ];

  return (
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
        <Carousel images={images} />
        <WeddingIntroduction />
        <WeddingTimer date={new Date("2025-05-16T16:00:00")} />
        <div className="p-10">
          <h1 className="text-4xl font-bold text-center py-6 text-casamento font-heybrights" id="lista-de-presentes">Escolha o seu presente</h1>
          <GiftShop gifts={gifts} />
        </div>
        
    </div>
  );
}
