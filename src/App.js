import { Home } from "./pages/Home";
import {createContext, useState, useEffect} from 'react'
import{ BrowserRouter, Route, Switch} from 'react-router-dom'
import { NewRoom } from "./pages/NewRoom";
import {firebase, auth, database} from './services/firebase'
import { AuthContextProvider } from './contexts/AuthContext'
import { Room } from "./pages/Room";


function App() {
 

  
  return (
   <BrowserRouter>
   <AuthContextProvider>
     <Switch>
   <Route path='/' exact component={Home}/>
   <Route path='/rooms/new' component={NewRoom}/>
   <Route path='/rooms/:id' component={Room}/>
   </Switch>
   </AuthContextProvider>
   </BrowserRouter>
  );
}

export default App;
