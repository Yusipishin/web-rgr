const listTable = document.querySelector('.rename__table-body')

const buildList = (titles) => {
    listTable.innerHTML = ''
    titles.map((title) => (
        listTable.insertAdjacentHTML('beforeend', `
          <tr>
            <td>${title}</td>
            <td>
                <img data-title="${title}" class="main__ic rename__ic-delete" src="../ic/trash-ic.svg" alt="Удалить">
            </td>
          </tr>
        `)
    ))
}