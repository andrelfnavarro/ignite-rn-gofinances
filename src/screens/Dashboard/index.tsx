import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { FormTransactionTypes } from '../../components/Form/TransactionTypeButton';

import { HighlightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  LogoutIcon,
  HightlightCardList,
  Transactions,
  TransactionsTitle,
  TransactionsList,
  LoaderContainer,
} from './styles';

export interface TransactionsListDataProps extends TransactionCardProps {
  id: string;
}

interface Highlight {
  amount: string;
  lastTransaction: string;
}

interface HighlightsDataProps {
  entries: Highlight;
  expenses: Highlight;
  total: Highlight;
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<TransactionsListDataProps[]>(
    []
  );
  const [highlightsData, setHighlightsData] = useState<HighlightsDataProps>(
    {} as HighlightsDataProps
  );
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const componentJustMounted = useRef(true);

  const { user, signOut } = useAuth();

  const getLastTransactionDate = (
    collection: TransactionsListDataProps[],
    type: FormTransactionTypes
  ) => {
    const filteredCollection = collection.filter(
      transaction => transaction.type === type
    );

    if (filteredCollection.length === 0) {
      return 0;
    }

    const lastTransactionDate = new Date(
      Math.max.apply(
        Math,
        filteredCollection.map(transaction =>
          new Date(transaction.date).getTime()
        )
      )
    );

    return `${lastTransactionDate.toLocaleDateString('pt-BR', {
      month: 'long',
      day: '2-digit',
    })} `;
  };

  const loadStoredTransactions = async () => {
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const storedInfo = await AsyncStorage.getItem(dataKey);

    const transactions = storedInfo ? JSON.parse(storedInfo) : [];

    let entriesAmount = 0;
    let expensesAmount = 0;

    const transactionsFormatted: TransactionsListDataProps[] = transactions.map(
      (item: TransactionsListDataProps) => {
        if (item.type === 'positive') {
          entriesAmount += +item.amount;
        } else if (item.type === 'negative') {
          expensesAmount += +item.amount;
        }

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date));

        return {
          ...item,
          amount,
          date,
        };
      }
    );

    setTransactions(transactionsFormatted);

    const lastEntriesTransaction = getLastTransactionDate(
      transactions,
      'positive'
    );
    const lastExpensesTransaction = getLastTransactionDate(
      transactions,
      'negative'
    );
    const totalInterval =
      lastExpensesTransaction === 0
        ? 'Não há transações'
        : `01 a ${lastExpensesTransaction}`;

    const total = entriesAmount - expensesAmount;

    setHighlightsData({
      entries: {
        amount: entriesAmount.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction:
          lastEntriesTransaction === 0
            ? 'Não há transações'
            : `Última entrada dia ${lastEntriesTransaction}`,
      },
      expenses: {
        amount: expensesAmount.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction:
          lastExpensesTransaction === 0
            ? 'Não há transações'
            : `Última saída dia ${lastExpensesTransaction}`,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval,
      },
    });

    setLoading(false);
  };

  useEffect(() => {
    loadStoredTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!componentJustMounted.current) {
        loadStoredTransactions();
      }

      componentJustMounted.current = false;
    }, [])
  );

  return (
    <Container>
      {loading ? (
        <LoaderContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoaderContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />

                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>

              <BorderlessButton onPress={signOut}>
                <LogoutIcon name="power" />
              </BorderlessButton>
            </UserWrapper>
          </Header>

          <HightlightCardList>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightsData.entries.amount}
              lastTransaction={highlightsData.entries.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightsData.expenses.amount}
              lastTransaction={highlightsData.expenses.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightsData.total.amount}
              lastTransaction={highlightsData.total.lastTransaction}
            />
          </HightlightCardList>

          <Transactions>
            <TransactionsTitle>Listagem</TransactionsTitle>

            <TransactionsList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
