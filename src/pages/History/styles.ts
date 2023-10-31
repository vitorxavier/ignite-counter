import styled from 'styled-components'
import { Trash } from 'phosphor-react'
export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
    -webkit-touch-callout: default; /* iOS Safari */
    -webkit-user-select: text; /* Safari */
    -khtml-user-select: default; /* Konqueror HTML */
    -moz-user-select: text; /* Old versions of Firefox */
    -ms-user-select: text; /* Internet Explorer/Edge */
    user-select: text; /* Non-prefixed version, currently
                            supported by Chrome, Edge, Opera and Firefox */
    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6rem;
      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }
      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6rem;
      &:first-child {
        padding-left: 1.5rem;
        width: 50%;
      }
      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }

  .disabled-trash {
    scale: 1 !important;
    transition-property: none;
    transition-duration: none;
    &:hover {
      cursor: auto !important;
      border: 0 !important;
      scale: 1 !important;
    }
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;
`
export const HeaderTrash = styled(Trash)`
  scale: 1;
  transition-property: all;
  transition-duration: 150ms;
  &:hover {
    cursor: pointer;

    border-radius: 25%;
    scale: 1.5;
  }
`
export const RowTrash = styled(Trash)`
  scale: 1;
  transition-property: all;
  transition-duration: 150ms;
  &:hover {
    cursor: pointer;

    border-radius: 25%;
    scale: 1.5;
  }
`

const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
  }
`
