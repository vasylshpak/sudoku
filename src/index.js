module.exports = function solveSudoku(matrix) {


  var stack = [],
    values = [],
    posValue;

  for (var row = 0; row < 9; row++) {
    for (var column = 0; column < 9; column++) {
      if (matrix[row][column] === 0) {
        values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        posValue = {};
        values = availableValues(matrix, column, row, values);
        if (values.length > 0) {
          posValue.tempValue = values.pop();
          posValue.column = column;
          posValue.row = row;
          posValue.availableValues = values;
          stack.push(posValue);
          matrix[row][column] = posValue.tempValue;
        } else {
          do {
            if (stack.length === 0) return matrix;
            posValue = stack.pop();
            if (posValue.availableValues.length === 0)
              matrix[posValue.row][posValue.column] = 0;
          } while (posValue.availableValues.length === 0);

          posValue.tempValue = posValue.availableValues.pop();
          column = posValue.column;
          row = posValue.row;
          stack.push(posValue);
          matrix[row][column] = posValue.tempValue;
        }
      }
    }
  }
  return matrix;
}

function availableValues(matrix, column, row, values) {
  values = availableValuesInColumn(matrix, column, values);
  values = availableValuesInRow(matrix, row, values);
  values = availableValuesInBox(matrix, column, row, values);
  return values;
}

function availableValuesInRow(matrix, row, values) {
  var index;
  matrix[row].forEach(function (elem) {
    index = values.indexOf(elem);
    if (index > -1) {
      values.splice(index, 1);
    }
  });
  return values;
}

function availableValuesInColumn(matrix, column, values) {
  var index;
  matrix.forEach(function (elem) {
    index = values.indexOf(elem[column]);
    if (index > -1) {
      values.splice(index, 1);
    }
  });
  return values;
}

function availableValuesInBox(matrix, column, row, values) {
  var index;
  column = setBox(column);
  row = setBox(row);

  for (var f = row; f < row + 3; f++) {
    for (var g = column; g < column + 3; g++) {
      index = values.indexOf(matrix[f][g]);
      if (index > -1) {
        values.splice(index, 1);
      }
    }
  }
  return values;
}

function setBox(cell) {
  if (cell < 3) return 0;
  if (cell < 6 && cell >= 3) return 3;
  return 6;

}


