/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import './Menu.scss';
import { createBrowserHistory } from 'history';
import UI from '../UIclass/UIclass';
import { arrayMENU } from './Menu.constants';

const history = createBrowserHistory();

export default class Menu extends UI {
  constructor(rootNode) {
    super();
    this.current = '';
    this.flattenMenu = Object.entries(arrayMENU).reduce(
      (result, [menuGroup, items]) => [...result, ...items.map((item) => ({ ...item, menuGroup }))],
      []
    );
    this.rootNode = rootNode;
    history.listen(({ location }) => {
      this.renderContent(location.pathname);
    });
  }

  renderMenu(role) {
    this.rootNode.innerHTML = '';
    const ul = UI.renderElement(this.rootNode, 'ul', null, ['class', `menu__${role}`]);
    const titleRole = document.getElementById('menu-title');
    titleRole.innerHTML = role;
    if (role === 'admin') {
      titleRole.innerHTML = `Администратор`;
    } else if (role === 'teacher') {
      titleRole.innerHTML = `Преподаватель`;
    } else if (role === 'student') {
      titleRole.innerHTML = `Студент`;
    }
    const arr = arrayMENU[role].flat();
    arr.forEach(({ title, hovered, path }) => {
      const classAdd = path === history.location.pathname ? 'sidebar-link_active' : '';
      const item = UI.renderElement(ul, 'li', title, ['class', `name ${classAdd}`]);
      item.addEventListener('click', (e) => {
        e.preventDefault();
        history.push(path);
      });
    });
  }

  renderContent(pathName) {
    if (this.lastItem && this.lastItem.view.unmount) {
      this.lastItem.view.unmount();
    }
    const item = this.flattenMenu.find((x) => x.path === pathName) || this.flattenMenu[0];
    this.renderMenu(item.menuGroup);
    item.view.render();
    this.lastItem = item;
  }

  initRender() {
    this.renderContent(history.location.pathname);
  }
}
