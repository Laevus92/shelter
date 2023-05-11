const difficult = { easy: [100, 10], normal: [225, 25], hard: [625, 99] };
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

let cells = '';

function createField(level = difficult.easy) {
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
    const cell = document.createElement('div');
    cell.className = 'field__cell';
    cell.style.width = `${100 / (Math.sqrt(cellsQuantitty))}%`;
    cell.style.height = `${100 / (Math.sqrt(cellsQuantitty))}%`;
    field.appendChild(cell);
  }
  cells = document.querySelectorAll('.field__cell field');
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
      createField(difficult[levelSelector.value]);
    } else {
      field.remove();
      createField(difficult[levelSelector.value]);
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
          difficult.custom = [inputWidth.value ** 2, parseInt(inputMines.value, 10)];
          if ((field) === null) {
            createField(difficult[levelSelector.value]);
          } else {
            field.remove();
            createField(difficult[levelSelector.value]);
          }
        } else {
          // eslint-disable-next-line no-alert
          alert('Ширина поля должна быть от 10 до 25!\nКоличество мин должно быть от 10 до 99!');
        }
      }
    });
  }
});
