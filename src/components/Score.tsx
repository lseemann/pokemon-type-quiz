import React from 'react';
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
  Box,
  Typography,
} from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  active: {},
  correct: {
    color: theme.palette.success.main,
  },
  incorrect: {
    color: theme.palette.error.main,
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: theme.typography.fontWeightLight,
    lineHeight: 1,
    textTransform: 'uppercase',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
    },
  },
  score: {
    fontSize: '2rem',
    fontWeight: 900,
    lineHeight: 1,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      rowGap: '3rem',
    },
  },
  scoreBox: {
    textAlign: 'center',
    width: '50%',
  },
  root: {
    display: 'flex',
    margin: '1rem auto',
    maxWidth: 300,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      /* tablet portrait */
    },
    [theme.breakpoints.up('md')]: {
      /* tablet landscape */
    },
    [theme.breakpoints.up('lg')]: {
      /* desktop */
    },
  },
});

const useStyles = makeStyles(styles);

interface Props {
  score: [number, number];
}

const Foo: React.FC<Props> = ({ score }: Props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [correct, outOf] = score;

  return (
    <Box
      className={`
        ${classes.root}
        ${outOf > 0 ? classes.active : ''}
      `}
      display="flex"
    >
      <Box className={classes.scoreBox}>
        <Typography
          className={`
          ${classes.score}
          ${classes.correct}
        `}
        >
          {correct}
        </Typography>
        <Typography className={classes.label}>Correct</Typography>
      </Box>
      <Box className={classes.scoreBox}>
        <Typography
          className={`
          ${classes.score}
          ${classes.incorrect}
        `}
        >
          {outOf - correct}
        </Typography>
        <Typography className={classes.label}>Wrong</Typography>
      </Box>
    </Box>
  );
};

export default Foo;
