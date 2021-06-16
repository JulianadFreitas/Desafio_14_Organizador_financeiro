import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import MainLayout from '../layouts/MainLayout';
import { 
  Field,
  Label,
  Input,
  Error,
  Button,
  StyledLink
} from '../components/common/Components';

export default function Login () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const history = useHistory();

  function signUp (event) {
    event.preventDefault();
    setLoading(true);

    const request = axios.post('http://localhost:4000/api/users/sign-up', {
      name,
      email,
      password,
      confirmPassword
    });

    request.then(() => {
      alert('Cadastrado com sucesso! Por favor, faça login.');
      history.push('/login');
    });

    request.catch(() => {
      setError('Erro ao fazer login! Verifique seus dados.');
      setLoading(false);
    });
  }

  return (
    <MainLayout>
      <form onSubmit={signUp}>
        <Field>
          <Label>Nome</Label>
          <Input type="text" value={name} onChange={e => setName(e.target.value)} />
        </Field>
        <Field>
          <Label>Email</Label>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </Field>
        <Field>
          <Label>Senha</Label>
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </Field>
        <Field>
          <Label>Repita sua Senha</Label>
          <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} invalid={password !== confirmPassword} />
        </Field>
        {
          error && <Error>{ error }</Error>
        }
        <Button type="submit" disabled={loading}>
          Cadastrar
        </Button>
      </form>
      <StyledLink to="/login">Já tem uma conta?</StyledLink>
    </MainLayout>
  );
}
