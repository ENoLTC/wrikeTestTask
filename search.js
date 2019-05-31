// бинарный поиск с предварительной сортировкой
const search = (val, arr) => {
  const newArr = arr.sort(function (a, b) {
    return a - b;
  });
  let firstIndex = 0; // первый индекс массива
  let lastIndex = newArr.length - 1; // последний индекс массива
  let position; // искомая позиция числа
  let found = false; // статус поиска
  let mid; // середина массива

  while (found === false && firstIndex <= lastIndex) {
    mid = Math.floor((firstIndex + lastIndex) / 2);
    if (newArr[mid] == val) {
      found = true;
      position = mid;
    } else if (newArr[mid] > val) { // значение в нижней части массива
      lastIndex = mid - 1;
    } else {  // значение в верхней части массива
      firstIndex = mid + 1;
    }
  }

  return position ? position : 'Элемент отсутствует';
}

// Тест подтверждающий корректную работу функции
const test = (arr, val, res) => search(val, arr) == res;
test([3, 6, 7, 2, 9, 1], 3, 2);