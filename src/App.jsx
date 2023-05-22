import './App.css'
import Card from './templates/card.jsx'
import { PALOS } from './constants.js'

function App() {

  return (
    <>
      <main className='flex flex-col items-center justify-start m-8'>
        <h1 className='text-4xl m-4'> Black Jack</h1>
        <div className='blacktable bg-green-600 rounded'>
          <div className='flex justify-center p-4'>
          <Card number={1} suit={PALOS.pica}></Card>

          </div>
        </div>
      </main>
    </>
  )
}

export default App
