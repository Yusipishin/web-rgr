const selectTitles = document.querySelector('.add__form-titles')

const buildTitles = (data) => {
    data.map((title) => {
        selectTitles.insertAdjacentHTML('beforeend', `
            <option value=${title}>${title}</option>
        `)
    })
}