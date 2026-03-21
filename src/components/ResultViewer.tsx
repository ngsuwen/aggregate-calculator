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

export default function ResultViewer() {
  const { results, setResults, open, setOpen } = useDataContext();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [aggregateType, setAggregateType] = useState<string>('');

  function removeSubject(result:ResultsType): void {
    setResults(results.filter(function(value) { 
        return value !== result 
    }))
  }

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
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography>{result.subject}</Typography>
            </Grid>
            <Grid size={2}>
              <Typography>{result.group}</Typography>
            </Grid>
            <Grid size={2}>
              <Typography>{result.grade}</Typography>
            </Grid>
          </Grid>
        </Box>
      </ListItem>
      )
    }
  )

  const selectAggregateType = (event: SelectChangeEvent) => {
    setAggregateType(event.target.value as string);
  };

  return (
    <Box sx={{ width: 360 }}>
      <List>
        {getResults}
      </List>
      <Divider />
      <Stack direction="column" sx={{alignItems: "center"}}> 
        <Button startIcon={<AddIcon />} sx = {{marginTop: 2}} disableRipple onClick={handleOpen}>
          Add Subject
        </Button> 
        <FormControl variant="standard" fullWidth sx = {{marginTop: 2}}>
          <InputLabel id="demo-simple-select-standard-label">Select Aggregate Type</InputLabel>  
          <Select value={aggregateType} onChange={selectAggregateType}>
            <MenuItem value="1">B4</MenuItem>
            <MenuItem value="2">ELB3</MenuItem>
            <MenuItem value="3">ELB4-A</MenuItem>
          </Select>
        </FormControl>
        <Typography sx = {{marginTop: 3}}>
          Net Aggregate Score: 5
        </Typography>
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
