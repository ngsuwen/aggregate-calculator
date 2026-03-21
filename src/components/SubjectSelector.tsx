import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDataContext } from '../DataContext';
import { useState } from 'react';

const subjectList = [
  { group: 'Language', value: 'CH', label: 'Chinese' },
  { group: 'Language', value: 'EN', label: 'English' },
  { group: 'Science', value: 'BIO', label: 'Biology' },
  { group: 'Science', value: 'CHEM', label: 'Chemistry' }
]

export default function SubjectSelector() {
  const { results, setResults } = useDataContext();
  const [ subject, setSubject ] = useState<string>();
  const [ group, setGroup ] = useState<string>();
  const [ grade, setGrade ] = useState<string>();

  function submitSubject(): void {
    if ( subject === undefined ){
      return;
    }
    if ( group === undefined ){
      return;
    }
    if ( grade === undefined ){
      return;
    }
    setResults([...results,{
      subject: subject,
      group: group,
      grade: grade
    }])
  }

  function selectSubject(sub: any): void {
    setSubject(sub.label)
  }

  function selectGroup(grp:string): void {
    setGroup(grp)
  }

  function selectGrade(grade:string): void {
    setGrade(grade)
  }


  return (
    <Card variant="outlined" sx={{ width: 360 }}>
      <Box sx={{ p: 2 }}>
        <Autocomplete
          freeSolo
          sx={{ marginBottom: 3 }}
          options={subjectList}
          groupBy={(option) => option.group}
          renderInput={(params) => <TextField {...params} label="Subject" variant="standard" />}
          renderGroup={(params) => (
            <li key={params.key}>
              {params.group}
              {params.children}
            </li>
          )}
          clearOnBlur
          onChange={(_event, value) => selectSubject(value)}
        />
        <Typography gutterBottom variant="body2">
          Select group
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip color={group === '1'?"primary":"default"} label="1" size="small" onClick={()=>selectGroup('1')}/>
          <Chip color={group === '2'?"primary":"default"} label="2" size="small" onClick={()=>selectGroup('2')}/>
          <Chip color={group === '3'?"primary":"default"} label="3" size="small" onClick={()=>selectGroup('3')}/>
        </Stack>
        <Typography gutterBottom marginTop={2} variant="body2">
          Select grade
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip color={grade === 'A'?"primary":"default"} label="A" size="small" onClick={()=>selectGrade('A')}/>
          <Chip color={grade === 'B'?"primary":"default"} label="B" size="small" onClick={()=>selectGrade('B')}/>
          <Chip color={grade === 'C'?"primary":"default"} label="C" size="small" onClick={()=>selectGrade('C')}/>
          <Chip color={grade === 'D'?"primary":"default"} label="D" size="small" onClick={()=>selectGrade('D')}/>
          <Chip color={grade === 'E'?"primary":"default"} label="E" size="small" onClick={()=>selectGrade('E')}/>
          <Chip color={grade === 'F'?"primary":"default"} label="F" size="small" onClick={()=>selectGrade('F')}/>
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Stack 
          direction="row" 
          spacing={1}
          sx={{
            justifyContent: "flex-end",
          }}
        >
          <Chip label="Cancel" size="small" />
          <Chip color="primary" label="Add Subject" size="small" onClick={()=>submitSubject()}/>
        </Stack>
      </Box>
    </Card>
  );
}
