import * as React from "react";

export interface Props {
    rows: number;
  }
  
  interface State {
      rows: number;
  }

  class RenderSideRows extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = { 
          rows: props.rows
      };
    }
  
    render() {
      return (        
           <div>
               {this.RenderSideRows(this.state.rows)}
          </div>
      );
    }

    RenderSideRows(columns: number){    
        var indents = [<input readOnly key={columns}/>];
        for (let j = 0; j < columns; j++) {
          var uniqueId = (j+1).toString();
          indents.push(<input className="sideRows" readOnly id={uniqueId} key={uniqueId} value={uniqueId}/>);
        }
        return indents;
      }
}
export default RenderSideRows