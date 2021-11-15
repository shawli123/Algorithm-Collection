function quickSort (arr = []) {
  if (!arr.length) return [];
  const pointIdx = Math.floor(arr.length / 2);
  const point = arr.splice(pointIdx, 1)[0];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > point) {
      right.push(arr[i])
    } else {
      left.push(arr[i]);
    }
  }
  return quickSort(left).concat([point]).concat(quickSort(right));
}
