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

const resultList = [
  { subject: 'Chinese', group: '1', grade: 'A' },
  { subject: 'English', group: '1', grade: 'B' },
  { subject: 'Chemistry', group: '1', grade: 'C' }
]

export default function ResultViewer() {
  return (
    <Box sx={{ width: 360 }}>
      <List>
        <ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          }
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid size={8}>
                <Typography>Chinese</Typography>
              </Grid>
              <Grid size={2}>
                <Typography>G1</Typography>
              </Grid>
              <Grid size={2}>
                <Typography>A</Typography>
              </Grid>
            </Grid>
          </Box>
        </ListItem>
        <ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          }
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid size={8}>
                <Typography color="blue">English</Typography>
              </Grid>
              <Grid size={2}>
                <Typography color="blue">G1</Typography>
              </Grid>
              <Grid size={2}>
                <Typography color="blue">A</Typography>
              </Grid>
            </Grid>
          </Box>
        </ListItem>
      </List>
      <Divider />
        <Button startIcon={<AddIcon />} sx = {{marginTop: 2}} disableRipple>
          Add Subject
        </Button>
    </Box>
  );
}
