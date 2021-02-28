import React, { useEffect, useState } from 'react';
import Question from 'components/Question';
import theme from 'theme';
import {
  createStyles, ThemeProvider, makeStyles, Box,
  Button,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Score from 'components/Score';

const styles = () => createStyles({
  content: {
    backgroundColor: '#fefefe',
    display: 'flex',
    flexDirection: 'column',
    margin: '1rem 0',
    maxWidth: 1400,
    width: 'calc(100vw - 2rem)',
    [theme.breakpoints.up('sm')]: {
      width: 'calc(100vw - 4rem)',
    },
  },
  resetButton: {
    alignSelf: 'flex-end',
    color: theme.palette.text.secondary,
    margin: '0 1rem 1rem 0',
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
  const initialScore = [0, 0] as [number, number]; // [correct, outOf]
  let storedScore;
  if (localStorage.getItem('score')) {
    storedScore = JSON.parse(localStorage.getItem('score')!);
  }

  const [score, setScore] = useState<[number, number]>(
    storedScore || initialScore,
  );
  const classes = useStyles();

  const updateScore = (results: Results) => {
    const [correct, outOf] = results;
    const [currentCorrect, currentOutOf] = score;
    const newScore = [
      correct + currentCorrect, outOf + currentOutOf,
    ] as [number, number];
    setScore(newScore);
  };

  const handleReset = () => {
    gtag('event', 'reset', {
      event_category: 'score',
      event_label: `${score[0]}/${score[1]}`,
    });
    setScore(initialScore);
  };

  useEffect(() => {
    localStorage.setItem('score', JSON.stringify(score));
  }, [score]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.root}>
        <Box className={classes.content}>
          <Score score={score} />
          <Question updateScore={updateScore} />
          <Button
            className={classes.resetButton}
            disabled={score[1] === 0}
            disableRipple
            onClick={handleReset}
          >
            Reset score
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
