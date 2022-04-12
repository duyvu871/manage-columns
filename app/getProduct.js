const path = `/app/exampleData.json`;
fetch(path)
    .then(res => res.json())
    .then(result => {
        createGridTable(result[0]);
        products = result[0];
});

