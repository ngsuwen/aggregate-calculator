import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useDataContext, type ResultsType } from '../DataContext';
import Modal from '@mui/material/Modal';
import SubjectSelector from './SubjectSelector';
import Stack from '@mui/material/Stack';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useEffect } from 'react';
import { ELR2B2_A_G1, ELR2B2_A_G2 } from './SubjectGroups';

export default function ResultViewer() {
  const { results, setResults, open, setOpen, SetSubjectList, subjectList } = useDataContext();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [aggregateType, setAggregateType] = useState<string>('');
  const [aggregateScore, setAggregateScore] = useState<number>(0);
  const [calculateError, setCalculateError] = useState<string>('');
  
  function removeSubject(result:ResultsType): void {
    setResults(results.filter(function(value) { 
        return value !== result 
    }))
    SetSubjectList(subjectList.map(item =>
      item.label === result.subject
        ? { ...item, disabled: false }
        : item
    ));
  }

  useEffect(() => {
      const refreshRequirements = () => {
        checkRequirements(aggregateType);
      };
      refreshRequirements();
    }, [results.length]);

  const getResults = results.map((result:ResultsType, i:number)=>{
      return (
      <ListItem
        key={i}
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={()=>removeSubject(result)}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <Box sx={{ flexGrow: 1, backgroundColor: result.selected?'#eaffc7':'#ffffff' }}>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography sx={{fontWeight: 300}}>{result.subject}</Typography>
            </Grid>
            <Grid size={2}>
              <Typography sx={{fontWeight: 300}}>{result.group}</Typography>
            </Grid>
            <Grid size={2}>
              <Typography sx={{fontWeight: 300}}>{result.grade}</Typography>
            </Grid>
          </Grid>
        </Box>
      </ListItem>
      )
    }
  )

  const selectAggregateType = (event: SelectChangeEvent) => {
    setAggregateType(event.target.value as string);
    checkRequirements(event.target.value as string);
  };

  const checkRequirements=(type:string)=>{
    if (type === 'ELR2B2-A') {
      // check enough G3
      let noOfG3 = 0;
      for (let value of results) {
        if (value.group === '3') {
          noOfG3++;
        }
      }
      if (noOfG3 >= 5) {
        calculateScore();
      } else {
        setCalculateError('not enough G3 subjects for this aggregate type')
      }
    } else {
      setCalculateError('')
    }
  }

  const calculateScore=()=>{
    let score = 0;
    let selectedSubjects = [];

    // EL
    let englishIndex = results.findIndex((value)=>value.subject === 'English')
    if (englishIndex === -1) {
      setCalculateError('please add english!');
      return;
    }
    score += results[englishIndex].score;
    selectedSubjects.push(results[englishIndex].subject);

    // check for G1
    const resultsG1 = results.filter(item => 
      ELR2B2_A_G1.includes(item.subject)
    );
    if (resultsG1.length === 0) {
      setCalculateError('missing relevant subjects');
      return;
    }
    resultsG1.sort((a, b) => b.score - a.score);
    score += resultsG1[0].score;
    selectedSubjects.push(resultsG1[0].subject);

    // check for G2
    const resultsG2 = results.filter(item => 
      ELR2B2_A_G2.includes(item.subject) && !selectedSubjects.includes(item.subject)
    );
    if (resultsG2.length === 0) {
      setCalculateError('missing relevant subjects');
      return;
    }
    resultsG2.sort((a, b) => b.score - a.score);
    score += resultsG2[0].score;
    selectedSubjects.push(resultsG2[0].subject);

    // check for B2
    const resultsB2 = results.filter(item => 
      !selectedSubjects.includes(item.subject)
    );
    resultsB2.sort((a, b) => a.score - b.score);
    score += resultsB2[0].score + resultsB2[1].score;
    console.log(score)
    console.log(resultsB2)
    selectedSubjects.push(resultsB2[0].subject)
    selectedSubjects.push(resultsB2[1].subject)
    
    setCalculateError('');
    setAggregateScore(score);

    // update selected subjects in results to true
    const newResults: ResultsType[] = results.map((item:ResultsType) => {
      if (selectedSubjects.includes(item.subject)) return {...item, selected: true};
      if (!selectedSubjects.includes(item.subject)) return {...item, selected: false};
      return item;
    });
    setResults(newResults);
  }

  return (
    <Box sx={{ minWidth: 560 }} >
      {results.length === 0? 
      ""
      :
      <>
      <List>
        <ListItem
        secondaryAction={
          <IconButton edge="end" disabled>
          </IconButton>
          }
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid size={8}>
                <Typography sx={{fontWeight: 500}}>Subject</Typography>
              </Grid>
              <Grid size={2}>
                <Typography sx={{fontWeight: 500}}>Group</Typography>
              </Grid>
              <Grid size={2}>
                <Typography sx={{fontWeight: 500}}>Grade</Typography>
              </Grid>
            </Grid>
          </Box>
        </ListItem>
        <Divider />
        {getResults}
      </List>
      <Divider />
      </>}
      <Stack direction="column" sx={{alignItems: "center", marginTop: 3}}> 
        <Button variant="outlined" startIcon={<AddIcon sx={{ color: '#3160eb' }}/>} 
        sx={{ 
          textTransform: 'none', 
          fontWeight: 400, 
          fontSize: 16,
          color: '#242222'
        }} disableRipple onClick={handleOpen}>
          {results.length === 0? "Start by adding subjects":"Add subject"}
        </Button> 
        {results.length === 0? '':
        <>
        <FormControl variant="standard" fullWidth sx = {{marginTop: 2}}>
          <InputLabel id="demo-simple-select-standard-label">Select Aggregate Type</InputLabel>  
          <Select value={aggregateType} onChange={selectAggregateType}>
            <MenuItem value="ELR2B2-A">ELR2B2-A</MenuItem>
            <MenuItem value="ELR2B2-B">ELR2B2-B</MenuItem>
            <MenuItem value="ELR2B2-C">ELR2B2-C</MenuItem>
            <MenuItem value="ELR2B2-D">ELR2B2-D</MenuItem>
          </Select>
        </FormControl>
        {calculateError !== ''?
          <Typography sx = {{marginTop: 3, fontWeight: 300, color:'#ed6464'}}>
            {calculateError}
          </Typography> : 
        aggregateScore > 0? 
          <Typography sx = {{marginTop: 3, fontWeight: 300}}>
            net aggregate score: {aggregateScore}
          </Typography> : ''
        }
        </>
        }
      </Stack>
        <Modal
          open={open}
          onClose={handleClose}
        >
        <SubjectSelector/>
        </Modal>
    </Box>
  );
}
