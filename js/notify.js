const notify = (text) => {
    const messageElement = document.createElement('div');
    const contEl = document.querySelector('.container')
    const mainEl = document.querySelector('main')
    messageElement.classList.add('add__title', 'secondary-title', 'notify')
    messageElement.textContent = text;
    contEl.appendChild(messageElement);

    mainEl.classList.add('none')
    setTimeout(() => {
        messageElement.remove();
        mainEl.classList.remove('none')
    }, 1000);
}