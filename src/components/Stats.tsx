import React from 'react';
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
  Box,
  Typography,
  Divider,
} from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  root: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: theme.palette.primary.dark,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.common.white,
    columnGap: '0.25rem',
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem ',
    padding: '0.25rem 0.5rem 0.5rem',
    rowGap: '0.5rem',
    [theme.breakpoints.up('sm')]: {
      /* tablet portrait */
    },
    [theme.breakpoints.up('md')]: {
      /* tablet landscape */
      columnGap: '0.5rem',
    },
    [theme.breakpoints.up('lg')]: {
      columnGap: '1rem',
      /* desktop */
    },
  },
  divider: {
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    opacity: '0.5',
    width: 1,
    height: '1.25rem',
    [theme.breakpoints.up('sm')]: {
      height: '1.5rem',
    },
  },
  dividerLarge: {
    height: '2.5rem',
    [theme.breakpoints.up('sm')]: {
      height: '3rem',
    },
  },
  stat: {
    alignSelf: 'flex-start',
    flexBasis: 0,
    flexGrow: 1,
    textAlign: 'center',
    lineHeight: 1,
  },
  score: {
    fontSize: '1.5rem',
    fontWeight: theme.typography.fontWeightBold,
    lineHeight: 1,
    marginBottom: '0.25rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.5rem',
    },
  },
  label: {
    fontSize: '0.5rem',
    fontWeight: theme.typography.fontWeightLight,
    lineHeight: 1,
    textTransform: 'uppercase',
  },
});

const useStyles = makeStyles(styles);

interface Props {
  stats: Stats;
}

const Stats: React.FC<Props> = ({ stats }: Props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const {
    correct, outOf, currentStreak, longestStreak,
  } = stats;

  return (
    <Box
      className={`
        ${classes.root}
      `}
      display="flex"
    >
      <Box className={classes.stat}>
        <Typography className={classes.score}>{correct}</Typography>
        <Typography className={classes.label}>Correct</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.stat}>
        <Typography className={classes.score}>{outOf - correct}</Typography>
        <Typography className={classes.label}>Incorrect</Typography>
      </Box>
      <Divider className={`
        ${classes.divider}
        ${classes.dividerLarge}
        `}
      />
      <Box className={classes.stat}>
        <Typography className={classes.score}>{currentStreak}</Typography>
        <Typography className={classes.label}>Current streak</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.stat}>
        <Typography className={classes.score}>{longestStreak}</Typography>
        <Typography className={classes.label}>Longest streak</Typography>
      </Box>
    </Box>
  );
};

export default Stats;
