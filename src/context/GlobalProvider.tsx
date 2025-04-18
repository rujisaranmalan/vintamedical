import { createContext, FC, useContext, useState } from "react";
import { ChildrenIProps } from "../interface";

export interface IGlobalState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  mainLayoutTitle: string;
  setMainLayoutTitle: (title: string) => void;
  caseData: any;
  setCaseData: (caseData: any) => void;
}

export const defaultGlobalState: IGlobalState = {
  loading: true,
  setLoading: () => {},
  mainLayoutTitle: "",
  setMainLayoutTitle: () => {},
  caseData: null,
  setCaseData: () => {},
};

const GlobalContext = createContext<IGlobalState>(defaultGlobalState);

const GlobalProvider: FC<ChildrenIProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [mainLayoutTitle, setMainLayoutTitle] = useState<string>("");

  const [caseData, setCaseData] = useState<any>(null);

  const globalContextValue: IGlobalState = {
    loading,
    setLoading,
    mainLayoutTitle,
    setMainLayoutTitle,
    caseData,
    setCaseData,
  };

  return (
    <GlobalContext.Provider value={globalContextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

function useGlobalState() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalProvider");
  }
  return context;
}

export { GlobalContext, GlobalProvider, useGlobalState };
