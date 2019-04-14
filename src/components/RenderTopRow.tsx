import * as React from "react";

import GenerateColumnName from "./GenerateColumnName";

export interface Props {
    columns: number;
  }
  
  interface State {
      columns: number;
  }

  class RenderTopRow extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = { 
          columns: props.columns
      };
    }
  
    render() {
      return (        
           <div>
               {this.RenderTopRow(this.state.columns)}
          </div>
      );
    }

    RenderTopRow(columns: number){    
        var indents = [];
        for (let j = 0; j < columns; j++) {
          var uniqueId = GenerateColumnName(j);
          indents.push(<input className="row" readOnly id={uniqueId} key={uniqueId} value={uniqueId}/>);
        }
        return [     
          <nav key={'navbar'} className="navbar">
              {indents}
          </nav>
        ];
      }
}
export default RenderTopRow