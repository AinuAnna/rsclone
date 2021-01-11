import './Tests.scss';
import UI from '../UIclass/UIclass';
import { FirebaseDB } from '../../utils/FirebaseDB/FirebaseDB';

const firebase = new FirebaseDB();

export default class Tests extends UI {
  constructor() {
    super();
  }

  renderM() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'tests__wrapper']);
    UI.renderElement(wrapper, 'h2', 'Тесты', ['class', 'tests__title']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'tests__container']);
    this.testsArray.forEach(({ id, option, answer, question }) => {
      const input = UI.renderElement(
        container,
        'input',
        null,
        ['data-id', id],
        ['class', 'tests__input'],
        ['type', 'checkbox']
      );
      UI.renderElement(input, 'label', question, ['class', 'tests__label']);
      this.options.forEach((item) => item.UI.renderElement(input, 'label', option, ['class', 'tests__label']));
      UI.renderElement(input, 'label', answer, ['class', 'tests__label']);
    });
    UI.renderElement(this.rootNode, 'button', 'Закончить тест', ['class', 'btn btn-primary'], ['type', 'submit']);
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
