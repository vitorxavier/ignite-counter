import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    box-shadow: none;
    &:focus {
      box-shadow: none;
    }
  }
  nav {
    display: flex;
    gap: 0.5rem;

    a {
      &:focus {
        box-shadow: none;
      }
      width: 3rem;
      height: 3rem;
      display: flex;

      justify-content: center;
      align-items: center;
      color: ${(props) => props.theme['gray-100']};
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      transition-duration: 150ms;
      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['green-700']};
        svg {
          scale: 1.25;
        }
      }
      &.active {
        color: ${(props) => props.theme['green-300']};
        border-bottom: 3px solid ${(props) => props.theme['green-300']};
        svg {
          scale: 1.25;
        }
      }
      svg {
        scale: 1;
        transition-duration: 150ms;
      }
    }
  }
`
