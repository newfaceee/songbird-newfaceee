export const transformDuration = (duration) => {
  const minutes = String(Math.floor(duration / 60));
  const seconds = String(Math.floor(duration - 60 * minutes));
  return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
};

export const generateQuestion = (answerOptions) => {
  return answerOptions.map((option) => {
    const rightAnswerIndex = Math.floor(Math.random() * option.length);
    return option.map((o, index) => {
      if (index === rightAnswerIndex) {
        return Object.assign({}, o, {
          rightAnswer: 1,
        });
      }
      return Object.assign({}, o, {
        rightAnswer: 0,
      });
    });
  });
};
