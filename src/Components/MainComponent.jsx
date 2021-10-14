import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { db } from "./firebase_db";
import firebase from "firebase";
import { Input, Button, Col, Row,} from "antd";

export const MainComponent = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const update = (e) => {
    setInput(e.target.value);
  };

  const addTodo = (e) => {
    e.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div>
        <form onSubmit={addTodo}>
            <Row justify="center">
                <Col md={12} lg={12} sm={16} xs={20}>
                <Input required style={{marginBottom: "10px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}} value={input} onChange={update} type="text"/>
                <Col>
                </Col>
                <Button type="primary" htmlType="submit">Add</Button>
                </Col>
            </Row>
        </form>
        <Row justify="center">
      {todos.map((todo, index) => {
        return <Col key={index} style={{margin: "20px 20px"}}><Todo todo={todo} /></Col>;
      })}
      </Row>
    </div>
  );
};
