
import './../App.css'
import { useState } from 'react'
import CardBack from './cardback'
import CardFront from './cardFront'

// eslint-disable-next-line react/prop-types
function Card({number, suit, flipped = false}) {
    const [flippedState, setflippedState] = useState(flipped)

    const handleClick = () => {
        setflippedState(!flippedState)
    }
    return (
        <>
            {flippedState ? <CardFront number={number} suit={suit}></CardFront> : <CardBack src="/src/assets/cardBack.jpg" ></CardBack>}

        </>
    )
}

export default Card
