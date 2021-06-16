import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import MainLayout from '../layouts/MainLayout';
import UserContext from '../contexts/UserContext';
import { Button } from '../components/common/Components';

export default function Home () {
  const [events, setEvents] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { userData } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    const eventsRequest = axios.get('http://localhost:4000/api/finances', {
      headers: {
        Authorization: `Bearer ${userData.token}`
      }
    });

    eventsRequest.then(res => {
      setEvents(res.data);
      console.log(res.data);
      setLoading(false);
      calculateTotal(res.data);
    });
  }, []);

  function goTo (path) {
    history.push(path);
  }

  function calculateTotal (events) {
    let total = 0;

    events.forEach(event => {
      if (event.event_type === "revenue") total += event.value;
      else total -= event.value;
    });

    setTotal(total);
  }

  return (
    <MainLayout>
      <Grid>
        <Button backgroundColor="#DC3545" onClick={() => goTo('/add-expense')}>- Despesa</Button>
        <Button onClick={() => goTo('/add-revenue')}>+ Receita</Button>
      </Grid>
      { loading && <p>Carregando dados...</p> }
      <List>
        {
          events.map((event, index) => (
            <Event key={index}>
              <Description>{ event.description }</Description>
              <Value type={event.event_type}>{ event.value }</Value>
            </Event>
          ))
        }
      </List>
      <Total positive={total >= 0}>
        { Math.abs(total) }
      </Total>
    </MainLayout>
  );
}

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Event = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #CCC;

  &:last-child {
    border-bottom: none;
  }
`;

const Description = styled.div`
  color: #333;
`;

const Value = styled.div`
  color: ${props => props.type === 'revenue' ? '#28A745' : '#DC3545'};

  &::before {
    content: '${props => props.type === `revenue` ? `+ R$` : `- R$`}';
  }
`;

const Total = styled.div`
  text-align: right;
  padding: 10px;

  color: ${props => props.positive ? '#28A745' : '#DC3545'};
  &::before {
    content: '${props => props.positive ? `+ R$` : `- R$`}';
  }
`;

const Grid = styled.div`
  display: flex;

  * {
    margin: 10px;
  }
`;
