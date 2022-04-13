
function getProduct() {
    const uid = apiFirebase.getLogin().uid;
    database.ref('table/'+ uid).once('value', (snapShoot) => {
        products = snapShoot.val();
    }).then((result) => {

       createFeatured.createGridTable(products)  ;
    }).catch((err) => {
        
    });
}
