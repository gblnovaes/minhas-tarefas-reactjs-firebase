import {useState} from 'react'
import { Link } from 'react-router-dom'
import './home.css'
import { auth } from '../../firebase.config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

export default function Home(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    const navigate = useNavigate()
    
    async function handleLogin(e) {
       e.preventDefault()
       if(email !== '' && password !== ''){
        await signInWithEmailAndPassword(auth,email,password)
        .then(()=>{
            //go to admin
            navigate('/admin',{replace:true})
        })
        .catch(() =>{
            console.log("Erro ao tentar fazer login")
        })    
            
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