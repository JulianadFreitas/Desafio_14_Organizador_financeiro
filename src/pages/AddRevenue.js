import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import UserContext from '../contexts/UserContext';
import {
  Field,
  Label,
  Input,
  Button,
  StyledLink
} from '../components/common/Components';

export default function AddRevenue () {
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const { userData } = useContext(UserContext);
  const history = useHistory();

  function submitRevenue (event) {
    event.preventDefault();
    setLoading(true);

    const request = axios.post('http://localhost:4000/api/finances', {
      value,
      description,
      event_type: 'revenue'
    }, {
      headers: {
        Authorization: `Bearer ${userData.token}`
      }
    });

    request.then(() => {
      history.push('/');
    });

    request.catch(err => {
      console.error(err.response);
      alert('Erro ao adicionar receita!');
      setLoading(false);
    });
  }

  return (
    <MainLayout>
      <form onSubmit={submitRevenue}>
        <Field>
          <Label>Valor</Label>
          <Input type="number" value={value} onChange={e => setValue(e.target.value)} />
        </Field>
        <Field>
          <Label>Descrição</Label>
          <Input type="text" value={description} onChange={e => setDescription(e.target.value)} />
        </Field>
        <Button type="submit" disabled={loading}>
          Adicionar Receita
        </Button>
        <StyledLink to="/">Voltar</StyledLink>
      </form>
    </MainLayout>
  );
}
