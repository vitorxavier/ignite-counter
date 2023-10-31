import { ActionTypes } from './actions'
import { produce } from 'immer'
export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  interruptedDate?: Date
}
export interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}
export function cyclesReducer(
  state: CyclesState,
  action: { payload: Cycle | null; type: string; cycleId?: string },
): CyclesState {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      /* return {
        cycles: action.payload
          ? [...state.cycles, action.payload]
          : state.cycles,
        activeCycleId: action.payload ? action.payload.id : null,
      } */
      return produce(state, (draft) => {
        if (action.payload) {
          draft.cycles.push(action.payload)
          draft.activeCycleId = action.payload.id
        }
      })
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      /* return {
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId)
            return { ...cycle, interruptedDate: new Date() }
          else {
            return cycle
          }
        }),
        activeCycleId: null,
      } */
      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[
          state.cycles.findIndex((c) => c.id === state.activeCycleId)
        ].interruptedDate = new Date()
      })
    case ActionTypes.NULL_CYCLE_ID:
      return produce(state, (draft) => {
        draft.activeCycleId = null
      })
    case ActionTypes.DELETE_CYCLE:
      return produce(state, (draft) => {
        if (action.cycleId === state.activeCycleId) draft.activeCycleId = null
        if (action.cycleId)
          draft.cycles.splice(
            state.cycles.map((x) => x.id).indexOf(action.cycleId),
            1,
          )
      })

    case ActionTypes.PURGE_CYCLES:
      return produce(state, (draft) => {
        draft.cycles = []
        draft.activeCycleId = null
      })

    default:
      return { cycles: [], activeCycleId: null }
  }
}
