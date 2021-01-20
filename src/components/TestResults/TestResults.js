import './TestResults.scss';
import UI from '../UIclass/UIclass';
import { FirebaseDB } from '../../utils/FirebaseDB/FirebaseDB';

const firebase = new FirebaseDB();

export default class TestResults extends UI {
  constructor(rootNode) {
    super();
    this.rootNode = rootNode;
  }

  renderTestResults() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'test-results__wrapper']);
    const tableTitles = ['Тема', 'Тест', 'Отметка'];
    UI.renderElement(wrapper, 'h2', 'Результаты тестов', ['class', 'test-results__title']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'table-responsive-md']);
    const table = UI.renderElement(container, 'table', null, ['class', 'table']);
    const thead = UI.renderElement(table, 'thead');
    const trh = UI.renderElement(thead, 'tr');
    tableTitles.forEach((title) => UI.renderElement(trh, 'th', title));
    const tbody = UI.renderElement(table, 'tbody');
    this.studentsInfo.forEach(({ testName, them, mark, id }) => {
      const tr = UI.renderElement(tbody, 'tr', null, ['data-id', id]);
      UI.renderElement(tr, 'td', them);
      UI.renderElement(tr, 'td', testName);
      UI.renderElement(tr, 'td', mark);
    });
    UI.renderElement(table, 'tbody');
  }

  setData(data, userId) {
    // потом отфильтруем по id
    this.studentsInfo = data.filter(() => true);
    this.userId = userId;
  }

  render(idUser) {
    this.rootNode.innerHTML = "";
    firebase.getData('TestResults').then((data) => {
      this.setData(data, idUser);
      this.renderTestResults();
    });
  }
}
