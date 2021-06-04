//parent environment
let x = 1;

function AddNumber() {
    x += 3;
    console.log(x)
}

function MultiplyNumber() {
    x = x * 3;
    console.log(x);
}

AddNumber();
AddNumber();
MultiplyNumber();