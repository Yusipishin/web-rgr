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

    let delayDays = daysBetweenDates(date1, date2) - orderData.days
    delayDays = delayDays > 0 ? delayDays : 0
    orderData.allowance = parseInt(delayDays * 3/2 * orderData.rate)
    orderData.total = orderData.days * orderData.rate + orderData.allowance

    updateData('http://localhost:3000/orders', updateId, orderData)
        .then(() => getOrders())
        .then(() => setVisible('main-section'))
        .then(() => resetForms())
}

function daysBetweenDates(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
}