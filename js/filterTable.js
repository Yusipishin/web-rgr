const mainInput = document.querySelector('.main__input')
const findBtn = document.querySelector('.main__btn-find')

const filterTable = () => {
    const inputText = mainInput.value.toLowerCase()
    filterDataTable = dataTable.filter((item) => item.type.toLowerCase().includes(inputText))
    buildTable(inputText ? filterDataTable : dataTable)
}

findBtn.addEventListener('click', () => filterTable())