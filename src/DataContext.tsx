import React, { createContext, useContext } from 'react';

export interface ResultsType {
    subject: string;
    group: string;
    grade: string;
}

export interface DataContextType {
    results: ResultsType[];
    setResults: React.Dispatch<React.SetStateAction<ResultsType[]>>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('context not found');
    }
    return context;
};