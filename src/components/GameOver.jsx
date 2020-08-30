import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { newGame } from '../redux/actions/game';
const GameOver = () => {
  const dispatch = useDispatch();
  const { score } = useSelector((state) => state);

  const handleRestartClick = () => {
    dispatch(newGame());
  };

  return (
    <section className="game-over">
      <h1 className="game-over__title">Поздравляем!</h1>
      <p className="game-over__text">
        Вы прошли викторину и набрали {score} из 30 возможных баллов
      </p>
      <button
        onClick={handleRestartClick}
        className="game-over__restart-btn btn"
      >
        Попробовать еще раз!
      </button>
    </section>
  );
};

export default GameOver;
