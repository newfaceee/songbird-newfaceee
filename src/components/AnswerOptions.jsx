import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { setRound, setRoundWon } from '../redux/actions/game';
import BirdDetails from './BirdDetails';

const AnswerOptions = () => {
  const dispatch = useDispatch();
  const [birdDetails, setBirdDetails] = React.useState(null);
  const [currentScore, setCurrentScore] = React.useState(5);

  const rightAnswerAudioRef = React.useRef(null);
  const wrongAnswerAudioRef = React.useRef(null);

  const { currentQuestion: answerOptions, round, isRoundWon } = useSelector(
    (state) => state
  );

  const listItemRef = React.useRef(null);

  React.useEffect(() => {
    const spanItems = listItemRef.current.querySelectorAll('span');
    for (const span of spanItems) {
      span.className = 'answer-options__state';
    }
  }, [round]);

  const handleOptionClick = (evt, answerOption) => {
    if (isRoundWon) {
      setBirdDetails(answerOption);
      return;
    }
    const className = 'answer-options__state';
    const stateIndicator = evt.target.querySelector(`.${className}`);

    setBirdDetails(answerOption);

    if (
      answerOption.rightAnswer &&
      !Array.from(stateIndicator.classList).includes(`${className}--right`)
    ) {
      // this if statement checks, if user clicked rightAnswer and
      // this click was first time on this option, then end round and update
      // score
      stateIndicator.classList.add(`${className}--right`);
      // states
      dispatch(setRoundWon(currentScore));
      setCurrentScore(5);
      // console.log();
      rightAnswerAudioRef.current.autoplay = true;
    } else if (
      // this if statement checks, if user clicked wrongAnswer(!) and
      // this click was first time on this option, then update the score
      !answerOption.rightAnswer &&
      !Array.from(stateIndicator.classList).includes(`${className}--wrong`)
    ) {
      stateIndicator.classList.add(`${className}--wrong`);
      setCurrentScore(currentScore - 1);
      wrongAnswerAudioRef.current.play();

      wrongAnswerAudioRef.current.play().catch((err) => {
        console.log(err);
      });
    }
  };
  const handleNextRoundClick = () => {
    dispatch(setRound());
    setBirdDetails(null);
  };
  return (
    <main className="main">
      <section className="main__item answer-options">
        <ul ref={listItemRef} className="answer-options__list">
          {answerOptions &&
            answerOptions.map((answerOption, index) => {
              return (
                <li
                  onClick={(evt) => {
                    handleOptionClick(evt, answerOption);
                  }}
                  key={`${answerOption.name}_${index}`}
                  className="answer-options__item"
                >
                  <span className="answer-options__state"></span>
                  {answerOption.name}
                </li>
              );
            })}
        </ul>
      </section>
      <section className="main__item answer-details">
        <BirdDetails birdDetails={birdDetails} />
      </section>
      <button
        onClick={handleNextRoundClick}
        className={classNames('main__item', 'next-round-btn', {
          'next-round-btn--enabled': isRoundWon,
        })}
      >
        Next Level
      </button>
      <audio
        preload="metadata"
        ref={rightAnswerAudioRef}
        className="right-answer-sound"
      >
        <source src="../assets/audio/bad.mp3" />
      </audio>
      <audio ref={wrongAnswerAudioRef} className="wrong-answer-sound">
        <source src="../assets/audio/bad.mp3" />
      </audio>
    </main>
  );
};

export default AnswerOptions;
