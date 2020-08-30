import React from "react";
import Audio from "./Audio";

const BirdDetails = ({ birdDetails }) => {
  return (
    <div className="answer-details__wrapper">
      {birdDetails ? (
        <>
          <div className="answer-details__top">
            <img
              width="200"
              height="155"
              src={birdDetails.image}
              alt={birdDetails.name}
              className="answer-details__image"
            />
            <div className="answer-details__info">
              <p className="answer-details__item bird-name">
                {birdDetails.name}
              </p>
              <p className="answer-details__item bird-name-latin">
                {birdDetails.species}
              </p>
              <Audio audioSrc={birdDetails.audio} />
            </div>
          </div>

          <p className="answer-details__description">
            {birdDetails.description}
          </p>
        </>
      ) : (
        <React.Fragment>
          <span>Послушайте плеер</span>
          <span>Выберете птицу из списка</span>
        </React.Fragment>
      )}
    </div>
  );
};

export default BirdDetails;
