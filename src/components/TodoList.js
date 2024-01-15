import React, { useState , useEffect  } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
const getLocalItems = () =>{
  let list = localStorage.getItem('lists');
  if(list){
      return JSON.parse(list);      // convert the data into javascript object
  }else{
      return [];
  }
}

function TodoList() {
   const [todos, setTodos] = useState( getLocalItems);
   useEffect(()=>{
    localStorage.setItem('lists',JSON.stringify(todos))   //convert any JS object into a string 
     },[todos]);
  
 

//add todo;

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    //console.log(...todos);
  };
//update,edit
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };
//remove
  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };
//complete function
  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  //top down priority
  const onClickUp = index=>{
    if(index>0){
      let updateTodos = [...todos];
      let temp = updateTodos[index];
      updateTodos[index]=updateTodos[index-1];
      updateTodos[index-1]=temp;
      setTodos(updateTodos);
    }
  }
  const onClickDown = index =>{
    if(index<todos.length-1){
      const updateTodos = [...todos];
      let temp = updateTodos[index];
      updateTodos[index]=updateTodos[index+1];
      updateTodos[index+1]= temp;
      setTodos(updateTodos);
    }
  }
  return (
    <>
      <h1>Task List...</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        onClickUp={onClickUp}
        onClickDown={onClickDown}
      />
    </>
  );
}

export default TodoList;