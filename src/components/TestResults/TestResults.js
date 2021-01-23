import './TestResults.scss';
import UI from '../UIclass/UIclass';
import { FirebaseDB } from '../../utils/FirebaseDB/FirebaseDB';

const firebase = new FirebaseDB();

export default class TestResults extends UI {
  constructor(rootNode) {
    super();
    this.testResults = null;
    this.rootNode = rootNode;
  }

  renderTestResults() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'test-results__wrapper']);
    const tableTitles = ['Тема', 'Тест', 'Отметка'];
    const testResults = UI.renderElement(wrapper, 'h2', 'Результаты тестов', ['class', 'test-results__title']);

    if (this.testResults.length === 0) {
      const div = UI.renderElement(testResults, 'div', null, ['class', 'tests-results__title_zero']);
      UI.renderElement(div, 'p', 'Ни один тест еще не пройден', ['class', 'test-results__zero']);
    }

    const container = UI.renderElement(wrapper, 'div', null, ['class', 'table-responsive-md']);
    const table = UI.renderElement(container, 'table', null, ['class', 'table']);
    const thead = UI.renderElement(table, 'thead');
    const trh = UI.renderElement(thead, 'tr');
    tableTitles.forEach((title) => UI.renderElement(trh, 'th', title));
    const tbody = UI.renderElement(table, 'tbody');
    this.testResults.forEach(({ testName, them, mark, id }) => {
      const tr = UI.renderElement(tbody, 'tr', null, ['data-id', id]);
      UI.renderElement(tr, 'td', them);
      UI.renderElement(tr, 'td', testName);
      UI.renderElement(tr, 'td', mark.toString());
    });
    UI.renderElement(table, 'tbody');
  }

  setData(data, userId) {
    this.testResults = data.filter((testResult) => testResult.userId === localStorage.getItem('uidMath'));
    this.userId = userId;
  }

  render(idUser) {
    this.rootNode.innerHTML = '';
    firebase.getData('TestResults').then((data) => {
      this.setData(data, idUser);
      this.renderTestResults();
    });
  }
}
