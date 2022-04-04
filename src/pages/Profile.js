import styled from 'styled-components'

import PokemonCard from '../components/PokemonCard'
import Loader from '../components/Loader'

import { useAuth } from '../contexts/AuthContext'

const StyledProfile = styled.div`
  background-color: ${({ theme }) => theme.colors.contentBackground};
  width: 80%;
  margin: 1rem auto;
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  & > .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
`

export default function Profile() {
  const { user } = useAuth()

  return (
    <StyledProfile>
      {user?.pokemons && (
        <div className="cards">
          {user?.pokemons.map((pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}
        </div>
      )}
      <Loader isLoading={!user?.pokemons} />
    </StyledProfile>
  )
}
