import React from 'react'
import { db } from './firebase_db'

export const Todo = ({todo}) => {
    const deleteTodo = () => {
        db.collection('todos').doc(todo.id).delete();
    }
    return (
        <div>
            <h1 onClick={deleteTodo}>{todo.todo}</h1>
        </div>
    )
}
