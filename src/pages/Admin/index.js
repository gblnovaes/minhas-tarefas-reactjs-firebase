
import { useState } from 'react'
import { signOut } from 'firebase/auth'
import './admin.css'
import { auth } from '../../firebase.config'
export default function Admin(){
    const [tarefaInput,setTarefaInput] = useState('')
    
    function handleRegister(){
        
    } 
    
    async function handleLogout(){
        await signOut(auth)
        .catch((error)=>{
            console.log(error)
        })
    }
    
    
    return(
        <div className='admin-container'>
        <h1>Minhas Tarefas</h1>
        <span>Registre sua tarefa!</span>
        <form className='form' >
             <textarea cols='10' rows='10' placeholder='Digite sua tarefa.'
                value={tarefaInput} onChange={(e) => setTarefaInput(e.target.value)}
             />
            <button onClick={handleRegister}>Registrar Tarefa</button>
            
           
                <article className='list'>
                    
                    <p>Lorem ipsum dolor,  voluptas  </p>
                    <div>
                        <button className='btn-edit'>Editar</button>
                        <button className='btn-delete'>Concluir</button>
                    </div>
                    
                </article>
           
        </form>
        
        <button className='btn-logout' onClick={handleLogout}>Sair</button>
        
     </div>
    )
}