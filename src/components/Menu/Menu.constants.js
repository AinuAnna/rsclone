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
const testResults = new TestResults(document.getElementById('container'));

export const arrayMENU = {
  admin: [
    {
      title: ` <li class="sidebar-item">
      <a class="sidebar-link" href="main.html/users">
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
      view: admin,
      path: '/main/admin/users',
    },
    {
      title: ` <li class="sidebar-item">
      <a class="sidebar-link" href="main.html/lecture">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list align-middle"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
        <span class="align-middle">Лекции</span>
      </a>
    </li>`,
      view: lectureAdmin,
      path: '/main/admin/lectures',
    },
    {
      title: `<li class="sidebar-item">
      <a class="sidebar-link" href="main.html/tests">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle align-middle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <span class="align-middle">Тесты</span>
      </a>
    </li>`,
      view: testsAdmin,
      path: `/main/admin/tests`,
    },
  ],
  student: [
    {
      title: ` <li class="sidebar-item">
      <a class="sidebar-link" href="main.html">
       <svg width="18" height="18" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.59839 0.75C1.21089 0.75 0.0983887 1.8625 0.0983887 3.25V8.25C0.0983887 9.6375 1.21089 10.75 2.59839 10.75H7.59839C8.98589 10.75 10.0984 9.6375 10.0984 8.25V3.25C10.0984 1.8625 8.98589 0.75 7.59839 0.75H2.59839ZM7.84839 2.625L9.17339 3.9375L4.18589 8.875L1.02339 5.6875L2.36089 4.375L4.19839 6.2375L7.84839 2.625ZM2.59839 13.25C1.21089 13.25 0.0983887 14.3625 0.0983887 15.75V20.75C0.0983887 22.1375 1.21089 23.25 2.59839 23.25H7.59839C8.98589 23.25 10.0984 22.1375 10.0984 20.75V15.75C10.0984 14.3625 8.98589 13.25 7.59839 13.25H2.59839ZM2.59839 15.75H7.59839V20.75H2.59839V15.75ZM12.5984 3.25H25.0984V5.75H12.5984V3.25ZM12.5984 20.75V18.25H25.0984V20.75H12.5984ZM12.5984 10.75H25.0984V13.25H12.5984V10.75Z" fill="#9A99A2"/>
</svg>
        <span class="align-middle">Результаты тестов</span>
      </a>
    </li>`,
      view: testResults,
      path: '/main/student/results',
    },
    {
      title: ` <li class="sidebar-item">
      <a class="sidebar-link" href="main.html">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list align-middle"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
        <span class="align-middle">Лекции</span>
      </a>
    </li>`,
      view: lecture,
      path: '/main/student/lectures',
    },
    {
      title: `<li class="sidebar-item">
      <a class="sidebar-link" href="main.html">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle align-middle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <span class="align-middle">Тесты</span>
      </a>
    </li>`,
      view: tests,
      path: '/main/student/tests',
    },
  ],
  teacher: [
    {
      title: `<li class="sidebar-item">
      <a class="sidebar-link" href="main.html">
      <svg width="18" height="18" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0)">
      <path d="M11.5 4.98328C10.6104 4.98328 9.75727 5.33666 9.12825 5.96569C8.49922 6.59472 8.14583 7.44786 8.14583 8.33744C8.14583 9.22702 8.49922 10.0802 9.12825 10.7092C9.75727 11.3382 10.6104 11.6916 11.5 11.6916C12.3896 11.6916 13.2427 11.3382 13.8718 10.7092C14.5008 10.0802 14.8542 9.22702 14.8542 8.33744C14.8542 7.44786 14.5008 6.59472 13.8718 5.96569C13.2427 5.33666 12.3896 4.98328 11.5 4.98328ZM11.1167 9.39161C11.4979 9.39161 11.5519 8.29042 11.8215 8.56C12.0911 8.82958 11.2446 8.17875 11.2446 8.56C11.2446 8.94125 11.4944 8.06786 11.2248 8.33744C10.9552 8.60703 11.4979 8.56 11.1167 8.56C10.7354 8.56 11.7696 9.22793 11.5 8.95835C12.5165 8.56279 11.5 8.62286 11.5 8.24161C11.5 7.86036 10.8471 8.82958 11.1167 8.56C11.3862 8.29042 10.7354 9.39161 11.1167 9.39161ZM5.27083 7.85828C4.63542 7.85828 4.02603 8.11069 3.57672 8.56C3.12742 9.00931 2.875 9.6187 2.875 10.2541C2.875 11.1549 3.38292 11.9312 4.11125 12.3433C4.45625 12.5349 4.84917 12.6499 5.27083 12.6499C5.6925 12.6499 6.08542 12.5349 6.43042 12.3433C6.785 12.142 7.08208 11.8545 7.3025 11.5095C6.60434 10.5997 6.22694 9.4843 6.22917 8.33744V8.06911C5.94167 7.93494 5.61583 7.85828 5.27083 7.85828ZM17.7292 7.85828C17.3842 7.85828 17.0583 7.93494 16.7708 8.06911V8.33744C16.7708 9.48744 16.3971 10.5991 15.6975 11.5095C15.8125 11.6916 15.9371 11.8354 16.0808 11.9791C16.5228 12.4076 17.1136 12.648 17.7292 12.6499C18.1508 12.6499 18.5437 12.5349 18.8887 12.3433C19.6171 11.9312 20.125 11.1549 20.125 10.2541C20.125 9.6187 19.8726 9.00931 19.4233 8.56C18.974 8.11069 18.3646 7.85828 17.7292 7.85828ZM11.5 13.6083C9.2575 13.6083 4.79167 14.7295 4.79167 16.9624V18.3999H18.2083V16.9624C18.2083 14.7295 13.7425 13.6083 11.5 13.6083ZM4.51375 14.1354C2.66417 14.3558 0 15.2949 0 16.9624V18.3999H2.875V16.5504C2.875 15.5824 3.53625 14.7774 4.51375 14.1354ZM18.4862 14.1354C19.4638 14.7774 20.125 15.5824 20.125 16.5504V18.3999H23V16.9624C23 15.2949 20.3358 14.3558 18.4862 14.1354ZM11.5 16.5504C12.9662 16.5504 14.5667 16.4833 15.5537 16.4833H7.44625C8.43333 16.4833 10.0337 16.5504 11.5 16.5504Z" fill="#9A99A2"/>
      </g>
      <defs>
      <clipPath id="clip0">
      <rect width="23" height="23" fill="white"/>
      </clipPath>
      </defs>
      </svg>
      
        <span class="align-middle">Группы</span>
      </a>
    </li>`,
      // view: group.render(),
      path: '/main/teacher/groups',
    },
    {
      title: ` <li class="sidebar-item">
      <a class="sidebar-link" href="main.html">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list align-middle"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
        <span class="align-middle">Лекции</span>
      </a>
    </li>`,
      view: lecture.render.bind(lecture),
      path: '/main/teacher/tests',
    },
    {
      title: `<li class="sidebar-item">
      <a class="sidebar-link" href="main.html">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle align-middle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <span class="align-middle">Тесты</span>
      </a>
    </li>`,
      view: tests.render.bind(tests),
      path: '/main/teacher/tests',
    },
  ],
};
