
import './../App.css'
import { NUMTOLETTER } from '../constants'
import CardBack from './cardback'
import CardFront from './cardFront'
import cardbackimg from "/src/assets/cardBack.jpg"
// eslint-disable-next-line react/prop-types
function Card({number, suit, flipped = true}) {

    const value = NUMTOLETTER[number] ? NUMTOLETTER[number] : number 
    
    return (
        <>
            {flipped ? <CardFront number={value} suit={suit}></CardFront> : <CardBack src={cardbackimg} ></CardBack>}

        </>
    )
}

export default Card
