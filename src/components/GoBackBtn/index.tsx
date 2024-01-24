import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";

const GoBackBtn: React.FC = () => {
    const navigate = useNavigate();

    return(
        <Button
            className="GoBackBtn"
            variant="text"
            type='button'
            onClick={() => navigate(-1)}
            startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
            sx={{
                color: "white"
            }}
        >
            Go back
        </Button>
    )
}

export default GoBackBtn;