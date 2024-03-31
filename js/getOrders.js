async function getOrders() {
    await fetch("http://localhost:3000/orders")
        .then((data) => data.json())
        .then((data) => {
            dataTable = data
            buildTable(data)
        })
}