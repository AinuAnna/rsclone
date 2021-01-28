/* eslint-disable class-methods-use-this */

export default class Event {
  toggleMenuButton() {
    const simpleBarElement = document.getElementsByClassName('js-simplebar')[0];

    if (simpleBarElement) {
      const sidebarElement = document.getElementsByClassName('sidebar')[0];
      const sidebarToggleElement = document.getElementsByClassName('sidebar-toggle')[0];

      sidebarToggleElement.addEventListener('click', () => {
        sidebarElement.classList.toggle('collapsed');
      });
    }
    const dropdown = document.querySelector('.nav-item.dropdown');

    dropdown.addEventListener('mousemove', () => {
      const menu = document.querySelector('.dropdown-menu.dropdown-menu-right');
      menu.classList.add('show');
      menu.addEventListener('mouseleave', () => {
        const menuDrop = document.querySelector('.dropdown-menu.dropdown-menu-right');
        menuDrop.classList.remove('show');
      });
    });
  }

  dropdownMenu() {
    const dropdown = document.querySelector('.nav-item.dropdown');

    dropdown.addEventListener('mousemove', () => {
      const menu = document.querySelector('.dropdown-menu.dropdown-menu-right');
      menu.classList.add('show');
      menu.addEventListener('mouseleave', () => {
        const menuDrop = document.querySelector('.dropdown-menu.dropdown-menu-right');
        menuDrop.classList.remove('show');
      });
    });
  }

  printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
  }

  ruleValidSignUp() {
    document.querySelector('#button-singup').addEventListener('click', () => {
      const email = document.querySelector('#input-email').value;
      const pass = document.querySelector('#input-password').value;
      const fio = document.querySelector('#input-fio').value;
      const info = document.querySelector('#input-group').value;
      // Defining error variables with a default value
      let passErr;
      let emailErr;
      let fioErr;
      let infoErr;

      // Validate password
      if (pass === '') {
        this.printError('passErr', 'Please enter your password');
      } else {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (regex.test(pass) === false) {
          this.printError('passErr', 'Please enter a valid password');
        } else {
          this.printError('passErr', '');
          passErr = false;
        }
      }
      // Validate fio
      if (fio === '') {
        this.printError('fioErr', 'Please enter your name');
      } else {
        const regex = /^[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{0,}\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,}(\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,})?$/;
        if (regex.test(fio) === false) {
          this.printError('fioErr', 'Please enter a valid name');
        } else {
          this.printError('fioErr', '');
          fioErr = false;
        }
      }
      // Validate info
      if (info === '') {
        this.printError('infoErr', 'Please enter your info');
      } else {
        return false;
      }

      // Validate email address
      if (email === '') {
        this.printError('emailErr', 'Please enter your email address');
      } else {
        // Regular expression for basic email validation
        const regex = /^\S+@\S+\.\S+$/;
        if (regex.test(email) === false) {
          this.printError('emailErr', 'Please enter a valid email address');
        } else {
          this.printError('emailErr', '');
          emailErr = false;
        }
      }
      if ((passErr || emailErr || fioErr || infoErr) === true) {
        return false;
      }
    });
  }

  ruleValidLogin() {
    document.querySelector('#submit-main').addEventListener('click', () => {
      const email = document.querySelector('#input-email').value;
      const pass = document.querySelector('#input-password').value;
      // Defining error variables with a default value
      let passErr;
      let emailErr;

      // Validate password
      if (pass === '') {
        this.printError('passErr', 'Please enter your password');
      } else {
        return false;
      }

      // Validate email address
      if (email === '') {
        this.printError('emailErr', 'Please enter your email address');
      } else {
        // Regular expression for basic email validation
        const regex = /^\S+@\S+\.\S+$/;
        if (regex.test(email) === false) {
          this.printError('emailErr', 'Please enter a valid email address');
        } else {
          this.printError('emailErr', '');
          emailErr = false;
        }
      }
      if ((passErr || emailErr) === true) {
        return false;
      }
    });
  }

  ruleValidPass() {
    document.querySelector('#changePass').addEventListener('click', () => {
      const pass = document.querySelectorAll('#student-profile__input').value;
      // Defining error variables with a default value
      let passErr;

      // Validate password
      if (pass === '') {
        this.printError('passErr', 'Please enter your password');
      } else {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (regex.test(pass) === false) {
          this.printError('passErr', 'Please enter a valid password');
        } else {
          this.printError('passErr', '');
          passErr = false;
        }
      }
      if (passErr === true) {
        return false;
      }
    });
  }

  renderValidSignUp() {
    this.ruleValidSignUp();
  }

  renderValidPass() {
    this.ruleValidPass();
  }

  renderValidLogin() {
    this.ruleValidLogin();
  }

  renderDrop() {
    this.dropdownMenu();
  }

  renderToggle() {
    this.toggleMenuButton();
  }

  focus() {
    const login = document.querySelector('#loginClick');
    login.addEventListener('click', () => {
      document.getElementById('input-email').focus();
    });
  }

  renderFocus() {
    this.focus();
  }
}
