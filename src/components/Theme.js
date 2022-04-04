import { ThemeProvider, createGlobalStyle } from 'styled-components'

const theme = {
  colors: {
    text: '#000000',
    headerBackground: '#B3B1B1',
    contentBackground: '#FFFFFF',
    pageBackground: '#EBEBEB',
    footerBackground: '#B3B1B1',
  },
  fontSizes: {
    small: '1rem',
    medium: '2rem',
    large: '3rem',
  }
}

const GlobalStyle = createGlobalStyle`
  body {
    color: ${({ theme }) => theme.colors.text};
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`

export default function Theme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}
