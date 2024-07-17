import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  useColorScheme,
} from 'react-native';

type ExpenseFormProps = {
  onAddExpense: (description: string, amount: string) => void;
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({onAddExpense}) => {
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

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
      <TextInput
        style={[styles.input, {color: isDarkMode ? '#FFF' : '#000'}]}
        value={description}
        placeholder="Enter expense description"
        placeholderTextColor="#888"
        onChangeText={setDescription}
      />
      <TextInput
        style={[styles.input, {color: isDarkMode ? '#FFF' : '#000'}]}
        value={amount}
        placeholder="Enter amount"
        placeholderTextColor="#888"
        keyboardType="numeric"
        onChangeText={setAmount}
      />
      <Button title="Add Expense" onPress={handleAddExpense} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderRadius: 5,
  },
});

export default ExpenseForm;
