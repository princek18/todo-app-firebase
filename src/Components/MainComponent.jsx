import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { db } from "./firebase_db";
import { auth } from "./firebase_db";
import Loader from "./Loader/Loader";
import { Input, Button, Col, Row } from "antd";
import { CompletedTodo } from "./CompletedTodo/CompletedTodo";

export const MainComponent = () => {
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [input, setInput] = useState("");
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    db.collection("todo")
      .doc(auth.currentUser.email)
      .collection("todos")
      .orderBy('timeCreated', 'asc')
      .onSnapshot((snapshot) => {
        try{
          setTodos(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                todo: doc.data().todo,
                timeC: doc.data().timeCreated,
              };
            })
          );
        }
        catch(err){}
        setFlag(true);
      });
  }, []);

  useEffect(() => {
    db.collection("todo")
      .doc(auth.currentUser.email)
      .collection("completed")
      .orderBy('timeDone', 'desc')
      .onSnapshot((snapshot) => {
        try{
          setCompleted(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                todo: doc.data().todo,
                timeCreated: doc.data().timeCreated,
                timeDone: doc.data().timeDone
              };
            })
          );
        }
        catch(err){}
      });
  }, []);

  const update = (e) => {
    setInput(e.target.value);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    let time = Date().toLocaleString();
    let time_s = time.substr(0, time.length-31);
    db.collection('todo')
    .doc(auth.currentUser.email)
    .collection('todos').add({
      timeCreated: time_s,
      todo: input
    })
    setInput("");
  };
  return (
    <div>
      <h1>
        {auth.currentUser.email.substr(0, auth.currentUser.email.length - 10)}
      </h1>
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
        {!flag ? (
          <Loader />
        ) : (
          todos.map((todo) => {
            return (
              <Col key={todo.id} style={{ margin: "20px 20px" }}>
                <Todo todo={todo} />
              </Col>
            );
          })
        )}
      </Row>
      <h1>All Done!</h1>
      <Row justify="center">
          {completed.map((todo, index) => {
            return (
              <Col key={index} style={{ margin: "20px 20px" }}>
                <CompletedTodo todo={todo} />
              </Col>
            );
          })}
      </Row>
    </div>
  );
};
