import { Col, Row } from 'antd';
import React from 'react';
import { auth, provider } from '../firebase_db';
import './Header.css';

export const Header = () => {
    const logOut = () => {
        auth.signOut();
    }

    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }
    return (
        <div>
        <Row className="head-page" align="middle">
            <Col push={1} lg={2} md={2} sm={11} xs={11} className="name">ToDo</Col>
            {auth.currentUser?
            <Col className="cnt" lg={{offset:19, span:1}} md={{offset:19, span:1}} sm={{offset:4, span:9}} xs={{offset:4, span:9}}><button onClick={logOut} className="started">Sign Out</button></Col>
            :<Col className="cnt" lg={{offset:19, span:1}} md={{offset:19, span:1}} sm={{offset:4, span:9}} xs={{offset:4, span:9}}><button onClick={signIn} className="started">Sign In</button></Col>
            }
        </Row>
        </div>
    )
}
