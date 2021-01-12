import './Tests.scss';
import UI from '../UIclass/UIclass';
import { FirebaseDB } from '../../utils/FirebaseDB/FirebaseDB';

export default class Tests extends UI {
  constructor(rootNode) {
    super();
    this.rootNode = rootNode;
    this.firebaseDB = new FirebaseDB();
  }

  renderM() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'tests__wrapper']);
    UI.renderElement(wrapper, 'h2', 'Тесты', ['class', 'tests__title']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'tests__container']);
    const containerList = UI.renderElement(container, 'div', null, ['class', 'tests__containerList']);
    this.testsArray.forEach(({ id, question, option, answer }) => {
      const p = UI.renderElement(containerList, 'div', question, ['class', 'tests__label']);
      const divInputs = UI.renderElement(p, 'div', null, ['data-id', id], ['class', 'tests__divInputs']);
      option.forEach((value) => {
        const divInputList = UI.renderElement(divInputs, 'div', null, ['class', 'tests__divInputList']);
        const label = UI.renderElement(divInputList, 'label', null, ['class', 'tests__label']);
        UI.renderElement(label, 'input', null, ['type', 'checkbox'], ['class', 'tests__input'], ['name', 'question']);
        UI.renderElement(label, 'label', value, ['class', 'tests__label-list'], ['for', 'question']);
      });
    });

    UI.renderElement(
      this.rootNode,
      'button',
      'Закончить тест',
      ['class', 'btn btn-primary tests__btn-go'],
      ['type', 'submit']
    );
  }

  setData(tests) {
    this.testsArray = tests;
  }

  render() {
    this.firebaseDB.getData().then((data) => {
      this.setData(data);
      this.renderM();
    });
  }
}
