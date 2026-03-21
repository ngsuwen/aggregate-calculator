import './App.css'
import SubjectSelector from './components/SubjectSelector';
import ResultViewer from './components/ResultViewer';
import Stack from '@mui/material/Stack';
import PathTabs from './components/PathTabs';
import { type ResultsType, DataContext } from './DataContext';
import { useState } from 'react';

function App() {

  const [results, setResults] = useState<ResultsType[]>([]);

  return (
    <DataContext.Provider value={{ results, setResults }}>
     <div>
      <Stack 
        direction="column" 
        spacing={2}   
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SubjectSelector/>
        <ResultViewer/>
        <PathTabs/>
      </Stack>
    </div>   
    </DataContext.Provider>
  )
}

export default App
