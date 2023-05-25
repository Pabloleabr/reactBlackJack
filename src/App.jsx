import './App.css'
import Card from './templates/card.jsx'
import { PALOS } from './constants.js'
import { Mazo, Hand } from './logic'
import { useState } from 'react'

function App() {
  const [mazo, setMazo ]= useState(new Mazo())
  const [playerHand, setPlayerHandState] = useState(new Hand("player", []))

  const deckDraw = (hand) => {
    const newMazo = new Mazo(mazo.cards)
    hand.add(newMazo.draw())
    const newHand = new Hand(hand.name, hand.cards)
    setPlayerHandState(newHand);
    setMazo(newMazo)
    console.log(newHand.sum());
  }

  const handdleDeckClick = () => {
    deckDraw(playerHand)
  }

  return (
      <main className='flex flex-col items-center justify-start m-8'>
        <h1 className='text-4xl m-4'> Black Jack</h1>
        <div className='flex flex-col justify-between blacktable bg-green-600 rounded'>
          <div className='flex justify-center p-4'>
          <Card number={1} suit={PALOS.pica}></Card>

          </div>
          <div className='ml-6' >
            <button onClick={handdleDeckClick}>
              <Card number={0} suit={PALOS.corazon} flipped={false}></Card>
            </button>
          </div>
          <div className='flex justify-center p-4'>
          <div className='flex justify-center gap-1'>
            {playerHand.cards.map((card) => {
              return <Card key={card.number + card.suit} number={card.number} suit={card.suit}></Card>
            })}
          </div>

          </div>
        </div>
      </main>
  )
}

export default App
