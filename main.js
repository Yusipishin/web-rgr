"use strict"

let dataTable, filterDataTable;
const tableBody = document.querySelector('.main__table-body');
const mainInput = document.querySelector('.main__input')
const findBtn = document.querySelector('.main__btn-find')
const addBtn = document.querySelector('.main__btn-add');
const editBtn = document.querySelector('.main__btn-rename');
const editIc = document.querySelector('.main__ic-edit')
const deleteIc = document.querySelector('.main__ic-delete')

async function request() {
  await fetch("./data.json")
    .then((data) => data.json())
    .then((data) => dataTable = data.orders)
  buildTable(dataTable)
}

const buildTable = (data) => {
  tableBody.innerHTML = ''
  data.map((item, i) => (
    tableBody.insertAdjacentHTML('beforeend', `
      <tr>
        <td>${item.id}</td>
        <td>${item.client}</td>
        <td>${item.title}</td>
        <td>${item.type}</td>
        <td>${item.format}</td>
        <td>${item.issued}</td>
        <td>${item.returned}</td>
        <td>${item.days}</td>
        <td>${item.rate}</td>
        <td>${item.allowance}</td>
        <td>${item.total}</td>
        <td>
          <img class="main__ic main__ic-edit" src="./edit-ic.svg" alt="Редактировать">
          <img class="main__ic main__ic-delete" src="./trash-ic.svg" alt="Удалить">
        </td>
      </tr>
    `)
  ))
}

request()

findBtn.addEventListener('click', () => {
  const inputText = mainInput.value.toLowerCase()
  filterDataTable = dataTable.filter((item) => item.type.toLowerCase().includes(inputText))
  buildTable(inputText ? filterDataTable : dataTable)
})

addBtn.addEventListener('click', () => {

})

editBtn.addEventListener('click', () => {

})