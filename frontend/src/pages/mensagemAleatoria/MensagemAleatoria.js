import React from 'react';
import { Link } from 'react-router-dom';

const MensagemAleatoria = () => {

  return (
    <>
          <h2 align="center" color="" variant="h3">
            mensagem aleatoria
          </h2>
          <Link
            to='/app'
          >
            Voltar
          </Link>
    </>
  );
};

export default MensagemAleatoria;