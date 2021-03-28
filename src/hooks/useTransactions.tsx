import { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import api from '../services/api';

interface ITransaction {
  id: string;
  category: string;
  title: string;
  type: string;
  value: number;
  createdAt: Date;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: ITransaction[];
  createTransaction(transaction: ITransaction): Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const loadTransactions = useCallback(async () => {
    const resp = await api.get('transactions');
    setTransactions(resp.data.transactions);
  }, []);

  const createTransaction = async (ITransactionInput: ITransaction) => {
    const resp = await api.post('/transactions', ITransactionInput);
    setTransactions((prev) => [...prev, resp.data.transaction]);
  };

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);
  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
}
