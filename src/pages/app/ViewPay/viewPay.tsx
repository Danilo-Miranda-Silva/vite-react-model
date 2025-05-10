//import React, { useState } from 'react';

import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import { TableData } from "../orders/types";
import { ModalPay } from "../ViewPay/modalPay";
import logo from '../../../assets/logo_pedrao_vazado.png';
import '../orders/pedidos.css';
import { UserName } from "../components/userName";
import { BtnLougauth } from "../components/btnLogauth";

const ViewPay = () => {
  const [pedidoSelecionado, setPedidoSelecionado] = useState<TableData | null>(null);
  const [dados, setDados] = useState<TableData[]>([]);

  useEffect(() => {
    const fetchTables = async () => {
       
        const response = await api.get('/orders-pay');
        setDados(response.data.paytable);      
    };

    fetchTables();
  }, []);
  
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", width: '100%', backgroundColor:"#121214" }}>
      <h2 style={{ marginLeft: '120px', color: '#e1e1e6', backgroundColor:"#121214" }}>Visualização Para Pagamento</h2>
      <table className="ct-table">
        <thead>
          <tr>
            <th>Data Pedido</th>
            <th>Hora Pedido</th>
            <th>ID Pedido</th>
            <th >Mesa</th>
            <th>Garçom</th>
            <th>Valor a Ser Pago</th>
            <th>Status Pag</th>
            <th>Detalhes do Pedido</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((dado, index) => (
            <tr key={index}>
              <td>{new Date(dado.createdAt).toLocaleDateString('pt-BR')}</td>
              <td>{new Date(dado.createdAt).toLocaleTimeString('pt-BR')}</td>
              <td>PD-{dado.id}</td>
              <td>{dado.table}</td>
              <td>{dado.waiter}</td>
              <td className={dado.statuspay === 'Não Pago' ? 'nao-pago' : ''}>
                {dado.statuspay}
              </td>
              <td>R$ {new Intl.NumberFormat('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(dado.total)}
              </td>
              <td className="td-btn">
                <button className="ct-btn-table" onClick={() => setPedidoSelecionado(dado)}>
                  Ver Detalhes
                </button>
              </td>
            </tr>
          ))} 
        </tbody>      
      </table>
      <ModalPay pedido={pedidoSelecionado} onClose={() => setPedidoSelecionado(null)} />
    </div>
  );

};
export function ViewTbPay() {
  return (
    <>
     <header className="ct-header">
        <div className="logo">
          <img src={logo} alt="Logo do Restaurante" className="logo-restaurante" />
        </div>
        <UserName />
        <BtnLougauth />
      </header>
      <div className="container-table">
        <ViewPay />
      </div>
    </>
    
  );
}
