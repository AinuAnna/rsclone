import './Lecture.scss';
import UI from '../UIclass/UIclass';
import { FirebaseDB } from '../../utils/FirebaseDB/FirebaseDB';
import arraysEqual from '../../utils/arrayChecker/arrayChecker';
import '@firebase/firestore';

export default class Lecture extends UI {
  constructor(rootNode) {
    super();
    this.rootNode = rootNode;
    this.lectureInfo = [];
    this.selectedLectionId = '';
    this.selectedLectionSubtitle = '';
    this.selectedLectionIndex = null;
    this.allTestsData = null;
    this.uniqueTestsCollections = null;
    this.uniqueListIDQuestions = null;
    this.assessment = 0;
    this.answerNumber = 1;
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
      sectionLecture.addEventListener('click', (e) => {
        e.preventDefault();
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

    /* Display Start Test btn only if lecture has tests */
    this.uniqueTestsCollections.forEach((test) => {
      if (test.title === this.selectedLectionSubtitle) {
        const testBtn = UI.renderElement(lectureContainer, 'button', 'Пройти тест', [
          'class',
          'btn btn-primary lecture__btn-go-test',
        ]);

        testBtn.addEventListener('click', () => {
          this.startTest();
        });
      }
    });
  }

  startTest() {
    /* update when tests will be ready */
    const selectedThemTests = [];
    this.allTestsData.forEach((test) => {
      if (test.title === this.selectedLectionSubtitle) {
        selectedThemTests.push(test);
      }
      this.renderTests(selectedThemTests);
    });
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
    this.firebaseDB.getData('Lecture').then((data) => {
      if (data.length === 0) {
        this.renderEmptyLectionsMsg();
      } else {
        this.setData(data);
        this.rootNode.innerHTML = '';
        this.renderList();
      }
    });

    this.firebaseDB.getData('Tests').then((data) => {
      this.allTestsData = data;
      this.uniqueTestsCollections = [...new Map(data.map((item) => [item.title, item])).values()];
    });
  }

  /* Render test sections START */
  renderTests(testsArr) {
    this.rootNode.innerHTML = '';

    document.querySelector('.hamburger').style.display = 'none';
    document.querySelector('.sidebar').style.display = 'none';

    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'tests__wrapper']);
    const testTitle = UI.renderElement(wrapper, 'h2', 'Тесты', ['class', 'tests__title']);
    const div = UI.renderElement(testTitle, 'div', null, ['class', 'tests__title_them']);

    UI.renderElement(div, 'p', `${this.selectedLectionSubtitle}`, ['class', 'test-admin__p']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'tests__container']);
    const containerList = UI.renderElement(container, 'div', null, ['class', 'tests__containerList']);
    testsArr.forEach(({ id, question, option }) => {
      const p = UI.renderElement(containerList, 'div', question, ['class', 'tests__label']);
      const divInputs = UI.renderElement(p, 'div', null, ['data-id', id], ['class', 'tests__divInputs']);
      option.forEach((value) => {
        const divInputList = UI.renderElement(divInputs, 'div', null, ['class', 'tests__divInputList']);
        const label = UI.renderElement(divInputList, 'label', null, ['class', 'tests__label']);
        UI.renderElement(label, 'input', null, ['type', 'checkbox'], ['class', 'tests__input'], ['name', 'question']);
        UI.renderElement(label, 'label', value, ['class', 'tests__label-list'], ['for', 'question']);
      });
    });
    const btnFinishTest = UI.renderElement(
      this.rootNode,
      'button',
      'Закончить тест',
      ['class', 'btn btn-primary tests__btn-go'],
      ['type', 'submit']
    );

    btnFinishTest.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.hamburger').style.display = 'unset';
      document.querySelector('.sidebar').style.display = 'unset';

