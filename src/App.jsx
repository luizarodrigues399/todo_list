import { useState } from 'react'
import style from './App.module.css'
import NewTodo from './Components/NewTodo'
import Search from './Components/Search'
import Todos from './Components/Todos'
import Filter from './Components/Filter'

function App() {
  const dados = [{
      id:1,
      text: "criar funcionalidade x no sistema",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id:2,
      text: "Ir pra academia",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id:3,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
    }]

  const selectOptions = [{
    id: 1,
    text: 'Trabalho'
  }, 
  {
    id: 2,
    text: "Pessoal"
  },
  {
    id: 3, 
    text: "Estudos"
  }]

  const [data, setData] = useState(dados)
  const [selectFilter, setSelectFilter] = useState("-")
  const [inputSearch, setInputSearch] = useState("")
  const [orderBy, setOrderBy] = useState("ASC")

  const addTodo = (todo, select) => {
    const newTodo = [ 
      ...data, 
      {
        id: Math.floor(Math.random() * 1000),
        text: todo, 
        category: select,
        isCompleted: false,
      }
    ]

    setData(newTodo);
  }

  const removeTodo = (id) =>{

    const newTodoFiltered = data.filter((dado)=> dado.id != id)

    setData(newTodoFiltered)
  }

  const completeTodo = (id) =>{
    const newTodoComplete = data.map(
      (dado) => dado.id == id ? {... dado, isCompleted : !dado.isCompleted } : dado
    );

    setData(newTodoComplete)
  }

  let sorted = data.sort((dado1, dado2) => (
    dado1.text.localeCompare(dado2.text)
  ));

  if (orderBy == "DESC"){
    sorted = sorted.reverse();
  }

  return (
      <div className={style.container}>
        <h1>Lista de Tarefas</h1>

        <Search inputSearch={inputSearch} setInputSearch={setInputSearch}/>

        <hr/>

        <Filter selectFilter={selectFilter} 
                setSelectFilter={setSelectFilter} 
                setOrderBy = {setOrderBy}/>

        <hr/>

          {
           sorted.filter((dado)=>(

              selectFilter == 'incompleto' ? (!dado.isCompleted ? dado : null) : 
              selectFilter == 'completo' ? (dado.isCompleted ? dado : null) : dado

            )).filter((dado)=>(
                dado.text.toLowerCase().includes(inputSearch.toLowerCase())

            )).map((dado) => (
              <Todos key = {dado.id} data = {dado} 
                removeTodo = {removeTodo} 
                completeTodo = {completeTodo}/>
            )
          )}
      
        <hr/>

        <NewTodo selectOptions = {selectOptions} addTodo = {addTodo}/>

      </div>
  )
}

export default App
