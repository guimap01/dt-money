import styled from 'styled-components';
import { darken, transparentize } from 'polished';
export const Container = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;

    border: 1px solid #d7d7d7;
    background: #e7e9ee;
    font-weight: 400;
    font-size: 1rem;
    &::placeholder {
      color: var(--text-body);
    }

    & + input {
      margin-top: 1rem;
    }
  }
  button[type='submit'] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: var(--green);
    color: #fff;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const TransactionTypeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;

interface RadioBoxProps {
  isActive: boolean;
  propTypeName: string;
}

export const RadioBox = styled.button<RadioBoxProps>`
  width: 14.75rem;
  height: 4rem;
  border: 1.5px solid #d7d7d7;
  border-radius: 5px;

  background: ${(props) => {
    if (props.propTypeName === 'deposit' && props.isActive) {
      return transparentize(0.9, '#33cc95');
    }
    if (props.propTypeName === 'withdraw' && props.isActive) {
      return transparentize(0.9, '#e52e4d');
    }
  }};

  display: flex;
  align-items: center;
  justify-content: center;

  transition: border-color 0.2s;

  &:hover {
    border-color: ${darken(0.1, '#d7d7d7')};
  }

  img {
    margin-right: 1rem;
  }

  span {
    font-size: 1rem;
    color: var(--text-title);
  }
`;
