import styled from 'styled-components'
import { Outlet, Link } from 'react-router-dom'

import UserManager from './UserManager'
import logo from '../assets/logo.png'

const StyledLayout = styled.div`
  min-width: 18rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  & > header {
    background-color: ${({ theme }) => theme.colors.headerBackground};
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    & img {
      height: 3rem;
    }
  }

  & > main {
    flex-grow: 1;
    background-color: ${({ theme }) => theme.colors.pageBackground};
  }

  & > footer {
    background-color: ${({ theme }) => theme.colors.footerBackground};
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`

export default function Layout() {
  return (
    <StyledLayout>
      <header>
        <Link to="/">
          <img src={logo} alt="Pokédex" />
        </Link>
        <UserManager />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <span>Pokédex</span>
        <span>desenvolvido por Trainee Legal</span>
      </footer>
    </StyledLayout>
  )
}
