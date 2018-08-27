import INITIAL_GAME from './data/game';

export const getElementFromTemplate = (template) => {
  let element = document.createElement(`div`);
  element.innerHTML = template.trim();
  element = element.firstChild;
  return element;
};

export const showScreen = (screen) => {
  const main = document.querySelector(`.main`);
  main.innerHTML = ``;
  main.appendChild(screen);
};

export const changeLevel = (level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be of type number`);
  }

  if (level < 0) {
    throw new Error(`Level should not be negative value`);
  }

  const newGame = Object.assign({}, INITIAL_GAME, {
    level
  });
  return newGame;
};

export const changeLife = (lives) => {
  if (typeof lives !== `number`) {
    throw new Error(`Life should be of type number`);
  }

  const newGame = Object.assign({}, INITIAL_GAME, {
    lives
  });
  return newGame;
};

export const changeTime = (time) => {
  if (typeof time !== `number`) {
    throw new Error(`Time should be of type number`);
  }

  if (time < 0) {
    throw new Error(`Time should not be negative value`);
  }

  const newGame = Object.assign({}, INITIAL_GAME, {
    time
  });
  return newGame;
};

export const calculateScore = (answers, lives) => {
  const LONG_TIME = INITIAL_GAME.longTimeAnswer;
  const INIT_GAME_LIVES = INITIAL_GAME.lives;

  if (answers.length < 10 || lives < 0) {
    return -1;
  }

  const wrongAnswers = answers.filter((element) => !element.answer);
  if (wrongAnswers.length > 2) {
    return -1;
  }

  const answerScore = answers.reduce((score, answer) => {
    return score + (answer.time >= LONG_TIME ? 1 : 2);
  }, 0);

  const livesScore = (INIT_GAME_LIVES - lives) * 2;
  const totalScore = answerScore - livesScore;

  return totalScore;
};

export const getResultMessage = (curResult, otherResults, messages) => {
  const MESSAGE_FAIL_NO_LIVES = messages.failNoLives;
  const MESSAGE_FAIL_NO_TIME = messages.failNoTime;
  const MESSAGE_SUCCESS = messages.success;

  if (curResult.lives < 0) {
    return MESSAGE_FAIL_NO_LIVES;
  }

  if (curResult.time <= 0) {
    return MESSAGE_FAIL_NO_TIME;
  }

  otherResults.push(curResult.score);
  otherResults.sort((a, b) => b - a);

  const curPosition = otherResults.indexOf(curResult.score) + 1;
  const betterThan = (otherResults.length - curPosition) / otherResults.length * 100;
  const curMessageSuccess = MESSAGE_SUCCESS.replace(`$position`, curPosition).replace(`$others`, otherResults.length).replace(`$betterThan`, betterThan);

  return curMessageSuccess;
};

export const getWordEnding = (amount, endings) => {
  amount = Math.abs(amount);
  const cases = [2, 0, 1, 1, 1, 2];
  return endings[(amount % 100 > 4 && amount % 100 < 20) ? 2 : cases [(amount % 10 < 5) ? amount % 10 : 5]];
};
