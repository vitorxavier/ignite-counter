import { CyclesContext } from '../..'
import { CountdownContainer } from './styles'
import { useState, useEffect, useContext } from 'react'

export function Countdown() {
  const { activeCycle } = useContext(CyclesContext)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(
          (new Date().getTime() -
            new Date(Number.parseInt(activeCycle.id)).getTime()) /
            1000,
        )
      }, 250)
      return () => {
        clearInterval(interval)
      }
    }
  }, [activeCycle])
  return (
    <CountdownContainer>
      <span>{minutesAmount[0]}</span>
      <span>{minutesAmount[1]}</span>
      <Separator>:</Separator>
      <span>{secondsAmount[0]}</span>
      <span>{secondsAmount[1]}</span>
    </CountdownContainer>
  )
}
