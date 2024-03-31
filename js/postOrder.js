
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

