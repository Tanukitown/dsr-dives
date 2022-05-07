export const getMultipleRandom = (arr: Array<HTMLElement>, num: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export const range = (start: number, end: number) => {
  let myArray = [];
  for (let i = start; i <= end; i += 1) {
    myArray.push(i);
  }
  return myArray;
};

export const createDebuff = (img: string, alt: string) => {
  const elem = document.createElement("img");
  elem.src = img;
  elem.setAttribute('class', 'debuff-sizing');
  elem.setAttribute('alt', alt);
  return elem;
};

export const highJumpContainer = () => {
  const elem = document.createElement('div');
  elem.className = 'position-absolute top-50 left-50';
  elem.setAttribute('style', 'transform: translate(-30%, -60%); z-index: -1;');
  return elem;
};

export const elusiveJumpContainer = () => {
  const elem = document.createElement('div');
  elem.className = 'position-absolute top-50 left-50';
  elem.setAttribute('style', 'transform: translate(-30%, 80%); z-index: -1;');
  return elem;
};

export const spineshatterDiveContainer = () => {
  const elem = document.createElement('div');
  elem.className = 'position-absolute top-50 left-50';
  elem.setAttribute('style', 'transform: translate(-30%, -180%); z-index: -1;');
  return elem;
}

export const diveFromGrace = () => {
  const elem = document.createElement('img');
  elem.src = 'images/CircleAoE.gif';
  elem.alt = 'dive from grace';
  elem.className = 'dive-circle';
  return elem;
};
