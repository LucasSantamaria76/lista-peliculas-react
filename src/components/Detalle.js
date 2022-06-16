import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Detalle = () => {
  const [movie, setMovie] = useState([]);
  const token = sessionStorage.getItem('token');

  const query = new URLSearchParams(window.location.search);
  const id = query.get('id');

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=971ab5e34a4dd3f523182da6ffc296a3&language=es-MX`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) =>
        Swal.fire({
          title: 'Error!',
          text: `${err.message}`,
          confirmButtonText: 'Aceptar',
        })
      );
  }, [id]);

  return (
    <>
      {!token && <Navigate to='/login' />}
      {!movie && <p>Cargando...</p>}
      {movie && (
        <>
          <h2>Título: {movie.title}</h2>
          <div className='row'>
            <div className='col-4'>
              {movie.poster_path && (
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className='card-img-top' alt='Poster' />
              )}
            </div>
            <div className='col-8'>
              <h6>Fecha de estreno: {movie.release_date?.split('-').reverse().join('-')}</h6>
              <h6>Puntuación: {movie.vote_average}</h6>
              <h6>Géneros:</h6>
              <p>{movie.genres?.map((gen) => gen.name).join(' - ')}</p>
              <h6>Web oficial:</h6>
              <a href={movie.homepage} rel='noopener noreferrer' target='_blank'>
                {movie.homepage}
              </a>
              <h6 className='mt-3'>Título original: {movie.original_title}</h6>
              <h6 className='mt-3'>País de origen: {movie.production_countries?.map((el) => el.name).join(' - ')}</h6>
            </div>
          </div>
          <div className='row'>
            <div className='col mt-5'>
              <h5>Sinopsis:</h5>
              <p>{movie.overview}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detalle;
