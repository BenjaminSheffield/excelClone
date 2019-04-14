import * as React from "react";

// import ColumnEnum from "../enums/ColumnEnum"
import RenderTopRow from "./RenderTopRow"
import RenderSideRows from "./RenderSideRows"
import GenerateColumnName from "./GenerateColumnName"
import './Excel.css';
import AddNumbers from './AddNumbers';
import AddNumbersRange from './AddNumbersRange';

export interface Props {
  rows: number;
  columns: number;
}

interface State {
    rows: number;
    columns: number;
}

class Excel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
        rows: props.rows, 
        columns: props.columns
    };
  }

  render() {
    return (
      <div className="grid">
         <div>
             {this.RenderGrid({rows: this.state.rows, columns: this.state.columns})}
        </div>
      </div>
    );
  }
    
  //Todo - move to own component
  RenderGrid(gridLayout: Props){    
      var indents = [];
      indents.push(<RenderTopRow columns={gridLayout.columns} />);
      
      for (let j = 0; j < gridLayout.rows; j++) {
          indents.push(<form key={j}>{this.RenderCells(gridLayout.columns, j)}</form>);
      }

      return [
        <div key="wrapper" className="wrapper">         
          <div key="sidebar" className="sidebar"> 
            <RenderSideRows rows={gridLayout.rows}/>    
          </div>
          <div key="grid" className="grid" >
            {indents}
          </div>
        </div>]
  };

  //Todo - move to own component
  RenderCells(cellsToRender: number, row: number){
      var cells = [];
          for (var column = 0; column < cellsToRender; column++) {
              var columnLetters = GenerateColumnName(column)
              var id = `[${columnLetters}][${(row+1).toString()}]`;

              cells.push(<input key={id} type="text"                 
                value={this.state[id]}
                onChange={this.handleChange.bind(this, id)} 
                onBlur={this.handleCellExit.bind(this, id)}
                onFocus={this.handleCellEnter.bind(this, id)}
              />);
          }      
      return cells;
      
  }
    
  //Todo - move to own component
  handleCellExit(id: any, e: any){
    this.handleChange(id, e);

    //Todo - fix class adding - store in state 'active' classes instead
    e.target.classList.remove('enteredCell');       
    var myColumn = document.getElementById(id.replace(/[^a-zA-Z]+/g, ''))!;
    var myRow = document.getElementById(id.replace(/^\D+/g, '').slice(0, -1))!;
    myColumn.classList.remove('enteredCellParentColumn');
    myRow.classList.remove('enteredCellParentRow');

    var cell = this.state[id];
    var cellFormula = this.state[id+"Formula"];
    if (cell != undefined && cellFormula !== "") {
      e.target.value = cell[0];      
    }
    this.updateListeners(id, cell);
  };

  //Todo - move to own component
  updateListeners(id: number, cell: string){
    if(this.state[id+"Listener"] !== undefined && this.state[id+"Listener"] !== [] && cell !== ""){
      var listeners = this.state[id+"Listener"];

      for (let index = 0; index < listeners.length; index++) {
        var formula = this.state[listeners[index]+"Formula"];        
        this.CheckRegex(formula, listeners[index]);
      }
    } 
  };

  //Todo - move to own component
  handleCellEnter(id: any, e: any){

    //Todo - fix class adding - store in state 'active' classes instead
    e.target.classList.add('enteredCell');
    var myColumn = document.getElementById(id.replace(/[^a-zA-Z]+/g, ''))!;
    var myRow = document.getElementById(id.replace(/^\D+/g, '').slice(0, -1))!;
    myColumn.classList.add('enteredCellParentColumn');
    myRow.classList.add('enteredCellParentRow');

    var cellFormula = this.state[id+"Formula"]
    if (cellFormula != undefined && cellFormula !== "") {
      e.target.value = cellFormula
    }
  };

  //Todo - move to own component
  handleChange(id: any, e: any){    
    var cellValue = e.target.value.trim() ;
    this.CheckRegex(cellValue, id);      
  }

  //Todo - move to own component
  CheckRegex(cellValue: string, id: number){
    var change = {};
    change[id] = [cellValue];

    //Todo - typescript class for Regex?
    var isSumOfCells = new RegExp('^=sum\\([a-zA-Z]+\\d+:[a-zA-Z]+\\d+\\)$', 'i');    
    var isSumUsingAddition = new RegExp('^=[a-zA-Z]+\\d+\\+[a-zA-Z]+\\d+$', 'i');
        
    if (isSumOfCells.test(cellValue)) {
      var resultIds = AddNumbersRange(cellValue, id);

      resultIds.forEach(listenerId => {
        this.AddListener(change, listenerId, id);
      });

      var result = 0;
      resultIds.forEach(resultId => {
        var resultValue = parseInt(this.state[resultId])
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
        var resultState = parseInt(this.state[resultId])
        if (!isNaN(resultState)) {
          result += resultState;
        }  
      });
      change[id] = result;
      
      resultIds.forEach(listenerId => {
        this.AddListener(change, listenerId, id);
      });

      var formula = id + "Formula";
      change[formula] = cellValue
    }    
    this.setState(change, 
      () => this.updateListeners(id, cellValue));
  }

  //Todo - move to own component
  AddListener(change: object, resultSum: string, id: number){
    var listener = this.state[resultSum+"Listener"];
    if (listener === undefined) {
      change[resultSum+"Listener"] = [id];
    }
    else if (!listener.includes(id)) {
      listener.push(id);
    }    
  }
  
  //Move to own file
  RenderColumnHeadings(numberOfColumns: number){

    for (let index = 0; index < numberOfColumns; index++) {
      var letters = GenerateColumnName(index);
      var change = {};
      change[letters];
      this.setState(change);
    }
  };
}

export default Excel;