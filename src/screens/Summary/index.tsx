import React, { useEffect, useState, useRef, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/core';

import { HistoryCard } from '../../components/HistoryCard';
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  Month,
  MonthSelect,
  MonthSelectIcon,
  MonthSelectButton,
} from './styles';
import { categories } from '../../utils/categories';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  totalFormatted: string;
  total: number;
  color: string;
  percentage: string;
}

const dataKey = '@gofinances:transactions';

export function Summary() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  const theme = useTheme();
  const componentJustMounted = useRef(true);

  const handleMonthChange = (action: 'next' | 'previous') => {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }

    console.log(selectedDate);
  };

  const loadData = async () => {
    const storedData = await AsyncStorage.getItem(dataKey);
    const currentData = storedData ? JSON.parse(storedData) : [];

    console.log(currentData);

    const expenses = currentData.filter(
      (expense: TransactionData) =>
        expense.type === 'negative' &&
        new Date(expense.date).getMonth() === selectedDate.getMonth() &&
        new Date(expense.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensesTotal = expenses.reduce(
      (acc: number, expense: TransactionData) => {
        return acc + +expense.amount;
      },
      0
    );

    console.log(expensesTotal);

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expenses.forEach((expense: TransactionData) => {
        if (expense.category === category.key) {
          categorySum += +expense.amount;
        }
      });

      categorySum > 0 &&
        totalByCategory.push({
          key: category.name,
          name: category.name,
          total: categorySum,
          percentage: `${((categorySum / expensesTotal) * 100).toFixed(0)}%`,
          totalFormatted: categorySum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),

          color: category.color,
        });
    });

    setTotalByCategories(totalByCategory);
  };

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  useFocusEffect(
    useCallback(() => {
      if (!componentJustMounted.current) {
        loadData();
      }

      componentJustMounted.current = false;
    }, [])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <MonthSelect>
        <MonthSelectButton onPress={() => handleMonthChange('previous')}>
          <MonthSelectIcon name="chevron-left" />
        </MonthSelectButton>

        <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

        <MonthSelectButton onPress={() => handleMonthChange('next')}>
          <MonthSelectIcon name="chevron-right" />
        </MonthSelectButton>
      </MonthSelect>

      <ChartContainer>
        <VictoryPie
          colorScale={totalByCategories.map(category => category.color)}
          data={totalByCategories}
          x="percentage"
          y="total"
          labelRadius={64}
          style={{
            labels: {
              fontSize: RFValue(18),
              fontWeight: 'bold',
              fill: theme.colors.shape,
            },
          }}
        />
      </ChartContainer>

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 24,
        }}
      >
        {totalByCategories.map(item => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.totalFormatted}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
}
