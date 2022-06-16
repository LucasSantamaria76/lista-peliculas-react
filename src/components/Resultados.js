import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Card from './Card';

const Resultados = ({ addOrRemoveFav }) => {
  const token = sessionStorage.getItem('token');
  const [moviesResults, setMoviesResults] = useState([]);
  const [numPage, setNumPage] = useState(1);

  let query = new URLSearchParams(window.location.search);
  let keyword = query.get('keyword');

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=971ab5e34a4dd3f523182da6ffc296a3&language=es-ES&page=${numPage}&include_adult=false&query=${keyword}`;

    axios
      .get(url)
      .then((res) => {
        !res.data.results.length &&
          Swal.fire({
            title: 'Resultados',
            text: `la busqueda no arrojo resultados`,
            confirmButtonText: 'Aceptar',
          });
        setMoviesResults(res.data.results);
      })
      .catch((err) =>
        Swal.fire({
          title: 'Error!',
          text: `${err.message}`,
          confirmButtonText: 'Aceptar',
        })
      );
  }, [keyword, numPage]);

  const handleClick = (e) => {
    e.preventDefault();
    e.target.name === 'next' ? setNumPage(numPage + 1) : numPage > 1 ? setNumPage(numPage - 1) : setNumPage(numPage);
  };

  return (
    <>
      {!token && <Navigate to='/' />}
      <h1>lista de Resultados</h1>
      {moviesResults.length && (
        <>
          <div className='row'>
            {moviesResults.map((movie) => (
              <Card movie={movie} key={movie.id} addOrRemoveFav={addOrRemoveFav} />
            ))}
          </div>
          <div className='row'>
            <div className='col-6 offset-4'>
              <button type='button' className='btn btn-primary' name='prev' onClick={handleClick}>
                Página anterior
              </button>
              <button type='button' className='btn btn-primary disabled'>
                {numPage}
              </button>
              <button type='button' className='btn btn-primary' name='next' onClick={handleClick}>
                Página siguiente
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Resultados;
