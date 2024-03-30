"use strict"

let dataTable,
    dataTitles,
    filterDataTable,
    addForm = false;

const sections = document.querySelectorAll('section')

const main = document.querySelector('main')
const mainSection = document.querySelector('.main-section')
const addSection = document.querySelector('.add-section')
const addBtn = document.querySelector('.main__btn-add');
const editBtn = document.querySelector('.main__btn-rename');
const editIc = document.querySelector('.main__ic-edit')
const deleteIc = document.querySelector('.main__ic-delete')

const setVisible = (cls) => {
    sections.forEach(section => {
        if (section.classList.contains(cls)) {
            section.classList.remove('none')
        } else section.classList.add('none')
    })
}

document.querySelector('.btn-cancel')
    .addEventListener('click', setVisible('main-section'))

addBtn.addEventListener('click', () => {
    addForm = !addForm;
    setVisible('add-section')
})

editBtn.addEventListener('click', () => {

})