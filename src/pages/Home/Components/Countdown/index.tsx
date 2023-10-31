import { CyclesContext } from '../../../../contexts/CyclesContext'
import { CountdownContainer, Separator } from './styles'
import { useContext } from 'react'

export function Countdown() {
  const { minutesAmount, secondsAmount } = useContext(CyclesContext)

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
