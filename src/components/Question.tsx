import React, { useReducer } from 'react';
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
  Box,
  Typography,
  Button,
} from '@material-ui/core';
import PokeType from 'classes/PokeType';
import pokeTypes, { randomPokeType } from 'data/PokeTypes';
import Option from 'components/Option';
import {
  getQuestionData, randomQuestionType, scoreTypeQuestion,
} from 'helpers/question';

const styles = (theme: Theme) => createStyles({
  button: {
    display: 'block',
    margin: '2rem auto',
    maxWidth: 600,
    width: '100%',
  },
  result: {
    fontSize: '1.25rem',
    fontWeight: theme.typography.fontWeightBold,
    lineHeight: 'normal',
    margin: '0 auto 1rem',
    maxWidth: 300,
    textAlign: 'center',
  },
  correct: {
    color: theme.palette.success.main,
  },
  incorrect: {
    color: theme.palette.error.main,
  },
  correctLeadin: {
    lineHeight: 'normal',
    margin: '-0.5rem auto 0.5rem',
    maxWidth: 300,
    textAlign: 'center',
  },
  correctList: {
    display: 'flex',
    margin: '0 auto 1rem',
    maxWidth: 300,
    padding: 0,
    textAlign: 'center',
  },
  correctItem: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  correctItemSelected: {
    color: theme.palette.success.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    height: '1rem',
  },
  options: {
    columnGap: '1rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gridTemplateRows: 'auto',
    rowGap: '1rem',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(6, 1fr)',
    },
  },
  pick: {
    color: theme.palette.text.secondary,
    marginBottom: '1rem',
    textAlign: 'center',
  },
  question: {
    fontSize: '3rem',
    lineHeight: 'normal',
    margin: '1rem',
    textAlign: 'center',
  },
  root: {
    margin: '0 auto',
    maxWidth: 1200,
    padding: '0 1rem 1rem',
    [theme.breakpoints.up('md')]: {
      padding: '0 2rem 2rem',
    },
  },
});

const useStyles = makeStyles(styles);

interface Props {
  updateScore: (results: Results) => void;
}

interface State {
  answers: Array<PokeType>,
  isPerfect: boolean,
  isSubmitted: boolean,
  key: Array<PokeType>,
  pokeType: PokeType,
  question: JSX.Element,
  results: [number, number],
}

const initialPokemon = randomPokeType();
const initialQuestionData = getQuestionData(
  randomQuestionType(), initialPokemon,
);

const initialState: State = {
  answers: [],
  isPerfect: false,
  isSubmitted: false,
  key: initialQuestionData.key,
  pokeType: initialPokemon,
  question: initialQuestionData.question,
  results: [0, 0],
};

const questionReducer = (state: State, action: QuestionAction):State => {
  const { key, question } = ['load', 'new'].includes(action.type) ? getQuestionData(
    randomQuestionType(),
    randomPokeType(),
  ) : { key: state.key, question: state.question };

  switch (action.type) {
    case 'load':
      return {
        ...state,
        key,
        question,
      };

    case 'new':
      return {
        ...state,
        key,
        question,
        isPerfect: false,
        isSubmitted: false,
        answers: [],
        results: [0, 0],
      };

    case 'submit':
      return {
        ...state,
        isPerfect: action.results[0] === action.results[1],
        isSubmitted: true,
        results: action.results,
      };

    case 'add answer':

      return {
        ...state,
        answers: [...state.answers, action.answer] as Array<PokeType>,
      };

    case 'remove answer':
      return {
        ...state,
        answers: state.answers.filter((answer) => answer !== action.answer),
      };

    default:
      return state;
  }
};

const Question: React.FC<Props> = ({ updateScore }: Props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [state, dispatch] = useReducer(questionReducer, initialState);

  const {
    answers, key, question, isPerfect, isSubmitted, pokeType, results,
  } = state;

  const handleSubmit = () => {
    const newResults = scoreTypeQuestion({
      answers,
      key,
    });
    updateScore(newResults);
    dispatch({ type: 'submit', results: newResults });
  };

  const handleNext = () => {
    dispatch({ type: 'new' });
  };

  const remaining = key.length - answers.length;

  return (
    <Box className={classes.root} component="article">
      <Typography variant="h1" className={classes.question}>
        {question}
      </Typography>
      {isSubmitted ? (
        <Typography
          className={`
              ${classes.result}
              ${classes[isPerfect ? 'correct' : 'incorrect']}
            `}
        >
          {isPerfect
            ? 'Perfect!'
            : `You got ${results[0]} out of ${results[1]}`}
        </Typography>
      ) : (
        <Typography className={classes.pick}>
          {remaining > 0 ? `Pick ${remaining} more` : 'Good luck!'}
        </Typography>
      )}

      <Box className={classes.options}>
        {pokeTypes
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((type) => (
            <Option
              isCorrect={isSubmitted && key.includes(type)}
              isSubmitted={isSubmitted}
              key={type.name + pokeType.name}
              pokeType={type}
              answers={answers}
              disabled={answers.length >= key.length}
              dispatch={dispatch}
            />
          ))}
      </Box>

      <Button
        size="large"
        className={classes.button}
        variant="contained"
        color={isSubmitted ? 'secondary' : 'primary'}
        onClick={isSubmitted ? handleNext : handleSubmit}
        disabled={!isSubmitted && answers.length < key.length}
      >
        {isSubmitted ? 'Next' : 'Check answers'}
      </Button>
    </Box>
  );
};

export default Question;
