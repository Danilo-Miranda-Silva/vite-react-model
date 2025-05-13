export interface OrderItem {
    id?: number;
    item: string;
    price: number;
    quantity: number;
    subtotal: number;
  }
  
export interface TableData {
    id: number;
    waiter: string;
    table: string;
    order: OrderItem[];
    createdAt: string;
    status: string;
    statuspay: string;
    total: number;
  }

  export interface ModalProps {
    pedido: TableData | null;
    onClose: () => void;
  }