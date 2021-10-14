import React from "react";
import './Todo.css'
import { db } from "./firebase_db";
import { Card, Button } from "antd";

export const Todo = ({ todo }) => {
  const deleteTodo = () => {
    db.collection("todos").doc(todo.id).delete();
  };
  return (
    <div>
        <Card className="card-style">
          <p>{todo.todo}</p>
          <Button onClick={deleteTodo} type="danger">Delete</Button>
        </Card>
    </div>
  );
};
