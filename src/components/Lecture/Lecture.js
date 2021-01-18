import './Lecture.scss';
import UI from '../UIclass/UIclass';
import { FirebaseDB } from '../../utils/FirebaseDB/FirebaseDB';
import '@firebase/firestore';

export default class Lecture extends UI {
  constructor(rootNode) {
    super();
    this.rootNode = rootNode;
    this.lectureInfo = [];
    this.selectedLectionId = '';
    this.selectedLectionSubtitle = '';
    this.selectedLectionIndex = null;
    this.firebaseDB = new FirebaseDB();
  }

  renderList() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'lecture-admin__wrapper']);
    UI.renderElement(wrapper, 'h2', 'Лекции', ['class', 'lecture-admin__title']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'lecture-admin__container']);
    this.listMainTitle = UI.renderElement(container, 'div', 'Список лекций:', [
      'class',
      'lecture-admin__list-main-title',
    ]);
    const listTitle = UI.renderElement(this.listMainTitle, 'div', null, ['class', 'lecture-admin__list-title']);
    const ol = UI.renderElement(listTitle, 'ol', null, ['class', 'lecture-admin__ul']);

    /* Render menu of lections */
    const subtitlesRenderedArr = [];
    this.lectureInfo.forEach(({ id, title, subtitle }) => {
      UI.renderElement(listTitle, 'div', null, ['data-id', id], ['class', 'lecture-admin__div']);
      const a = UI.renderElement(ol, 'a', null, ['class', 'lecture-admin__a'], ['href', '#']);
      UI.renderElement(a, 'li', title, ['class', 'lecture-admin__li']);

      subtitle.forEach((value) => {
        const div1 = UI.renderElement(ol, 'div', null, ['data-id', id], ['class', 'lecture-admin__div']);
        const ul1 = UI.renderElement(div1, 'ul', null, ['class', 'lecture-admin__ul']);
        const a1 = UI.renderElement(ul1, 'a', null, ['class', 'lecture-admin__a'], ['href', '#']);

        subtitlesRenderedArr.push(UI.renderElement(a1, 'li', value, ['class', 'lecture-admin__li']));
      });
    });

    /* Add event for rendering subtitle of lection */
    subtitlesRenderedArr.forEach((sectionLecture) => {
      // const subtitles = document.querySelectorAll('.lecture-admin__li');
      sectionLecture.addEventListener('click', (e) => {
        // subtitles.forEach((titleCss) => {
        //   // eslint-disable-next-line no-param-reassign
        //   titleCss.style.fontWeight = '400';
        // });

        const lectureId = e.target.closest('.lecture-admin__div').getAttribute('data-id');
        const lectureSubtitle = e.target.closest('.lecture-admin__div').textContent;
        this.lectureInfo.forEach((lecture) => {
          if (lecture.id === lectureId) {
            const lectureIndex = lecture.subtitle.indexOf(lectureSubtitle);
            const renderText = lecture.text[lectureIndex];
            this.selectedLectionId = lectureId;
            this.selectedLectionSubtitle = lectureSubtitle;
            this.selectedLectionIndex = lectureIndex;
            this.renderLecture(renderText);
          }
        });
      });
    });
  }

  renderLecture(text) {
    this.rootNode.innerHTML = '';
    const goBtn = UI.renderElement(this.rootNode, 'div', null, ['class', 'go-back-btn']);
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'lecture__wrapper']);

    const goBackBtn = UI.renderElement(goBtn, 'button', 'Вернуться назад', [
      'class',
      'btn btn-primary lecture__btn-go-test',
    ]);

    goBackBtn.addEventListener('click', () => {
      this.rootNode.innerHTML = '';
      this.renderList();
    });

    /* Render lections */
    const lectureContainer = UI.renderElement(wrapper, 'div', text, ['class', 'lecture__container']);

    const testBtn = UI.renderElement(lectureContainer, 'button', 'Пройти тест', [
      'class',
      'btn btn-primary lecture__btn-go-test',
    ]);

    testBtn.addEventListener('click', () => {
      this.startTest();
    });
  }

  startTest() {
    /* update when tests will be ready */
    this.selectedLectionId;
    this.selectedLectionSubtitle;
    this.selectedLectionIndex;
  }

  setData(info) {
    this.lectureInfo = info;
  }

  renderEmptyLectionsMsg() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'lecture-admin__wrapper']);
    UI.renderElement(wrapper, 'h2', 'Лекции', ['class', 'lecture-admin__title']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'lecture-admin__container']);
    UI.renderElement(container, 'div', 'Лекции еще не добавлены.', ['class', 'empty-lections-msg']);
  }

  render() {
    console.log(this)
    this.firebaseDB.getData('Lecture').then((data) => {
      if (data.length === 0) {
        this.renderEmptyLectionsMsg();
      } else {
        this.setData(data);
        this.rootNode.innerHTML = '';
        this.renderList();
      }
    });
  }
}
