import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  price: yup
    .number()
    .positive('Price must be positive')
    .required('Price is required'),
  stock: yup
    .number()
    .integer('Stock must be an integer')
    .min(0, 'Stock cannot be negative')
    .required('Stock is required'),
  category: yup.string().required('Category is required'),
})

const ProductForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const isEdit = !!id

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        if (isEdit) {
          const response = await axios.put(
            `https://epita-server-sided-javascript.onrender.com/api/products/${id}`,
            values,
            config
          )
          toast.success(response.data.message || 'Product updated successfully')
        } else {
          const response = await axios.post(
            'https://epita-server-sided-javascript.onrender.com/api/products',
            values,
            config
          )
          toast.success(response.data.message || 'Product created successfully')
        }
        navigate('/')
      } catch (error) {
        console.error('Error:', error)
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          toast.error(error.response.data.message || 'Operation failed')
        } else if (error.request) {
          // The request was made but no response was received
          toast.error('No response from server')
        } else {
          // Something happened in setting up the request that triggered an Error
          toast.error('Error setting up request')
        }
      } finally {
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.get(
            `https://epita-server-sided-javascript.onrender.com/api/products/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          formik.setValues(response.data)
        } catch (error) {
          toast.error('Failed to fetch product')
          navigate('/')
        }
      }
      fetchProduct()
    }
  }, [id])

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 6 }}>
          {isEdit ? 'Edit Product' : 'Create Product'}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Product Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="stock"
                name="stock"
                label="Stock"
                type="number"
                value={formik.values.stock}
                onChange={formik.handleChange}
                error={formik.touched.stock && Boolean(formik.errors.stock)}
                helperText={formik.touched.stock && formik.errors.stock}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="category"
                name="category"
                label="Category"
                value={formik.values.category}
                onChange={formik.handleChange}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                helperText={formik.touched.category && formik.errors.category}
              />
            </Grid>
          </Grid>
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {loading
                ? isEdit
                  ? 'Updating...'
                  : 'Creating...'
                : isEdit
                ? 'Update Product'
                : 'Create Product'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default ProductForm 