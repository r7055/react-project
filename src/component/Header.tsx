import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Avatar from './Avatar';
import Navbar from './Navbar';
import UpdateDetails from './UpdateDetails';
import Login from './login';
import { useContext,  } from 'react';
import { IsLogin } from '../App';



const Header = () => {
const [isLogin,]=useContext(IsLogin)
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        {!isLogin && <Login />}
                        {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}
                        {isLogin && <Avatar />}
                        {isLogin && <UpdateDetails />}
                        {/* </div> */}
                    </Box>
                    <Box>
                        <Navbar />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header