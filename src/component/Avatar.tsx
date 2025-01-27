import { Avatar } from '@mui/material';
import { useContext } from "react";
import { UsrReducer } from './Header';


const avatar = () => {
    function stringToColor(string: string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }
    const userContext = useContext(UsrReducer)
    const name = userContext.user.firstName ? userContext.user.firstName : ''

    return (<>

        <Avatar sx={{ bgcolor: stringToColor(name) }}>{name[0]}</Avatar>
        <div>
            name: {userContext.user.firstName} {userContext.user.lastName}
        </div>
       
    </>)
}
export default avatar







