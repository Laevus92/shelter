const DIFFICULT = { easy: [100, 10], normal: [225, 25], hard: [625, 99] };
function createInterface() {
  // create wrapper
  let wrapper = document.createElement('div');
  wrapper.className = 'wrapper';
  document.querySelector('body').appendChild(wrapper);
  wrapper = document.querySelector('.wrapper');
  let main = document.createElement('main');
  main.classList = 'main';
  wrapper.appendChild(main);
  main = document.querySelector('.main');
  let aside = document.createElement('aside');
  aside.classList = 'aside';
  main.appendChild(aside);
  aside = document.querySelector('.aside');
  // create game info
  let playersStatistic = document.createElement('div');
  playersStatistic.className = 'players-statistic';
  aside.appendChild(playersStatistic);
  playersStatistic = document.querySelector('.players-statistic');
  // create avatar
  const playersAvatar = document.createElement('div');
  playersAvatar.className = 'players-statistic__avatar';
  playersStatistic.appendChild(playersAvatar);
  // create timer
  let timer = document.createElement('div');
  timer.className = 'players-statistic__timer timer';
  playersStatistic.appendChild(timer);
  timer = document.querySelector('.players-statistic__timer');
  const timerIcon = document.createElement('div');
  timerIcon.className = 'timer__icon';
  timer.appendChild(timerIcon);
  const timerValue = document.createElement('div');
  timerValue.className = 'timer__time-value';
  timerValue.textContent = '00:00';
  timer.appendChild(timerValue);
  // create steps quantity
  let steps = document.createElement('div');
  steps.className = 'players-statistic__steps steps';
  playersStatistic.appendChild(steps);
  steps = document.querySelector('.players-statistic__steps');
  const stepsIcon = document.createElement('div');
  stepsIcon.className = 'steps__icon';
  steps.appendChild(stepsIcon);
  const stepsValue = document.createElement('div');
  stepsValue.className = 'steps__quanuty';
  stepsValue.textContent = '000';
  steps.appendChild(stepsValue);
  // create mines quantity
  let mines = document.createElement('div');
  mines.className = 'players-statistic__mines mines';
  playersStatistic.appendChild(mines);
  mines = document.querySelector('.players-statistic__mines');
  const minesIcon = document.createElement('div');
  minesIcon.className = 'mines__icon';
  mines.appendChild(minesIcon);
  const minesValue = document.createElement('div');
  minesValue.className = 'mines__quanuty';
  minesValue.textContent = '000';
  mines.appendChild(minesValue);
  // create conttrol panel
  let controlPanel = document.createElement('div');
  controlPanel.className = 'control-panel';
  aside.appendChild(controlPanel);
  controlPanel = document.querySelector('.control-panel');
  let buttons = document.createElement('div');
  buttons.classList = 'control-panel__buttons';
  controlPanel.appendChild(buttons);
  buttons = document.querySelector('.control-panel__buttons');
  const muteButton = document.createElement('div');
  muteButton.classList = 'control-panel__sound-button';
  buttons.appendChild(muteButton);
  const newGameButton = document.createElement('div');
  newGameButton.classList = 'control-panel__new-game-button';
  buttons.appendChild(newGameButton);
  const recordsButton = document.createElement('div');
  recordsButton.classList = 'control-panel__record-button';
  buttons.appendChild(recordsButton);
  let level = document.createElement('div');
  level.className = 'control-panel__level level';
  controlPanel.appendChild(level);
  level = document.querySelector('.control-panel__level');
  const levelIcon = document.createElement('div');
  levelIcon.className = 'level__img';
  level.appendChild(levelIcon);
  let selector = document.createElement('select');
  selector.className = 'level__selector';
  level.appendChild(selector);
  selector = document.querySelector('.level__selector');
  const easyLevel = document.createElement('option');
  easyLevel.className = 'level__item';
  easyLevel.textContent = 'easy';
  easyLevel.value = 'easy';
  selector.appendChild(easyLevel);
  const normalLevel = document.createElement('option');
  normalLevel.className = 'level__item';
  normalLevel.textContent = 'normal';
  normalLevel.value = 'normal';
  selector.appendChild(normalLevel);
  const hardLevel = document.createElement('option');
  hardLevel.className = 'level__item';
  hardLevel.textContent = 'hard';
  hardLevel.value = 'hard';
  selector.appendChild(hardLevel);
  const customLevel = document.createElement('option');
  customLevel.className = 'level__item';
  customLevel.textContent = 'custom';
  selector.appendChild(customLevel);
  const inputWith = document.createElement('input');
  inputWith.className = 'level__input-width';
  inputWith.setAttribute('placeholder', 'fields width');
  level.appendChild(inputWith);
  const inputMines = document.createElement('input');
  inputMines.className = 'level__input-mines';
  inputMines.setAttribute('placeholder', 'mines quantity');
  level.appendChild(inputMines);
  const okButton = document.createElement('button');
  okButton.className = 'level__button';
  okButton.textContent = 'ok';
  level.appendChild(okButton);
}
createInterface();

