import illustrationImg from '../images/illustration.svg'
import logoImg from '../images/logo.svg'
import googleIconImg from '../images/google-icon.svg'
import '.././styles/auth.scss'
import { Button } from '../components/Button'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useState} from 'react'
import { database } from '../services/firebase'


export function Home(){

    const history = useHistory();

const {user , singInWithGoogle } = useContext(AuthContext)

const [roomCode,setRoomCode] = useState('')


  async  function handleCreateRoom(){
  if(!user){
    await singInWithGoogle()
  }
            history.push('/rooms/new');

        

    }


async function handleJoinRoom(event){
    event.preventDefault()

    if(roomCode.trim() ==='') {
        return
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get()
    if(!roomRef.exists()){
        alert('Room does not exists.')
        return
    }
    history.push(`rooms/${roomCode}`)

}

return(
<div id="page-auth" >
<aside>
<img src={illustrationImg} alt='Perguntas e Respostas' />
    <strong>Crie salas de Q&amp;A ao-vivo </strong>
    <p>Tire as dúvidas da sua audiẽncia em tempo- real </p>



</aside>

<main>
<div className='main-content' >
<img src={logoImg} alt='logo-letmeask'/>
<button onClick={handleCreateRoom} className='create-room' >
<img src={googleIconImg} alt='google'/>

    Crie sua sala com o Google
</button>

<div className='separator' >ou entre em uma sala</div>
<form onSubmit={handleJoinRoom} >
    <input
    type='text'
    placeholder='Digite o códico da sala'
    onChange={event => setRoomCode(event.target.value)}
    value={roomCode}
    />
 
<Button type='submit' >
Entrar na sala


</Button>


</form>

</div>


</main>


</div>



)

}