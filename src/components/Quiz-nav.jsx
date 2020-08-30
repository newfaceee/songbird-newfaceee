import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { ROUND_NAMES } from '../constants';

const QuizNav = () => {
  const round = useSelector(({ round }) => round);
  return (
    <nav className="quiz-nav">
      <ul className="quiz-nav__list">
        {ROUND_NAMES.map((roundName, index) => {
          return (
            <li
              key={`${roundName}_${index}`}
              className={classNames('quiz-nav__item', {
                'quiz-nav__item--active': round + 1 === index + 1,
              })}
            >
              {roundName}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default QuizNav;
