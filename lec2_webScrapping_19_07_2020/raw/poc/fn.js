//function body
function myfun(fn){
    let val = fn();
    console.log( val);
}

// object , undefined , boolean , string , null


//function calls
// myfun(10);
// myfun(true);
// myfun([1,2,3,4,5]);
// myfun("Hello i am steve");
// myfun();

// function are variables

function smallFun(){
    let a = 10;
    console.log("Hello i am a small function");
    return a;
}


myfun(smallFun)