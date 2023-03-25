import { useContext } from 'react';
import { stores, storesContext } from "./stores";

export const useStores = () => useContext(storesContext);

export const useStore = <T extends keyof typeof stores>(
  store: T
): typeof stores[T] => useContext(storesContext)[store];