import { BrowserRouter, Routes, Route } from 'react-router-dom' 

import { AuthProvider } from './contexts/AuthContext'

import Theme from './components/Theme'
import Layout from './components/Layout'
import RequireAuth from './components/RequireAuth'

import Home from './pages/Home'
import Profile from './pages/Profile'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Theme>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} /> 
              <Route 
                path="profile" 
                element={<RequireAuth><Profile /></RequireAuth>} 
              />
            </Route>
          </Routes>
        </Theme>
      </AuthProvider>
    </BrowserRouter>
  )
}
