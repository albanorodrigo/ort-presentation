// Rutina para agregar opciones a un <select>
function addOptions(domElement, array, isArray = false) {
    
    const select = document.getElementsByName(domElement)[0];
    select.innerHTML = "";

    if(!isArray){
        for (value in array) {
            const option = document.createElement("option");
            option.text = array[value];
            option.value = array[value];
            select.add(option);
        }
    }else{
        for (value in array) {
            const option = document.createElement("option");
            option.text = array[value][0];
            option.value = array[value][0];
            select.add(option);
        }
    }   
}