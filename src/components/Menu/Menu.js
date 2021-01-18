/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import './Menu.scss';
import UI from '../UIclass/UIclass';
import { arrayMENU } from './Menu.constants';

export default class Menu extends UI {
  constructor(rootNode) {
    super();
    this.rootNode = rootNode;
  }

  renderM(role) {
    const ul = UI.renderElement(this.rootNode, 'ul', null, ['class', `menu__${role}`]);
    document.getElementById('menu-title').innerHTML = role;
    const arr = arrayMENU[role].flat();
    arr.forEach(({ title, onclick }) => {
      const item = UI.renderElement(ul, 'li', title, ['class', 'name']);
      item.addEventListener('click', (e) => {
        e.preventDefault();
        onclick();
      });
    });
  }

  render() {
    this.renderM('admin');
  }
}
