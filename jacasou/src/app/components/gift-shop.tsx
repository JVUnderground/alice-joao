'use client'
import React from 'react'
import { Gift, GiftProps, GiftModal } from './gift'

export interface GiftShopProps {
    gifts: GiftProps[]
}

const GiftShop: React.FC<GiftShopProps> = ({
    gifts
}) => {
    const [selectedGift, setSelectedGift] = React.useState<GiftProps | null | undefined>(null);
    const showGiftWithModel = (id: number) => {
        setSelectedGift(
            gifts.find(gift => gift.id === id)
        )
    }
    const closeModal = () => {
        setSelectedGift(null)
    }

    return (
        <>
            <div className="gift-shop grid grid-cols-1 md:grid-cols-3 gap-10">
                { gifts.map(gift => <Gift key={gift.id} {...gift} onClick={showGiftWithModel}/>)}
            </div>
            { selectedGift && <GiftModal {...selectedGift} onClose={closeModal}/> }
        </>

    )

}

export default GiftShop;