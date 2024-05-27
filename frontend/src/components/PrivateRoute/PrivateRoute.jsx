import AuthController from '@/controller/AuthController';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, acessos }) => {
  const [isValidToken, setIsValidToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('authToken');
      const validToken = await AuthController.testToken(token);
      setIsValidToken(validToken);
    };

    checkToken();
  }, []);

  if (isValidToken === null) {
    // Aguardando a validação do token
    return null;
  }

  if (isValidToken.token === 'invalido') {
    // Redirecionar para a página de login se o token for inválido
    return <Navigate to="/login" />;
  }

  if (acessos && isValidToken && !acessos.includes(isValidToken.acessos)) {
    // Redirecionar para a página de acesso não autorizado
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
