import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Buscador = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim();
    if (!keyword || keyword.length < 3) {
      Swal.fire({
        text: !keyword ? 'El campo de busqueda no puede estar vacio' : 'Tienes que ingresar al menos 3 caracteres',
        confirmButtonText: 'Aceptar',
      });
    } else {
      e.currentTarget.keyword.value = '';
      navigate(`/resultados?keyword=${keyword}`);
    }
  };

  return (
    <form className='d-flex' onSubmit={handleSubmit}>
      <input className='form-control me-2' type='search' name='keyword' placeholder='Buscar...' aria-label='Search' />
      <button className='btn btn-info' type='submit'>
        Buscar
      </button>
    </form>
  );
};

export default Buscador;
