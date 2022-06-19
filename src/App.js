import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Detalle from './components/Detalle';
import Footer from './components/Footer';
import Header from './components/Header';
import Listado from './components/Listado';
import Login from './components/Login';
import Resultados from './components/Resultados';
import Favoritos from './components/Favoritos';
import './css/bootstrap.css';
import './css/app.css';

const App = () => {
  const [favoritos, setFavoritos] = useState([]);

  let favMovies = localStorage.getItem('favMovies')
    ? JSON.parse(localStorage.getItem('favMovies'))
    : [];

  useEffect(() => {
    setFavoritos(favMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addOrRemoveFav = (e) => {
    const movie = e.target.dataset.movie;
    const movieId = JSON.parse(movie).id;
    const movieExists = favMovies.find((movie) => movie.id === movieId);
    if (!movieExists) {
      favMovies.push(JSON.parse(movie));
      localStorage.setItem('favMovies', JSON.stringify(favMovies));
      e.target.innerText = '❤️';
    } else {
      favMovies = favMovies.filter((movie) => movie.id !== movieId);
      localStorage.setItem('favMovies', JSON.stringify(favMovies));
      e.target.innerText = '🤍';
    }
    setFavoritos(favMovies);
  };

  return (
    <>
      <Header favoritos={favoritos} />
      <div className='container mt-3'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/listado' element={<Listado addOrRemoveFav={addOrRemoveFav} />} />
          <Route path='/detalle' element={<Detalle />} />
          <Route path='/resultados' element={<Resultados addOrRemoveFav={addOrRemoveFav} />} />
          <Route
            path='/favoritos'
            element={<Favoritos addOrRemoveFav={addOrRemoveFav} favoritos={favoritos} />}
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
