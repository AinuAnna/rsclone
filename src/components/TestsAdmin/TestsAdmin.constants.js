const deleteGroupTestsYesBtn = document.querySelector('#delete-test-yes');

function getTitle() {
  const titleTestInput = document.querySelector('.title-test-input');
  return titleTestInput;
}

function getQuestionInputs() {
  const questionInputs = document.querySelectorAll('.question-input');
  return questionInputs;
}

function getOptionInputs() {
  const optionInputs = document.querySelectorAll('.option-input');
  return optionInputs;
}

const addQuestBtn = document.querySelector('.add-question-btn');
const addTestBtn = document.querySelector('.add-test-btn');

export { deleteGroupTestsYesBtn, getTitle, getQuestionInputs, getOptionInputs, addQuestBtn, addTestBtn };
