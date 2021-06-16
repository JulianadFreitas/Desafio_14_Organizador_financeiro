import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  color: #333;

  &::after {
    content: ':';
  }
`;

export const Input = styled.input`
  padding: 16px;
  border: 1px solid ${props => props.invalid ? '#DC3545' : '#CCC'};
  background-color: ${props => props.invalid ? '#DC354533' : '#FFF'};
  border-radius: 5px;
  margin-bottom: 15px;
`;

export const Button = styled.button`
  background-color: ${props => props.backgroundColor || '#28A745'};
  padding: 20px;
  border-radius: 5px;
  color: #FFF;
  border: none;
  width: 100%;
  opacity: ${props => props.disabled ? '0.7' : '1'};
  cursor: ${props => props.disabled ? 'inherit': 'pointer'};
  text-transform: uppercase;
  font-size: 16px;
`;

export const StyledLink = styled(Link)`
  text-align: center;
  display: block;
  margin: 20px 0 0;
  color: #007BFF;
`;

export const Error = styled.div`
  margin: 10px 0;
  color: #DC3545;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;