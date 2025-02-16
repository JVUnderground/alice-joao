'use client'
import { useEffect, useState } from "react"

export interface TimerProps {
    date: Date
}

export const WeddingTimer: React.FC<TimerProps> = ({ date }) => {
    const [timeLeft, setTimeLeft] = useState<DateDifference>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(date))
        }, 1000)

        return () => clearInterval(timer)
    }, [date])

    return (
        <div className="flex justify-center items-center h-full p-6 mx-4 bg-glass shadow-lg rounded-lg">
            <div className="text-casamento text-center">
                <h1 className="text-xl pb-3">Sexta Feira, 16 de Maio de 2025</h1>
                <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold">{timeLeft.days}</h1>
                        <h2>Dias</h2>
                    </div>
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold">{timeLeft.hours}</h1>
                        <h2>Horas</h2>
                    </div>
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold">{timeLeft.minutes}</h1>
                        <h2>Minutos</h2>
                    </div>
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold">{timeLeft.seconds}</h1>
                        <h2>Segundos</h2>
                    </div>
                </div>
            </div>
        </div>


    )
}

interface DateDifference {
    days: number
    hours: number
    minutes: number
    seconds: number
}

function calculateTimeLeft(weddingDate: Date): DateDifference {
    const difference = +new Date(weddingDate) - +new Date();
    let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    }
    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    }

    return timeLeft;
}
