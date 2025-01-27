import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { FormEvent, useContext, useRef, useState } from 'react';
import { IsLogin, UsrReducer } from './Header';
import axios, { AxiosError } from "axios"



export default function Login() {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #111',
        boxShadow: 24,
        p: 4,
    };
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const [click, setClick] = useState("")
    const [open, setOpen] = useState(false);

    const userContext = useContext(UsrReducer)
    const [, setLogin] = useContext(IsLogin)

    const handleClose = () => { setOpen(false); }
    const handleOpenSignIn = () => {
        setClick("SIGN IN")
        setOpen(true)
    }
    const handleOpenSignUp = () => {
        setClick("SIGN UP")
        setOpen(true)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const url = "http://localhost:3000"
        console.log(email.current?.value);

        try {
            const res = await axios.post(`${url}/api/user/${click === 'SIGN UP' ? 'register' : 'login'}`,
                {
                    email: email.current?.value,
                    password: password.current?.value
                }
            )
            console.log(email.current?.value);

            userContext.userDispatch(
                {
                    type: 'LOGIN',
                    data: click === 'SIGN UP' ?
                        {
                            id: res.data.userId,
                            email: email.current?.value,
                            password: password.current?.value
                        } :
                        { ...res.data.user }
                }
            )
            setLogin(true)
            handleClose()
        }
        catch (e: AxiosError | any) {
            if (e.response?.status === 422)
                alert(e.response.data.message)
            else if (!e.response.ok)
                throw new Error(e.response.status + " " + e.response.data.message);
        }

    }

    return (
        <>
            <div>
                <Button onClick={handleOpenSignIn} color='inherit'>SIGN IN</Button>
                <Button onClick={handleOpenSignUp} color='inherit'>SIGN UP</Button>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Enter your email and code
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <form onSubmit={handleSubmit}>
                                <div><TextField id="outlined-basic" inputRef={email} label="email" variant="outlined" type='email'/></div>
                                <div><TextField id="outlined-basic" inputRef={password} label="password" variant="outlined" type='password'/></div>
                                <div><Button type="submit">save</Button></div>
                            </form>
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </>
    )
}



