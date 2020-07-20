//objects -> key value pairs

let obj = {
    "name" : "Steve Rogers",
    "age" : 100,
    "address" : {
                   "city" : "Queens",
                    "state" : "New York"
                },
    "movies" : ["winter soldier" , "the first avenger"],
     "saysHi" : function (){
         console.log("function says hi !!")
     }
}


// console.log(obj.name);
// console.log(  obj["name"]  );
// console.log(obj.movies);
// console.log(obj.address.city);
// obj.saysHi();
console.log(obj.saysHi);
