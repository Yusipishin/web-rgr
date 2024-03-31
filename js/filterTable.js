const filterTable = () => {
    const inputText = mainInput.value.toLowerCase()
    filterDataTable = dataTable.filter((item) => item.type.toLowerCase().includes(inputText))
    buildTable(inputText ? filterDataTable : dataTable)
}