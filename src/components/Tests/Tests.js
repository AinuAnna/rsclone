import './Tests.scss';
import UI from '../UIclass/UIclass';
import { FirebaseDB } from '../../utils/FirebaseDB/FirebaseDB';

const firebase = new FirebaseDB();
const testsArray = [
  {
    id: '1',
    question: '1. Модель  - это...',
    option: {
      1: 'а) некий новый объект, который отражает существенные особенности изучаемого объекта, явления или процесса',
      2: 'б) отражение наиболее существенных признаков, свойств и отношений явлений, объектов или процессов предметного мира',
      3: 'в) виртуальная среда',
      4: 'г) система, неотличимая от моделируемого объекта в отношении некоторых свойств, полагаемых существенными, которые полагаются несущественными',
    },
    answer: {
      1: 'a)',
      2: 'б',
      3: 'г)',
    },
  },
  {
    id: '2',
    question: '2. Моделирование  - это...',
    option: {
      1: 'а) некий новый объект, который отражает существенные особенности изучаемого объекта, явления или процесса',
      2: 'б) отражение наиболее существенных признаков, свойств и отношений явлений, объектов или процессов предметного мира',
      3: 'в) виртуальная среда',
    },
    answer: {
      1: 'a)',
      2: 'б',
    },
  },
];
export default class Tests extends UI {
  constructor() {
    super();
  }

  renderM() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'tests__wrapper']);
    UI.renderElement(wrapper, 'h2', 'Тесты', ['class', 'tests__title']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'tests__container']);
    const containerList = UI.renderElement(container, 'div', null, ['class', 'tests__containerList']);
    testsArray.forEach(({ question, id, option, answer }) => {
      const p = UI.renderElement(containerList, 'div', question, ['class', 'tests__label']);
      const divInputs = UI.renderElement(p, 'div', null, ['data-id', id], ['class', 'tests__divInputs']);
      const LabelList = Object.values(option).forEach((val) => {
        const divInputList = UI.renderElement(divInputs, 'div', null, ['class', 'tests__divInputList']);
        const label = UI.renderElement(divInputList, 'label', null, ['class', 'tests__label']);
        UI.renderElement(label, 'input', null, ['type', 'checkbox'], ['class', 'tests__input'], ['name', 'question']);
        UI.renderElement(label, 'label', val, ['class', 'tests__label-list'], ['for', 'question']);
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

  //   setData(data) {
  //     this.testsArray = data.filter(() => true);
  //     // this.collection = this.testsArray.forEach((el) => el.id);
  //     // this.options = this.questions.filter(() => true);
  //     // this.answers = this.questions.filter(() => true);
  //   }

  render(rootNode) {
    this.rootNode = rootNode;
    this.renderM();
    // firebase.getData('Tests').then((data) => {
    //   // this.setData(data);

    // });
  }
}
