'use strict';

const table = document.querySelector('table');
const headers = document.querySelectorAll('thead th');
const tableBody = table.querySelector('tbody');
const rows = table.querySelectorAll('tbody tr');

const sortDirection = {};

headers.forEach((header, i) => {
  if (!sortDirection[i]) {
    sortDirection[i] = 'asc';
  }
});

headers.forEach((header, index) => {
  header.addEventListener('click', function (el) {
    const columnIncludesNum = index === 3 || index === 4;
    const direction = sortDirection[index] === 'desc' ? 'asc' : 'desc';

    sortDirection[index] = direction;

    const sortRows = [...rows].sort((a, b) => {
      const aCell = a.cells[index].textContent;
      const bCell = b.cells[index].textContent;

      if (columnIncludesNum) {
        return sortNumber(aCell, bCell);
      } else {
        if (sortDirection[index] === 'asc') {
          return bCell.localeCompare(aCell);
        } else {
          return aCell.localeCompare(bCell);
        }
      }
    });

    tableBody.innerHTML = '';

    sortRows.forEach((row) => {
      tableBody.appendChild(row);
    });

    function sortNumber(a, b) {
      const numA = parseFloat(a.replace(/[^\d,]/g, ''));
      const numB = parseFloat(b.replace(/[^\d,]/g, ''));

      if (sortDirection[index] === 'asc') {
        return numB - numA;
      } else {
        return numA - numB;
      }
    }
  });
});

rows.forEach((row) => {
  row.addEventListener('click', function (el) {
    rows.forEach((r) => {
      r.classList.remove('active');
    });

    if (el.target) {
      this.classList.add('active');
    }
  });
});

const form = document.createElement('form');

form.classList.add('new-employee-form');

const msg = document.createElement('div');

msg.setAttribute('data-qa', 'notification');
msg.classList.add('success');
document.body.appendChild(msg);

const nameLabel = document.createElement('label');
const nameInput = document.createElement('input');

nameLabel.textContent = 'Name:';
nameInput.type = 'text';
nameInput.name = 'name';
nameInput.setAttribute('data-qa', 'name');
nameInput.required = true;
nameInput.setAttribute('minLength', '4');

nameLabel.appendChild(nameInput);
form.appendChild(nameLabel);

const positionLabel = document.createElement('label');
const positionInput = document.createElement('input');

positionLabel.textContent = 'Position:';
positionInput.type = 'text';
positionInput.name = 'position';
positionInput.setAttribute('data-qa', 'position');
positionInput.required = true;
positionInput.setAttribute('minLength', '4');

positionLabel.appendChild(positionInput);
form.appendChild(positionLabel);

const cities = [
  'Tokyo',
  'Singapore',
  'London',
  'New York',
  'Edinburgh',
  'San Francisco',
];

const officeLabel = document.createElement('label');
const selectOffice = document.createElement('select');

officeLabel.textContent = 'Office:';

cities.forEach((el) => {
  const optionOfficeFirst = document.createElement('option');

  optionOfficeFirst.textContent = el;

  selectOffice.appendChild(optionOfficeFirst);
});

officeLabel.appendChild(selectOffice);
form.appendChild(officeLabel);

const ageLabel = document.createElement('label');
const ageInput = document.createElement('input');

ageLabel.textContent = 'Age:';
ageInput.type = 'number';
ageInput.name = 'age';
ageInput.setAttribute('data-ga', 'age');
ageInput.required = true;
ageLabel.appendChild(ageInput);
form.appendChild(ageLabel);

const salaryLabel = document.createElement('label');
const salaryInput = document.createElement('input');

salaryLabel.textContent = 'Salary:';
salaryInput.type = 'number';
salaryInput.name = 'salary';
salaryInput.setAttribute('data-qa', 'salary');
salaryInput.required = true;

salaryLabel.appendChild(salaryInput);
form.appendChild(salaryLabel);

const btn = document.createElement('button');

btn.textContent = 'Save to table';

form.appendChild(btn);

document.body.appendChild(form);

btn.addEventListener('click', function (el) {
  el.preventDefault();

  const input = form.querySelectorAll('input, select');
  const tr = document.createElement('tr');

  input.forEach((e) => {
    const td = document.createElement('td');

    if (e.textContent === 'Office:') {
      td.textContent = e.value;
      tr.appendChild(td);
    } else if (e.name === 'age') {
      if (Number(e.value) < 18 || Number(e.value) > 90) {
        allertMesage('age must be betwen 18 - 90', 'error');
      } else {
        td.textContent = e.value;
        tr.appendChild(td);
      }
    } else if (e.name === 'salary') {
      if (!Number(e.value)) {
        allertMesage('Must be nummber', 'error');
      } else {
        td.textContent = formatNumber(e.value);
        tr.appendChild(td);
      }
    } else {
      td.textContent = e.value;
      tr.appendChild(td);
    }
  });

  if (!form.checkValidity()) {
    form.reportValidity();
  } else {
    tableBody.appendChild(tr);
    form.reset();
    allertMesage('new employee is successfully added to the table', 'success');
  }
});

function formatNumber(message) {
  const words = message.split('').reverse();
  const result = [];

  for (let i = 0; i < words.length; i += 3) {
    result.push(words.slice(i, i + 3).join(''));
  }

  return '$' + result.reverse().join(',');
}

function allertMesage(mesage, type) {
  msg.textContent = mesage;
  msg.className = type;
}
