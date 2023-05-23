import { PALOS } from "./constants"

export class Mazo{

    constructor() {
        this.reset()
    }

    shuffle() {
        let currentIndex = this.cards.length,  randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [this.cards[currentIndex], this.cards[randomIndex]] = [
            this.cards[randomIndex], this.cards[currentIndex]];
        }
        return this.cards;
    }

    draw () {
        return this.cards.pop()
    }

    reset() {
        this.cards = Array()
        for (const palo in PALOS) {
            for (let num = 1; num <= 13; num++) {
                this.cards.push({palo:palo, num:num})
            }
        }
    }
}


