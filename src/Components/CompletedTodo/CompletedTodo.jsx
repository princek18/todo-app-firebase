import React from "react";
import { Card, Button } from "antd";
import './CompletedTodo.css'
import { auth, db } from "../firebase_db";

export const CompletedTodo = ({todo}) => {
    const deleteTodo = (id) => {
        db.collection('todo')
        .doc(auth.currentUser.email)
        .collection('completed').doc(id).delete();
    }
  return (
    <div>
      <Card className="card-style card-todo-del">
        <p className="dateC">{todo.timeCreated}</p>
        <p>{todo.todo}</p>
        <Button type="danger" onClick={() => deleteTodo(todo.id)}>Delete</Button>
        <p className="dateD">{todo.timeDone}</p>
      </Card>
    </div>
  );
};
