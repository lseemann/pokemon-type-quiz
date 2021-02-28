import React, { useState } from 'react';
import Question from 'components/Question';
import theme from 'theme';
import {
  createStyles, ThemeProvider, makeStyles, Box,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Score from 'components/Score';

const styles = () => createStyles({
  content: {
    backgroundColor: '#fefefe',
    margin: '1rem 0',
    maxWidth: 1400,
    width: 'calc(100vw - 2rem)',
    [theme.breakpoints.up('sm')]: {
      width: 'calc(100vw - 4rem)',
    },
  },
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    minHeight: '100vh',
  },
});

const useStyles = makeStyles(styles);

function App() {
  const [score, setScore] = useState<[number, number]>([0, 0]);
  const classes = useStyles();

  const updateScore = (results: Results) => {
    const [correct, outOf] = results;
    const [currentCorrect, currentOutOf] = score;
    setScore([correct + currentCorrect, outOf + currentOutOf]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.root}>
        <Box className={classes.content}>
          <Score score={score} />
          <Question updateScore={updateScore} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
