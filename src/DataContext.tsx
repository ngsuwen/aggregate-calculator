import React, { createContext, useContext } from 'react';

export interface ResultsType {
    subject: string;
    group: string;
    grade: string;
    selected: boolean;
    score: number;
}

export interface SubjectType {
    group: string;
    label: string;
    disabled: boolean;
}

export interface DataContextType {
    results: ResultsType[];
    setResults: React.Dispatch<React.SetStateAction<ResultsType[]>>;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    subjectList: SubjectType[];
    SetSubjectList: React.Dispatch<React.SetStateAction<SubjectType[]>>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('context not found');
    }
    return context;
};