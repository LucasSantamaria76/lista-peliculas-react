import axios from 'axios';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const initialUser = {
  email: '',
  password: '',
};

const regexEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const Login = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  const handleSubmit = (e) => {
    const { email, password } = user;
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      Swal.fire({
        title: 'Error!',
        text: 'Los campos no pueden estar vacios',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
    if (!regexEmail.test(email)) {
      Swal.fire({
        title: 'Error!',
        text: 'El email no es valido',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
    axios
      .post('http://challenge-react.alkemy.org', user)
      .then((res) => {
        sessionStorage.setItem('token', res.data.token);
        navigate('/listado');
      })
      .catch((err) =>
        Swal.fire({
          title: 'Error!',
          text: 'El usuario o la contraseña son incorrectos',
          confirmButtonText: 'Aceptar',
        })
      );
  };

  const handleChange = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  return (
    <>
      {token && <Navigate to='/listado' />}

      <div className='row'>
        <div className='col-6 offset-3'>
          <h2 className='text-center'>Formulario de logIn</h2>
          <form onSubmit={handleSubmit}>
            <label className='form-label d-block mt-2'>
              <span>Correo electrónico:</span>
              <input
                type='text'
                name='email'
                value={user.email}
                onChange={handleChange}
                className='form-control'
                placeholder='challenge@alkemy.org pass:react'
              />
            </label>
            <label className='form-label d-block mt-2'>
              <span>Contraseña:</span>
              <input type='password' name='password' value={user.password} onChange={handleChange} className='form-control' />
            </label>
            <div className='d-grid'>
              <button type='submit' className='btn btn-primary d-grid mt-2'>
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