const stepsQuantity = document.querySelector('.steps__quanuty');
const timeValue = document.querySelector('.timer__time-value');
let stepCounter = 0;
let timerId;
let timeCounter = 0;
let timerRunning = false;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createMatrix(level = DIFFICULT.easy) {
  const array = [];
  const indexesBombs = [];
  const [cellsQuantitty, bombsQuantity] = level;
  const matrixWidth = Math.sqrt(cellsQuantitty);
  const matrixHeight = matrixWidth;

  for (let i = 0; i < bombsQuantity; i += 1) {
    let number = getRandomNumber(0, cellsQuantitty);
    if (!indexesBombs.includes(number)) {
      indexesBombs.push(number);
    } else {
      while (indexesBombs.includes(number)) {
        number = getRandomNumber(0, cellsQuantitty);
      }
      indexesBombs.push(number);
    }
  }
  for (let i = 0; i < cellsQuantitty; i += 1) {
    if (indexesBombs.includes(i)) {
      array.push('B');
    } else {
      array.push(0);
    }
  }
  const matrix = [];
  for (let i = 0; i < array.length; i += matrixWidth) {
    matrix.push(array.slice(i, i + matrixWidth));
  }

  for (let i = 0; i < matrixHeight; i += 1) {
    for (let j = 0; j < matrixWidth; j += 1) {
      if (matrix[i][j] === 'B') {
        if (matrix[i][j - 1] !== undefined) {
          if (matrix[i][j - 1] !== 'B') {
            matrix[i][j - 1] += 1;
          }
        }
        if (matrix[i][j + 1] !== undefined) {
          if (matrix[i][j + 1] !== 'B') {
            matrix[i][j + 1] += 1;
          }
        }
        if (matrix[i - 1] !== undefined) {
          if (matrix[i - 1][j] !== undefined) {
            if (matrix[i - 1][j] !== 'B') {
              matrix[i - 1][j] += 1;
            }
          }
        }
        if (matrix[i - 1] !== undefined) {
          if (matrix[i - 1][j - 1] !== undefined) {
            if (matrix[i - 1][j - 1] !== 'B') {
              matrix[i - 1][j - 1] += 1;
            }
          }
        }
        if (matrix[i - 1] !== undefined) {
          if (matrix[i - 1][j + 1] !== undefined) {
            if (matrix[i - 1][j + 1] !== 'B') {
              matrix[i - 1][j + 1] += 1;
            }
          }
        }
        if (matrix[i + 1] !== undefined) {
          if (matrix[i + 1][j] !== undefined) {
            if (matrix[i + 1][j] !== 'B') {
              matrix[i + 1][j] += 1;
            }
          }
        }
        if (matrix[i + 1] !== undefined) {
          if (matrix[i + 1][j - 1] !== undefined) {
            if (matrix[i + 1][j - 1] !== 'B') {
              matrix[i + 1][j - 1] += 1;
            }
          }
        }
        if (matrix[i + 1] !== undefined) {
          if (matrix[i + 1][j + 1] !== undefined) {
            if (matrix[i + 1][j + 1] !== 'B') {
              matrix[i + 1][j + 1] += 1;
            }
          }
        }
      }
    }
  }
  console.log(matrix);
  return matrix;
}

function countStep() {
  stepCounter += 1;
  stepsQuantity.textContent = stepCounter;
}

function timer() {
  timeCounter += 1;
  if (timeCounter < 60) {
    timeValue.textContent = (`00:${timeCounter < 10 ? `0${timeCounter}` : timeCounter}`);
  } else {
    const minutes = Math.floor(timeCounter / 60);
    const secundes = timeCounter - (minutes * 60);
    timeValue.textContent = (`${minutes < 10 ? `0${minutes}` : minutes}:${secundes < 10 ? `0${secundes}` : secundes}`);
  }
}

function startTimer() {
  if (timerRunning) {
    return undefined;
  }
  timerRunning = true;
  timerId = setInterval(timer, 1000);
}

function stopTimer() {
  clearInterval(timerId)
  timerRunning = false;
}

