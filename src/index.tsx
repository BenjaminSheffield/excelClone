import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Excel from './components/Excel'

ReactDOM.render(
  <Excel rows={30} columns={30} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
