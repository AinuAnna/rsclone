import './Lecture.scss';
import UI from '../UIclass/UIclass';

export default class TestResults extends UI {
  constructor() {
    super();
    this.prevLectureOnClick = this.prevLectureOnClick.bind(this);
    this.nextLectureOnClick = this.nextLectureOnClick.bind(this);
    this.testBtnOnClick = this.testBtnOnClick.bind(this);
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
    const lectureContainer = UI.renderElement(wrapper, 'div', this.lectureInfo, ['class', 'lecture__container']);
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

  render(rootNode, info) {
    this.rootNode = rootNode;
    this.setData(info);
    this.renderM();
  }
}
