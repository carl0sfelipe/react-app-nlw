
import { useContext, useEffect, useState} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import {database} from '../services/firebase'

export function useRoom(roomId){
const [questions, setQuestions] = useState([])
const [title, setTitle] = useState('')
const { user } = useContext(AuthContext)


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
    isAnswered: value.isAnswered,
    likeCount: Object.values(value.likes ?? {}).length,
    likeId: Object.entries(value.likes ?? {}).find(([key,like]) => like.authorId === user?.id)?.[0],
}})

setTitle(databaseRoom.title)
setQuestions(parsedQuestion)

    })

    return () => {
        roomRef.off('value')
    }
},[roomId,user?.id])

return{questions,title}
}