import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { createContext, Dispatch, useReducer, useState } from 'react';
import Avatar from './Avatar';
import Navbar from './Navbar';
import UpdateDetails from './UpdateDetails';
import Login from './login';
import { action, actionUser } from '../types/userActionType';
import { UserType } from '../types/userType';

export const UsrReducer = createContext<{ user: UserType, userDispatch: Dispatch<action> }>(
    {
        user: {},
        userDispatch: () => null
    })

export const IsLogin = createContext<[boolean, Dispatch<React.SetStateAction<boolean>>]>([false, () => null])

const Header = () => {

    const [user, userDispatch] = useReducer(actionUser, {
        id:0,
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        address:'',
        phon:''
    })
    const [isLogin, setIsLogin] = useState(false)
    
    return (
        <header>
        <IsLogin.Provider value={[isLogin, setIsLogin]}>
            <UsrReducer.Provider value={{ user, userDispatch }} >
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
            </UsrReducer.Provider>
        </IsLogin.Provider>
        </header>
    );
}

export default Header