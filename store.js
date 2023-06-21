

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');

    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItems);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartItems = document.getElementsByClassName('add-to-cart');
    for (var i = 0; i < addToCartItems.length; i++) {
        var button = addToCartItems[i];
        button.addEventListener('click', addToClicked);
    }

}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function removeCartItems(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function addToClicked(event) {
    var button = event.target;
    console.log(button)
    var shopItems = button.parentElement.parentElement
    var title = shopItems.getElementsByClassName('shop-item-title')[0].innerText
    var img = shopItems.getElementsByClassName('shop-item-image')[0].src
    var price = shopItems.getElementsByClassName('shop-item-price')[0].innerText
    addItemToCart(price, title, img)
    console.log(price)
}


function addItemToCart(price, title, img) {
    var cartRow = document.createElement('div');
    cartRow.innerText = price;
    var cartItems = document.getElementsByClassName('cart-items')
    cartItems.append(cartRow)


}




function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total += price * quantity;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}
