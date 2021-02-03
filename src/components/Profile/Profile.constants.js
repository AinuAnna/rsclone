const saveDataYesBtn = document.querySelector('#save-data-yes');
const changeAuthYesBtn = document.querySelector('#change-auth-yes');
const changeEMAILYesBtn = document.querySelector('#change-EMAIL-yes');
const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export { saveDataYesBtn, changeAuthYesBtn, changeEMAILYesBtn, patternPassword };
