const deleteLectureYesBtn = document.querySelector('#delete-lecture-yes');

function getSectionInput() {
  const sectionInput = document.querySelector('.section-input');
  return sectionInput;
}

function getLectionInput() {
  const lectionInput = document.querySelector('.lection-input');
  return lectionInput;
}

function getFilePathInput() {
  const filePathInput = document.querySelector('.file-path');
  return filePathInput;
}

export { deleteLectureYesBtn, getSectionInput, getLectionInput, getFilePathInput };
