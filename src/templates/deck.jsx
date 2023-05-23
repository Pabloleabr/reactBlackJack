import { Mazo } from './../logic'
import CardBack from './cardback';
const mazo = new Mazo()
console.log(mazo.cards);

export function Deck() {

    return (
        <div>
            <CardBack src="/src/assets/cardBack.jpg" onClick={mazo.draw()}></CardBack>
        </div>
    )
}