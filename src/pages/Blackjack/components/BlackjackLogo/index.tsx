import Logo from './assets/logo.png';
import "./index.scss";

const BlackjackLogo: React.FC = () => {
    return(
        <div className="BlackjackLogo">
            <img className="BlackjackLogo__Img popIn-animation" src={Logo} alt="background" />
        </div>
    )
}

export default BlackjackLogo;