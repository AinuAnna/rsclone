import './Tests.scss';
import UI from '../UIclass/UIclass';
import arraysEqual from '../../utils/arrayChecker/arrayChecker';
import { FirebaseDB } from '../../utils/FirebaseDB/FirebaseDB';

export default class Tests extends UI {
  constructor(rootNode) {
    super();
    this.rootNode = rootNode;
    this.groupTests = null;
    this.lectures = null;
    this.testTitle = '';
    this.testThem = '';
    this.answerNumber = 1;
    this.assessment = 0;
    this.uniqueTestsArray = null;
    this.uniqueListIDQuestions = null;
    this.firebaseDB = new FirebaseDB();
  }

  renderList() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'tests__wrapper']);
    UI.renderElement(wrapper, 'h2', 'Тесты', ['class', 'tests__title']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'tests__container']);
    const listTitle = UI.renderElement(container, 'div', 'Список тестов:', ['class', 'tests__list-title ']);

    if (this.groupTests.length === 0) {
      const div = UI.renderElement(listTitle, 'div', null, ['class', 'tests-admin__div']);
      UI.renderElement(div, 'p', 'Тесты еще не добавлены', ['class', 'test-admin__p']);
    }

    /* Render tests */
    const titlesRenderedArr = [];
    this.uniqueTestsArray.forEach(({ id, title }) => {
      const div = UI.renderElement(listTitle, 'div', null, ['data-id', id], ['class', 'tests__div']);
      const ul = UI.renderElement(div, 'ul', null, ['class', 'tests__ul']);
      const a = UI.renderElement(ul, 'a', null, ['class', 'tests__a'], ['href', '#']);
      const li = UI.renderElement(a, 'li', title, ['class', 'tests__li']);
      titlesRenderedArr.push(li);
    });

    /* Add event for rendering title of test for Student */
    titlesRenderedArr.forEach((sectionTest) => {
      sectionTest.addEventListener('click', (e) => {
        e.preventDefault();
        const testTitle = e.target.closest('.tests__li').outerText;
        this.testTitle = testTitle;
        const selectedThemTests = [];
        this.groupTests.forEach((test) => {
          if (test.title === testTitle) {
            selectedThemTests.push(test);
          }
        });
        this.renderTests(selectedThemTests);
      });
    });
  }

  renderTests(testsArr) {
    this.rootNode.innerHTML = '';

    document.querySelector('.hamburger').style.display = 'none';
    document.querySelector('.sidebar').style.display = 'none';

    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'tests__wrapper']);
    const testTitle = UI.renderElement(wrapper, 'h2', 'Тесты', ['class', 'tests__title']);
    const div = UI.renderElement(testTitle, 'div', null, ['class', 'tests__title_them']);

    UI.renderElement(div, 'p', `${this.testTitle}`, ['class', 'test-admin__p']);
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
            const answerNumberStr = this.answerNumber;
            listSelectedAnswersByQuestion.push(answerNumberStr.toString());
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
    this.groupTests.forEach((question) => {
      dbQuestionsIDs.push(question.id);
    });

    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'tests__wrapper']);
    const titleResult = UI.renderElement(wrapper, 'h2', 'Ваш результат:', ['class', 'tests__title']);
    const div = UI.renderElement(titleResult, 'div', null, ['class', 'tests__title_them']);
    UI.renderElement(div, 'p', `${this.testTitle}`, ['class', 'test-admin__p']);
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

    this.groupTests.forEach((question) => {
      if (this.uniqueListIDQuestions.includes(question.id)) {
        const indexOfRenderedQuestion = this.uniqueListIDQuestions.indexOf(question.id);
        const indexOfDBQuestion = dbQuestionsIDs.indexOf(question.id);
        if (arraysEqual(selectedAnswersArr[indexOfRenderedQuestion], this.groupTests[indexOfDBQuestion].answer)) {
          this.assessment++;
        }
      }
    });
    const tr = UI.renderElement(tbody, 'tr', null);
    UI.renderElement(tr, 'td', `${this.assessment}/9`);
    UI.renderElement(tr, 'td', `${9 - this.assessment}/9`);
    UI.renderElement(tr, 'td', `${this.assessment}`);

    /* add info about results to testResults table */
    this.lectures.forEach((lecture) => {
      if (lecture.subtitle[0] === this.testTitle) {
        this.testThem = lecture.title;
      }
    });
    const testResult = {
      mark: this.assessment,
      them: this.testThem,
      testName: this.testTitle,
      userId: localStorage.getItem('uidMath'),
    };
    this.firebaseDB.addDataToDB('TestResults', testResult);

    UI.renderElement(table, 'tbody');
    const goBtn = UI.renderElement(wrapper, 'div', null, ['class', 'go-back-btn']);
    const goBackBtn = UI.renderElement(goBtn, 'button', 'Вернуться к списку', [
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
    this.testTitle = '';
    this.testThem = '';
  }

  setData(tests) {
    this.uniqueTestsArray = tests;
  }

  render() {
    this.firebaseDB.getData('Tests').then((data) => {
      this.groupTests = data;
      const uniqueTestsCollections = [...new Map(data.map((item) => [item.title, item])).values()];
      this.setData(uniqueTestsCollections);
      this.rootNode.innerHTML = '';
      this.renderList();
    });
    this.firebaseDB.getData('Lecture').then((data) => {
      this.lectures = data;
    });
  }
}
