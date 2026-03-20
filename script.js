//TODO conseguir resolver o problema de passar o número da mesa para o elemento li dentro da ul
//Resolvido
const btn = document.getElementById("btn");
const inputOrder = document.getElementById("inputOrder");
const inputTable = document.getElementById("inputTable");
const list = document.querySelector(".list");
// let allOrdersLister = [{}]; O erro estava no array com objeto vazio
let allOrdersLister = [];
//TODO IMPLEMENTARA ARRAY DE OBJETOS
btn.addEventListener("click", (event) => {

    addOrder();
    readOrder();
    hasBlankSpace();

    event.preventDefault();
})

//Read order in ul
function readOrder() {

    list.innerHTML = "";
    allOrdersLister.forEach((item, index) => {
        
        // let tableElement = document.createElement("h2");
        let orderElement = document.createElement("li");

        //Decidi criar um elemento de texto mais semãntico
        // let orderText = document.createTextNode(item.order);
        // let tableText = document.createTextNode(item.table);

        orderElement.innerHTML = `<srtong>Mesa:</h1> ${item.table} Pedido: ${item.order}</strong>`;
        orderElement.classList.add("itemList");

        let deleteOrderBtn = document.createElement("a");
        deleteOrderBtn.setAttribute("href", "#");
        deleteOrderBtn.classList.add("btnDelete");

        let deleteText = document.createTextNode("X");
        deleteOrderBtn.appendChild(deleteText);

        // deleteOrder.setAttribute("onclick", `deleteOrder(${index})`);
        //Arrow function é mais segura do que injetar como atributo? Teste
        deleteOrderBtn.onclick = () => deleteOrder(index);

        // tableElement.appendChild(tableText);
        // orderElement.appendChild(orderText);
        // orderElement.appendChild(tableElement);

        orderElement.appendChild(deleteOrderBtn);
        list.appendChild(orderElement);

    });
};

//TODO IMPLEMENTAR REGEX NA VERIFICAÇÃO
function hasBlankSpace(){

    const orderValue = inputOrder.value;
    const tableValue = inputTable.value;
    const regex = /\s/; //regex global
    if (regex.test(tableValue) || regex.test(orderValue)) {
        console.log("OK");
        return true;
    };

    return false;
    
};

//ADD order on list and error background in the input
function addOrder(){
    //Alert
    if (inputOrder.value.trim() === "" || inputTable.value.trim() === "") {
        let main = document.querySelector("main");
        let alertIcon = document.createElement("span");
        let alertTable = document.createElement("span");

        alertIcon.classList.add("alertIcon");
        alertTable.classList.add("alertIcon");

        let textAlert = document.createTextNode("⚠️Você não digitou o pedido!");
        let textTable = document.createTextNode("⚠️Você não digitou o número da mesa!");
        alertTable.appendChild(textTable);
        alertIcon.appendChild(textAlert);
        main.appendChild(alertIcon);
        main.appendChild(alertTable);

        if(main.childElementCount > 4 ){
            alertIcon.remove();
            alertTable.remove()
        }

        setTimeout(() => {
            alertIcon.remove();
            alertTable.remove()
        }, 2000);

        return false;
    } else {
        let newOrder =  inputOrder.value;
        let newTable = inputTable.value.trim();

        allOrdersLister.push({order: newOrder, table: newTable});
        inputOrder.value = "";
        inputTable.value = "";

        readOrder();
    }
};

function deleteOrder(position) {
    allOrdersLister.splice(position, 1);
    readOrder();
};
