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

  renderM() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'lecture__wrapper']);
    const lArrow = UI.renderElement(
      wrapper,
      'img',
      null,
      ['class', 'lecture__l-arrow'],
      ['src', '../../../assets/icon/arrow.svg']
    );
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
