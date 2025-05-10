import { ModalProps} from "../orders/types";
import { api } from "../../../lib/axios";


export const ModalPay = ({ pedido, onClose }: ModalProps) => {
  if (!pedido) return null;


  const upStatus = async () => {
    await api.post("/status-pay", {
      Id: pedido.id,
      newStatus: 'Pago',
      table: pedido.table 
    });

    onClose();
    window.location.reload();
  };

  return (
    <div className="bd-modal">
      <div className="ct-modal">
        <h3 style={{ marginBottom: "14px", color: "#C9A33C" }}>
          Detalhes do Pedido
        </h3>
        <p className="p-description"><strong>ID:</strong> {pedido.id}</p>
        <p className="p-description"><strong>Mesa:</strong> {pedido.table}</p>

        <div className="p-description p-order">
          <strong>Pedido:</strong>
          <ul className="listOrders" style={{ marginTop: "5px", paddingLeft: "20px" }}>
            {pedido.order.length > 0 ? (
              pedido.order.map((item, index) => (
                <li key={index}>
                  {item.item} ({item.quantity}:unid.) R$ {item.price}
                </li>
              ))
            ) : (<li>---</li>)}
          </ul>
        </div>
        <p className="p-description p-order">
          <strong>Total: </strong>R$ {new Intl.NumberFormat('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(pedido.total)}
        </p>

        <div className="ct-btn">
          <button className="btn-modal" onClick={upStatus}>Pagar</button>
          <button className="btn-modal" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};