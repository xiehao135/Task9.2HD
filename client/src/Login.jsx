import React,{useState} from 'react'
import Input from './Input'
import Button from './Button'
import Greeting from './Greeting'
import './App.css'

const Login = (props)=>{
    // const {username,setUsername} = useState('')
    // const {password,setPassword} = useState('')
    const [contact,setContact] = useState({
        username:'',
        password:''
    })

    const handleChange = (event) =>{
        const {name,value} = event.target

        setContact ((preValue)=>{
            return{
                ...preValue,
                [name]:value
            }
        })

        // setContact((preValue)=>{
        //     if(name === 'username')
        //     return{
        //         username:value,
        //         password:preValue.password
        //     }
        //     else if(name === 'password')
        //     return{
        //         username:preValue.username,
        //         password:value
        //     }
        // })
    }

    const handleLogin = ()=>{
        fetch('http://localhost:5000/login',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                username: contact.username,
                password: contact.password
            })
        })
        .then(response=>response.json())
        .then(data => {
            console.log(data)
            if(data === 'success'){
                window.location.href="http://localhost:3000/Task"
            }
        })
        .catch(err => {
            console.log('Errors:'+err)
        })
    }

    const handleRegister = ()=>{
        fetch('http://localhost:5000/register',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                username: contact.username,
                password: contact.password
            })
        })
        .then(response=>response.json())
        .then(
            data => console.log(data)
        )
        .catch(err => {
            console.log('Errors:'+err)
        })
    }

    // const handleUserChange = (event)=>{
    //     const value = event.target.value
    //     setUsername(value)
    // }

    // const handlePassChange = (event)=>{
    //     const value = event.target.value
    //     setPassword(value)
    // }

    return <div className='header-div'>
        <Greeting
            htext={contact.username}
            ptext={contact.password}
        />

        <Input 
            name='username'
            type='text'
            placeholder='username'
            onChange={handleChange}
            value={contact.username}
        />

        <br></br>

        <Input 
            name='password'
            type='password'
            placeholder='password'
            onChange={handleChange}
            value={contact.password}
        />

        <br></br>
		
		<Button 
           type ='submit'
           text='Login'
           onClick = {handleLogin}
		/>

        <br></br>
        <br></br>
        
        <Button 
           type ='submit'
           text='Register'
           onClick = {handleRegister}
		/>  
    </div>
}

export default Login