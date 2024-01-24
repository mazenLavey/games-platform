import { useNavigate } from 'react-router-dom';
import Logo from './assets/logo.png';
import routes from 'routes';
import './index.scss';

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <header className="Header container">
            <div className="Header__logo-container">
                <img
                    className="Header__logo"
                    src={Logo}
                    alt="logo"
                    width={80}
                    onClick={()=> navigate(routes.home)}
                />
            </div>
        </header>
    )
}

export default Header;