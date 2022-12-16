//GET ELEMENTS FROM HTML DOCUMENT
const   cep = document.querySelector("#cep"),
        consultButton = document.querySelector("#consult"),
        clearButton = document.querySelector("#clear");


//FILL INPUT FIELDS
const showData = (result) => {
    for(const campo in result){
        if(document.querySelector("#"+campo)){
            document.querySelector("#"+campo).value = result[campo]
        }
    }
}


//QUERYING CEP API
cep.addEventListener("blur", () => {
    setTimeout(toggleLoader, 200);
    toggleLoader();
    let search = cep.value.replace("-", "");

    fetch(`https://viacep.com.br/ws/${search}/json/`)
    .then(res => { res.json()
        .then(data => showData(data))
    })
    .catch(error => console.log("Houve um erro: " + error.message));
})


//VALIDATE CEP INPUT
cep.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/;
    const key = String.fromCharCode(e.keyCode);

    if (!onlyNumbers.test(key)) {
        e.preventDefault();
        return
    }
})


//FILL WITH THE BUTTON
consultButton.addEventListener("click", showData);


//FILL WITH THE ENTER KEY
document.addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        cep.blur()
    }
})


//CLEAR WITH THE BUTTON
clearButton.addEventListener("click", () => {
    location.reload();
})


//SHOW OR HIDE LOADER
const toggleLoader = () => {
    const containerElement = document.querySelector(".container");
    const loaderElement = document.querySelector(".loader");

    containerElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
}