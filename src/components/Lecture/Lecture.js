import './Lecture.scss';
import UI from '../UIclass/UIclass';
import { FirebaseDB } from '../../utils/FirebaseDB/FirebaseDB';
import '@firebase/firestore';

export default class TestResults extends UI {
  constructor(rootNode) {
    super();
    this.rootNode = rootNode;
    this.prevLectureOnClick = this.prevLectureOnClick.bind(this);
    this.nextLectureOnClick = this.nextLectureOnClick.bind(this);
    this.testBtnOnClick = this.testBtnOnClick.bind(this);
    this.firebaseDB = new FirebaseDB();
  }

  renderDefault() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'lecture-admin__wrapper']);
    UI.renderElement(wrapper, 'h2', 'Лекции', ['class', 'lecture-admin__title']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'lecture-admin__container']);
    this.listMainTitle = UI.renderElement(container, 'div', 'Список лекций:', [
      'class',
      'lecture-admin__list-main-title',
    ]);
    const listTitle = UI.renderElement(this.listMainTitle, 'div', null, ['class', 'lecture-admin__list-title']);
    const ol = UI.renderElement(listTitle, 'ol', null, ['class', 'lecture-admin__ul']);

    /* Render lections --- PS MODIFY IT after implementation oof rendering */
    this.lecturesArray.forEach(({ id, title, subtitle }) => {
      UI.renderElement(listTitle, 'div', null, ['data-id', id], ['class', 'lecture-admin__div']);
      const a = UI.renderElement(ol, 'a', null, ['class', 'lecture-admin__a'], ['href', '#']);
      UI.renderElement(a, 'li', title, ['class', 'lecture-admin__li']);
      subtitle.forEach((value) => {
        const div1 = UI.renderElement(ol, 'div', null, ['data-id', id], ['class', 'lecture-admin__div']);
        const ul1 = UI.renderElement(div1, 'ul', null, ['class', 'lecture-admin__ul']);
        const a1 = UI.renderElement(ul1, 'a', null, ['class', 'lecture-admin__a'], ['href', '#']);
        UI.renderElement(a1, 'li', value, ['class', 'lecture-admin__li']);
      });
    });
  }

  renderM() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'lecture__wrapper']);
    const lArrow = UI.renderElement(
      wrapper,
      'img',
      null,
      ['class', 'lecture__l-arrow'],
      ['src', '../../../assets/icon/arrow.svg']
    );

    /* Render lections - PS NEED TO UPPDATE RENDERING */
    this.lectureInfo.forEach(({ id, title, subtitle, text }) => {
      const lectureContainer = UI.renderElement(wrapper, 'div', text, ['class', 'lecture__container']);
      const rArrow = UI.renderElement(
        wrapper,
        'img',
        null,
        ['class', 'lecture__r-arrow'],
        ['src', '../../../assets/icon/arrow.svg']
      );

      const testBtn = UI.renderElement(lectureContainer, 'button', 'Пройти тест', [
        'class',
        'btn btn-primary lecture__btn-go-test',
      ]);

      lArrow.addEventListener('click', this.prevLectureOnClick);
      rArrow.addEventListener('click', this.nextLectureOnClick);
      testBtn.addEventListener('click', this.testBtnOnClick);
    });
  }

  nextLectureOnClick() {
    // render new lecture
  }

  testBtnOnClick() {
    // render test
  }

  prevLectureOnClick() {
    // render new lecture
  }

  setData(info) {
    this.lectureInfo = info;
  }

  render() {
    this.firebaseDB.getData('Lecture').then((data) => {
      if (data.array === 0) {
        this.renderM();
      } else {
        this.setData(data);
        this.rootNode.innerHTML = '';
        this.renderM();
      }
    });
  }
}
