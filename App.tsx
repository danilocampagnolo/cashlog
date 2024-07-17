import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  StatusBar,
  useColorScheme,
} from 'react-native';
import ExpenseForm from './src/components/ExpenseForm';
import ExpenseItem from './src/components/ExpenseItem';

type Expense = {
  description: string;
  amount: string;
  date: string;
};

function App(): React.JSX.Element {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (description: string, amount: string) => {
    const newExpense: Expense = {
      description,
      amount,
      date: new Date().toLocaleString(),
    };
    setExpenses([...expenses, newExpense]);
  };

  const deleteExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#333' : '#FFF',
    flex: 1,
    padding: 16,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={[styles.title, {color: isDarkMode ? '#FFF' : '#000'}]}>
        Expense Tracker
      </Text>
      <ExpenseForm onAddExpense={addExpense} />
      <FlatList
        data={expenses}
        renderItem={({item, index}) => (
          <ExpenseItem
            description={item.description}
            amount={item.amount}
            date={item.date}
            onDelete={() => deleteExpense(index)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default App;