async function createField(level = DIFFICULT.easy) {
  const [cellsQuantitty, bombsQuantity] = level;
  const fieldWith = Math.sqrt(cellsQuantitty) * (40 * (100 / 1280));
  const fieldHeight = Math.sqrt(cellsQuantitty) * (40 * (100 / 1280));
  let field = document.createElement('div');
  field.className = 'field';
  field.style.width = `${fieldWith}vw`;
  field.style.height = `${fieldHeight}vw`;
  document.querySelector('main').appendChild(field);
  field = document.querySelector('.field');
  document.querySelector('.mines__quanuty').textContent = bombsQuantity;
  for (let i = 0; i < cellsQuantitty; i += 1) {
    const randomCell = document.createElement('div');
    randomCell.className = 'field__cell';
    randomCell.style.width = `${100 / (Math.sqrt(cellsQuantitty))}%`;
    randomCell.style.height = `${100 / (Math.sqrt(cellsQuantitty))}%`;
    field.appendChild(randomCell);
  }
  const cells = document.querySelectorAll('.field__cell');
  let matrix = createMatrix(level);
  function checkCell(cell) {
    const stringNumber = Math.floor(Array.from(cells).indexOf(cell) / Math.sqrt(cellsQuantitty));
    const columnNumber = Array.from(cells).indexOf(cell)
    - (Math.sqrt(cellsQuantitty) * stringNumber);
    startTimer()
    if (Array.from(cells).every((element) => !element.classList.contains('field__cell_opened'))) {
      while (matrix[stringNumber][columnNumber] === 'B') {
        matrix = createMatrix(level);
      }
    }
    if (matrix[stringNumber][columnNumber] !== 0 && matrix[stringNumber][columnNumber]
      !== 'B' && matrix[stringNumber][columnNumber] !== undefined) {
      cell.classList.add('field__cell_opened');
      cell.textContent = matrix[stringNumber][columnNumber];
    } else if (matrix[stringNumber][columnNumber] === 0 && !cell.classList.contains('field__cell_opened')) {
      cell.classList.add('field__cell_opened');
      if (columnNumber > 0) {
        checkCell(cells[Array.from(cells).indexOf(cell) - 1]);
      }
      if (columnNumber < Math.sqrt(cellsQuantitty) - 1) {
        checkCell(cells[Array.from(cells).indexOf(cell) + 1]);
      }
      if (stringNumber > 0) {
        checkCell(cells[Array.from(cells).indexOf(cell) - Math.sqrt(cellsQuantitty)]);
      }
      if (stringNumber < Math.sqrt(cellsQuantitty) - 1) {
        checkCell(cells[Array.from(cells).indexOf(cell) + Math.sqrt(cellsQuantitty)]);
      }
    } else if (matrix[stringNumber][columnNumber] === 'B') {
      stopTimer();
      document.querySelector('.players-statistic__avatar').style.backgroundImage = 'url(/minesweeper/assets/img/png/rip.png)';
      cell.classList.add('field__cell_opened');
      cell.style.backgroundImage = 'url(/minesweeper/assets/img/png/bomb.png)';
      cell.style.backgroundColor = '#47341e';
      cells.forEach((allCell) => {
        const allStringNumber = Math.floor(Array.from(cells).indexOf(allCell)
        / Math.sqrt(cellsQuantitty));
        const allColumnNumber = Array.from(cells).indexOf(allCell)
        - (Math.sqrt(cellsQuantitty) * allStringNumber);

        if (matrix[allStringNumber][allColumnNumber] === 'B') {
          allCell.style.backgroundImage = 'url(/minesweeper/assets/img/png/bomb.png)';
          allCell.style.backgroundColor = '#47341e';
        }

        allCell.classList.add('field__cell_opened');
        allCell.removeEventListener('click', countStep);

        if (matrix[allStringNumber][allColumnNumber] !== 'B' && matrix[allStringNumber][allColumnNumber] !== 0) {
          allCell.textContent = matrix[allStringNumber][allColumnNumber];
        }
      });
    }
  }
  cells.forEach((cell) => {
    cell.addEventListener('click', (event) => {
      checkCell(event.target);
    });
  });
  // init steps counter
  cells.forEach((cell) => {
    cell.addEventListener('click', countStep);
  });
}

createField();

const levelSelector = document.querySelector('.level__selector');
levelSelector.addEventListener('change', () => {
  let field = document.querySelector('.field');
  const inputWidth = document.querySelector('.level__input-width');
  const inputMines = document.querySelector('.level__input-mines');
  const okButton = document.querySelector('.level__button');
  if (levelSelector.value !== 'custom') {
    inputWidth.classList.remove('level__input-width_active');
    inputMines.classList.remove('level__input-mines_active');
    okButton.classList.remove('level__button_active');
    if ((field) === null) {
      createField(DIFFICULT[levelSelector.value]);
    } else {
      field.remove();
      createField(DIFFICULT[levelSelector.value]);
    }
  } else {
    inputWidth.classList.add('level__input-width_active');
    inputMines.classList.add('level__input-mines_active');
    okButton.classList.add('level__button_active');
    field.remove();
    okButton.addEventListener('click', () => {
      if (inputWidth.value !== '' && inputMines.value !== '') {
        if ((inputWidth.value > 9 && inputWidth.value < 26)
        && (inputMines.value > 9 && inputMines.value < 100)) {
          field = document.querySelector('.field');
          DIFFICULT.custom = [inputWidth.value ** 2, parseInt(inputMines.value, 10)];
          if ((field) === null) {
            createField(DIFFICULT[levelSelector.value]);
          } else {
            field.remove();
            createField(DIFFICULT[levelSelector.value]);
          }
        } else {
          // eslint-disable-next-line no-alert
          alert('Ширина поля должна быть от 10 до 25!\nКоличество мин должно быть от 10 до 99!');
        }
      }
    });
  }
});
