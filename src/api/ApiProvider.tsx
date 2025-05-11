import React, { createContext, useContext } from 'react';
import { CraftableClient } from './CraftableClient';

const ApiContext = createContext(new CraftableClient());
export default function ApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiClient = new CraftableClient();
  return (
    <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>
  );
}

export function useApi() {
  return useContext(ApiContext);
}
