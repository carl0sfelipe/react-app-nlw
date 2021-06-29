import { Button } from "../components/Button";
import '.././styles/room.scss'
import logoImg from '../images/logo.svg'
import checkImg from '../images/check.svg'
import answerImg from '../images/answer.svg'

import { RoomCode } from "../components/RoomCode";
import { Link, useParams } from 'react-router-dom'
import { database } from "../services/firebase";
//import { AuthContext } from '../contexts/AuthContext'
//import { /* useContext ,*/  useState} from 'react'
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";
import deleteImg from '../images/delete.svg'
import { useHistory } from 'react-router-dom'


export function AdminRoom(){
   // const {user} = useContext(AuthContext)
const params = useParams()
const roomId = params.id
/*const [questions, setQuestions] = useState([])
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
},[roomId]) */
const history = useHistory()

//const [newQuestion, setNewQuenstion] = useState('')
 const{title, questions} = useRoom(roomId)

console.log(questions)

async function handleEndRoom(){
    database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
    })

    history.push('/')
}


async function handleDeleteQuestion(questionId){
if(window.confirm('Tem certeza que voce desaja excluir esta pergunta')){
await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
}
 }

 
async function handleCheckQuestionAsAnswered(questionId){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isAnswered: true,
    })
    
}

async function handleHighlightQuestion(questionId){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: true,
    })

}

    return (
<div id='page-room'>

    <header>

        <div className='content'>
        <Link className='logo' to={'/'}> <img src={logoImg} alt='letmeask'/></Link>
          <div>
               <RoomCode code={params.id}></RoomCode>
           <Button isOutlined={true} onClick={handleEndRoom} > Encerrar Sala </Button>
           </div>
        </div>
    </header>
<main >
    <div className='room-title' >
        <h1>Sala {title}</h1>
        {questions.length > 0 && <span> {questions.length} pergunta(s)</span>}
    </div>
    
<div className='question-list'>
    {questions.map(question=>{
return (
    <Question
     key={question.id}
      content={question.content}
        author={question.author}
        isAnswered={question.isAnswered}
        isHighlighted={question.isHighlighted}
        > 
        

      {!question.isAnswered && (
          <>
          <button
          type='button'
          onClick={() => handleCheckQuestionAsAnswered(question.id)}
          >
              <img src={checkImg} alt='marcar como respondida'/>
          </button>
  
          <button
          type='button'
          onClick={() => handleHighlightQuestion(question.id)}
          >
              <img src={answerImg} alt='destacar'/>
          </button>
</>
          )}

        <button
        type='button'
        onClick={() => handleDeleteQuestion(question.id)}
        >
            <img src={deleteImg} alt='remover pergunta'/>
        </button>

        </Question>
)
    })} 
</div>
</main>


</div>
        )
}