const tableBody = document.querySelector('.main__table-body');

const buildTable = (data) => {
    tableBody.innerHTML = ''
    data.map((item) => (
        tableBody.insertAdjacentHTML('beforeend', `
      <tr>
        <td>${item.id}</td>
        <td>${item.client}</td>
        <td>${item.title}</td>
        <td>${item.type}</td>
        <td>${item.format}</td>
        <td>${item.issued}</td>
        <td>${item.returned}</td>
        <td>${item.days}</td>
        <td>${item.rate}</td>
        <td>${item.allowance}</td>
        <td>${item.total}</td>
        <td>
          <img class="main__ic main__ic-edit" src="../ic/edit-ic.svg" alt="Редактировать">
          <img class="main__ic main__ic-delete" src="../ic/trash-ic.svg" alt="Удалить">
        </td>
      </tr>
    `)
    ))
}