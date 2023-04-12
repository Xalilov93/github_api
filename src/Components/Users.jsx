import * as React from 'react';
import {useEffect, useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import List from '@mui/joy/List';
import ListItem, { listItemClasses } from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Users() {
  const [open, setOpen] = React.useState(false);

    const [user, setUser] = useState({});
    let [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setMessage(event.target.value);
      };

      const handleGetUser = () => {
        setUserName(message);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          setUserName(message);
        }
      };

    useEffect(() => {
        fetch(
          `https://api.github.com/users/${userName ? userName : 'Shamsiddinov70'}`)
          .then((res) => res.json())
          .then((data)=> setUser(data));
        }, [userName]);

    
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            GitHub
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                type="text"
                id="message"
                name="message"
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onClick={handleGetUser}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />

          </Search>
        </Toolbar>
      </AppBar>
    </Box>
     
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 5 }}>
                <Card sx={{ maxWidth: 500 }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    // height="140"
                    image={user.avatar_url}
                    alt="avatar"
                    />
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="div">
                        {user.login}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        ID: {user.id}

                        </Typography>
                        <Box
                          sx={{
                            width: 320,
                            pl: '24px',
                          }}
                        >
                          <List
                            size="sm"
                            sx={(theme) => ({
                              // Gatsby colors
                              '--joy-palette-primary-plainColor': '#8a4baf',
                              '--joy-palette-neutral-plainHoverBg': 'transparent',
                              '--joy-palette-neutral-plainActiveBg': 'transparent',
                              '--joy-palette-primary-plainHoverBg': 'transparent',
                              '--joy-palette-primary-plainActiveBg': 'transparent',
                              [theme.getColorSchemeSelector('dark')]: {
                                '--joy-palette-text-secondary': '#635e69',
                                '--joy-palette-primary-plainColor': '#d48cff',
                              },

                              '--List-insetStart': '32px',
                              '--ListItem-paddingY': '0px',
                              '--ListItem-paddingRight': '16px',
                              '--ListItem-paddingLeft': '21px',
                              '--ListItem-startActionWidth': '0px',
                              '--ListItem-startActionTranslateX': '-50%',

                              [`& .${listItemButtonClasses.root}`]: {
                                borderLeft: '1px solid',
                                borderColor: 'divider',
                              },
                              [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
                                borderColor: 'currentColor',
                              },
                              [`& .${listItemClasses.nested} > .${listItemButtonClasses.root}`]: {
                                border: 'none',
                              },
                              '& [class*="startAction"]': {
                                color: 'var(--joy-palette-text-tertiary)',
                              },
                            })}
                          >
                            <ListItem
                              nested
                              sx={{ my: 1 }}
                              startAction={
                                <IconButton
                                  variant="plain"
                                  size="sm"
                                  color="neutral"
                                  onClick={() => setOpen(!open)}
                                >
                                  <KeyboardArrowDown
                                    sx={{ transform: open ? 'initial' : 'rotate(-90deg)' }}
                                  />
                                </IconButton>
                              }
                            >
                              <ListItem>
                                <Typography
                                  level="inherit"
                                  sx={{
                                    fontWeight: open ? 'bold' : undefined,
                                    color: open ? 'text.primary' : 'inherit',
                                  }}
                                >
                                  All info
                                </Typography>
                              </ListItem>
                              {open && (
                                <List sx={{ '--ListItem-paddingY': '8px' }}>
                                  <ListItem>
                                    <ListItemButton>
                                      Name: {user.name}
                                    </ListItemButton>
                                  </ListItem>
                                  <ListItem>
                                    <ListItemButton>Url: <a style={{textDecoration: 'none', color: 'black'}} href={user.url} target="_blank" rel="noopener noreferrer">{user.url}</a> </ListItemButton>
                                  </ListItem>
                                  <ListItem>
                                    <ListItemButton >Company: "{user.company}"</ListItemButton>
                                  </ListItem>
                                  <ListItem><ListItemButton>Blog: <a style={{textDecoration: 'none', color: 'black'}} href={user.blog} target="_blank" rel="noopener noreferrer">{user.blog}</a></ListItemButton></ListItem>
                                  <ListItem>
                                    <ListItemButton>Location: {user.location}</ListItemButton>
                                  </ListItem>
                                  <ListItem>
                                    <ListItemButton>Bio: {user.bio}</ListItemButton>
                                  </ListItem>
                                  <ListItem>
                                    <ListItemButton>Twitter_username: {user.twitter_username}</ListItemButton>
                                  </ListItem>
                                  <ListItem>
                                    <ListItemButton>Public_repos: {user.public_repos}</ListItemButton>
                                  </ListItem>
                                  <ListItem>
                                    <ListItemButton>Followers: {user.followers}</ListItemButton>
                                  </ListItem>
                                  <ListItem>
                                    <ListItemButton>Following: {user.following}</ListItemButton>
                                  </ListItem>
                                </List>
                              )}
                            </ListItem>

                          </List>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    
    </>
  );
}