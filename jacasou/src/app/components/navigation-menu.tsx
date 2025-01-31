'use client';

import { useSelector } from "react-redux";
import { RootState } from "../store";

const NavigationMenu: React.FC = () => {
    const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
    if (isModalOpen) return null;
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-casamento py-2 md:text-2xl font-heybrights">
            <div className="flex justify-center items-center">
                <div className="text-white grid auto-cols-max grid-flow-col md:gap-20 gap-5 px-5">
                    <a className="hover:underline underline-offset-8" href="#lista-de-presentes">Presentes</a>
                    <a className="hover:underline underline-offset-8" href="#rsvp">RSVP</a>
                    <a className="hover:underline underline-offset-8" href="#info">Mapa</a>
                    <a className="hover:underline underline-offset-8" href="#info">Dress code</a>
                </div>
            </div>
        </nav>
    );
};

export default NavigationMenu;