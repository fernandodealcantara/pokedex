import { createContext, useContext, useState, useEffect } from 'react'
import { getUser } from '../services/api'

/*
* Esse contexto permite gerenciarmos todo o estado do usuario na nossa aplicação
* podendo ser informações do usuario, login(entrada) ou logout(saida).
* Nesse exemplo, utilizamos o localStorage para persistir o usuario ou seja,
* se ele não deslogar da aplicação, o programa será capaz de recuperar as informações 
* do usuario mesmo que ele feche o navegador
*/

// contexto que irá armazenar as informações do usuario no estado [user, setUser]
// e fornecer funções para podermos manipula-lo, ex: signIn() e signOut()
// a implementação dessas funcionalidades foi feita na função AuthProvider()
const AuthContext = createContext()

// função que nos permite utilizarmos o estado do usuario e tambem
// manipula-lo utilizando as funções signIn() e signOut() implementadas, exemplo:
// import { useAuth } from './AuthContext'
// const { user, signIn, signOut } = useAuth()
// Ao importar essa função e chama-la, você terá acesso as funcionalidades
// que foram passadas para o atributo value no <AuthContext.Provider value={...} />
// podendo assim utilizar o estado do usuario em "user"
// ou manipula-lo utilizando signIn() para logar o usuario
// ou signOut() para deslogar o usuario
export function useAuth(){
  return useContext(AuthContext)
}

// função que armazena o estado do usuario em [user, setUser]
// e implementa as funções signIn(), signOut() etc, para manipularmos o usuario,
// o parametro "children" é basicamente todo o codigo que terá acesso
// ao estado do usuario e se ele não fosse utilizado aqui
// não seriamos capazes de renderizar os componentes que vão estar 
// dentro do AuthProvider, exemplo:
// <AuthProvider>
//   <OutrosComponentes/> ----> { children }
// </AuthProvider>
export function AuthProvider({ children }){
  // estado do usuario vai estar aqui podendo ser:
  // undefined -> informações do usuario não carregaram
  // objeto do usuario -> informações do usuario carregaram e ele está logado
  // false -> informações do usuario carregaram e ele está deslogado
  const [user, setUser] = useState()

  // função para podermos logar o usuario
  // ela recebe as informações para logar o usuario (userInfo) e uma função (callback) 
  // nesse caso userInfo conterá só o nome do usuario
  // e a função de callback será executada após o usuario ser logado
  const signIn = async (userInfo, callback) => {
    // requisita as informações do usuario
    const auth = await getUser(userInfo)
    // se o error existir não foi possivel loga-lo
    if (auth?.error) {
      setUser(false)
      return
    }
    // se der certo, armazenamos o username do usuario no localStorage
    // para podermos recupera-lo automaticamente quando for acessar o site novamente
    localStorage.setItem('username', userInfo)
    // guardamos as informações do usuario no estado user para podermos utiliza-lo
    setUser({ userInfo: auth?.user, pokemons: auth?.pokemons })
    callback() // executamos a função de callback
  }

  // função para podermos deslogar o usuario
  // ela basicamente irá "limpar" o estado 'user' setando para false
  // e irá remover o username do usuario do localStorage para não loga-lo automaticamente
  const signOut = (callback) => {
    setUser(false)
    localStorage.removeItem('username')
    callback()
  }

  // atualiza os pokemons do usuario
  // vai ser utilizada para atualizarmos o usuario quando adicionarmos ou deletarmos
  // pokemons do usuario
  const updateUserPokemons = (pokemons) => {
    setUser({ ...user, pokemons})
  }

  // essa função passada para o useEffect()
  // irá ser executada toda vez que o programa for renderizado pela primeira vez
  // no navegador, ex: abrir a pagina em uma nova guia ou atualizar a pagina
  // pois são os unicos momentos em que "montamos" esse contexto.
  // 
  // a função passada para o useEffect() basicamente recupera o estado do usuario
  // se ele ja tiver logado anteriormente, ele irá pegar o username armazenado
  // no local storage e loga-lo novamente automaticamente
  // se não, irá simplesmente setar o "user" para false
  useEffect(() => {
    const userName = localStorage.getItem('username')

    if (userName) {
      signIn(userName, () => {})
    } else {
      setUser(false)
    }
  }, [])

  // no atributo value passamos tudo que queremos tornar disponivel para os 
  // componentes filhos por meio do useAuth() no caso, user, sigIn, signOut
  // e updateUserPokemons
  return (
    <AuthContext.Provider value={{user, signIn, signOut, updateUserPokemons}}>
      {children}
    </AuthContext.Provider>
  )
}
