import { FormEvent, useContext, useState } from "react"
import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import axios, { AxiosError } from "axios"
import { UserType } from "../types/userType";
import { style } from "../types/styleModle";
import { User } from "../App";

const updateDetails = () => {

    const url = "http://localhost:3000"
    const userContext = useContext(User)

    const [user, setUser] = useState<UserType>(userContext.user)
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => { setOpen(false) }
    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target
        setUser(
            { ...user, [name]: value }
        )
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const res = await axios.put(`${url}/api/user`,
                {
                    ...user
                },
                {
                    headers: {
                        "user-id": "" + user.id
                    }
                }
            )
            
            userContext.userDispatch(
                {
                    type: 'UPDATE',
                    data: res.data
                }
            )
        } catch (e: AxiosError | any) {
            if (e.response?.status === 401)
                alert(e.response.data.message)
            else if (!e.response.ok)
                throw new Error(e.response.status + " " + e.response.data.message);
        }
        handleClose()
    }

    return (<>
        <div>
            <Button onClick={handleOpen} color='inherit'>update</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Enter your details
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                id="outlined-basic"
                                name="firstName"
                                label="first name"
                                variant="outlined"
                                margin="normal"
                                value={user.firstName}
                                onChange={handleChange}
                            />

                            <TextField
                                id="outlined-basic"
                                name="lastName"
                                label="last name"
                                variant="outlined"
                                margin="normal"
                                value={user.lastName}
                                onChange={handleChange}
                            />

                            <TextField
                                type="email"
                                id="outlined-basic"
                                name="email"
                                label="email"
                                variant="outlined"
                                margin="normal"
                                value={user.email}
                                onChange={handleChange}
                            />

                            <TextField
                                id="outlined-basic"
                                name="phon"
                                label="phon"
                                variant="outlined"
                                margin="normal"
                                value={user.phon}
                                onChange={handleChange}
                            />

                            <TextField
                                id="outlined-basic"
                                name="address"
                                label="address"
                                variant="outlined"
                                margin="normal"
                                value={user.address}
                                onChange={handleChange}
                            />
                            <div><Button type="submit">update</Button></div>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </div>
    </>)
}
export default updateDetails