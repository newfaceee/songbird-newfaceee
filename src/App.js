import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { newGame } from "./redux/actions/game";

import "./sass/App.scss";
import DB from "./db.json";

import {
  Header,
  QuizNav,
  Question,
  AnswerOptions,
  GameOver,
} from "./components";

export const App = () => {
  const dispatch = useDispatch();
  const { isGameOver } = useSelector((state) => state);
  React.useEffect(() => {
    dispatch(newGame(DB));
  }, [dispatch]);
  if (isGameOver) {
    return (
      <div className="container">
        <Header />
        <QuizNav />
        <GameOver />
      </div>
    );
  } else {
    return (
      <div className="container">
        <Header />
        <QuizNav />
        <Question />
        <AnswerOptions />
      </div>
    );
  }
};
