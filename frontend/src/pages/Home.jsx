import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token')
        const config = token ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        } : {}
        
        const response = await axios.get('https://epita-server-sided-javascript.onrender.com/api/products', config)
        setProducts(response.data)
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token')
          navigate('/login')
        }
        toast.error('Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [navigate])

  if (loading) {
    return (
      <Container>
        <Typography variant="h6" align="center">
          Loading products...
        </Typography>
      </Container>
    )
  }

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Products
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {product.category}
                </Typography>
                <Typography variant="body2" paragraph>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${product.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Stock: {product.stock}
                </Typography>
              </CardContent>
              <CardActions>
                {isAuthenticated && (
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => navigate(`/products/${product._id}/edit`)}
                  >
                    Edit
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home 