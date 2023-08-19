
import { useNavigate } from 'react-router-dom';
import Logo from './assets/logo.png';
import './index.css';

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <header className="Header container">
            <img
                className="Header__logo"
                src={Logo}
                alt="logo"
                width={80}
                onClick={()=> navigate('/')}
            />
        </header>
    )
}

export default Header;