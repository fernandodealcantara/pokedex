import styled from 'styled-components'

import { cardBgColor } from '../services/functions'
import { useAuth } from '../contexts/AuthContext'
import { postUserFavPokemon, delFromUserFavPokemons } from '../services/api'

const StyledPokemonCard = styled.div`
  border: 1px solid ${({ bgColor }) => bgColor};
  border-radius: 5px;
  overflow: hidden;

  & > button {
    display: block;
    background-color: ${({ bgColor }) => bgColor};
    width: 100%;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    transition: background-color 0.3s;
  }

  & > button:hover {
    background-color: gray;
    color: white;
  }

  & > img {
    height: 10rem;
  }

  & > p {
    text-align: center;
    background-color: ${({ bgColor }) => bgColor};
    padding: 0.5rem;
  }
`

function pokemonIsFavorite(favPokemons, pokemon) {
  return !!favPokemons.find(favPokemon => favPokemon.name === pokemon.name)
}

export default function PokemonCard({ pokemon }) {
  const { user, updateUserPokemons } = useAuth()

  const username = user?.userInfo?.username

  const isFavorite = pokemonIsFavorite(user?.pokemons || [], pokemon)

  const addPokemon = async () => {
    const { pokemons, error } = await postUserFavPokemon(username, pokemon.name)
    if (error) return
    updateUserPokemons(pokemons)
  }

  const delPokemon = async () => {
    const { pokemons, error } = await delFromUserFavPokemons(username, pokemon.name)
    if (error) return
    updateUserPokemons(pokemons)
  }

  return (
    <StyledPokemonCard bgColor={cardBgColor(pokemon.kind.split(';')[0])}>
      <p>{pokemon.name}</p>
      <img src={pokemon.image_url} alt={pokemon.name} />
      {user && (
        <button type="button" onClick={isFavorite ? delPokemon : addPokemon}>
          {isFavorite ? 'Desfavoritar':'Favoritar' }
        </button>
      )}
    </StyledPokemonCard>
  )
}
