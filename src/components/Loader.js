import { forwardRef } from 'react'
import styled from 'styled-components'
import Pokeball from '../assets/Pokeball.svg'

const StyledLoader = styled.img`
  height: 3rem;
  animation: rotation 2s ${({ isLoading }) => isLoading ? 'infinite': 0} linear;

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`

function Loader({ isLoading }, ref){
  return (
    <StyledLoader 
      src={Pokeball}
      alt="Pokeball"
      isLoading={isLoading}
      ref={ref}
      className="pokemon-loader"
    />
  )
}

export default forwardRef(Loader)
