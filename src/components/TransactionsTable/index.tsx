import { useCallback, useEffect, useState } from 'react';
import api from '../../services/api';
import { Container } from './styles';

interface ITransaction {
  id: string;
  category: string;
  title: string;
  type: string;
  value: number;
  createdAt: string;
}

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const loadTransactions = useCallback(async () => {
    const resp = await api.get('transactions');
    setTransactions(resp.data.transactions);
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);
  console.log(`transactions`, transactions);
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions?.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>R${transaction.value}</td>
                <td>{transaction.category}</td>
                <td>{transaction.createdAt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Sem transações</td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
}
