// colocar toda a lógica aqui só por praticidade
import axios from 'axios'

// URL da API idealmente deve estar em uma variavel de ambiente
const API = axios.create({ baseURL: 'https://pokedex20201.herokuapp.com' })

// Pega os pokemons de alguma pagina
export async function getPokemons(page=0) {
  try {
    const { data } = await API.get(`/pokemons?page=${page}`)   

    return { pokemons: data }
  } catch(err) {
    return { error: "Error trying to get pokemons" }
  }
}

export async function getPokemon(pokemon) {
  try {
    const { data } = await API.get(`/pokemons/${pokemon}`)

    return { pokemon: data }
  } catch(err) {
    return { error: "Error trying to get pokemon" }
  }
}

export async function postUser(username) {
  try {
    const { data } = await API.post("/users", { username })

    return { user: data, pokemons: [] }
  } catch (err) {
    return { error: "Error trying to create user." }
  }
}

// Pega o usuario, se retornar erro tenta cria-lo
export async function getUser(username) {
  try {
    const { data } = await API.get(`/users/${username}`)

    return data
  } catch(err) {
    const { user, pokemons, error } = await postUser(username)

    if (error) return { error: "Error trying to get/create user" }
    return { user, pokemons }
  }
}

export async function postUserFavPokemon(user, pokemon) {
  try {
    const { data } = await API.post(`/users/${user}/starred/${pokemon}`)
    return { ...data } // retorna { user, pokemons }
  } catch (error) {
    return { error: "Error trying to post favorite pokemon." }
  }
}

export async function delFromUserFavPokemons(user, pokemon) {
  try {
    const { data } = await API.delete(`/users/${user}/starred/${pokemon}`)

    return { ...data } // retorna { user, pokemons }
  } catch (error) {
    return { error: "Error trying to delete favorite pokemon." }
  }
}

