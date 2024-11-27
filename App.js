import React from 'react';
import Routes from "./src/routes.js"
import { SQLiteProvider } from 'expo-sqlite';
import { initDatabase} from './src/database/useDatabase.js';

export default function App() {
  const onInit = async (db) => {
    await initDatabase(db);
  };

  return (
    <SQLiteProvider databaseName="agendamentos.db" onInit={onInit}>
      <Routes />
    </SQLiteProvider>
  );
}