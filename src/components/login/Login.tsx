import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Alert, Button, TextField } from '@mui/material';
import "./Login.css"
import { apiService } from '../../service/apiService';
import { API_URL } from '../../config';
import { User } from '../../models/userModel';

interface LoginProps {
    players: string[],
    setUser: React.Dispatch<React.SetStateAction<string | undefined>>
}

function Login(props: LoginProps) {
    const [user, setUser] = React.useState<User>()
    const [msg, setMsg] = React.useState<string>()

    const handleUserChange = (event: SelectChangeEvent) => {
        const player = event.target.value as string
        setUser((prev) => {
            if (prev) prev.name = player
            else prev = { name: player, secret: undefined }
            return prev
        })
    };

    const handleSecretChange = (event: any) => {
        const secret = event.target.value as string
        setUser((prev) => {
            if (prev) prev.secret = secret
            else prev = { name: undefined, secret: secret }
            return prev
        })
    };

    const validateUser = async () => {
        const result = await apiService.post(`${API_URL}/login`, { user: user });
        if (result?.data) props.setUser(user!.name!)
        else setErrorMessage("Validation failed, Please enter valid player details.")
    }

    const handlePlayClick = () => {
        if (!user || !user.name || !user.secret || user.secret.trim() === "")
            setErrorMessage("Please enter valid player details.");

        else validateUser()

    }

    return (
        <div className="loginContainer">
            <div className='login'>
                {msg && <Alert className='alert' variant="filled" severity="error">{msg}</Alert>}
                <FormControl fullWidth>
                    <InputLabel >Player</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user?.name}
                        onChange={handleUserChange}
                        className='player'

                    >
                        {props.players.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                    </Select>
                    <TextField type='password' className='secret' label="Secret" variant="outlined" onChange={handleSecretChange}></TextField>
                </FormControl>
                <Button className='button' variant="contained" size="large" onClick={handlePlayClick}>Play</Button>
            </div>
        </div>

    );

    function setErrorMessage(msg: string) {
        setMsg(msg);
        setTimeout(() => {
            setMsg(undefined);
        }, 2000);
    }
}


export default Login