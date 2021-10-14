import React, { useState } from "react";
import "./Todo.css";
import { db } from "./firebase_db";
import { Card, Button, Modal, Input } from "antd";

export const Todo = ({ todo }) => {
  const [visibility, setVisibility] = useState(false);
  const [input, setInput] = useState("");
  const [id, setId] = useState("");

  const showModal = (idEdit) => {
    setVisibility(true);
    setId(idEdit);
  };

  const editTodo = () => {
      db.collection('todos').doc(id).update({
          todo: input
      })
      setVisibility(false);
      setInput("");
  };

  const handleCancel = () => {
    setVisibility(false);
    setInput("");
  };

  const deleteTodo = () => {
    db.collection("todos").doc(todo.id).delete();
  };
  return (
    <div>
      <Card className="card-style">
        <p>{todo.todo}</p>
        <Button
          onClick={() => showModal(todo.id)}
          type="dashed"
          style={{ marginRight: "10px" }}
        >
          Edit
        </Button>
        <Button onClick={deleteTodo} type="danger">
          Delete
        </Button>
      </Card>
      <Modal
        title="Basic Modal"
        visible={visibility}
        onOk={() => editTodo(todo.id)}
        onCancel={handleCancel}
      >
        <Input
        placeholder={todo.todo}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </Modal>
    </div>
  );
};
