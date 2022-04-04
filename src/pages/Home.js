import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import PokemonCard from '../components/PokemonCard'
import Loader from '../components/Loader'

import useOnScreen from '../hooks/useOnScreen'

import { getPokemons } from '../services/api'

const StyledHome = styled.div`
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

export default function Home() {
  const [pokemonsArr, setPokemonsArr] = useState([])
  const [nextPage, setNextPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Ref para o elemento que a gente quer detectar sempre que estiver na area visivel (root) 
  const ref = useRef()
  
  // se 50px do elemento em ref aparecer na tela onScreen vira true se não, false
  const onScreen = useOnScreen(ref, '-50px')

  const fetchPokemons = async () => {
    const { pokemons, error } = await getPokemons(nextPage)
    if (error) {
      setIsLoading(false)
      return
    } 

    setPokemonsArr([...pokemonsArr, ...pokemons.data])
    setNextPage(pokemons?.next_page)
    setIsLoading(false)
  }

  useEffect(() => {
    if (onScreen && nextPage !== null && !isLoading) {
      setIsLoading(true)
      fetchPokemons()
    }
  }, [onScreen])

  return (
    <StyledHome>
      <div className="cards">
        {pokemonsArr.map((pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}
      </div>
      <Loader ref={ref} isLoading={isLoading} />
    </StyledHome>
  )
}
