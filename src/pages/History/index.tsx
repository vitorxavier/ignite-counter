import {
  HeaderTrash,
  HistoryContainer,
  HistoryList,
  RowTrash,
  Status,
} from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
export function History() {
  const { cyclesState, deleteCycle, purgeCycles } = useContext(CyclesContext)
  function confirmPurge() {
    const options = {
      title: 'Tem certeza?',
      message: 'Tem certeza que gostaria de apagar todos os registros?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => purgeCycles(),
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => {},
      afterClose: () => {},
      onClickOutside: () => {},
      onKeypress: () => {},
      onKeypressEscape: () => {},
      overlayClassName: 'overlay-custom-class-name',
    }
    confirmAlert(options)
  }

  function confirmDelete(id: string) {
    const options = {
      title: 'Tem certeza?',
      message: 'Tem certeza que gostaria de apagar este registro?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => deleteCycle(id),
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => {},
      afterClose: () => {},
      onClickOutside: () => {},
      onKeypress: () => {},
      onKeypressEscape: () => {},
      overlayClassName: 'overlay-custom-class-name',
    }
    confirmAlert(options)
  }
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
              <th>
                <HeaderTrash
                  weight="bold"
                  onClick={() => {
                    if (cyclesState.cycles.length > 0) confirmPurge()
                  }}
                  className={
                    cyclesState.cycles.length > 0 ? '' : 'disabled-trash'
                  }
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {cyclesState.cycles
              .slice()
              .sort((a, b) => {
                if (Number.parseInt(a.id) > Number.parseInt(b.id)) return -1
                else if (Number.parseInt(a.id) < Number.parseInt(b.id)) return 1
                else return 0
              }) // Tentei utilizar reverse() mas não surtiu efeito...
              .map((cycle) => (
                <>
                  <tr>
                    <td>{cycle.task}</td>
                    <td>
                      {cycle.minutesAmount} minuto
                      {cycle.minutesAmount > 1 ? 's' : ''}
                    </td>
                    <td>
                      {
                        /* new Date(Number.parseInt(cycle.id))
                        .toISOString()
                        .replace('T', ' ')
                        .replace('Z', '')
              .substring(0, 16) */
                        formatDistanceToNow(
                          new Date(Number.parseInt(cycle.id)),
                          {
                            addSuffix: true,
                            locale: ptBR,
                          },
                        )
                      }
                    </td>
                    <td>
                      {
                        // Se há data de interrupção considero o ciclo como interrompido
                        cycle.interruptedDate ? (
                          <Status statusColor="red">Interrompido</Status>
                        ) : new Date().getTime() >=
                          new Date(Number.parseInt(cycle.id)).getTime() +
                            cycle.minutesAmount * 60000 ? (
                          // Se o horário atual do sistema é superior ao horário de criação do ciclo + o tempo configurado considero que o ciclo foi concluído
                          <Status statusColor="green">Concluído</Status>
                        ) : (
                          // Do contrário considero que o ciclo está em andamento
                          <Status statusColor="yellow">Em andamento</Status>
                        )
                      }
                    </td>
                    <td>
                      <RowTrash
                        onClick={() => {
                          confirmDelete(cycle.id)
                        }}
                      />
                    </td>
                  </tr>
                </>
              ))}
            {/* <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <Status statusColor="yellow">Concluído</Status>
              </td> */}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
