/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
  Paper,
} from '@material-ui/core';
import PokeType from 'classes/PokeType';
import { ICON_PATH } from 'data/PokeTypes';
import CheckIcon from '@material-ui/icons/Check';

const styles = (theme: Theme) => createStyles({
  checked: {
    '&:not($isSubmitted) label': {
      borderStyle: 'dashed',
      color: theme.palette.common.white,
      animation: '$checked 4s infinite',
    },
  },
  checkIcon: {
    fill: theme.palette.common.white,
    height: '1rem',
    lineHeight: 1,
    marginLeft: '0.2rem',
    width: '1rem',
    position: 'relative',
    top: '0.1rem',
  },
  disabled: {
    '& $label:hover': {
      cursor: 'default',
    },
  },
  focus: {
    '&:not($disabled)': {
      backgroundColor: theme.palette.grey[600],
      color: theme.palette.common.white,
    },
  },
  icon: {
    display: 'block',
    height: '0.8em',
    margin: '0 auto',
    width: '0.8em',
  },
  iconWrapper: {
    alignItems: 'center',
    borderRadius: '50%',
    display: 'inline-flex',
    height: '1.2rem',
    justifyItems: 'center',
    margin: '0 0.5rem 0 0',
    textAlign: 'center',
    width: '1.2rem',
  },
  input: {
    opacity: 0,
    position: 'absolute',
  },
  isCorrect: {},
  label: {
    alignItems: 'center',
    border: '2px solid transparent',
    display: 'flex',
    fontWeight: theme.typography.fontWeightBold,
    height: '1.5rem',
    lineHeight: 1,
    padding: '0.25rem',
    width: '100%',
    '&:hover': {
      cursor: 'pointer',
    },
    [theme.breakpoints.up('sm')]: {
      height: '2rem',
      padding: '0.5rem',
    },
    [theme.breakpoints.up('md')]: {
      height: '3rem',
      padding: '1rem',
    },
  },
  root: {
    padding: 0,
    position: 'relative',
  },
  isSubmitted: {
    transform: 'scale(1)',
    '&$isCorrect:not($checked)': {
      animation: '$pulse 2s infinite',
    },
    '&:not($isCorrect)': {
      opacity: 0.6,
    },
    '&:not($isCorrect):not($checked)': {
      opacity: 0.2,
    },
    '& $label:hover': {
      cursor: 'default',
    },
  },
  '@keyframes checked': {
    '0%': {
      backgroundColor: theme.palette.grey[500],
    },
    '70%': {
      backgroundColor: theme.palette.grey[400],
    },
    '100%': {
      backgroundColor: theme.palette.grey[500],
    },
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(0.98)',
    },
    '70%': {
      transform: 'scale(1.05)',
    },
    '100%': {
      transform: 'scale(0.98)',
    },
  },
});

const useStyles = makeStyles(styles);

interface Props {
  answers: Array<PokeType>;
  disabled: boolean;
  dispatch: React.Dispatch<QuestionAction>;
  isCorrect: boolean;
  isSubmitted: boolean;
  pokeType: PokeType;
}

const Option: React.FC<Props> = ({
  disabled, isCorrect, isSubmitted, pokeType, answers, dispatch,
}: Props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [focus, setFocus] = useState(false);
  const checked = answers.includes(pokeType);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: e.target.checked ? 'add answer' : 'remove answer',
      answer: pokeType,
    });
  };

  let borderColor = pokeType.color;
  let backgroundColor = theme.palette.common.white;
  let color = theme.palette.text.primary;
  let iconColor = pokeType.color;

  if (isSubmitted && checked && isCorrect) {
    backgroundColor = theme.palette.success.main;
    borderColor = theme.palette.success.main;
    color = theme.palette.common.white;
    iconColor = theme.palette.success.dark;
  } else if (isSubmitted && checked) {
    backgroundColor = theme.palette.error.main;
    borderColor = theme.palette.error.main;
    iconColor = theme.palette.error.dark;
  } else if (isSubmitted && isCorrect) {
    backgroundColor = pokeType.color;
    color = theme.palette.common.white;
    iconColor = pokeType.altColor;
  }

  return (
    <Paper
      className={`
        ${classes.root}
        ${answers.includes(pokeType) ? classes.checked : ''}
        ${isSubmitted ? classes.isSubmitted : ''}
        ${isCorrect ? classes.isCorrect : ''}
        ${focus ? classes.focus : ''}
        ${disabled ? classes.disabled : ''}
        `}
      elevation={focus && !isSubmitted && !disabled ? 1 : 4}
      onMouseUp={() => setFocus(false)}
      onMouseDown={() => setFocus(true)}
    >
      <input
        checked={answers.includes(pokeType)}
        className={classes.input}
        disabled={isSubmitted || disabled}
        id={pokeType.name}
        onChange={handleChange}
        type="checkbox"
        value={pokeType.name}
      />
      <label
        className={classes.label}
        htmlFor={pokeType.name}
        style={{ backgroundColor, borderColor, color }}
      >
        <figure
          className={classes.iconWrapper}
          style={{ backgroundColor: iconColor }}
        >
          <img
            src={`${ICON_PATH}${pokeType.icon}`}
            alt=""
            className={classes.icon}
          />
        </figure>
        {pokeType.name}
        {isSubmitted && isCorrect && checked && (
          <CheckIcon
            className={classes.checkIcon}
          />
        )}
      </label>
    </Paper>
  );
};

export default Option;
