"use strict"

//         Работа с сервером:
// npm i -g json-server -- установка
// json-server -w data.json -- запуск

let dataTable, filterDataTable,
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
const authForm = document.querySelector('.auth__form')
const renameInner = document.querySelector('.rename__inner')
const dangerTxt = document.querySelector('.danger-txt')
const inputTitle = document.querySelector('.input-title')
const renameForm = document.querySelector('.rename__form')
const allFilter = document.querySelector('.all-orders')

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

authForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    let isAdmin = false;
    const inLog = document.querySelector('.login').value
    const inPas = document.querySelector('.password').value
    await fetch("http://localhost:3000/admins")
        .then((data) => data.json())
        .then((data) => {
            data.forEach(acc => {
                if (acc.login === inLog && acc.password === inPas) isAdmin = true;
            })
        })

    if (isAdmin) {
        dangerTxt.classList.add('none')
        if (document.querySelector('.welcome')) document.querySelector('.welcome').remove()
        renameInner.insertAdjacentHTML('afterbegin', `
            <p class="welcome">Добро пожаловать, ${inLog}</p>
        `)
        setVisible('rename-section')
    } else {
        dangerTxt.classList.remove('none')
    }
})

renameForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = inputTitle.value
    postData('http://localhost:3000/titles', {title})
        .then(() => updateTitles())
        .then(() => inputTitle.value = '')
})

getOrders().then(() => afterCode())

const updateTitles = async () => {
    await fetch("http://localhost:3000/titles")
        .then((data) => data.json())
        .then((data) => {
            buildTitles(data)
            buildList(data)
        })
}

const afterCode = async () => {
    const ordPostBtn = document.querySelector('.order-post-btn')
    const mainDelBtn = document.querySelector('.main__ic-delete')
    const orderUpdBtn = document.querySelector('.order-update-btn')
    const addTitleBtn = document.querySelector('.add-title-btn')

    ordPostBtn.addEventListener('click', () => notify('Данные сохранены!'))
    mainDelBtn.addEventListener('click', () => notify('Данные удалены!'))
    orderUpdBtn.addEventListener('click', () => notify('Данные обновлены!'))
    addTitleBtn.addEventListener('click', () => notify('Данные сохранены!'))

    updateTitles()

    renameBody.addEventListener('click', (e) => {
        const el = e.target
        if (el.classList.contains('rename__ic-delete')) {
            const idDel = el.getAttribute('data-id')
            deleteData('http://localhost:3000/titles', idDel)
                .then(() => updateTitles())
        }
    })

    sections = document.querySelectorAll('section')
    forms = document.querySelectorAll('form')

    addForm.addEventListener('submit', postOrder)
    editForm.addEventListener('submit', updateOrder)
    findBtn.addEventListener('click', () => {
        filterTable()
        allFilter.classList.remove('none')
    })

    allFilter.addEventListener('click',() => {
        buildTable(dataTable)
        mainInput.value = ''
        allFilter.classList.add('none')
    })

    tableBody.addEventListener('click', async (event) => {
        const elem = event.target
        if (elem.classList.contains('main__ic-delete')) {
            deleteId = elem.getAttribute('data-id')
            deleteData('http://localhost:3000/orders', deleteId)
                .then(() => getOrders())
                .then(() => notify('Данные удалены!'))
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