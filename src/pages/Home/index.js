import {useState} from 'react'
import { Link } from 'react-router-dom'
import './home.css'


export default function Home(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    function handleLogin(e) {
       e.preventDefault()
       if(email !== '' && password !== ''){
            alert("Campos Prenchidos...")
       }else{
            alert("Preencha todos os Campos.")
       }
    }
    return(
     <div className='home-container'>
        <h1>Lista de Tarefas</h1>
        <span>Gerencie sua agenda de forma fácil</span>
        <form className='form' onSubmit={handleLogin}>
            <input type="text"
            placeholder='Digite seu email...' 
                value={email}
                onChange={ (e) => setEmail(e.target.value)}
            />
            
            <input type="password"
            autoComplete={false}
            placeholder='*********' 
                value={password}
                onChange={ (e) => setPassword(e.target.value)}
            />
            
            <button type='submit'>Acessar</button>
        </form>
        
        <Link to="/register" className='button-link'>Não possui conta? Cadastre-se</Link>
     </div>
    )
}