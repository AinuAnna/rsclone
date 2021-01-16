import './LectureAdmin.scss';
import { Modal } from 'bootstrap';
import UI from '../UIclass/UIclass';
import { FirebaseDB, db } from '../../utils/FirebaseDB/FirebaseDB';
import '@firebase/firestore';

import { deleteLectureYesBtn, getSectionInput, getLectionInput, getFilePathInput } from './LectureAdmin.constants';

export default class LectureAdmin extends UI {
  constructor(rootNode) {
    super();
    this.rootNode = rootNode;
    this.deleteLecture();
    this.listenerLectures();
    this.firebaseDB = new FirebaseDB();
  }

  deleteLecture() {
    const deleteLectureModalPopUp = new Modal(document.getElementById('deleteLectureModal'), {});
    const deleteLectureModal = document.getElementById('deleteLectureModal');
    deleteLectureModal.addEventListener('show.bs.modal', (deleteEvent) => {
      const button = deleteEvent.relatedTarget;
      const lectureId = button.getAttribute('data-bs-lectureid');

      const lectionTitle = deleteEvent.relatedTarget.closest('a').parentNode.childNodes[0].children[0].innerText;

      deleteLectureYesBtn.addEventListener('click', () => {
        this.lecturesArray.forEach(({ id, title, subtitle, text }) => {
          if (id === lectureId) {
            const indexOfTitle = subtitle.indexOf(lectionTitle);
            subtitle.splice(indexOfTitle, 1);
            const arraySubtitle = subtitle;

            text.splice(indexOfTitle, 1);
            const arrayPath = text;

            const lectionObj = {
              title,
              subtitle: arraySubtitle,
              text: arrayPath,
            };
            this.firebaseDB.updateDataInDB('Lecture', lectureId, lectionObj);
            this.render();

            if (subtitle.length === 0) {
              this.firebaseDB.deleteItem('Lecture', lectureId);
            }
          }
        });

        deleteLectureModalPopUp.hide();
        this.render();
      });
    });
  }

