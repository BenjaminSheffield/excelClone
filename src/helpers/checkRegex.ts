import AddNumbers from '../components/AddNumbers';
import AddNumbersRange from 'src/components/AddNumbersRange';
import AddListener from '../components/AddListener'


function CheckRegex (state: any, cellValue: string, id: number){
    var change = {};
    change[id] = [cellValue];

    //Todo - typescript class for Regex?
    var isSumOfCells = new RegExp('^=sum\\([a-zA-Z]+\\d+:[a-zA-Z]+\\d+\\)$', 'i');    
    var isSumUsingAddition = new RegExp('^=[a-zA-Z]+\\d+\\+[a-zA-Z]+\\d+$', 'i');
        
    if (isSumOfCells.test(cellValue)) {
      var resultIds = AddNumbersRange(cellValue, id);

      resultIds.forEach(listenerId => {
        AddListener(state, change, listenerId, id);
      });

      var result = 0;
      resultIds.forEach(resultId => {
        var resultValue = parseInt(state[resultId])
        if (!isNaN(resultValue)) {
          result += resultValue;
        }         
      });

      change[id] = [result];
      change[id+"Formula"] = cellValue
    }

    if (isSumUsingAddition.test(cellValue)) {
      var resultIds = AddNumbers(cellValue, id);
      var result = 0;
      resultIds.forEach(resultId => {
        var resultState = parseInt(state[resultId])
        if (!isNaN(resultState)) {
          result += resultState;
        }  
      });
      change[id] = result;
      
      resultIds.forEach(listenerId => {
        AddListener(state, change, listenerId, id);
      });

      var formula = id + "Formula";
      change[formula] = cellValue
    }   
    
    return change;
    // setState(change, 
    //   () => this.updateListeners(id, cellValue));
  }

  export default CheckRegex