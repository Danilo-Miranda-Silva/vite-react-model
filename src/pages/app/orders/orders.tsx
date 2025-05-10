import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import { TableData } from "./types";
import { ModalOrders } from "./modalOrders";
import { DelOrdersModal } from "./delOrders";
import logo from '../../../assets/logo_pedrao_vazado.png';
import lixeira from '../../../assets/lixeira.png';
import { BtnLougauth } from "../components/btnLogauth";
import { UserName } from "../components/userName";
import './pedidos.css';

const Tabela = () => {
  const [pedidoSelecionado, setPedidoSelecionado] = useState<TableData | null>(null);
  const [excluiPedidos, setExcluiPedidos] = useState<TableData | null>(null);
  const [dados, setDados] = useState<TableData[]>([]);
  
  useEffect(() => {
    const fetchTables = async () => {
       
        const response = await api.get('/paytable');
        setDados(response.data.paytable);      
    };
    fetchTables();
    const interval = setInterval(fetchTables, 5000);
    return () => clearInterval(interval);
  }, []);

  const ordenarPedidos = (dados: TableData[]) => {
    const ordemStatus = ['Pendente', 'Em Preparação', 'Finalizado'];

    return dados.sort((a, b) => {
      return ordemStatus.indexOf(a.status) - ordemStatus.indexOf(b.status);
    });
  };
  
  return (
    <>
      <div style={{ fontFamily: "'Inter', sans-serif", width: '100%', backgroundColor:"#121214" }}>
        <h2 style={{ marginLeft: '120px', color: '#e1e1e6', backgroundColor:"#121214" }}>Pedidos</h2>
        <table className="ct-table">
          <thead>
            <tr>
              <th>Data Pedido</th>
              <th>Hora Pedido</th>
              <th>ID Pedido</th>
              <th >Mesa</th>
              <th>Garçom</th>
              <th>Status</th>
              <th>Detalhes do Pedido</th>
            </tr>
          </thead>
          <tbody>
            {ordenarPedidos(dados).map((dado, index) => (
            <tr key={index}>
              <td>{new Date(dado.createdAt).toLocaleDateString('pt-BR')}</td>
              <td>{new Date(dado.createdAt).toLocaleTimeString('pt-BR')}</td>
              <td>PD-{dado.id}</td>
              <td>{dado.table}</td>
              <td>{ dado.waiter}</td>
              <td className={`ordersSt 
                ${dado.status === 'Pendente' ? 'pendente' : ''} ${dado.status === 'Em Preparação' ? 'emPreparacao' : ''} ${dado.status === 'Finalizado' ? 'finalizado' : ''}`}> {dado.status || '---'} </td>
              <td className="td-btn">
                <button className="ct-btn-table" onClick={() => setPedidoSelecionado(dado)}>
                  Ver Detalhes
                </button>
                <button className="ct-btn-table btn-del" onClick={() => setExcluiPedidos(dado)}><img src={lixeira} alt="Deletar" style={{ width: '17px', height: 'auto', marginRight: '1px', background: "#C70000" }} /> Excluir Pedido</button>
              </td>
            </tr>
            ))}
          </tbody>      
        </table>
        <ModalOrders pedido={pedidoSelecionado} onClose={() => setPedidoSelecionado(null)} />
        <DelOrdersModal pedido={excluiPedidos} onClose={() => setExcluiPedidos(null)}/>
      </div>
    </>
    
  );
};
export function Orders() {
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
      <Tabela />
    </div>
  </>

  );
}
