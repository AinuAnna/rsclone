// if use, then delete li block in mail.html
/*
// DOM elements
const guideList = document.querySelector('.guides');

// setup guides
const setupGuides = (data) => {

  let html = '';
  data.forEach(doc => {
    const guide = doc.data();
    const li = `
      <li>
        <div class="collapsible-header grey lighten-4"> ${guide.title} </div>
        <div class="collapsible-body white"> ${guide.content} </div>
      </li>
    `;
    html += li;
  });
  guideList.innerHTML = html

};
*/

// setup materialize components
document.addEventListener('DOMContentLoaded', () => {
  const modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  const items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});
