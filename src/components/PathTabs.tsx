import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

export default function PathTabs() {
  const [value, setValue] = React.useState(2);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack direction="column" spacing={2}   sx={{justifyContent: "center", alignItems: "center" }}>
    <Stack direction="row" spacing={2} sx={{justifyContent: "space-between", marginTop: 2}}>
      
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Junior College
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              'aria-labelledby': 'basic-button',
            },
          }}
        >
          <MenuItem onClick={handleClose}>L1R5</MenuItem>
        </Menu>

        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Polytechnic
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              'aria-labelledby': 'basic-button',
            },
          }}
        >
          <MenuItem onClick={handleClose}>B4</MenuItem>
          <MenuItem onClick={handleClose}>ELB3</MenuItem>
          <MenuItem onClick={handleClose}>ELB4-A</MenuItem>
        </Menu>

        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Institution of Technical Education
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              'aria-labelledby': 'basic-button',
            },
          }}
        >
          <MenuItem onClick={handleClose}>B4</MenuItem>
          <MenuItem onClick={handleClose}>ELB3</MenuItem>
          <MenuItem onClick={handleClose}>ELB4-A</MenuItem>
        </Menu>

    </Stack>
    <Typography>
      Aggregate Score: 5
    </Typography>
    </Stack>
  );
}