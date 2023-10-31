import { Cycle } from './reducer'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'add_new_cycle',
  INTERRUPT_CURRENT_CYCLE = 'interrupt_current_cycle',
  NULL_CYCLE_ID = 'null_cycle_id',
  DELETE_CYCLE = 'delete_cycle',
  PURGE_CYCLES = 'purge_cycles',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: newCycle,
  }
}

export function interruptCurrentCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
    payload: null,
  }
}
