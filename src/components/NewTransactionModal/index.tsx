import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import closeImg from 'assets/close.svg';
import incomeImg from 'assets/income.svg';
import outcomeImg from 'assets/outcome.svg';
import { v4 } from 'uuid';
import { useTransactions } from 'hooks/useTransactions';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
Modal.setAppElement('#root');

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose(): void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');
  const { createTransaction } = useTransactions();

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    const transaction = {
      id: v4(),
      type,
      title,
      value,
      category,
      createdAt: new Date(),
    };
    try {
      await createTransaction(transaction);
      setType('deposit');
      setTitle('');
      setValue(0);
      setCategory('');
      onRequestClose();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="close" />
      </button>
      <Container onSubmit={handleSubmitForm}>
        <h2>Cadastrar transação</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          type="text"
        />
        <input
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          placeholder="Valor"
          type="number"
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            propTypeName={type}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            propTypeName={type}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Categoria"
          type="text"
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