  listenerLectures() {
    db.collection('Lecture').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          this.render();
        } else if (change.type === 'removed') {
          this.render();
        }
      });
    });
  }

  renderM() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'lecture-admin__wrapper']);
    UI.renderElement(wrapper, 'h2', 'Лекции', ['class', 'lecture-admin__title']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'lecture-admin__container']);
    this.listMainTitle = UI.renderElement(container, 'div', 'Список лекций:', [
      'class',
      'lecture-admin__list-main-title',
    ]);
    const listTitle = UI.renderElement(this.listMainTitle, 'div', null, ['class', 'lecture-admin__list-title']);
    const ol = UI.renderElement(listTitle, 'ol', null, ['class', 'lecture-admin__ul']);
    this.lecturesArray.forEach(({ id, title, subtitle }) => {
      UI.renderElement(listTitle, 'div', null, ['data-id', id], ['class', 'lecture-admin__div']);
      const a = UI.renderElement(ol, 'a', null, ['class', 'lecture-admin__a'], ['href', '#']);
      UI.renderElement(a, 'li', title, ['class', 'lecture-admin__li']);
      subtitle.forEach((value) => {
        const div1 = UI.renderElement(ol, 'div', null, ['data-id', id], ['class', 'lecture-admin__div']);
        const ul1 = UI.renderElement(div1, 'ul', null, ['class', 'lecture-admin__ul']);
        const a1 = UI.renderElement(ul1, 'a', null, ['class', 'lecture-admin__a'], ['href', '#']);
        UI.renderElement(a1, 'li', value, ['class', 'lecture-admin__li']);

        /* svgButtonDelete */
        UI.renderElement(
          ul1,
          'a',
          `<svg width="16" height="16" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.3 4.75V2.5C6.3 1.67157 6.9268 1 7.7 1H13.3C14.0732 1 14.7 1.67157 14.7 2.5V4.75M0 5.5H21M2.1 5.5V20.5C2.1 21.3284 2.7268 22 3.5 22H17.5C18.2732 22 18.9 21.3284 18.9 20.5V5.5M10.5 10.75V18.25M6.3 13.75V18.25M14.7 13.75V18.25" stroke="#F49344"/>
            </svg> `,
          ['data-bs-toggle', 'modal'],
          ['data-bs-target', '#deleteLectureModal'],
          ['data-bs-lectureid', id]
        );
      });
    });
    const form = UI.renderElement(wrapper, 'form', null, ['class', 'tests-admin__container needs-validation']);
    const titleAddTests = UI.renderElement(form, 'div', 'Добавление лекций:', ['class', 'lecture-admin__title-add']);

    const titleAdd = UI.renderElement(titleAddTests, 'div', 'Введите название раздела:', [
      'class',
      'lecture-admin__items-add ',
    ]);
    const divColTitleInput = UI.renderElement(titleAdd, 'div', null, ['class', 'col-md']);
    const divColMBTitleInput = UI.renderElement(divColTitleInput, 'div', null, ['class', 'mb-0']);

    /* section Input */
    UI.renderElement(
      divColMBTitleInput,
      'input',
      null,
      ['class', 'form-control section-input'],
      ['type', 'text'],
      ['required', '']
    );
    const titleAdd2 = UI.renderElement(titleAddTests, 'div', 'Введите название лекции:', [
      'class',
      'lecture-admin__items-add',
    ]);
    const divColDoc = UI.renderElement(titleAdd2, 'div', null, ['class', 'col-md']);
    const divColMBDoc = UI.renderElement(divColDoc, 'div', null, ['class', 'mb-0']);

    /* lection Input */
    UI.renderElement(
      divColMBDoc,
      'input',
      null,
      ['class', 'form-control lection-input'],
      ['type', 'text'],
      ['required', '']
    );
    const documentAdd = UI.renderElement(titleAddTests, 'div', 'Добавьте документ:', [
      'class',
      'lecture-admin__items-add',
    ]);

    /* file path Input */
    UI.renderElement(
      documentAdd,
      'input',
      null,
      ['class', 'form-control form-control-lg file-path'],
      ['type', 'file'],
      ['required', '']
    );
    const addLection = UI.renderElement(
      titleAddTests,
      'button',
      'Добавить лекцию',
      ['class', 'btn btn-primary lecture-admin__btn-go add-lection-btn'],
      ['type', 'submit'],
      ['data-bs-toggle', 'modal'],
      ['data-bs-target', '#addLectureModal']
    );

    addLection.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionTitle = getSectionInput();
      const lectionTitle = getLectionInput();
      const filePath = getFilePathInput();

      /* add lection to DB */
      const arrayTitleLections = [];

      this.lecturesArray.forEach(({ title }) => {
        arrayTitleLections.push(title);
      });

      if (arrayTitleLections.includes(sectionTitle.value)) {
        this.lecturesArray.forEach(({ id, title, subtitle, text }) => {
          if (title === sectionTitle.value) {
            subtitle.push(lectionTitle.value);
            const arraySubtitle = subtitle;

            text.push(filePath.value);
            const arrayPath = text;

            const lectionObj = {
              title: sectionTitle.value,
              subtitle: arraySubtitle,
              text: arrayPath,
            };
            this.firebaseDB.updateDataInDB('Lecture', id, lectionObj);
            this.render();
          }
        });
      } else {
        const lectionObj = {
          title: sectionTitle.value,
          subtitle: [lectionTitle.value],
          text: [filePath.value],
        };
        this.firebaseDB.addDataToDB('Lecture', lectionObj);
      }
    });
  }

  renderDefault() {
    this.renderM();
    const div = UI.renderElement(this.listMainTitle, 'div', null, ['class', 'lecture-admin__div']);
    UI.renderElement(div, 'p', 'Добавьте данные', ['class', 'lecture-admin__p']);
  }

  setData(tests) {
    this.lecturesArray = tests;
  }

  render() {
    this.firebaseDB.getData('Lecture').then((data) => {
      this.setData(data);
      this.rootNode.innerHTML = '';
      this.renderM();
      this.renderDefault();
    });
  }
}
