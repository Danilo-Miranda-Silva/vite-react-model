import './style.css'

export const BtnLougauth = () => {
    const handleLogout = () => {
       localStorage.removeItem('isLoggedIn');
       localStorage.removeItem('userName');
       window.location.href = '/'; 
    };
    
    return (
        <button className="btn-logout" onClick={handleLogout}>
        Sair
        </button>
    );
}