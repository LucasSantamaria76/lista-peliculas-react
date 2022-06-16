import { Link } from 'react-router-dom';

const Card = ({ movie, addOrRemoveFav }) => {
  const { id, title, overview, poster_path } = movie;
  const favMovies = localStorage.getItem('favMovies') ? JSON.parse(localStorage.getItem('favMovies')) : [];
  const isMovieExists = favMovies.find((movie) => movie.id === id);

  return (
    <div className='col-3'>
      <div className='card mb-2'>
        {poster_path && <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} className='card-img-top' alt='Poster' />}
        <div className='card-body'>
          <h5 className='card-title'>{title}</h5>
          <p className='card-text'>{overview.slice(0, 100)}...</p>
          <Link to={`/detalle?id=${id}`} className='btn btn-primary'>
            Ver más...
          </Link>
          <button
            type='button'
            className='btnFav'
            onClick={addOrRemoveFav}
            data-movie={JSON.stringify({ id, title, overview, poster_path })}>
            {isMovieExists ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
