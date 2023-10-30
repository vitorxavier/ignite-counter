import { Play, HandPalm } from 'phosphor-react'
import { useState, useEffect, createContext } from 'react'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import wavUrl from '../../assets/bell.wav'
import { NewCycleForm } from './Components/NewCycleForm'
import { Countdown } from './Components/Countdown'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  interruptedDate?: Date
}
interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
}
export const CyclesContext = createContext({} as CyclesContextType)
export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const audio = new Audio(wavUrl)
  audio.loop = false
  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      minutesAmount: data.minutesAmount,
      task: data.task,
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
    // reset()
  }

  const activeCycle = cycles.find(
    (x) =>
      x.id === activeCycleId &&
      !x.interruptedDate &&
      new Date().getTime() <=
        new Date(Number.parseInt(x.id)).getTime() + x.minutesAmount * 60 * 1000,
  )
  if (!!activeCycleId && !activeCycle) {
    audio.play()
    setActiveCycleId(null)
  }
  function handleInterruptCycle() {
    setActiveCycleId(null)
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    reset()
  }
  console.log(cycles)

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = String(Math.floor(currentSeconds / 60)).padStart(2, '0')
  const secondsAmount = String(
    Math.min(Math.round(currentSeconds % 60), 59),
  ).padStart(2, '0')
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesAmount}:${secondsAmount} ${activeCycle.task}`
    } else {
      document.title = 'Ignite Timer'
    }
  }, [minutesAmount, secondsAmount, activeCycle])
  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <CyclesContext.Provider value={{ activeCycle, activeCycleId }}>
        <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
          <NewCycleForm />
          <Countdown />
          {activeCycle ? (
            <StopCountdownButton type="button" onClick={handleInterruptCycle}>
              <HandPalm size={24} /> Interromper
            </StopCountdownButton>
          ) : (
            <StartCountdownButton disabled={isSubmitDisabled} type="submit">
              <Play size={24} /> Começar
            </StartCountdownButton>
          )}
        </form>
      </CyclesContext.Provider>
    </HomeContainer>
  )
}
