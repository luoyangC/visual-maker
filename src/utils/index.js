
export { clone } from './clone.js';
export { eventBus } from './eventBus.js';

export const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

let id = 0;
export const generateID = () => {
  return id++;
};
