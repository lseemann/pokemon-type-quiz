import React, { useState } from 'react';
import Question from 'components/Question';
import theme from 'theme';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Score from 'components/Score';

function App() {
  const [score, setScore] = useState<[number, number]>([0, 0]);

  const updateScore = (results: Results) => {
    const [correct, outOf] = results;
    const [currentCorrect, currentOutOf] = score;
    setScore([correct + currentCorrect, outOf + currentOutOf]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Score score={score} />
      <Question updateScore={updateScore} />
    </ThemeProvider>
  );
}

export default App;
