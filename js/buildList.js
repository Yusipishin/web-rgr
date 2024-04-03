const listTable = document.querySelector('.rename__table-body')

const buildList = (titles) => {
    listTable.innerHTML = ''
    titles.map((item) => (
        listTable.insertAdjacentHTML('beforeend', `
          <tr>
            <td>${item.title}</td>
            <td>
                <img data-id="${item.id}" class="main__ic rename__ic-delete" src="../ic/trash-ic.svg" alt="Удалить">
            </td>
          </tr>
        `)
    ))
}