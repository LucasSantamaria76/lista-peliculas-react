import Card from './Card';
import { Navigate } from 'react-router-dom';

const Favoritos = ({ addOrRemoveFav, favoritos }) => {
  const token = sessionStorage.getItem('token');

  return (
    <>
      <h2>Peliculas favoritas</h2>
      {!token ? (
        <Navigate to='/' />
      ) : (
        <>
          {!favoritos.length && <p className='text-danger'>Todavia no tienes favoritos</p>}
          <div className='row'>
            {favoritos.map((movie) => (
              <Card movie={movie} addOrRemoveFav={addOrRemoveFav} key={movie.id} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Favoritos;
