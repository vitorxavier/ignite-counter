import { useFormContext } from 'react-hook-form'
import { useContext } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

export function NewCycleForm() {
  const { activeCycle, cyclesState } = useContext(CyclesContext)
  const { register } = useFormContext()
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        disabled={!!activeCycle}
        placeholder={
          activeCycle ? activeCycle.task : 'Dê um nome para o seu projeto'
        }
        {...register('task')}
      />
      <datalist id="task-suggestions">
        {[...new Set(cyclesState.cycles.map((item) => item.task))].map(
          (item) => (
            <option value={item} key={item}></option>
          ),
        )}
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder={activeCycle ? activeCycle.minutesAmount.toString() : '00'}
        step={1}
        min={1}
        disabled={!!activeCycle}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
