import './App.css'
import ResultViewer from './components/ResultViewer';
import Stack from '@mui/material/Stack';
import { type ResultsType, DataContext, type SubjectType } from './DataContext';
import { useState } from 'react';
import { Typography } from '@mui/material';

const defaultSubjectList = [
  { group: 'Compulsory', label: 'English', disabled: false },
  { group: 'Humanities', label: 'Bahasa Indonesia as a Third Language', disabled: false },
  { group: 'Humanities', label: 'Chinese (Special Programme)', disabled: false },
  { group: 'Humanities', label: 'Geography', disabled: false },
  { group: 'Humanities', label: 'Higher Art', disabled: false },
  { group: 'Humanities', label: 'Higher Music', disabled: false },
  { group: 'Humanities', label: 'History', disabled: false },
  { group: 'Humanities', label: 'Humanities (Social Studies, Geography)', disabled: false },
  { group: 'Humanities', label: 'Humanities (Social Studies, History)', disabled: false },
  { group: 'Humanities', label: 'Humanities (Social Studies, Literature in Chinese)', disabled: false },
  { group: 'Humanities', label: 'Humanities (Social Studies, Literature in English)', disabled: false },
  { group: 'Humanities', label: 'Humanities (Social Studies, Literature in Malay)', disabled: false },
  { group: 'Humanities', label: 'Humanities (Social Studies, Literature in Tamil)', disabled: false },
  { group: 'Humanities', label: 'Literature in Chinese', disabled: false },
  { group: 'Humanities', label: 'Literature in English', disabled: false },
  { group: 'Humanities', label: 'Literature in Malay', disabled: false },
  { group: 'Humanities', label: 'Literature in Tamil', disabled: false },
  { group: 'Humanities', label: 'Malay (Special Programme) ', disabled: false },
  { group: 'Mathematics', label: 'Additional Mathematics', disabled: false },
  { group: 'Mathematics', label: 'Mathematics', disabled: false },
  { group: 'Science', label: 'Biology', disabled: false },
  { group: 'Science', label: 'Chemistry', disabled: false },
  { group: 'Science', label: 'Physics', disabled: false },
  { group: 'Science', label: 'Science (Chemistry, Biology)', disabled: false },
  { group: 'Science', label: 'Science (Physics, Biology)', disabled: false },
  { group: 'Science', label: 'Science (Physics, Chemistry)', disabled: false },
  { group: 'Others', label: 'Chinese', disabled: false },
  { group: 'Others', label: 'Malay', disabled: false },
  { group: 'Others', label: 'Tamil', disabled: false },
  { group: 'Others', label: 'Higher Chinese', disabled: false },
  { group: 'Others', label: 'Higher Malay', disabled: false },
  { group: 'Others', label: 'Higher Tamil', disabled: false },
  { group: 'Others', label: 'Arabic as a Third Language', disabled: false },
  { group: 'Others', label: 'Art', disabled: false },
  { group: 'Others', label: 'Bengali', disabled: false },
  { group: 'Others', label: 'Biotechnology', disabled: false },
  { group: 'Others', label: 'Burmese', disabled: false },
  { group: 'Others', label: 'Business Studies', disabled: false },
  { group: 'Others', label: 'Computing', disabled: false },
  { group: 'Others', label: 'Design & Technology', disabled: false },
  { group: 'Others', label: 'Design Studies', disabled: false },
  { group: 'Others', label: 'Drama', disabled: false },
  { group: 'Others', label: 'Economics', disabled: false },
  { group: 'Others', label: 'Electronics', disabled: false },
  { group: 'Others', label: 'Exercise and Sports Science', disabled: false },
  { group: 'Others', label: 'French', disabled: false },
  { group: 'Others', label: 'German', disabled: false },
  { group: 'Others', label: 'Gujarati', disabled: false },
  { group: 'Others', label: 'Hindi', disabled: false },
  { group: 'Others', label: 'Japanese', disabled: false },
  { group: 'Others', label: 'Music', disabled: false },
  { group: 'Others', label: 'Nutrition & Food Science', disabled: false },
  { group: 'Others', label: 'Principles of Accounts', disabled: false },
  { group: 'Others', label: 'Panjabi', disabled: false },
  { group: 'Others', label: 'Spanish', disabled: false },
  { group: 'Others', label: 'Thai', disabled: false },
  { group: 'Others', label: 'Urdu', disabled: false },
  { group: 'Religious Knowledge', label: 'Islamic Religious Knowledge', disabled: false },
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
        <Typography sx={{ 
          textTransform: 'none', 
          fontWeight: 300,
          color: '#242222'
        }} variant='h5' paddingBottom={3}>aggregate calculator</Typography>
        <ResultViewer/>
      </Stack>
    </div>   
    </DataContext.Provider>
  )
}

export default App
