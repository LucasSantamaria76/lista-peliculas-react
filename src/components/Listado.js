import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Card from './Card';
import Swal from 'sweetalert2';
import { animateScroll as scroll } from 'react-scroll';

const Listado = ({ addOrRemoveFav }) => {
  const [movieList, setMovieList] = useState([]);
  const [numPage, setNumPage] = useState(1);
  const token = sessionStorage.getItem('token');

  const getPage = (page) => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=971ab5e34a4dd3f523182da6ffc296a3&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;

    axios
      .get(url)
      .then((res) => setMovieList(res.data.results))
      .catch((err) =>
        Swal.fire({
          title: 'Error!',
          text: `${err.message}`,
          confirmButtonText: 'Aceptar',
        })
      );
    scroll.scrollToTop({ duration: 0, delay: 0, smooth: false });
  };

  useEffect(() => {
    getPage(numPage);
  }, [setMovieList, numPage]);

  const handleClick = (e) => {
    e.preventDefault();
    e.target.name === 'next'
      ? setNumPage(numPage + 1)
      : numPage > 1
      ? setNumPage(numPage - 1)
      : setNumPage(numPage);
  };

  return (
    <>
      {!token ? (
        <Navigate to='/' />
      ) : (
        <>
          <div className='container-fluid'>
            <div className='row'>
              {movieList.map((movie) => (
                <Card movie={movie} addOrRemoveFav={addOrRemoveFav} key={movie.id} />
              ))}
            </div>
            <div className='row'>
              <div className='col-6 offset-4'>
                <button
                  type='button'
                  className='btn btn-secondary '
                  name='prev'
                  onClick={handleClick}>
                  Página anterior
                </button>
                <button type='button' className='btn btn-secondary rounded-circle mx-1  disabled'>
                  {numPage}
                </button>
                <button
                  type='button'
                  className='btn btn-secondary '
                  name='next'
                  onClick={handleClick}>
                  Página siguiente
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Listado;
