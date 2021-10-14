import React, { useState, useEffect } from 'react'
import { Todo } from './Todo';
import { db } from './firebase_db';
import firebase from 'firebase';

export const MainComponent = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
        })
    }, [])

    const update = (e) => {
        setInput(e.target.value);
    }

    const addTodo = (e) => {
        e.preventDefault();
        db.collection('todos').add({
            todo: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");
    }
    return (
        <div>
            <h1>Todo App</h1>
            <form onSubmit={addTodo}>
                <input type="text" onChange={update} value={input} required />
                <button type="submit">Add</button>
            </form>
            {todos.map((todo, index) => {
                return <Todo key={index} todo={todo}/>
            })}
        </div>
    )
}
