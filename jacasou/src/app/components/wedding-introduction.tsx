'use client';
export const WeddingIntroduction = () => {
    return (
        <div className="flex justify-center p-10">
            <div className="bg-glass shadow-lg rounded-lg p-6 text-lg w-full max-w-2xl ">
                <h1 className="text-4xl md:text-6xl py-6 text-center text-casamento font-motterdam">Bem-vindos ao nosso site de casamento!</h1>
                <p className="text-justify indent-8">
                    Estamos muito felizes em ter vocês ao nosso lado neste momento tão importante. Para a Lua de Mel, decidimos criar uma lista de presentes dedicada à viagem. Cada contribuição será um passo a mais rumo à viagem.
                    Ainda estamos sonhando com o destino: será que vamos relaxar em uma <span className="text-orange-600 font-bold">praia paradisíaca</span> ou nos aventurar em <span className="text-cyan-500 font-bold">paisagens cobertas de neve</span>? O que importa mesmo é estarmos juntos, vivendo cada instante com alegria!

                </p>
                <p className="text-justify indent-8">
                </p>
                <p className="mt-4 font-motterdam text-2xl md:text-4xl text-casamento">
                    Com carinho,<br />
                    João e Alice<br />
                    (ou simplesmente, Jalice)
                </p>
            </div>
        </div>
    )
}