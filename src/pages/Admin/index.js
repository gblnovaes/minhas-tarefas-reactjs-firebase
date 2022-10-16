
import { useState,useEffect } from 'react'
import { signOut } from 'firebase/auth'
import './admin.css'
import { auth,db } from '../../firebase.config'
import {addDoc,collection,onSnapshot,orderBy,where,query,doc,deleteDoc, updateDoc} from 'firebase/firestore'

export default function Admin(){
    
    const [tarefaInput,setTarefaInput] = useState('')
    const [user, setUser] = useState({})
    const [tarefa,setTarefa] = useState([])
    const [edit,setEdit] = useState({})
    
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
                                        
                setTarefa(list) 
                
            })
            
        }
    }
        
        loadTarefa()
    },[])
    
    async function handleRegister(e){
        e.preventDefault()
        
        if(tarefaInput === ''){
            alert("Preencha a tarefa.")
            return
        }
        
        if(edit?.id){
            handleUpdateTarefa()
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
    
    async function handleUpdateTarefa(){
           const docRef = doc(db,"tarefas",edit.id)
           await updateDoc(docRef,{
            tarefa: tarefaInput,
           }).then(() =>{
            console.log("Tarefa Atualizada")
            setTarefaInput('')
            setEdit({})
           })
           .catch(err => console.log(
            "Deu erro",
               err
           ))
           
        }
    
    async function editTarefa(item){
        console.log(item)
        setTarefaInput(item.tarefa)
        setEdit(item)
    }
    
    async function deleteTarefa(id){
        const docRef = doc(db,"tarefas",id)
        await deleteDoc(docRef)
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
        <form className='form' onSubmit={handleRegister}>
             <textarea cols='10' rows='10' placeholder='Digite sua tarefa.'
                value={tarefaInput} onChange={(e) => setTarefaInput(e.target.value)}
             />
             
                {
                    Object.keys(edit).length > 0 ? ( <button onClick={handleRegister} >Atualizar Tarefa</button>) : (<button onClick={handleRegister}>Registrar Tarefa</button>)
                }
             
             
        </form>
        
            {
                tarefa.map((item) => (
                    <article className='list' key={item.id}>
                    
                        <p>{item.tarefa}</p>
                        <div className='btn-container'>
                            <button className='btn-edit' onClick={ () => editTarefa(item)}>Editar</button>
                            <button className='btn-delete' onClick={ () => deleteTarefa(item.id) }>Concluir</button>
                        </div>
                        
                    </article>
                ))
            }
        
        <button className='btn-logout' onClick={handleLogout}>Sair</button>
        
     </div>
    )
}