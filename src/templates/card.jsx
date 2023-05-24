
import './../App.css'
import { NUMTOLETTER } from '../constants'
import { useState } from 'react'
import CardBack from './cardback'
import CardFront from './cardFront'

// eslint-disable-next-line react/prop-types
function Card({number, suit, flipped = true}) {
    const [flippedState, setflippedState] = useState(flipped)

    const value = NUMTOLETTER[number] ? NUMTOLETTER[number] : number 
    const handleClick = () => {
        setflippedState(!flippedState)
    }


    return (
        <>
            {flippedState ? <CardFront number={value} suit={suit}></CardFront> : <CardBack src="/src/assets/cardBack.jpg" ></CardBack>}

        </>
    )
}

export default Card
