import {
  ReactNode,
  createContext,
  useState,
  useReducer,
  useEffect,
} from 'react'
import { Cycle, CyclesState, cyclesReducer } from '../reducers/cycles/reducer'
import {
  ActionTypes,
  addNewCycleAction,
  interruptCurrentCycleAction,
} from '../reducers/cycles/actions'
import wavUrl from '../assets/bell.wav'

interface CyclesContextType {
  activeCycle: Cycle | undefined
  cyclesState: CyclesState
  amountSecondsPassed: number
  setCycles2: (newCycle: Cycle) => void
  interruptCycle: () => void
  nullActiveCycleId: () => void
  minutesAmount: string
  secondsAmount: string
  deleteCycle: (cycleIndex: string) => void
  purgeCycles: () => void
}
export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storageState = localStorage.getItem(
        '@ignite-timer:cyclesState-1.0.0',
      )
      if (storageState) return JSON.parse(storageState)
      else return initialState
    },
  )
  // useState<Cycle[]>([])

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cyclesState-1.0.0', stateJSON)
  }, [cyclesState])
  console.log(cyclesState)
  const activeCycle = cyclesState.cycles.find(
    (x: Cycle) =>
      // x.id === cyclesState.activeCycleId &&
      !x.interruptedDate &&
      new Date().getTime() <=
        new Date(Number.parseInt(x.id)).getTime() + x.minutesAmount * 60 * 1000,
  )
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle)
      return (
        (new Date().getTime() -
          new Date(Number.parseInt(activeCycle.id)).getTime()) /
        1000
      )
    else return 0
  })
  console.log(activeCycle)
  /* function setSecondsPassed(value: number) {
    setAmountSecondsPassed(value)
  } */
  function setCycles2(newCycle: Cycle) {
    // setCycles((state) => [...state, newCycle])
    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function nullActiveCycleId() {
    dispatch({ type: ActionTypes.NULL_CYCLE_ID, payload: null })
  }
  function interruptCycle() {
    /* setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    ) */
    dispatch(interruptCurrentCycleAction())
  }
  function deleteCycle(cycleId: string) {
    dispatch({ type: ActionTypes.DELETE_CYCLE, payload: null, cycleId })
  }
  function purgeCycles() {
    dispatch({ type: ActionTypes.PURGE_CYCLES, payload: null })
  }
  const audio = new Audio(wavUrl)
  audio.loop = false
  if (!!cyclesState.activeCycleId && !activeCycle) {
    audio.play()
    nullActiveCycleId()
  }
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
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
    <CyclesContext.Provider
      value={{
        activeCycle,
        cyclesState,
        amountSecondsPassed,
        setCycles2,
        interruptCycle,
        nullActiveCycleId,
        minutesAmount,
        secondsAmount,
        deleteCycle,
        purgeCycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
