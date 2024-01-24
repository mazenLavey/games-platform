import { NavLink } from "react-router-dom";
import "./index.scss";

type Props = {
    route: string,
    src: string,
    title: string,
}

const GameCard: React.FC<Props> = ({route, src, title}) => {
    return (
    <NavLink className="GameCard" to={route}>
        <div className="GameCard__ImgContainer">
            <img className="GameCard__Img" src={src} alt={title} />
        </div>
        <h2 className="GameCard__Title">{title}</h2>
    </NavLink>
    )
}

export default GameCard;