const form = document.querySelector('.add__form');

const postOrder = (event) => {
    event.preventDefault()
    const orderData = {};
    const orderInputs = form.querySelectorAll('input');
    const orderSelects = form.querySelectorAll('select');

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
        .then(data => console.log(data))

    request()
    setVisible('main-section')
}

form.addEventListener('submit', postOrder)
