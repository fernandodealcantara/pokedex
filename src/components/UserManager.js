import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useState } from 'react'
import styled from 'styled-components'

import { useAuth } from '../contexts/AuthContext'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`

const StyledUserManager = styled.div`
  --border-color: #0083FC;
  --action-button-color: #FFE600;
  --user-button-color: #fff;

  display: flex;
  flex-wrap: nowrap;

  & > .user {
    box-shadow: 2px 2px 1px var(--border-color);
    background: var(--user-button-color);
    width: 10rem;
    padding: 0.5rem;
    border-radius: 5px 0 0 5px;
    border: 1px solid var(--border-color);
    outline: none;
  }

  & > .action {
    box-shadow: 2px 2px 1px var(--border-color);
    padding: 0.5rem;
    border-radius: 0 5px 5px 0;
    border: 1px solid var(--border-color);
    background: var(--action-button-color);
  }

  & > button {
    cursor: pointer;
  }
`

const LoadingText = styled.h4`
  padding: 0.5rem;
`

export default function UserManager() {
  const [userName, setUserName] = useState("")
  const { user, signIn, signOut } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  const handleSignIn = () => {
    if (userName.length === 0) return
    signIn(userName, () => navigate(from, { replace: true }))
  }

  const handleSignOut = () => {
    signOut(() => signOut(() => navigate("/")))
  }

  if (!user && user !== false) {
    return <LoadingText>Carregando...</LoadingText>
  }

  return (
    <StyledUserManager>
      {user ? (
        <>
          <StyledLink 
            className="user"
            to="/profile"
          >
            {user?.userInfo?.username}
          </StyledLink>
          <button 
            className="action" 
            type="button"
            onClick={handleSignOut}
          >
            Sair
          </button>
        </> 
      ):(
        <>
          <input 
            value={userName}
            onChange={e => setUserName(e.target.value)}
            className="user" 
            type="text" 
            placeholder="Nome de usuário" 
          />
          <button 
            className="action" 
            type="button" 
            onClick={handleSignIn}
          >
            Entrar
          </button> 
        </>
      )}
    </StyledUserManager>
  )
}
