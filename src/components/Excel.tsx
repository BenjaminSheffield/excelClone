import * as React from "react";

import RenderTopRow from "./RenderTopRow"
import RenderSideRows from "./RenderSideRows"
import GenerateColumnName from "./GenerateColumnName"
import CheckRegex from 'src/helpers/checkRegex';

import './Excel.css';

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
                onInput={this.handleChange.bind(this, id)} 
                onBlur={this.handleCellExit.bind(this, id)}
                onFocus={this.handleCellEnter.bind(this, id)}
              />);
          }      
      return cells;
      
  }
    
  //Todo - move to own component
  handleCellExit(id: any, e: any){
    this.handleChangeExit(id, e);

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
        const cellValue = listeners[index];        
        var change = CheckRegex(this.state, formula, cellValue);

        this.setState(change, 
          () => this.updateListeners(id, cellValue));
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
  handleChangeExit(id: any, e: any){    
    var cellValue = e.target.value.trim();
    var change = CheckRegex(this.state, cellValue, id);    
    
    this.setState(change, 
      () => this.updateListeners(id, cellValue));
  }  

  handleChange(id: any, e: any){
    var cellValue = e.target.value.trim(); 
    var change = {};
    change[id] = [cellValue];   
    
    this.setState(change, 
      () => this.updateListeners(id, cellValue));
  }  
}

export default Excel;