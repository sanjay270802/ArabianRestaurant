let openShopping = document.querySelector('.cart-button');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.cart-button-value');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'BIRIYANI',
        image:'prawnbiri.jpeg',
        price: 180
    },
    {
        id: 2,
        name: 'FRIED RICE',
        image: 'friedrice.jpeg',
        price: 120
    },
    {
        id: 3,
        name: 'BBQ',
        image: 'bbq.jpeg',
        price: 400
    },
    {
        id: 4,
        name: 'ROOTI',
        image: 'rooti.jpg',
        price: 20
    },
    {
        id: 5,
        name: 'NOODLES',
        image: 'noodles.jpeg',
        price: 140
    },
    {
        id: 6,
        name: 'MIX SEA FOOD',
        image: 'seafood.jpeg',
        price: 260
    },
    {
        id: 7,
        name: 'GRAVY',
        image: 'gravy.jpeg',
        price: 220
    },
    {
        id: 8,
        name: 'MILK SHAKE',
        image: 'milkshake.jpeg',
        price: 100
    },
    {
        id: 9,
        name: 'JUICE',
        image: 'juice.jpeg',
        price: 60
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="./img/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="./img/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}