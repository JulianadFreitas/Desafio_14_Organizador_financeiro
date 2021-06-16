import React from 'react';
import styled from 'styled-components';
import { Container } from '../components/common/Components';

export default function LoginLayout ({ children }) {
  return (
    <Container>
      <Logo>
        <img src="/assets/logo.png" />
        <h1>Gerenciador Financeiro</h1>
      </Logo>
      <Box>
        { children }
      </Box>
    </Container>
  );
}

const Logo = styled.div`
  display: flex;
  margin-bottom: 20px;
  width: 400px;
  max-width: 100%;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
    flex-shrink: 0;
    margin-right: 10px;
  }
`;

const Box = styled.div`
  background-color: #FFF;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, .05);
  width: 400px;
  max-width: 100%;
`;
