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

function getCheckboxOptions() {
  const checkboxOptions = document.querySelectorAll('.checkbox-option');
  return checkboxOptions;
}

export { deleteGroupTestsYesBtn, getTitle, getQuestionInputs, getOptionInputs, getCheckboxOptions };
