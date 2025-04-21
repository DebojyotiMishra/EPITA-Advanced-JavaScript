import { Routes, Route } from 'react-router-dom'
import { CssBaseline, Container } from '@mui/material'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProductForm from './pages/ProductForm'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/products/new"
            element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/products/:id/edit"
            element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
    </>
  )
}

export default App 