import React, {useState, useEffect} from 'react';
import useAuthContext from "../hooks/useAuthContext";
import {useLogin} from "../hooks/useLogin";
import {useNavigate, useLocation} from "react-router-dom";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import ErrorMessage from "../components/layout/ErrorMessage";
import Loading from "../components/layout/Loading";

const SignIn = () => {
    const {login, error, isLoading} = useLogin()
    const {setAuth} = useAuthContext()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from.pathname || '/';

    // Value and handlers for toggle visibility effect in password fields
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    // Values and handlers for authentication
    const [username, setUsername] = useState<string | ''>('')
    const [usernameEmpty, setUsernameEmpty] = useState<boolean>(false)
    const [password, setPassword] = useState<string | ''>('')
    const [passwordEmpty, setPasswordEmpty] = useState<boolean>(false)
    const [signInAttempted, setSignInAttempted] = useState<boolean>(false)

    // Function for username field validity
    const checkUsername = () => {
        username === '' ? setUsernameEmpty(true) : setUsernameEmpty(false)
    }

    // Function for password field validity
    const checkPassword = () => {
        password === '' ? setPasswordEmpty(true) : setPasswordEmpty(false)
    }

    const handleChangeUsername = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.preventDefault()
        setUsername(e.target.value)
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const handleSignIn = (username: string, password: string) => {
        login(username, password)
    }

    const checkForm = (e: React.FormEvent) => {
        e.preventDefault()

        // Initialize this value in order to enable field checks on change
        // See useEffect calls below checkForm()
        setSignInAttempted(true)

        checkUsername()
        checkPassword()

        // If all fields are valid, proceed to Sign In
        if (username !== '' && password !== '') handleSignIn(username, password)
    }

    // Check validity of email field after the first Sign In attempt (user has pressed Sign In button)
    useEffect(() => {
        if (signInAttempted === true) checkUsername()
    }, [checkUsername, username, signInAttempted])

    // Check validity of password field after the first Sign In attempt (user has pressed Sign In button)
    useEffect(() => {
        if (signInAttempted === true) checkPassword()
    }, [checkPassword, password, signInAttempted])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box sx={{mt: 8}}>
                <div className={'paper'}>
                    <Box sx={{m: 1}}>
                        <Avatar sx={{bgcolor: 'secondary.main', mx: 'auto'}} className={'avatar'}>
                            <LockOutlinedIcon sx={{color: "white"}}/>
                        </Avatar>
                    </Box>
                    <Typography component="h1" variant="h5" align={'center'}>
                        Sign In
                    </Typography>
                    <Box sx={{mt: 1}}>
                        <form className={'form'} noValidate>
                            <TextField
                                onChange={e => handleChangeUsername(e)}
                                color='secondary'
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                type="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                helperText={(usernameEmpty && username === '') ? "This field is required." : ''}
                                error={(usernameEmpty && username === '')}
                            />
                            <TextField
                                onChange={e => handleChangePassword(e)}
                                color='secondary'
                                label='Password'
                                variant="outlined"
                                fullWidth
                                required
                                helperText={passwordEmpty && "This field is required."}
                                error={passwordEmpty}
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            {error &&
                                <ErrorMessage message="The credentials you provided do not match. Please try again."/>}
                            {isLoading &&
                                <Box mt={3} display="flex" justifyContent="center" alignItems="center"><Loading/></Box>}
                            <Box sx={{mt: 3, mb: 2}}>
                                <Button
                                    style={{color: 'white'}}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className={'submit'}
                                    onClick={e => checkForm(e)}
                                >
                                    <Typography>Sign In</Typography>
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </div>
            </Box>
        </Container>
    );
}

export default SignIn;