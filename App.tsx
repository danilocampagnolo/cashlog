import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import {
  getDBConnection,
  createExpensesTable,
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  closeDB,
} from './database/database';
import ExpenseForm from './src/components/ExpenseForm';
import ExpenseItem from './src/components/ExpenseItem';
import type {Expense} from './src/types/expense';

function App(): React.JSX.Element {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const db = await getDBConnection();
      await createExpensesTable(db);
      const allExpenses = await getExpenses(db);
      setExpenses(allExpenses);
      await closeDB(db);
    };

    console.log('Loading data');

    loadData();
  }, []);

  const handleAddOrUpdateExpense = async (
    description: string,
    amount: string,
  ) => {
    const db = await getDBConnection();
    if (editId !== null) {
      await updateExpense(
        db,
        editId,
        description,
        parseFloat(amount),
        new Date().toISOString(),
      );
      setEditId(null);
    } else {
      await addExpense(
        db,
        description,
        parseFloat(amount),
        new Date().toISOString(),
      );
    }
    const allExpenses = await getExpenses(db);
    setExpenses(allExpenses);
    await closeDB(db);
  };

  const handleDeleteExpense = async (id: number) => {
    const db = await getDBConnection();
    await deleteExpense(db, id);
    const allExpenses = await getExpenses(db);
    setExpenses(allExpenses);
    await closeDB(db);
  };

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#333' : '#FFF',
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={{padding: 20}}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Text style={[styles.title, {color: isDarkMode ? '#FFF' : '#000'}]}>
          Expense Tracker
        </Text>
        <ExpenseForm onAddExpense={handleAddOrUpdateExpense} />
        <FlatList
          data={expenses}
          renderItem={({item}) => (
            <ExpenseItem
              description={item.description}
              amount={item.amount.toString()}
              date={item.date}
              onDelete={() => handleDeleteExpense(item.id)}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
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
