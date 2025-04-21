import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
})

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const response = await axios.post(
          'https://epita-server-sided-javascript.onrender.com/api/users/login',
          values
        )
        localStorage.setItem('token', response.data.token)
        toast.success('Logged in successfully')
        navigate('/')
      } catch (error) {
        toast.error(error.response?.data?.message || 'Login failed')
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
          />
          <Box mt={2}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default Login 