async function request() {
    await fetch("./data.json")
        .then((data) => data.json())
        .then((data) => {
            dataTable = data.orders
            dataTitles = data.titles
        })
    buildTable(dataTable)
    buildTitles(dataTitles)
}

request()