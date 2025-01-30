import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ModalProps } from './modal'

export interface GiftProps {
    id: number
    title: string
    price?: number
    description?: string
    image?: string
    onClick?: (id: number) => void
}

export const Gift: React.FC<GiftProps> = ({
    id,
    title,
    price,
    image,
    onClick,
}) => {
    const selectGift = () => {
        if (onClick) {
            onClick(id)
        }
    }

    return <div className="gift border-solid border-2 border-white cursor-pointer hover:opacity-75 hover:shadow-xl bg-white shadow-md">
        { image && <Image src={image} alt={title} width={300} height={300} onClick={selectGift} draggable={false}/> }
        <h1 className="grid grid-col-2 text-black">
            <span className="text-casamento font-bold">{title}</span>
            { price && <span className="text-cyan font-bold">R$ {price}</span> }
        </h1>
    </div>

}

export const GiftModal: React.FC<GiftProps & ModalProps> = ({
    description,
    title,
    price,
    image,
    onClose,
}) => {
    const textToCopy = '00020126580014BR.GOV.BCB.PIX0136a594e291-3fa5-4b1d-b404-8a75b1498b3c5204000053039865802BR5922Alice Medeiros Reimann6009SAO PAULO62140510KfKFMUdIds630474C8';
    const [copied, setCopied] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose()
            }
        }

        window.addEventListener('keydown', handleEscape)
        window.addEventListener('mousedown', handleClickOutside)
        return () => {
            window.removeEventListener('keydown', handleEscape)
            window.removeEventListener('mousedown', handleClickOutside)
        }
    }, [onClose])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="gift-modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
            <div ref={modalRef} className="gift-modal-content bg-white relative flex flex-col md:flex-row text-black">
                <div className="flex-shrink-0 md:w-2/3 lg:w-2/3">
                    {image && (
                        <div className="">
                            <Image
                                src={image}
                                alt={title}
                                width={1000}
                                height={1000}
                                draggable={false}
                                className="w-full h-auto"
                            />
                        </div>
                    )}
                    <p className="text-center md:text-2xl">
                        <span className="font-bold text-casamento">{title}</span> - {description}
                    </p>
                </div>

                <div className="mt-4 p-4 md:mt-0 md:ml-4 md:w-1/3 lg:w-1/3">
                    <div className='flex flex-col items-center p-2'>
                        { price && <p className="text-3xl text-casamento">R$ {price?.toFixed(2)}</p> }
                        <p className="font-extrabold">Código PIX para contribuir</p>
                        <Image
                            src="/qr-code.jpg"
                            alt="QR Code"
                            width={300}
                            height={300}
                            draggable={false}
                            className="mt-2 hidden md:block"
                        />

                        <div
                            className="relative mt-2 p-6 pt-8 border border-gray-400 rounded text-center cursor-pointer max-w-xs overflow-hidden break-words"
                            onClick={copyToClipboard}
                        >
                            {textToCopy}
                            <button className="absolute top-0 right-0 font-bold text-white bg-black bg-opacity-50 p-1 rounded">
                                <svg className="w-3.5 h-3.5 mr-2 inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z"></path>
                                    <path d="M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z"></path>
                                </svg>
                                { copied ?
                                    <span>Copiado</span> :
                                    <span>Copiar</span>
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <button
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded"
                    onClick={onClose}
                >
                    ✕
                </button>
            </div>
        </div>
    );
}