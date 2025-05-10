//import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importando o useNavigate para navegação
import logo from '../../../assets/logo_pedrao_vazado.png';
import './home.css';
import { UserName } from '../components/userName';
import { BtnLougauth } from '../components/btnLogauth';

export const Home = () => {
  const navigate = useNavigate(); // Inicializando o hook de navegação

  // Função para redirecionar para a página de login (Painel Cozinha)
  const goToLogin = () => {
    navigate('/orders'); // Redireciona para a página de login
  };
  const goToPay = () => {
    navigate('/list-orderspay'); // Redireciona para a página de login
  };

  return (
    <>
      <UserName />
      <BtnLougauth />
      <div className="home-container">
        <div className="buttons-container">
          <img src={logo} alt="Logo do Restaurante" className="logo" />
        </div>
        <div className="buttons-container">
          <button className="home-button" onClick={goToLogin}>Painel Cozinha</button>
          <button className="home-button" onClick={goToPay}>Painel Caixa</button>
        </div>
      </div>
    </>
    
  );
};

