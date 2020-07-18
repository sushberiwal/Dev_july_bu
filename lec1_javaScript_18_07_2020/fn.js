function saysHi(name , message){
    console.log(name + " " + message);
    return 10;
}

saysHi( "Steve" , "says Hi" );

let data =  saysHi( "Steve" , "says Hi" );
console.log(data);


// functions are variables

let greeter = function saysHi(){
     console.log("function are variables");
 }

greeter();

