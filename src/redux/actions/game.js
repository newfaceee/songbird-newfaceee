import { SET_NEW_GAME, SET_ROUND, SET_ROUND_WON } from '../constants';
import DB from '../../db.json';

export const newGame = () => ({
  type: SET_NEW_GAME,
  payload: DB,
});

export const setRound = () => ({
  type: SET_ROUND,
});

export const setRoundWon = (scoreForRound) => ({
  type: SET_ROUND_WON,
  payload: scoreForRound,
});
