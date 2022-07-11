export const order = (array, ascending = true, key) => {
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