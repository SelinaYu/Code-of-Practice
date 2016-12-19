import React from 'react';
import AppBarContainer from '../../containers/AppBarContainer';
import styles from './MainStyles';
const Main = (props) => (
  <div>
    <AppBarContainer/>
    <div style={styles.content}>
      {props.children}
    </div>
    <footer style={styles.footer}>
    <p>Copyright &copy; 2016 lichuanyu 版权所有</p>
    <p>网上购书系统 </p>
    </footer>

  </div>
);
export default Main;