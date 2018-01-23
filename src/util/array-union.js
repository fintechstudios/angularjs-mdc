/**
 * Returns the union of two arrays.
 *
 * @param {Array} x
 * @param {Array} y
 * @return {Array}
 */
export function arrayUnion(x = [], y = []) {
  if (y.length === 0) {
    return x;
  }

  if (x.length === 0) {
    return y;
  }

  const obj = {};
  let i;
  for (i = x.length-1; i >= 0; -- i) {
    obj[x[i]] = x[i];
  }
  for (i = y.length-1; i >= 0; -- i) {
    obj[y[i]] = y[i];
  }

  return Object.keys(obj).map((key) => obj[key]);
}
