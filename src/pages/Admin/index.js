
import { useState,useEffect } from 'react'
import { signOut } from 'firebase/auth'
import './admin.css'
import { auth,db } from '../../firebase.config'
import {addDoc,collection,onSnapshot,orderBy,where,query} from 'firebase/firestore'

export default function Admin(){
    
    const [tarefaInput,setTarefaInput] = useState('')
    const [user, setUser] = useState({})
    const [tarefa,setTarefa] = useState([])
    
    useEffect(() => {
        
        async function loadTarefa(){
            const userDetails = localStorage.getItem('@detailUser')
            setUser(JSON.parse(userDetails))
            
            if(userDetails){
                const data = JSON.parse(userDetails)
                const tarefaRef = collection(db,"tarefas")
                const q = query(tarefaRef,orderBy("created_at","desc"),where("userUid","==",data?.uid))
                
                const unsub = onSnapshot(q, (snapshot) =>{
                    let list = []
                    snapshot.forEach((doc) => {
                        list.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid,
                        })
                        
                        
                })
                
                console.log(list)
                        
                setTarefa(list) 
                
            })
            
        }
    }
        
        loadTarefa()
    },[])
    
    async function handleRegister(e){
        e.preventDefault()
        console.log(tarefaInput)
        
        if(tarefaInput === ''){
            alert("Preencha a tarefa.")
            return
        }
        
        
        await addDoc(collection(db,"tarefas"),{
            tarefa: tarefaInput,
            created_at: new Date(),
            userUid: user?.uid
        }).then(() => {
            console.log("Tarefa registrada")
            setTarefaInput('')
        })
        .catch(err => console.log("DEu erro"))
        
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