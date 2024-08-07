import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';

type ExpenseItemProps = {
  description: string;
  amount: string;
  date: string;
  onDelete: () => void;
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({
  description,
  amount,
  date,
  onDelete,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.expenseItem}>
      <View>
        <Text style={{color: isDarkMode ? '#FFF' : '#000'}}>{description}</Text>
        <Text style={{color: isDarkMode ? '#FFF' : '#000'}}>{amount}</Text>
        <Text style={{color: isDarkMode ? '#888' : '#888'}}>{date}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  buttons: {
    flexDirection: 'row',
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginRight: 8,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f00',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ExpenseItem;
