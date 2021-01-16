/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import './Menu.scss';
import UI from '../UIclass/UIclass';
import arrayMENU from './Menu.constants';

export default class Menu extends UI {
  constructor(rootNode) {
    super();
    this.rootNode = rootNode;
  }

  renderM() {}

  renderLogin() {}

  render() {
    this.renderM();
  }
}
