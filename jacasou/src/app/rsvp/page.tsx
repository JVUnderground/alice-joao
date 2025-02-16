"use client";
import { useState } from "react";

export default function RSVP() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guestChildren, setGuestChildren] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formUrl =
      "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdvSnPsSL8stR7PNRtCp5hjEtZA7_U-3MhiRxR0DWJa-GK_Sg/formResponse";

    const params = new URLSearchParams();
    params.append("entry.1296336332", name);
    params.append("entry.1546785004", email);
    params.append("entry.939016791", guestChildren);

    fetch(formUrl, {
      method: "POST",
      mode: "no-cors",
      body: params,
    }).then(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
    });
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-4 text-casamento font-heybrights">Confirmação de Presença</h2>
        
        <p className="text-center text-gray-700 mb-4 text-justify">
        Estamos muito felizes em celebrar esse momento especial com você!
        Para nos ajudar a planejar tudo com carinho, pedimos que <b className="text-casamento">cada convidado</b> confirme sua presença <b className="text-casamento">individualmente</b>, mesmo que faça parte de um grupo ou casal.
        </p>
        <p>
        🌻 Por favor, preencher o formulário abaixo:
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <input
            type="text"
            placeholder="Meu nome completo é..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
            disabled={isConfirmed}
            onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Informar o nome completo')}
          />
          <input
            type="email"
            placeholder="Meu e-mail é..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
            onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Informar o seu email')}
            disabled={isConfirmed}
          />
          <button
            type="submit"
            disabled={isSubmitting || isConfirmed}
            className={`w-full text-white py-2 rounded-lg transition ${
              isConfirmed
                ? "bg-green-500 cursor-not-allowed"
                : isSubmitting
                ? "bg-gray-500 cursor-wait"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isConfirmed ? "Confirmado" : isSubmitting ? "Confirmando" : "Confirmar minha presença"}
          </button>
        </form>
      </div>
    </div>
  );
}
