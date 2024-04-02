"use strict"

//         Работа с сервером:
// npm i -g json-server -- установка
// json-server -w data.json -- запуск

let dataTable, filterDataTable, titles,
    sections, forms, deleteId, updateId;

const tableBody = document.querySelector('.main__table-body');
const mainInput = document.querySelector('.main__input')
const selectTitles = document.querySelectorAll('.add__form-titles')
const cancelBtns = document.querySelectorAll('.btn-cancel')
const addForm = document.querySelector('.add__form');
const editForm = document.querySelector('.edit__form');
const renameBody = document.querySelector('.rename__table-body');
const findBtn = document.querySelector('.main__btn-find')
const addBtn = document.querySelector('.main__btn-add');
const editBtn = document.querySelector('.main__btn-rename');

const setVisible = (cls) => {
    sections.forEach(section => {
        if (section.classList.contains(cls)) {
            section.classList.remove('none')
        } else section.classList.add('none')
    })
}

const resetForms = () => {
    forms.forEach(form => form.reset())
}

cancelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        resetForms()
        setVisible('main-section')
    })
})

addBtn.addEventListener('click', () => setVisible('add-section'))
editBtn.addEventListener('click', () => setVisible('auth-section'))

getOrders().then(() => afterCode())

const afterCode = async () => {
    await fetch("http://localhost:3000/titles")
        .then((data) => data.json())
        .then((data) => {
            titles = data
            buildTitles(data)
            buildList(data)
    })

    renameBody.addEventListener('click', (e) => {
        const el = e.target
        if (el.classList.contains('rename__ic-delete')) {
            const titleDel = el.getAttribute('data-title')
            updateList(titleDel)
        }
    })

    sections = document.querySelectorAll('section')
    forms = document.querySelectorAll('form')

    addForm.addEventListener('submit', postOrder)
    editForm.addEventListener('submit', updateOrder)
    findBtn.addEventListener('click', filterTable)

    tableBody.addEventListener('click', async (event) => {
        const elem = event.target
        if (elem.classList.contains('main__ic-delete')) {
            deleteId = elem.getAttribute('data-id')
            deleteData('http://localhost:3000/orders', deleteId)
                .then(() => getOrders())
        } else if (elem.classList.contains('main__ic-edit')) {
            setVisible('edit-section')
            updateId = event.target.getAttribute('data-id')
            await fetch(`http://localhost:3000/orders/${updateId}`)
                .then((data) => data.json())
                .then((data) => {
                    const orderInputs = editForm.querySelectorAll('input');
                    const orderSelects = editForm.querySelectorAll('select');

                    orderInputs.forEach(input => {
                        input.value = data[input.getAttribute('name')]
                    });
                    orderSelects.forEach(select => {
                        select.value = data[select.getAttribute('name')]
                    });
                })
        }
    })
}