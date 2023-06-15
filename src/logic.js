import { PALOS } from "./constants"

export class Mazo{

    constructor(mazo) {
        if (typeof mazo == "object"){
            this.cards = [...mazo]
        } else {
            this.reset()
        }
        this.count = 0
        
    }

    /**
     * It shuffles the deck and returns it
     * @returns {Array} The shuffled Deck.
     */
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
    /**
     * Removes a card from the deck and returns it.
     * @returns {Card} 
     */
    draw(flip = false) {
        let cardDrawn = this.cards.pop()
        if (flip) {
            cardDrawn.flipped = false
        }
        this.changeCount(cardDrawn)
        return cardDrawn
    }
    /**
     * resets the deck of cards and shuffles it.
     */
    reset() {
        this.cards = Array()
        for (const palo in PALOS) {
            for (let num = 1; num <= 13; num++) {
                this.cards.push(new Card(num, palo))
            }
        }
        this.shuffle()
    }
    /**
    * @param {Card} card the card being added to the count
    */
    changeCount(card){
        /**
         * 2-6 = +1
         * 7-9 = 0
         * 10-Ace= -1
         */
        if (!card.flipped) {
            return
        }
        if(card.number > 1 & card.number <7){
            this.count += 1
        }else if(card.number >= 10 | card.number == 1){
            this.count -=1
        }
    }

}

/**
 * @param {String} playerName Player name.
 * @param {Array[Card]} cards An array formed by card objects.
 */
export class Hand{
    constructor(playerName, cards){
        this.cards = [...cards]
        this.name = playerName
    }

    add(card) {
        this.cards.push(card)
        return this
    }

    /**
     * 
     * @returns {int} The sum of the cards in the hand applying BJ rules 
     */
    sum() {        
        let Sum = this.cards.reduce((a, b) => a + (b.number > 10 ? 10 : b.number), 0)

        let aces = 0
        for (const card of this.cards) {
            if(card.number == 1) {
                aces++
            }
        }
        for(let i=0; i < aces; i++){
            if(Sum < 12){
                Sum += 10 //because the 1 will count as a 11
            }
        }
        return Sum
        
    }

    /**
     * @param {Hand} house the other hand that you want to compare with
     * 
     * @returns {boolean} true if the player wins false if the house wins.
     */
    checkWinner(house) {
        const houseSum = house.sum()
        const playerSum = this.sum()
        if(playerSum < 22 && (houseSum < playerSum || houseSum > 21)){
            return true
        }
        return false
    }

    flipAll () {
        for (const card of this.cards) {
            card.flipped = true
        }
        return this.cards
    }

    clear() {
        this.cards = []
    }
}

export class Card{
    constructor(number, suit, flipped = true){
        this.number = number
        this.suit = suit
        this.flipped = flipped
    }
}