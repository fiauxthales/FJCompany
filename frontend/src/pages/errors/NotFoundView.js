import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundView = () => {

  return (
    <>
      <h2 align="center" color="" variant="h3">
        A página que você está procurando não está aqui
      </h2>
      <h2 align="center" color="" variant="subtitle2">
        Ou você tentou um caminho duvidoso ou veio aqui por engano. Seja o
        que for, tente usar a navegação
      </h2>
      <Link
        to='/app'
      >
        Voltar
      </Link>
    </>
  );
};

export default NotFoundView;