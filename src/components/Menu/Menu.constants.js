/* eslint-disable import/prefer-default-export */
import Admin from '../Admin/Admin';
import Tests from '../Tests/Tests';
import TestsAdmin from '../TestsAdmin/TestsAdmin';
import LectureAdmin from '../LectureAdmin/LectureAdmin';
import TestResults from '../TestResults/TestResults';
import Lecture from '../Lecture/Lecture';

const admin = new Admin(document.getElementById('container'));
const tests = new Tests(document.getElementById('container'));
const testsAdmin = new TestsAdmin(document.getElementById('container'));
const lectureAdmin = new LectureAdmin(document.getElementById('container'));
const lecture = new Lecture(document.getElementById('container'));
const rez = new TestResults();

export const arrayMENU = {
  admin: [
    {
      title: ` <li class="sidebar-item active">
      <a class="sidebar-link" href="main.html">
        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-user align-middle"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
    <span class="align-middle">Пользователи</span>
    </a>
  </li>`,
      onclick: admin.render(),
    },
    {
      title: ` <li class="sidebar-item">
      <a class="sidebar-link" href="main.html">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list align-middle"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
        <span class="align-middle">Лекции</span>
      </a>
    </li>`,
      onclick: lectureAdmin.render(),
    },
    {
      title: `<li class="sidebar-item">
      <a class="sidebar-link" href="main.html">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle align-middle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <span class="align-middle">Тесты</span>
      </a>
    </li>`,
      onclick: testsAdmin.render(),
    },
  ],
  student: [
    {
      title: '<svg> Результаты тестов',
      onclick: rez.render(),
    },
    {
      title: '<svg> Лекции',
      onclick: lecture.render(),
    },
    {
      title: '<svg> Тесты',
      onclick: tests.render(),
    },
  ],
  teacher: [
    {
      title: '<svg> Группы',
      // onclick: group.render(),
    },
    {
      title: '<svg> Лекции',
      onclick: lecture.render(),
    },
    {
      title: '<svg> Тесты',
      onclick: tests.render(),
    },
  ],
};
