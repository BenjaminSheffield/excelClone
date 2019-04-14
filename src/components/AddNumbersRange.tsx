import ColumnEnum from "../enums/ColumnEnum"

var AddNumbersRange = function(cellValue: string, id: number){
  var removeText = cellValue.substr(5);
    removeText = removeText.substring(0, removeText.length-1);
    var arrayOfCells = removeText.split(':');

    var firstCellLetters = arrayOfCells[0].replace(/[^a-zA-Z]+/g, '');
    var firstCellNumbers = arrayOfCells[0].replace(/^\D+/g, '');
    var secondCellLetters = arrayOfCells[1].replace(/[^a-zA-Z]+/g, '');
    var secondCellNumbers = arrayOfCells[1].replace(/^\D+/g, '');

    var rangeValues = [];
    if (firstCellLetters == secondCellLetters) {

      var range = parseInt(secondCellNumbers) - parseInt(firstCellNumbers) +1;
      
      for (let index = 0; index < range; index++) {
        var key = `[${firstCellLetters.toUpperCase()}][${(parseInt(firstCellNumbers) + index)}]`;
        if (key !== id.toString()) {
          rangeValues.push(key);
        }              
      }
      return rangeValues;
    }
    else if (firstCellNumbers == secondCellNumbers){
      
      for (let index = (ColumnEnum[firstCellLetters.toUpperCase()]); index <= ColumnEnum[secondCellLetters.toUpperCase()]; index++) {
        var letter = ColumnEnum[index];
        var key = `[${letter}][${parseInt(firstCellNumbers)}]`;
        rangeValues.push(key);      
      }
      return rangeValues;
    }
    return [];
  }
export default AddNumbersRange
