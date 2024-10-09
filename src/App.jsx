import React from 'react'
import GetTodo from './components/GetTodo'
import Create from './components/Create'
import { useState } from 'react'


const App = () => {
  const [todo, setTodo] = useState([]);
  

  return (
    <div>
      <Create todo={todo} setTodo={setTodo} />   
      <GetTodo  todo={todo} setTodo={setTodo} />
    </div>
  )
}

export default App

