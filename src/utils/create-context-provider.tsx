import { FC, ReactNode, createContext, useContext } from "react";

interface ProviderProps<T> {
  children: ReactNode | ReactNode[];
  value: T;
}

interface ReturnedType<T> {
  Provider: FC<ProviderProps<T>>;
  useProvider: () => T;
}

export function createContextProvider<T extends Object>(
  name: string
): ReturnedType<T> {
  const Context = createContext<T>({} as unknown as T);
  const Provider: FC<ProviderProps<T>> = ({ children, value }) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };
  const useProvider = () => {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error(`use${name} must be used within a ${name}Provider`);
    }
    return context;
  };
  return { Provider, useProvider };
}
