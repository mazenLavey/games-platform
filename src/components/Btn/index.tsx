import Button from '@mui/material/Button';
import { TbtnTheme } from 'types/interfaces';

type Props = {
    onClick?: () => void;
    text: string,
    type?: "button" | "submit",
    isWide?: boolean,
    theme: TbtnTheme,
}

const BTN_THEME = {
    purple: "linear-gradient(90deg, #e51d74, #8d4fea)" ,
    darkBrowen: "linear-gradient(60deg, #61000a, #0a3500)",
    white: "linear-gradient(60deg, #ffffff4f, #ffffff4f)",
}

const Btn: React.FC<Props> = ({ 
    type = "button", 
    text, 
    theme, 
    isWide,
    onClick, 
}) => {
    return(
        <Button
            variant="contained"
            type={type}
            onClick={onClick}
            sx={{
                background: BTN_THEME[theme],
                borderRadius: "12px",
                fontWeight: "700",
                fontSize: "20px",
                width: isWide ? "100%" : "170px",
            }}
        >
            { text }
        </Button>
    )
}

export default Btn;