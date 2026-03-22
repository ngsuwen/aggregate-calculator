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
import { styled } from '@mui/system';
import { scoreChecker, scoreCheckerELMAB3, scoreCheckerITE } from './SubjectGroups';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  minWidth: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0.5,
};

const GroupHeader = styled('div')(() => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  backgroundColor: '#e0e0e0'
}));

const GroupItems = styled('ul')({
  padding: 0,
});

export default function SubjectSelector() {
  const { results, setResults, setOpen, subjectList, SetSubjectList } = useDataContext();
  const [ subject, setSubject ] = useState<string>();
  const [ group, setGroup ] = useState<string>();
  const [ grade, setGrade ] = useState<string>();
  const [ errorSub, setErrorSub ] = useState<boolean>(false);
  const [ errorGrp, setErrorGrp ] = useState<boolean>(false);
  const [ errorGrd, setErrorGrd ] = useState<boolean>(false);

  function submitSubject(): void {
    let error = false;
    if ( subject === undefined ){
      setErrorSub(true)
      error = true;
    } else {
      setErrorSub(false)
    }
    if ( group === undefined ){
      setErrorGrp(true)
      error = true;
    } else {
      setErrorGrp(false)
    }
    if ( grade === undefined ){
      setErrorGrd(true)
      error = true;
    } else {
      setErrorGrd(false)
    }
    if (error) {
      return
    }
    setResults([...results,{
      subject: subject!,
      group: group!,
      grade: grade!,
      selected: false,
      score: scoreChecker(grade!),
      scoreITE: scoreCheckerITE(grade!),
      scoreELMAB3: scoreCheckerELMAB3(grade!)
    }])
    
    setOpen(false)
    SetSubjectList(subjectList.map(item =>
      item.label === subject
        ? { ...item, disabled: true }
        : item
    ));
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
    <Card variant="outlined" sx={style}>
      <Box sx={{ p: 2 }}>
        <Typography component="span" variant="body2" sx ={{display: 'inline-block'}}>
          Select subject {errorSub? <Typography component="span" variant="body2" sx ={{color:'#ed6464'}}>* required</Typography>:''}
        </Typography>
        <Autocomplete
          freeSolo
          sx={{ marginBottom: 3 }}
          options={subjectList}
          groupBy={(option) => option.group}
          renderInput={(params) => <TextField {...params} variant="standard" />}
          renderGroup={(params) => (
            <li key={params.key}>
              <GroupHeader>{params.group}</GroupHeader>
              <GroupItems>{params.children}</GroupItems>
            </li>
          )}
          getOptionDisabled={(option) =>
            option.disabled  === true
          }
          clearOnBlur
          onChange={(_event, value) => selectSubject(value)}
        />
        <Typography component="span" variant="body2" sx ={{display: 'inline-block', mb:1}}>
          Select group {errorGrp? <Typography component="span" variant="body2" sx ={{color:'#ed6464'}}>* required</Typography>:''}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip color={group === '1'?"primary":"default"} label="1" onClick={()=>selectGroup('1')}/>
          <Chip color={group === '2'?"primary":"default"} label="2" onClick={()=>selectGroup('2')}/>
          <Chip color={group === '3'?"primary":"default"} label="3" onClick={()=>selectGroup('3')}/>
        </Stack>
        {group?
        <Typography component="span" variant="body2" sx ={{display: 'inline-block', mb:1, mt:3}}>
          Select grade {errorGrd? <Typography component="span" variant="body2" sx ={{color:'#ed6464'}}>* required</Typography>:''}
        </Typography>:''}
        {group === '3'?
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
          <Chip color={grade === 'A1'?"primary":"default"} label="A1" onClick={()=>selectGrade('A1')}/>
          <Chip color={grade === 'A2'?"primary":"default"} label="A2" onClick={()=>selectGrade('A2')}/>
          <Chip color={grade === 'B3'?"primary":"default"} label="B3" onClick={()=>selectGrade('B3')}/>
          <Chip color={grade === 'B4'?"primary":"default"} label="B4" onClick={()=>selectGrade('B4')}/>
          <Chip color={grade === 'C5'?"primary":"default"} label="C5" onClick={()=>selectGrade('C5')}/>
          <Chip color={grade === 'C6'?"primary":"default"} label="C6" onClick={()=>selectGrade('C6')}/>
          <Chip color={grade === 'D7'?"primary":"default"} label="D7" onClick={()=>selectGrade('D7')}/>
          <Chip color={grade === 'E8'?"primary":"default"} label="E8" onClick={()=>selectGrade('E8')}/>
          <Chip color={grade === 'F9'?"primary":"default"} label="F9" onClick={()=>selectGrade('F9')}/>
        </Stack> : 
        group === '2'?
        <Stack direction="row" spacing={1}>
          <Chip color={grade === '1'?"primary":"default"} label="1" onClick={()=>selectGrade('1')}/>
          <Chip color={grade === '2'?"primary":"default"} label="2" onClick={()=>selectGrade('2')}/>
          <Chip color={grade === '3'?"primary":"default"} label="3" onClick={()=>selectGrade('3')}/>
          <Chip color={grade === '4'?"primary":"default"} label="4" onClick={()=>selectGrade('4')}/>
          <Chip color={grade === '5'?"primary":"default"} label="5" onClick={()=>selectGrade('5')}/>
          <Chip color={grade === '6'?"primary":"default"} label="6" onClick={()=>selectGrade('6')}/>
        </Stack> : 
        group === '1'?
        <Stack direction="row" spacing={1}>
          <Chip color={grade === 'A'?"primary":"default"} label="A" onClick={()=>selectGrade('A')}/>
          <Chip color={grade === 'B'?"primary":"default"} label="B" onClick={()=>selectGrade('B')}/>
          <Chip color={grade === 'C'?"primary":"default"} label="C" onClick={()=>selectGrade('C')}/>
          <Chip color={grade === 'D'?"primary":"default"} label="D" onClick={()=>selectGrade('D')}/>
          <Chip color={grade === 'E'?"primary":"default"} label="E" onClick={()=>selectGrade('E')}/>
          <Chip color={grade === 'U'?"primary":"default"} label="U" onClick={()=>selectGrade('U')}/>
        </Stack> : ''
        }
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
          <Chip color="primary" label="Add Subject" onClick={()=>submitSubject()}/>
        </Stack>
      </Box>
    </Card>
  );
}
