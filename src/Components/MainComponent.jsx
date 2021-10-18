import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { db } from "./firebase_db";
import { auth } from './firebase_db';
import Loader from "./Loader/Loader";
import { Input, Button, Col, Row } from "antd";

export const MainComponent = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    db.collection("todos")
    .doc(auth.currentUser.email)
    .onSnapshot(snapshot => {
      try{
      setTodos(snapshot.data().todos);
      setFlag(true);
      }
      catch(err)
      {
        setTodos(["Start adding Tasks!"]);
        setFlag(true);
      }
    })
  }, []);

  const update = (e) => {
    setInput(e.target.value);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    let pre = [input];
    try{
    pre = await db.collection("todos").doc(auth.currentUser.email).get().then(data => {
      return data.data().todos;
    });
    pre.push(input);
  }
  catch(err){}
    db.collection("todos").doc(auth.currentUser.email).set({
      todos: pre
    })
    setInput("");
  };
  return (
    <div>
      <h1>{auth.currentUser.email.substr(0, auth.currentUser.email.length-10)}</h1>
      <form onSubmit={addTodo}>
        <Row justify="center">
          <Col md={16} lg={16} sm={16} xs={20}>
            <Input
              placeholder="Enter any task..."
              required
              style={{
                marginBottom: "10px",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}
              value={input}
              onChange={update}
              type="text"
            />
          </Col>
          <Col md={12} lg={12} sm={16} xs={20}>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Col>
        </Row>
      </form>
      <Row justify="center">
        {!flag? (
          <Loader />
        ) : (
          todos.map((todo, index) => {
            return (
              <Col key={index} style={{ margin: "20px 20px" }}>
                <Todo todo={todo} />
              </Col>
            );
          })
        )}
      </Row>
    </div>
  );
};
