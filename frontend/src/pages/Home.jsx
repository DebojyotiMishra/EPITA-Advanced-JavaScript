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

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:3000/api/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setProducts(response.data)
      } catch (error) {
        toast.error('Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

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
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/products/${product._id}/edit`)}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home 