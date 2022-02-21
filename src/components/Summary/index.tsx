import incomeImg from 'assets/income.svg';
import outcomeImg from 'assets/outcome.svg';
import totalImg from 'assets/total.svg';
import { useTransactions } from 'hooks/useTransactions';

import { Container } from './styles';

export function Summary() {
  const { transactions } = useTransactions();

  const summay = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'deposit') {
        return {
          ...acc,
          deposits: (acc.deposits += transaction.value),
          total: (acc.total += transaction.value),
        };
      }
      return {
        ...acc,
        withdraws: (acc.withdraws += transaction.value),
        total: (acc.total -= transaction.value),
      };
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          {Intl.NumberFormat('pt-BR', {
            currency: 'BRL',
            style: 'currency',
          }).format(summay.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={outcomeImg} alt="Saidas" />
        </header>
        <strong>
          {!!summay.withdraws && '-'}
          {Intl.NumberFormat('pt-BR', {
            currency: 'BRL',
            style: 'currency',
          }).format(summay.withdraws)}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {' '}
          {Intl.NumberFormat('pt-BR', {
            currency: 'BRL',
            style: 'currency',
          }).format(summay.total)}
        </strong>
      </div>
    </Container>
  );
}
