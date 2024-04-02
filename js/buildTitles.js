const buildTitles = (data) => {
    data.map((title) => {
        selectTitles.forEach(item => {
            item.insertAdjacentHTML('beforeend', `
                <option value="${title}">${title}</option>
            `)
        })
    })
}