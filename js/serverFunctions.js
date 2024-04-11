const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

const updateData = async (url = '', id, data = {}) => {
    const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

const deleteData = async (url = '', id) => {
    const response = await fetch(`${url}/${id}`, {method: 'DELETE'});
    return response.json();
}

async function getOrders() {
    await fetch("http://localhost:3000/orders")
        .then((data) => data.json())
        .then((data) => {
            dataTable = data
            buildTable(data)
        })
}

const postOrder = (event) => {
    event.preventDefault()
    const orderData = {};
    const orderInputs = addForm.querySelectorAll('input');
    const orderSelects = addForm.querySelectorAll('select');

    orderInputs.forEach(input => {
        orderData[input.name] = input.value;
    });
    orderSelects.forEach(select => {
        orderData[select.name] = select.value;
    });

    orderData.returned = "---"
    orderData.allowance = "---"
    orderData.total = "---"

    postData('http://localhost:3000/orders', orderData)
        .then(() => getOrders())
        .then(() => setVisible('main-section'))
        .then(() => resetForms())
}

let delayDays, firstDate, secondDate;

const updateOrder = (event) => {
    event.preventDefault()

    const orderData = {};
    const orderInputs = editForm.querySelectorAll('input');
    const orderSelects = editForm.querySelectorAll('select');

    orderInputs.forEach(input => {
        orderData[input.name] = input.value;
    });
    orderSelects.forEach(select => {
        orderData[select.name] = select.value;
    });

    const date1 = orderData.issued;
    const date2 = orderData.returned;
    daysBetweenDates(date1, date2)

    if (firstDate.getTime() < secondDate.getTime() || firstDate.getTime() === secondDate.getTime()) {
        if (daysBetweenDates(date1, date2) < orderData.days) {
            delayDays = daysBetweenDates(date1, date2)
            orderData.allowance = 0
            orderData.total = delayDays * orderData.rate
        } else {
            delayDays = daysBetweenDates(date1, date2) - orderData.days
            orderData.allowance = parseInt(delayDays * 3/2 * orderData.rate)
            orderData.total = orderData.days * orderData.rate + orderData.allowance
        }
    } else {
        orderData.allowance = 0
        orderData.total = 0
    }

    updateData('http://localhost:3000/orders', updateId, orderData)
        .then(() => getOrders())
        .then(() => setVisible('main-section'))
        .then(() => resetForms())
}

function daysBetweenDates(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    firstDate = new Date(date1);
    secondDate = new Date(date2);

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
}

const updateTitles = async () => {
    await fetch("http://localhost:3000/titles")
        .then((data) => data.json())
        .then((data) => {
            buildTitles(data)
            buildTitlesTable(data)
        })
}