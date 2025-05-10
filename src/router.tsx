import { createBrowserRouter, Navigate } from "react-router-dom";
import { NotFound } from "./pages/404";
import SignIn from "./pages/auth/sign-in";
import { Login } from "./pages/app/dashLogin/login";
import { Orders } from "./pages/app/orders/orders";
import { Home } from "./pages/app/home/home";
import { ViewTbPay } from "./pages/app/ViewPay/viewPay";

export const router = createBrowserRouter([
    {
    path: "/", // Página inicial 
    element: <Login />,
  },
  {
    path: "/home", // Caminho para Login
    element: localStorage.getItem('isLoggedIn') === 'true' ? <Home /> : <Navigate to="/" replace />,  
  },
  {
    path: "/orders",  // Caminho para Pedidos
    element: localStorage.getItem('isLoggedIn') === 'true' ? <Orders /> : <Navigate to="/" replace />,
  },
  {
    path: "/list-orderspay",  // Caminho para a página de pagamentos
    element: localStorage.getItem('isLoggedIn') === 'true' ? <ViewTbPay /> : <Navigate to="/" replace />,
  },
  {
    path: "/sign-in",  // Caminho para a página de registro
    element: <SignIn />,
  },
  {
    path: "*",  // Página de erro para rotas não encontradas
    element: <NotFound />,
  },
]);