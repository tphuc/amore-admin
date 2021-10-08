import React from 'react';
import { Block } from 'baseui/block'
import { Input } from 'baseui/input'
import { Button } from 'baseui/button';
import {  signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { auth } from '../../framework/firebase';
import { useHistory } from 'react-router';


export default function Login() {


    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false)

    const history = useHistory()
    const login = async () => {
        try{
           
            let res = await signInWithEmailAndPassword(auth, email, password)
            console.log(res)
            let a = await setPersistence(auth, browserLocalPersistence)
            console.log(a)
               if(res.user){
           history.push('/dashboard')
       }
        }
        catch(e){
            console.log(e)
        }
       
    
       setLoading(false)
    }

    return <Block width='100vw' height='100vh' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
        <h1>Admin Minperfume</h1>
        <Block width='500px' display='flex' flexDirection='column'>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' ></Input>

            <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password'></Input>
            <Button isLoading={loading} onClick={login} >Login</Button>
        </Block>

    </Block>
}