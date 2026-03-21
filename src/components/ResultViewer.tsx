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

export default function ResultViewer() {
  const { results, setResults } = useDataContext();

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

  return (
    <Box sx={{ width: 360 }}>
      <List>
        {getResults}
      </List>
      <Divider />
        <Button startIcon={<AddIcon />} sx = {{marginTop: 2}} disableRipple>
          Add Subject
        </Button>
    </Box>
  );
}