      const answerQuestions = document.querySelectorAll('.tests__divInputs');
      /* Here will be selected answers from student */
      const listSelectedAnswersByQuestions = [];
      const listIDQuestions = [];
      answerQuestions.forEach((question) => {
        const listSelectedAnswersByQuestion = [];

        const variantAnswers = question.childNodes;
        variantAnswers.forEach((variantAnswer) => {
          if (variantAnswer.children[0].children[0].checked === true) {
            const questionId = variantAnswer.closest('.tests__divInputs').getAttribute('data-id');
            listIDQuestions.push(questionId);
            listSelectedAnswersByQuestion.push(this.answerNumber.toString());
          }
          this.answerNumber++;
        });
        listSelectedAnswersByQuestions.push(listSelectedAnswersByQuestion);
        this.answerNumber = 1;
      });

      this.rootNode.innerHTML = '';
      this.renderResult(listIDQuestions, listSelectedAnswersByQuestions);
    });
  }

  renderResult(listIDQuestions, selectedAnswersArr) {
    const dbQuestionsIDs = [];
    this.uniqueListIDQuestions = listIDQuestions.filter((item, i, ar) => ar.indexOf(item) === i);
    this.allTestsData.forEach((question) => {
      dbQuestionsIDs.push(question.id);
    });

    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'tests__wrapper']);
    const titleResult = UI.renderElement(wrapper, 'h2', 'Ваш результат:', ['class', 'tests__title']);
    const div = UI.renderElement(titleResult, 'div', null, ['class', 'tests__title_them']);
    UI.renderElement(div, 'p', `${this.selectedLectionSubtitle}`, ['class', 'test-admin__p']);
    UI.renderElement(
      wrapper,
      'img',
      null,
      ['src', '/assets/img/trophy.svg'],
      ['style', 'max-width: 15rem;'],
      ['class', 'tests__trophy']
    );
    const tableTitles = ['Правильные ответы', 'Неправильные ответы', 'Отметка'];
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'table-responsive-md']);
    const table = UI.renderElement(container, 'table', null, ['class', 'table']);
    const thead = UI.renderElement(table, 'thead');
    const trh = UI.renderElement(thead, 'tr');
    tableTitles.forEach((title) => UI.renderElement(trh, 'th', title));

    const tbody = UI.renderElement(table, 'tbody');

    this.allTestsData.forEach((question) => {
      if (this.uniqueListIDQuestions.includes(question.id)) {
        const indexOfRenderedQuestion = this.uniqueListIDQuestions.indexOf(question.id);
        const indexOfDBQuestion = dbQuestionsIDs.indexOf(question.id);
        if (arraysEqual(selectedAnswersArr[indexOfRenderedQuestion], this.allTestsData[indexOfDBQuestion].answer)) {
          this.assessment++;
        }
      }
    });
    const tr = UI.renderElement(tbody, 'tr', null);
    UI.renderElement(tr, 'td', `${this.assessment}/9`);
    UI.renderElement(tr, 'td', `${9 - this.assessment}/9`);
    UI.renderElement(tr, 'td', `${this.assessment}`);

    /* add info about results to testResults table */
    this.lectureInfo.forEach((lecture) => {
      if (lecture.subtitle[0] === this.selectedLectionSubtitle) {
        this.testThem = lecture.title;
      }
    });
    const testResult = {
      mark: this.assessment,
      them: this.testThem,
      testName: this.selectedLectionSubtitle,
      userName: 'user',
    };
    this.firebaseDB.addDataToDB('TestResults', testResult);

    UI.renderElement(table, 'tbody');
    const goBtn = UI.renderElement(wrapper, 'div', null, ['class', 'go-back-btn']);
    const goBackBtn = UI.renderElement(goBtn, 'button', 'Вернуться к списку лекций', [
      'class',
      'btn btn-primary tests__btn-go-test',
    ]);

    goBackBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.rootNode.innerHTML = '';
      this.renderList();
    });

    /* Reset data */
    this.assessment = 0;
    this.selectedLectionSubtitle = '';
    this.testThem = '';
  }

  /* Render test sections END */
}
