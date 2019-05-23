import React, { Component } from 'react';
import { render } from 'react-dom';
import DragScaleView from './DragScaleView';
import './style.less';

class App extends Component {
  constructor() {
    super();
    this.state = {
      visible: true
    };
    this.dsStyle = {
      width: '300px',
      height: '300px',
      minWidth: '30px',
      minHeight: '30px'
    };
    
  }

  render() {
    return (
      <div>
        <DragScaleView
          visible={this.state.visible}
          dsStyle={this.dsStyle}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
