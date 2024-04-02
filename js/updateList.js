async function updateList(titleDel) {
    titles = titles.filter(item => item !== titleDel)
    console.log(titles)
    await fetch("http://localhost:3000/titles", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(titles)
    });
    buildList(titles)
    // buildTitles(titles)
}