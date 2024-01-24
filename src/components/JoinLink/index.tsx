import { useSearchParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';
import Tooltip from '@mui/material/Tooltip';
import { toastNotifications } from "components/Toastify";
import { ALERT_MESSAGES } from 'constants/messages';
import './index.scss';

const JoinLink: React.FC = () => {
    const [ searchParam ] = useSearchParams()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>)=>{
        const gameid = searchParam.get('gameid');

        if(!gameid) {
            toastNotifications.error(ALERT_MESSAGES.ERROR)
            return;
        }

        navigator.clipboard.writeText(gameid)
        toastNotifications.info(ALERT_MESSAGES.COPIED)
    };

    return (
        <div className="JoinLink">
            <h3 className="JoinLink__title">Share the Game Id</h3>
            <Tooltip title="Copy the link" placement='top'>
                <IconButton aria-label="copy" onClick={handleClick} style={{color: "white"}}>
                    <LinkIcon style={{color: "00e3ff"}}/>
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default JoinLink;