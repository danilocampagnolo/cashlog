import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const database_name = 'test.db';
// const database_version = '1.0';
// const database_displayname = 'SQLite Test Database';
// const database_size = 200000;

export const getDBConnection = async () => {
  return SQLite.openDatabase({
    name: database_name,
    location: 'default',
  });
};

export const createExpensesTable = async (db: SQLite.SQLiteDatabase) => {
  const query = `
  CREATE TABLE IF NOT EXISTS Expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT,
      amount REAL,
      date TEXT
  );`;
  await db.executeSql(query);
};

export const addExpense = async (
  db: SQLite.SQLiteDatabase,
  description: string,
  amount: number,
  date: string,
) => {
  const query = `INSERT INTO Expenses (description, amount, date) VALUES (?, ?, ?)`;
  await db.executeSql(query, [description, amount, date]);
};

export const getExpenses = async (db: SQLite.SQLiteDatabase) => {
  const query = `SELECT * FROM Expenses`;
  const results = await db.executeSql(query);
  let expenses: {
    id: number;
    description: string;
    amount: number;
    date: string;
  }[] = [];
  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      expenses.push(result.rows.item(i));
    }
  });
  return expenses;
};

export const updateExpense = async (
  db: SQLite.SQLiteDatabase,
  id: number,
  description: string,
  amount: number,
  date: string,
) => {
  const query = `UPDATE Expenses SET description = ?, amount = ?, date = ? WHERE id = ?`;
  await db.executeSql(query, [description, amount, date, id]);
};

export const deleteExpense = async (db: SQLite.SQLiteDatabase, id: number) => {
  const query = `DELETE FROM Expenses WHERE id = ?`;
  await db.executeSql(query, [id]);
};

export const closeDB = async (db: SQLite.SQLiteDatabase) => {
  await db.close();
};
