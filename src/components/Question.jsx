import React from 'react';
import { useSelector } from 'react-redux';

import placeholder from '../assets/img/bird_placeholder.jpg';
import Audio from './Audio';

const Question = () => {
  const { rightAnswer, isRoundWon } = useSelector((state) => state);
  console.log(rightAnswer ? rightAnswer.name : '');
  return (
    <section className="question">
      <div className="question__wrap">
        <img
          className="question__image"
          src={isRoundWon ? rightAnswer.image : placeholder}
          alt="placeholder"
        />
        <div className="question__details">
          <p className="question__bird-name">
            {isRoundWon ? rightAnswer.name : '***'}
          </p>
          <div className="question__audio audio">
            <Audio audioSrc={rightAnswer ? rightAnswer.audio : ''} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Question;
