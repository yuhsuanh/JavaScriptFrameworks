function closedFunction() { //variable is created
    let counter = 1;

    //inner function
    //closure means the inner function can access variables defined in the parent environment
    let increment = function() {
        counter++;
        console.log(counter);
    }

    return increment;
}//variable is destoryed

let countMe = closedFunction();
console.log(countMe);

//the powerful aspect of closure is that this function still has access to 'Counter'
countMe();
countMe();