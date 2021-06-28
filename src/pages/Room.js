import { Button } from "../components/Button";
import '.././styles/room.scss'
import logoImg from '../images/logo.svg'
import { RoomCode } from "../components/RoomCode";
import {useParams} from 'react-router-dom'
import { database } from "../services/firebase";
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect, useState} from 'react'

export function Room(){
    const {user} = useContext(AuthContext)
const params = useParams()
const roomId = params.id
const [questions, setQuestions] = useState('')
const [title, setTitle] = useState('')


useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    roomRef.on('value', room => {
        const databaseRoom = room.val()
        const firebaseQuestions = databaseRoom.questions ?? {}
const parsedQuestion = Object.entries(firebaseQuestions).map(([key, value]) => {
return {
    id: key,
    content: value.content,
    author: value.author,
    isHighlighted: value.isHighlighted,
    isAnswered: value.isAnswered
}})

setTitle(databaseRoom.title)
setQuestions(parsedQuestion)

    })
},[roomId])


const [newQuestion, setNewQuenstion] = useState('')


async function handleSendQuestion(event){
    event.preventDefault()
if(newQuestion.trim()===''){
    return;
}
if(!user){
    throw new Error('voce nao fez login');
}

const question = {
    content: newQuestion,
    author: {
        name: user.name ,
        avatar: user.avatar
    },
    isHighlighted: false,
    isAnswered: false
};

await database.ref(`rooms/${roomId}/questions`).push(question);
setNewQuenstion('')
}
    return (
<div id='page-room'>

    <header>

        <div className='content'>
            <img src={logoImg} alt='letmeask'/>
           <RoomCode code={params.id}></RoomCode>
        </div>
    </header>
<main >
    <div className='room-title' >
        <h1>Sala {title}</h1>
        {questions.length > 0 && <span> {questions.length} pergunta(s)</span>}
    </div>
    <form onSubmit={handleSendQuestion} >
        <textarea 
        placeholder='O que voce quer perguntar?'
        onChange={event => setNewQuenstion(event.target.value)}
        value={newQuestion}
         />
        <div className ='form-footer'>
           {user ? (
               <div className='user-info'>
                   <img src={user.avatar}  alt={user.name}/> 
                   <span>{user.name}</span>
               </div>
           ) : (
               <span>
                Para enviar uma pergunta, <button>faça seu login</button>
            </span>
            )}
            <Button type='submit' disabled={!user} >Enviar pergunta</Button>
        </div>
    </form>

    {JSON.stringify(questions)}
</main>


</div>
        )
}