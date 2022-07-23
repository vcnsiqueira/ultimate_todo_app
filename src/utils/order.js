export const order = (array, ascending = true, key) => {
  console.log(array);
  if (!array || array.length === 0) {
    return array;
  };
  return array.sort((a, b) => {
    const x = a[key].toLowerCase();
    const y = b[key].toLowerCase();
    if(x < y) {
      return ascending ? -1 : 1;
    } else {
      return ascending ? 1 : 1;
    };
  });
};