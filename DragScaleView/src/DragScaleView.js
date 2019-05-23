import React, { Component } from 'react';
import './style.less';
class DragScaleView extends Component {
  constructor(props) {
    super(props);
    this.initStyle = {
      width: '100px',
      height: '100px',
      minWidth: '50px',
      minHeight: '50px'
    };      
    this.state = {
      dsStyle: props.dsStyle || this.initStyle,
      visible: props.visible || true,
      offsetX: 0,
      offsetY: 0
    }
  }

  componentDidMount = () => {
    let { dsStyle } = this.state;
    dsStyle = {  left: `calc(50vw - ${dsStyle.width}/2)`,...dsStyle }
    this.setState({ dsStyle });
  }
  handleMouseUp = () => {
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
    return false;
  }
  debounce = (func,seconds) => {
    // 防抖动
    let timer = null;
    return function() {
      clearTimeout(timer);
      setTimeout(func,seconds)
    }
  }
  handleScale = (e) => {
    let initY = e.clientY;
    let initX = e.clientX;
    let dsView = document.querySelector('#dsView');
    let westBar = document.querySelector('#cursor-west');
    let eastBar = document.querySelector('#cursor-east');
    let northBar = document.querySelector('#cursor-north');
    let southBar = document.querySelector('#cursor-south');
    let height = dsView.offsetHeight;
    let width = dsView.offsetWidth;
    let dLeft = dsView.offsetLeft;
    let dTop = dsView.offsetTop;
    let totalWidth = window.innerWidth;
    let totalHeight = window.innerHeight;
    const { dsStyle } = this.state;
    let { minWidth, minHeight } = dsStyle || {};
    minWidth = parseInt(minWidth);
    minHeight = parseInt(minHeight);
    let handleEvent = function() {};
    let up;
    let down;
    let left;
    let right;
    let upLeft;
    let downLeft;
    let upRight;
    let downRight;
    let dragging;
    const updateScrollBar = (currentW, currentH) => {
      if (currentW < minWidth || currentH < minHeight) return;
      northBar.style.width = (currentW - 20) + 'px';
      southBar.style.width = (currentW - 20) + 'px';
      westBar.style.height = (currentH - 20) + 'px';
      eastBar.style.height = (currentH - 20) + 'px';
    };
    up = e => {
      let cY = e.clientY;
      let diffY = initY - cY;
      let currentH =  Math.max(height + diffY, minHeight);
      dsView.style.height = currentH + 'px';
      dsView.style.top = cY + 'px';
      updateScrollBar(width, currentH);
      return false;
    };
    down = e => {
      let cY = e.clientY;
      let diffY = cY - initY;
      let currentH =  Math.max(height + diffY, minHeight);
      dsView.style.height = currentH + 'px';
      updateScrollBar(width, currentH);
      return false;
    };
    left = e => {
      let cX = e.clientX;
      let diffX = initX - cX;
      let currentW = Math.max(width + diffX, minWidth);
      dsView.style.width = currentW + 'px';
      dsView.style.left = cX + 'px';
      northBar.style.width = (currentW - 20) + 'px';
      southBar.style.width = (currentW - 20) + 'px';
      updateScrollBar(currentW, height);

      return false;
    };
    right = e => {
      let cX = e.clientX;
      let diffX = cX - initX;
      let currentW = Math.max(width + diffX, minWidth);
      dsView.style.width = currentW + 'px';
      updateScrollBar(currentW, height);
      return false;
    };
    upLeft = e => {
      let cX = e.clientX;
      let cY = e.clientY;
      let diffX = initX - cX;
      let diffY = initY - cY;
      let currentH =  Math.max(height + diffY, minHeight);
      let currentW = Math.max(width + diffX, minWidth);

      dsView.style.width = currentW + 'px';
      dsView.style.height = currentH + 'px';
      dsView.style.left = cX + 'px';
      dsView.style.top = cY + 'px';
      updateScrollBar(currentW, currentH);
      return false;
    };
    downRight = e => {
      let cX = e.clientX;
      let cY = e.clientY;
      let diffX = cX - initX;
      let diffY = cY - initY;
      let currentH =  Math.max(height + diffY, minHeight);
      let currentW = Math.max(width + diffX, minWidth);
      dsView.style.width = currentW + 'px';
      dsView.style.height = currentH + 'px';
      updateScrollBar(currentW, currentH);
      return false;
    };
    upRight = e => {
      let cX = e.clientX;
      let cY = e.clientY;
      let diffX = cX - initX;
      let diffY = initY - cY;
      let currentH =  Math.max(height + diffY, minHeight);
      let currentW = Math.max(width + diffX, minWidth);
      dsView.style.width = currentW + 'px';
      dsView.style.height = currentH + 'px';
      dsView.style.top = cY + 'px';
      updateScrollBar(currentW, currentH);
      return false;
    };
    downLeft = e => {
      let cX = e.clientX;
      let cY = e.clientY;
      let diffX = initX - cX;
      let diffY = cY - initY;
      let currentH =  Math.max(height + diffY, minHeight);
      let currentW = Math.max(width + diffX, minWidth);
      dsView.style.width = currentW + 'px';
      dsView.style.height = currentH + 'px';
      dsView.style.left = cX + 'px';
      updateScrollBar(currentW, currentH);
      return false;
    };
    dragging = e => {
      let cX = e.clientX;
      let cY = e.clientY;
      let diffX = cX - initX;
      let diffY = cY - initY;
      let left = dLeft + diffX;
      let top  = dTop + diffY;
      let maxLeft = totalWidth - width;
      let maxTop = totalHeight - height;
      // 区域限制
      if (left < 0) {
        dsView.style.left = 0;
      } else if (left > maxLeft) {
        dsView.style.left = maxLeft + 'px';
      } else {
        dsView.style.left = left + 'px';
      }
      if (top < 0) {
        dsView.style.top = 0;
      } else if (top > maxTop) {
        dsView.style.top = maxTop + 'px';
      } else {
        dsView.style.top = top + 'px';
      }
      window.getSelection().removeAllRanges();

    };
    let eleId = e.target.id;
    switch (eleId) {
      case 'cursor-north':
        handleEvent = up;
        break;
      case 'cursor-south':
        handleEvent = down;
        break;
      case 'cursor-west':
        handleEvent = left;
        break;
      case 'cursor-east':
        handleEvent = right;
        break;
      case 'cursor-north-west':
        handleEvent = upLeft;
        break;
      case 'cursor-south-east':
        handleEvent = downRight;
        break;
      case 'cursor-north-east':
        handleEvent = upRight;
        break;
      case 'cursor-south-west':
        handleEvent = downLeft;
        break;
      default:
        handleEvent = dragging;
        break;

    }
    document.onmousemove = e => this.debounce(handleEvent(e),8000);
    this.handleMouseUp();
  }
  render() {
    const { content } = this.props;
    const { visible } = this.state;
    return (
      <div
        className={visible ? 'dsView actived' : 'dsView hide'}
        style={this.state.dsStyle}
        id="dsView"
        onMouseDown={this.handleScale}
      >
        {content}
        <span className="dsView-scale" id="cursor-north"></span>
        <span className="dsView-scale" id="cursor-south"></span>
        <span className="dsView-scale" id="cursor-west"></span>
        <span className="dsView-scale" id="cursor-east"></span>
        <span className="dsView-scale" id="cursor-north-west"></span>
        <span className="dsView-scale" id="cursor-north-east"></span>
        <span className="dsView-scale" id="cursor-south-west"></span>
        <span className="dsView-scale" id="cursor-south-east"></span>
      </div>
    );
  }
}
export default DragScaleView;
