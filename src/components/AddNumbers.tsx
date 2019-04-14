var AddNumbers = function(cellValue: string, id: number){
        var removePlus = cellValue.substr(1)
        var arrayOfCells = removePlus.split('+')
        var firstCellLetters = arrayOfCells[0].replace(/[^a-zA-Z]+/g, '');
        var firstCellNumbers = arrayOfCells[0].match(/\d+/g);
        var secondCellLetters = arrayOfCells[1].replace(/[^a-zA-Z]+/g, '');
        var secondCellNumbers = arrayOfCells[1].match(/\d+/g);
    
        var key1 = `[${firstCellLetters.toUpperCase()}][${firstCellNumbers}]`;
        var key2 = `[${secondCellLetters.toUpperCase()}][${secondCellNumbers}]`
    
        var result = [];
        if (key1 !== id.toString()) {
          result.push(key1)
        }
        if (key2 !== id.toString()) {
          result.push(key2)
        }
        
    
        return result;
      
  }
export default AddNumbers
