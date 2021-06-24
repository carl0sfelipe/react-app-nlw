import { Home } from "./pages/Home";
import {createContext, useState, useEffect} from 'react'
import{ BrowserRouter, Route} from 'react-router-dom'
import { NewRoom } from "./pages/NewRoom";
import {firebase, auth, database} from './services/firebase'
import { AuthContextProvider } from './contexts/AuthContext'


function App() {
  const [user, setUser ] = useState()
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(user => {
    if(user){
      const {displayName , photoUrl, uid} = user
      if(!displayName){
        throw new Error ('Missin information from Google Account.')
      }
    setUser({
      id:uid,
      name:displayName,
      avatar:photoUrl
    })
    }
  })

return () => {
  unsubscribe()
}

}, [])

 async function singInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider()
    const result = await auth.signInWithPopup(provider)
if(result.user) {
  const {displayName , photoUrl, uid} = result.user
  if(!displayName){
    throw new Error ('Missin information from Google Account.')
  }
setUser({
  id:uid,
  name:displayName,
  avatar:photoUrl
})



}
    }


  
  return (
   <BrowserRouter>
   <AuthContextProvider>
   <Route path='/' exact component={Home}/>
   <Route path='/rooms/new' component={NewRoom}/>
   </AuthContextProvider>
   </BrowserRouter>
  );
}

export default App;
