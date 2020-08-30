import { SET_NEW_GAME, SET_ROUND, SET_ROUND_WON } from '../constants';
import { generateQuestion } from '../../utils';
import { ROUND_QTY } from '../../constants';
const initialState = {
  questions: [],
  currentQuestion: [],
  round: 0,
  score: 0,
  rightAnswer: null,
  isRoundWon: false,
  isGameOver: false,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_GAME: {
      const currentQuestions = generateQuestion(action.payload);
      const newCurrentQuestion = currentQuestions[0];
      const newRightAnswer = newCurrentQuestion.find(
        (option) => option.rightAnswer === 1
      );
      return {
        ...initialState,
        questions: currentQuestions,
        currentQuestion: newCurrentQuestion,
        rightAnswer: newRightAnswer,
      };
    }
    case SET_ROUND: {
      if (state.round + 1 >= ROUND_QTY) {
        return {
          ...state,
          isGameOver: true,
        };
      } else {
        const newRound = state.round + 1 > ROUND_QTY ? 1 : state.round + 1;
        const newCurrentQuestion = state.questions[newRound];
        const newRightAnswer = newCurrentQuestion.find(
          (option) => option.rightAnswer === 1
        );
        return {
          ...state,
          currentQuestion: newCurrentQuestion,
          rightAnswer: newRightAnswer,
          round: newRound,
          isRoundWon: false,
        };
      }
    }
    case SET_ROUND_WON:
      return {
        ...state,
        isRoundWon: true,
        score: state.score + action.payload,
      };
    default:
      return state;
  }
};

export default gameReducer;
