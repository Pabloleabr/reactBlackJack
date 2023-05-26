import './App.css'
import { useState } from 'react'
import Card from './templates/card.jsx'
import { PALOS } from './constants.js'
import { Mazo, Hand } from './logic'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [mazo, setMazo ]= useState(new Mazo())
  const [playerHand, setPlayerHandState] = useState(new Hand("player", []))
  const [houseHand, setHouseHandState] = useState(new Hand("house", []))
  
  
  const gameStart = () => {
    //house draws
    houseHand.add(mazo.draw())
    const faceDown = mazo.draw()
    faceDown.flipped = false
    houseHand.add(faceDown)
    //player draws
    playerHand.add(mazo.draw())
    playerHand.add(mazo.draw())

    //game start
    setGameStarted(!gameStarted)
  }
  
    const deckDraw = (hand, setState) => {
      const newMazo = new Mazo(mazo.cards)
      hand.add(newMazo.draw())
      const newHand = new Hand(hand.name, hand.cards)
      setState(newHand);
      setMazo(newMazo)
      console.log(newMazo.cards);
      if(playerHand.sum() > 21){
        console.log("loose");
      }
    }
  
    const handdleDeckClick = () => {
      deckDraw(playerHand, setPlayerHandState)
    }
    
    const checkWinner = () => {
      
      while(houseHand.sum() < 16 || houseHand.sum() < playerHand.sum()){
        houseHand.add(mazo.draw())
      }
      houseHand.flipAll()
      setHouseHandState(new Hand(houseHand.name, houseHand.cards))
      console.log(houseHand);
      if (playerHand.checkWinner(houseHand)) {
        console.log("you win");
      } else {
        console.log("you loose");
      }
    }
  return (
      <main className='flex flex-col items-center justify-start m-8'>
        <h1 className='text-4xl m-4'> Black Jack</h1>
        <div className='flex flex-col justify-between blacktable bg-green-600 rounded'>
          {
            gameStarted ? 
          <>
          <div className='flex justify-center p-4'>
              <div className='flex justify-center gap-1 h-card'>
              {
              houseHand.cards.map((card) => {
                  return <Card key={card.number + card.suit} number={card.number} suit={card.suit} flipped={card.flipped}></Card>
              })}
              </div>
          </div>
          <div className='ml-6 flex justify-center' >
              <button onClick={handdleDeckClick}>
              <Card number={0} suit={PALOS.corazon} flipped={false}></Card>
              </button>

              <button className=' text-2xl ml-40' onClick={checkWinner}> Stay</button>
          </div>
          <div className='flex justify-center p-4 '>
              <div className='flex justify-center gap-1 h-card'>
              {playerHand.cards.map((card) => {
                return <Card key={card.number + card.suit} number={card.number} suit={card.suit}></Card>
              })}
              </div>

          </div>
          </>
          : 
          <div className='flex justify-center align-middle h-80 items-center'>
            <button onClick={gameStart} className=' absolute bg-zinc-900 rounded p-2 text-4xl'> Start </button>
          </div>
          }
        </div>
      </main>
  )
}

export default App
