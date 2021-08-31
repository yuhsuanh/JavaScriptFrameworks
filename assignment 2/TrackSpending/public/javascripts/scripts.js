function confirmDeletion() {
    return confirm("Are you want to delete?");
}
var pts;

function addItemRow() {
    var row = document.createElement("tr");
    
    // fields
    var itemNameCell = document.createElement("td");
    var itemName = document.createElement("input");
    itemName.setAttribute("name", "itemName");
    itemName.setAttribute("class", "itemName");
    itemName.setAttribute("required", "true");
    itemNameCell.appendChild(itemName);

    var categoryCell = document.createElement("td");
    var category = document.createElement("select");
    category.setAttribute("name", "category");
    category.setAttribute("class", "cateogry");
    categories.forEach(ele => {
        let option = document.createElement("option");
        option.textContent = ele.name;
        option.textContent.value = ele.name;
        category.appendChild(option);
    });
    categoryCell.appendChild(category);

    var priceCell = document.createElement("td");
    var price = document.createElement("input");
    price.setAttribute("name", "price");
    price.setAttribute("class", "dynamic");
    price.setAttribute("onchange", "onInputChange(this)");
    price.setAttribute("required", "true");
    priceCell.appendChild(price);

    var amountCell = document.createElement("td");
    var amount = document.createElement("input");
    amount.setAttribute("name", "amount");
    amount.setAttribute("class", "dynamic");
    amount.setAttribute("onchange", "onInputChange(this)");
    amount.setAttribute("required", "true");
    amountCell.appendChild(amount);

    var priceTotalCell = document.createElement("td");
    var priceTotal = document.createElement("label");
    priceTotal.setAttribute("name", "priceTotal");
    priceTotal.setAttribute("class", "priceTotal");
    priceTotalCell.appendChild(priceTotal);

    var delCell = document.createElement("td");
    var delBtn = document.createElement("button");
    delBtn.setAttribute("type", "button");
    delBtn.setAttribute("class", "btn btn-danger");
    delBtn.textContent = "Delete";
    delCell.appendChild(delBtn);


    //add change listener
    // onInputChangeListener(price);
    // onInputChangeListener(amount);

    //add delete listener
    delBtn.addEventListener('click', function(){
        this.parentNode.parentNode.remove();
        //TODO:: re-calculate total
        calculateTotal();
    });

    //add to row
    row.appendChild(itemNameCell);
    row.appendChild(categoryCell);
    row.appendChild(priceCell);
    row.appendChild(amountCell);
    row.appendChild(priceTotalCell);
    row.appendChild(delCell);

    //add to tbody
    document.getElementsByTagName('tbody')[0].appendChild(row);
}

function onInputChange(ele) {
    console.log(ele.parentNode.nextSibling);
    globalEle = ele.parentNode.parentNode;

    let row = ele.parentNode.parentNode;    
    let price = parseFloat(row.getElementsByClassName('dynamic')[0].value);
    let amount = parseInt(row.getElementsByClassName('dynamic')[1].value);
    console.log(amount)

    if(!isNaN(price) && !isNaN(amount)) {
        row.getElementsByClassName('priceTotal')[0].textContent = price * amount;
        calculateTotal();
        // var sum = 0.0;
        // var priceTotals = document.getElementsByClassName('priceTotal');
        // for(let i = 0; i < priceTotals.length; i++) {
        //     sum += parseFloat(priceTotals[i].textContent);
        // }
        // document.getElementById('total').value = sum.toFixed(2);
    }
}

var deletePriceTotal = 0.0;
let test;
function deleteExistRow(ele) {
    test = ele;
    ele.style.display = "none";
    ele.parentNode.getElementsByClassName('isDelete')[0].value = "true";
    ele.parentNode.getElementsByClassName('recover-btn')[0].style.display = "";

    deletePriceTotal += parseFloat(ele.parentNode.parentNode.getElementsByClassName('priceTotal')[0].textContent);
    calculateTotal();
}

function recoverExistRow(ele) {
    ele.style.display = "none";
    ele.parentNode.getElementsByClassName('isDelete')[0].value = "false";
    ele.parentNode.getElementsByClassName('delete-btn')[0].style.display = "";

    deletePriceTotal -= parseFloat(ele.parentNode.parentNode.getElementsByClassName('priceTotal')[0].textContent);
    calculateTotal();
}

function calculateTotal() {
    var sum = 0.0;
    var priceTotals = document.getElementsByClassName('priceTotal');
    for(let i = 0; i < priceTotals.length; i++) {
        console.log(priceTotals[i].textContent);
        if(priceTotals[i].textContent)
            sum += parseFloat(priceTotals[i].textContent);
    }
    document.getElementById('total').value = (sum - deletePriceTotal).toFixed(2);
}