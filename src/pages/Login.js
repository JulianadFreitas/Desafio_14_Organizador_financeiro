import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import MainLayout from '../layouts/MainLayout';
import UserContext from '../contexts/UserContext';
import { 
  Field,
  Label,
  Input,
  Error,
  Button,
  StyledLink
} from '../components/common/Components';

export default function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const history = useHistory();
  const { setUserData } = useContext(UserContext);

  function signIn (event) {
    event.preventDefault();
    setLoading(true);

    const request = axios.post('http://localhost:4000/api/users/sign-in', {
      email,
      password
    });

    request.then(res => {
      setUserData({
        token: res.data.token
      });

      history.push('/');
    });

    request.catch(() => {
      setError('Email e/ou senha inválidos!');
      setLoading(false);
    });
  }

  return (
    <MainLayout>
      <form onSubmit={signIn}>
        <Field>
          <Label>Email</Label>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </Field>
        <Field>
          <Label>Senha</Label>
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </Field>
        {
          error && <Error>{ error }</Error>
        }
        <Button type="submit" disabled={loading}>
          Login
        </Button>
      </form>
      <StyledLink to="/sign-up">Não tem conta?</StyledLink>
    </MainLayout>
  );
}
