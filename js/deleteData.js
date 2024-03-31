const deleteData = async (url = '', id) => {
    const response = await fetch(`${url}/${id}`, {method: 'DELETE'});
    return response.json();
}