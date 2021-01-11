import './TestsAdmin.scss';
import UI from '../UIclass/UIclass';
import { FirebaseDB } from '../../utils/FirebaseDB/FirebaseDB';

const firebase = new FirebaseDB();

export default class TestsAdmin extends UI {
  constructor() {
    super();
  }

  renderM() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'tests-admin__wrapper']);
    UI.renderElement(wrapper, 'h2', 'Тесты', ['class', 'tests-admin__title']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'tests-admin__container']);
    const listTitle = UI.renderElement(container, 'div', 'Список тестов:', ['class', 'tests-admin__list-title']);
    this.testsArray.forEach((id) => {
      const ul = UI.renderElement(container, 'ul', null, ['data-id', id], ['class', 'tests-admin__ul']);
      UI.renderElement(ul, 'li', null, ['class', 'tests-admin__li']);
    });
    UI.renderElement(this.rootNode, 'button', 'Добавить тест', ['class', 'btn btn-primary'], ['type', 'submit']);
  }

  setData(data) {
    this.testsArray = data.filter(() => true);
  }

  render(rootNode) {
    this.rootNode = rootNode;
    firebase.getData('Tests').then((data) => {
      this.setData(data);
      this.renderM();
    });
  }
}
