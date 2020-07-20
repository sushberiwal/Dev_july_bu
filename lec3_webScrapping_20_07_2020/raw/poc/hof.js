// high order functions -> functions those take 
//functions as a paramter

function getFirstName(fullName){
    let firstName = fullName.split(" ")[0]; 
    return firstName;
}

function getLastName(fullName){
 let lastName = fullName.split(" ")[1];
 return lastName;
}

function getName( fullName , cb ){

    let name = cb(fullName);
    console.log(name);

}


// functions can be sent as a paramter
getName("Steve rogers" , getFirstName);
getName("Steve rogers" , getLastName);
