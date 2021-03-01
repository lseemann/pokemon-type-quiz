import React, { useEffect, useState } from 'react';
import Question from 'components/Question';
import theme from 'theme';
import {
  createStyles, ThemeProvider, makeStyles, Box,
  Button,
  Paper,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Stats from 'components/Stats';

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
    alignSelf: 'center',
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
  const initialStats = {
    correct: 0,
    outOf: 0,
    currentStreak: 0,
    longestStreak: 0,
  } as Stats;

  let storedStats;
  if (localStorage.getItem('stats')) {
    storedStats = JSON.parse(localStorage.getItem('stats')!);
  }

  const [questionCount, setQuestionCount] = useState(0);
  const [stats, setStats] = useState<Stats>(
    storedStats || initialStats,
  );
  const classes = useStyles();

  const updateScore = (results: Results) => {
    const [correct, outOf] = results;
    const isPerfect = outOf > 0 && correct === outOf;
    setQuestionCount(questionCount + 1);
    gtag('event', 'count', {
      event_category: 'question',
      event_label: questionCount,
    });
    setStats({
      correct: stats.correct + correct,
      outOf: stats.outOf + outOf,
      currentStreak: isPerfect ? (stats.currentStreak += 1) : 0,
      longestStreak:
        stats.longestStreak
          + (isPerfect && (stats.currentStreak + 1 > stats.longestStreak)
            ? 1
            : 0),
    });
  };

  const handleReset = () => {
    gtag('event', 'reset', {
      event_category: 'score',
      event_label: `${stats.correct}/${stats.outOf}`,
    });
    setStats(initialStats);
  };

  useEffect(() => {
    localStorage.setItem('score', JSON.stringify(stats));
  }, [stats]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.root}>
        <Paper className={classes.content}>
          <Stats stats={stats} />
          <Question updateScore={updateScore} />
          <Button
            className={classes.resetButton}
            disabled={stats.outOf === 0}
            disableRipple
            onClick={handleReset}
          >
            Reset score
          </Button>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default App;
