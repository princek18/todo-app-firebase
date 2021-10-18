import React from 'react';
import { auth, provider } from '../firebase_db';
import { Button, Row } from 'antd';
import './Login.css';

export const Login = () => {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }
    return (
        <Row className="button-signin" justify="center">
            <Button type="primary" onClick={signIn}>Sign In with Google</Button>
        </Row>
    )
}
