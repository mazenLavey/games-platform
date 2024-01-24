import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
    isLoading: boolean,
    onClick?: () => void,
}

const LoadingBackdrop: React.FC<Props> = ({ isLoading, onClick }) => {
    return(
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            onClick={onClick}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default LoadingBackdrop;