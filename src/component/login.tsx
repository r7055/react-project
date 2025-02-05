import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { FormEvent, useContext, useRef, useState } from 'react';
import axios, { AxiosError } from "axios"
import { style } from '../types/styleModle';
import { IsLogin, User } from '../App';
import Swal from 'sweetalert2';

export default function Login() {
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const [click, setClick] = useState("")
    const [open, setOpen] = useState(false);
    const userContext = useContext(User)
    const [, setLogin] = useContext(IsLogin)

    const handleClose = () => { setOpen(false); }
    const handleOpenSignIn = () => { setClick("SIGN IN"); setOpen(true)}
    const handleOpenSignUp = () => {setClick("SIGN UP"); setOpen(true)}

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const url = "http://localhost:3000"
        try {
            const res = await axios.post(`${url}/api/user/${click === 'SIGN UP' ? 'register' : 'login'}`,
                {
                    email: email.current?.value,
                    password: password.current?.value
                }
            )
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
            else if (!e.response.ok) {
                if (e.response.status == 400) {
                    setOpen(false)
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "User aleady exist!",
                        // footer: '<a href="#" onclick="handleOpenSignIn(true)">Do you want to login?</a>' 
                    });
                }
                if (e.response.status == 401) {
                    setOpen(false)
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "The password is worng",
                    });
                }
            }
        }
    }

    return (
        <>
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
                            <TextField
                                id="outlined-basic"
                                inputRef={email}
                                label="email"
                                variant="outlined"
                                type='email'
                            />
                            <TextField
                                id="outlined-basic"
                                inputRef={password}
                                label="password"
                                variant="outlined"
                                type='password'
                            />
                            <div> <Button type="submit">save</Button></div>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}



