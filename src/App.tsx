import './App.css'
import ResultViewer from './components/ResultViewer';
import Stack from '@mui/material/Stack';
import { type ResultsType, DataContext, type SubjectType } from './DataContext';
import { useState } from 'react';
import { Typography } from '@mui/material';

const defaultSubjectList = [
  { group: 'Language', label: 'Chinese', disabled: false },
  { group: 'Language', label: 'English', disabled: false },
  { group: 'Science', label: 'Biology', disabled: false },
  { group: 'Science', label: 'Chemistry', disabled: false }
]

function App() {
  const [results, setResults] = useState<ResultsType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [subjectList, SetSubjectList] = useState<SubjectType[]>(defaultSubjectList)
  return (
    <DataContext.Provider value={{ results, setResults, open, setOpen, subjectList, SetSubjectList }}>
     <div>
      <Stack 
        direction="column" 
        spacing={2}   
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: '80vh',
        }}
      >
        <Typography variant='h5' paddingBottom={3}>O-levels Aggregate Calculator</Typography>
        <ResultViewer/>
      </Stack>
    </div>   
    </DataContext.Provider>
  )
}

export default App
