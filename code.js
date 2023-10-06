addItems = document.getElementById('button');
addItems.addEventListener('click', function() {
    const product = document.getElementById('product').value
    const price = document.getElementById('price').value
    const category = document.getElementById('category').value

    addItems = {
        product: product,
        price: price,
        category: category
    }

    axios.post('https://crudcrud.com/api/f63116c16f4944069a8040408c3fc6e8/adminpage', addItems)
    .then((res) => {
        console.log(res)
        //show(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
    alert('Item added Successfully')

    axios.get('https://crudcrud.com/api/f63116c16f4944069a8040408c3fc6e8/adminpage')
    .then((res) => {
        console.log(res)
        for(var i=0;i<res.data.length;i++)
        {
            show(res.data[i])
        }
    })
})
function show(addItems) {
    const parentChild = document.getElementById('Seller')
    const category = addItems.category;
    
    let categorySection = document.getElementById(category);
    if (!categorySection) {
        categorySection = document.createElement('section');
        categorySection.id = category;
        categorySection.innerHTML = `<h3>${category} items</h3>`;
        parentChild.appendChild(categorySection);
    }
    const existingChild = categorySection.querySelector(`li[data-product-id="${addItems._id}"]`);
    if (!existingChild) {
      const child = document.createElement('li');
      child.textContent = addItems.product + ' - ' + addItems.price + ' - ' + addItems.category;
      child.dataset.productId = addItems._id;

    // const child = document.createElement('li')
    // child.textContent = addItems.product + ' - ' + addItems.price + ' - ' + addItems.category

        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete product'
        deleteButton.addEventListener('click', function() {
            categorySection.removeChild(child)
            axios.delete(`https://crudcrud.com/api/f63116c16f4944069a8040408c3fc6e8/adminpage/${addItems._id}`)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                
                console.log(err)
            })
        })

        //parentChild.appendChild(categorySection);
        child.appendChild(deleteButton)
        categorySection.appendChild(child)
    }
}