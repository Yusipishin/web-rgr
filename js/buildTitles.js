const buildTitles = (data) => {
    data.map(async (listItem) => {
        await selectTitles.forEach(item => item.innerHTML = `<option value="">-- Выберите название --</option>`)
        selectTitles.forEach(item => {
            item.insertAdjacentHTML('beforeend', `
                <option value="${listItem.title}">${listItem.title}</option>
            `)
        })
    })
}