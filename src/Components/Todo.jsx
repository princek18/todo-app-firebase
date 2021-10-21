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

  const editTodo = async (id) => {
    db.collection('todo')
    .doc(auth.currentUser.email)
    .collection('todos').doc(id).update({
      todo: input
    })
    setVisibility(false);
    setInput("");
  };

  const handleCancel = () => {
    setVisibility(false);
    setInput("");
  };

  const doneTodo = async (id) => {
    const user = auth.currentUser.email;

    let done = await db.collection("todo")
    .doc(user)
    .collection('todos').doc(id).get()
    .then((snap) => {
      return snap.data();
    })

    db.collection('todo')
    .doc(user)
    .collection('todos').doc(id).delete();

    let time = Date().toLocaleString();
    done['timeDone'] = time.substr(0, time.length-31);

    db.collection('todo')
    .doc(user)
    .collection('completed').add(
      done
    )
  };
  return (
    <div>
      <Card className="card-style card-todo">
      <p className="dateC">{todo.timeC}</p>
        <p>{todo.todo}</p>
        <Button
          onClick={() => showModal()}
          type="dashed"
          style={{ marginRight: "10px" }}
        >
          Edit
        </Button>
        <Button danger onClick={() => doneTodo(todo.id)}>
          Done
        </Button>
        <p className="dateC">&nbsp;</p>
      </Card>
      <Modal
        title="Edit Task"
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
