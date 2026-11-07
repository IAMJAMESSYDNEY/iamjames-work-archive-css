const controls = document.querySelector('.archive__controls');
const list = document.querySelector('.archive__list');
const search = document.querySelector('#project-search');
const sort = document.querySelector('#date-order');
const direction = document.querySelector('#direction');
const status = document.querySelector('#archive-status');
const rows = Array.from(list.children, element => ({
  element,
  date: element.querySelector('time').dateTime,
  text: element.textContent.toLowerCase(),
}));

let newestFirst = true;

function updateFilter() {
  const query = search.value.trim().toLowerCase();
  let visibleCount = 0;

  for (const row of rows) {
    const matches = row.text.includes(query);
    row.element.classList.toggle('is-search-hidden', !matches);
    if (matches) visibleCount++;
  }

  const noun = visibleCount === 1 ? 'project' : 'projects';
  status.textContent = visibleCount === 0 ? 'No projects match.' : `${visibleCount} ${noun} shown.`;
}

search.addEventListener('input', updateFilter);

sort.addEventListener('click', () => {
  newestFirst = !newestFirst;
  const order = newestFirst ? -1 : 1;

  rows.sort((first, second) => order * first.date.localeCompare(second.date));
  list.append(...rows.map(row => row.element));
  direction.textContent = newestFirst ? '↓ Newest first' : '↑ Oldest first';
});

controls.hidden = false;
updateFilter();
