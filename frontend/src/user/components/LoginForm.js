import { Box, TextField, Typography, Avatar, Link, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { isEmail } from 'validator';
import { useEffect, useContext } from 'react';

import useAxios from '../../shared/hooks/useAxios';
import AuthContext from '../../shared/context/authContext';
import MyAlert from '../../shared/components/MyAlert';

const LoginForm = (props) => {
  const context = useContext(AuthContext);

  const { fetchData, loading, error, clearError } = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (formData) => {
    clearError();
    const { data } = (await fetchData({ url: '/login', method: 'post', data: formData })) || {};

    //TODO Add alert for success ?
    if (data) context.login({ ...data.user, token: data.token });
  };

  useEffect(() => {
    if (error?.response?.data?.field === 'email')
      setError('email', { type: 'unique', message: error?.response?.data?.message });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <>
      {error.message === 'Network Error' && <MyAlert message={error.message} severity="error" />}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          padding: 4,
          boxShadow: 1,
          borderRadius: 2,
          background: 'white',
        }}
        component="form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          {...register('email', {
            required: 'Email is required',
            validate: (value) => isEmail(value) || 'Enter a valid email',
          })}
          label="Email Address"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          {...register('password', {
            required: 'Password is required',
            min: { value: 6, message: 'Must be at least 6 Characters long' },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
        />
        <LoadingButton
          loading={loading}
          sx={{ mt: 3, mb: 3 }}
          type="submit"
          fullWidth
          variant="contained"
          size="large"
        >
          Sign in
        </LoadingButton>
        <Divider style={{ width: '100%' }}>
          <Link to="/register" component={RouterLink} variant="body2">
            Don't have An account? Sign up
          </Link>
        </Divider>
      </Box>
    </>
  );
};
export default LoginForm;
