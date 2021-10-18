import React, { useState } from "react";
import "./Todo.css";
import { auth } from "./firebase_db";
import { db } from "./firebase_db";
import { Card, Button, Modal, Input } from "antd";

export const Todo = ({ todo }) => {
  const [visibility, setVisibility] = useState(false);
  const [input, setInput] = useState("");

  const showModal = () => {
    setVisibility(true);
  };

  const editTodo = async (todo) => {
    let pre = await db.collection("todos").doc(auth.currentUser.email).get()
    .then((data) => {
      return data.data().todos;
    })
    for (let i = 0; i < pre.length; i++) {
      if(pre[i] === todo)
      {
        pre[i] = input;
        break;
      }    
    }
    db.collection("todos").doc(auth.currentUser.email).update({
      todos: pre
    })
    setVisibility(false);
    setInput("");
  };

  const handleCancel = () => {
    setVisibility(false);
    setInput("");
  };

  const deleteTodo = async (todo) => {
    let pre = await db.collection("todos").doc(auth.currentUser.email).get()
    .then((data) => {
      return data.data().todos.filter((one) => one !== todo);
    })
    db.collection("todos").doc(auth.currentUser.email).update({
      todos: pre
    })
  };
  return (
    <div>
      <Card className="card-style">
        <p>{todo}</p>
        <Button
          onClick={() => showModal()}
          type="dashed"
          style={{ marginRight: "10px" }}
        >
          Edit
        </Button>
        <Button onClick={() => deleteTodo(todo)} type="danger">
          Delete
        </Button>
      </Card>
      <Modal
        title="Edit Task"
        visible={visibility}
        onOk={() => editTodo(todo)}
        onCancel={handleCancel}
      >
        <Input
        placeholder={todo}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </Modal>
    </div>
  );
};
