import ElementO from './assets/element-01.png';
import ElementX from './assets/element-02.png';
import "./index.scss";

type Props = {
    figure: 'o' | 'x',
}

const DecorationFigure: React.FC<Props> = ({ figure }) => {

    if (figure === "o") {
        return <img className="DecorationFigure__ElementO" src={ElementO} alt="background" />;
    }

    return <img className="DecorationFigure__ElementX" src={ElementX} alt="background" />;
}

export default DecorationFigure;