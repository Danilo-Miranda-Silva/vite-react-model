import './style.css';

export const UserName = () => {
    const userName = localStorage.getItem('userName');
    const welcomeMessage = userName ? `Bem Vindo, ${userName}!` : 'Welcome!';

    return (
        <div className="userName">
            <p>{welcomeMessage}</p>
        </div>
    );
}