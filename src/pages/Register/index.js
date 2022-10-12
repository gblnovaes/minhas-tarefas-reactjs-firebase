import {useState} from 'react'
import { Link } from 'react-router-dom'
import {auth} from '../../firebase.config'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {useNavigate}from 'react-router-dom'


export default function Home(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
        
    async function handleRegister(e) {
       e.preventDefault()
       if(email !== '' && password !== ''){
          await createUserWithEmailAndPassword(auth,email,password)
          .then(()=>{
            navigate('/admin',{replace:true})
          })
          .catch(()=>{
            console.log("Erro ao tentar cadastrar dados.")
          })
          
       }else{
            alert("Preencha todos os Campos.")
       }
    }
    return(
     <div className='home-container'>
        <h1>Cadastre-se</h1>
        <span>Efetue seu cadastro!</span>
        <form className='form' onSubmit={handleRegister}>
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
            
            <button type='submit'>Cadastre-se</button>
        </form>
        
        <Link to="/" className='button-link'>Já possui cadastro? Efetue o Login</Link>
     </div>
    )
}