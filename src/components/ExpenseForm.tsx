import React, {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet, useColorScheme} from 'react-native';
import CustomButton from './CustomButton';

interface ExpenseFormProps {
  onAddExpense: (description: string, amount: string) => void;
  editExpense?: {description: string; amount: string; date: string};
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onAddExpense,
  editExpense,
}) => {
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  useEffect(() => {
    if (editExpense) {
      setDescription(editExpense.description);
      setAmount(editExpense.amount);
    }
  }, [editExpense]);

  const handleAddExpense = () => {
    if (description.trim() && amount.trim()) {
      onAddExpense(description.trim(), amount.trim());
      setDescription('');
      setAmount('');
    }
  };

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, {color: isDarkMode ? '#FFF' : '#000'}]}
          value={description}
          placeholder="Description"
          placeholderTextColor="#fff"
          onChangeText={setDescription}
        />
        <TextInput
          style={[styles.input, {color: isDarkMode ? '#FFF' : '#000'}]}
          value={amount}
          placeholder="Amount"
          placeholderTextColor="#fff"
          keyboardType="numeric"
          onChangeText={setAmount}
        />
      </View>
      <View style={styles.buttonRow}>
        <CustomButton
          title="Add Expense"
          onPress={handleAddExpense}
          textColor={isDarkMode ? '#000' : '#FFF'}
          backgroundColor={isDarkMode ? '#FFF' : '#007BFF'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderRadius: 5,
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
});

export default ExpenseForm;
