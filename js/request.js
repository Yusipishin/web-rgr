
// npm i -g json-server -- установка
// json-server -w data.json -- запуск

async function request() {
    await fetch("http://localhost:3000/orders")
        .then((data) => data.json())
        .then((data) => buildTable(data))

    await fetch("http://localhost:3000/titles")
        .then((data) => data.json())
        .then((data) => buildTitles(data))
}

request()