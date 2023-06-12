import './App.css'
import { useState, useEffect } from 'react'
import Card from './templates/card.jsx'
import { PALOS } from './constants.js'
import { Mazo, Hand } from './logic'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [mazo, setMazo ]= useState(new Mazo())
  const [playerHand, setPlayerHandState] = useState(new Hand("player", []))
  const [houseHand, setHouseHandState] = useState(new Hand("house", []))
  const [playingState, setPlayingState] = useState(false)
  const [NumWonGames, setNumWonGames] = useState(0)
  const [NumLostGames, setNumLostGames] = useState(0)
  const [NumCards, setNumCards] = useState(mazo.cards.length)
  const [winState, setWinState] = useState(true)

  
  const gameStart = () => {
    //house draws
    houseHand.add(mazo.draw())
    const faceDown = mazo.draw()
    faceDown.flipped = false
    houseHand.add(faceDown)
    setHouseHandState(new Hand(houseHand.name, houseHand.cards))
    //player draws
    playerHand.add(mazo.draw())
    playerHand.add(mazo.draw())
    setPlayerHandState(new Hand(playerHand.name, playerHand.cards))
    setNumCards(mazo.cards.length)

  }
  
    const deckDraw = (hand, setState) => {
      hand.add(mazo.draw())
      const newHand = new Hand(hand.name, hand.cards)
      setState(newHand);
      if(playerHand.sum() > 21){
        checkWinner()
      }
      setNumCards(mazo.cards.length)
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(gameStart, [mazo])
    
    const nextHand = () => {
      playerHand.clear()
      houseHand.clear()
      mazo.cards.length < 20 ? setMazo(new Mazo()) : gameStart()
      setPlayingState(false)
    }
  
    const handdleDeckClick = () => {
      deckDraw(playerHand, setPlayerHandState)
    }
    
    
    const checkWinner = () => {
      const pSum = playerHand.sum() 
      if( pSum <= 21){
        while(houseHand.sum() < 16 || houseHand.sum() < pSum){
          houseHand.add(mazo.draw())
        }
      }
      houseHand.flipAll()
      if (playerHand.checkWinner(houseHand)) {
        setWinState(true)
        setNumWonGames(NumWonGames+1)
      } else {
        setWinState(false)
        setNumLostGames(NumLostGames+1)
      }
      setHouseHandState(new Hand(houseHand.name, houseHand.cards))
      setPlayingState(true)
      setNumCards(mazo.cards.length)
    }
  return (
      <main className='flex flex-col items-center justify-start m-8'>
        <h1 className='text-4xl m-4'> Black Jack</h1>
        <div className='flex flex-col justify-between blacktable bg-green-600 rounded'>
          {
            gameStarted ? //board
          <>
          <div className='flex justify-center p-4'> 
              <div className='flex justify-center gap-1 h-card'>
              { //The houses cards
              houseHand.cards.map((card) => {
                  return <Card key={card.number + card.suit} number={card.number} suit={card.suit} flipped={card.flipped}></Card>
              })}
              </div>
          </div>
          <div className='flex justify-center gap-14 text-2xl' >
            
              <button onClick={handdleDeckClick} disabled={playingState} className={playingState ? "opacity-80" : ""}>
                <Card number={0} suit={PALOS.corazon} flipped={false} > </Card>{NumCards}
              </button>

              <button className={`${playingState ? "text-white" : "text-green-600"}`} onClick={nextHand} disabled={!playingState} >
                You {winState ? "Won" : "Lost"}! <br/> 
                <span className=' animate-pulse'> -&gt; Next Hand &lt;- </span> 
              </button> 

              <button className={` ${playingState ? "opacity-80" : ""}`} onClick={checkWinner} disabled={playingState}> Stay</button>
          </div>
          <div className='flex justify-center p-4 '>
              <div className='flex justify-center gap-1 h-card'>
              {//Your cards
              playerHand.cards.map((card) => {
                return <Card key={card.number + card.suit} number={card.number} suit={card.suit}></Card>
              })
              }
              </div>


          </div>
          </>
          : 
          <div className='flex justify-center align-middle h-80 items-center'>
            <button onClick={() => setGameStarted(true)} className=' absolute bg-zinc-900 rounded p-2 text-4xl'> Start </button>
          </div>
          }
        </div>
        <div id="infoPannel" className='flex'>
          <h3 className='text-xl m-4'>Games Won: {NumWonGames}</h3>
          <h3 className='text-xl m-4'>Games Lost: {NumLostGames}</h3>
        </div>
      </main>
  )
}

export default App
