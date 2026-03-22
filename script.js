const btn = document.getElementById("btn");
const inputOrder = document.getElementById("inputOrder");
const inputTable = document.getElementById("inputTable");
const list = document.querySelector(".list");
let allOrdersLister = JSON.parse(localStorage.getItem("@order")) || [];

regexExcludeNumber();

btn.addEventListener("click", (event) => {

    addOrder();
    event.preventDefault();
})

function readOrder() {

    list.innerHTML = "";
    allOrdersLister.forEach((item, index) => {
        
        let orderElement = document.createElement("li");

        orderElement.innerHTML = `
        <div>
            <strong>Mesa:</strong> 
            <p> ${item.table}</p> 
            <strong> Pedido:</strong> 
            <p>${item.order}</p>
        </div    
        `;
        
        orderElement.classList.add("itemList");

        let deleteOrderBtn = document.createElement("a");
        deleteOrderBtn.setAttribute("href", "#");
        deleteOrderBtn.classList.add("btnDelete");
        deleteOrderBtn.classList.add("btnEnd");

        let deleteText = document.createTextNode("X");
        deleteOrderBtn.appendChild(deleteText);

        deleteOrderBtn.onclick = () => deleteOrder(index);

        orderElement.appendChild(deleteOrderBtn);
        list.appendChild(orderElement);

    });
};

readOrder();

function addOrder(){
    if (inputOrder.value.trim() === "" || inputTable.value.trim() === "") {
        let container = document.querySelector(".container");
        let alertIcon = document.createElement("span");

        alertIcon.classList.add("alertIcon");

        let textAlert = document.createTextNode("⚠️Você não digitou o pedido!");
        alertIcon.appendChild(textAlert);
        container.lastElementChild.prepend(alertIcon);

        if(container.childElementCount > 3 ){
            alertIcon.remove();
        }

        setTimeout(() => {
            alertIcon.remove();
        }, 2000);

        return false;
    } else {
        let newOrder =  inputOrder.value.trim();
        let newTable = inputTable.value.trim();

        allOrdersLister.push({order: newOrder, table: newTable});
        inputOrder.value = "";
        inputTable.value = "";

        saveDate();
        readOrder();
    }
};

function deleteOrder(position) {
    allOrdersLister.splice(position, 1);
    readOrder();
    saveDate();
};

function saveDate(){
    localStorage.setItem("@order", JSON.stringify(allOrdersLister));
};

function regexExcludeNumber(){
    inputTable.addEventListener("input", () => {
        let regexString = /\D/g;
        let valueString = inputTable.value.replace(regexString, "");

        inputTable.value = valueString;        
    });
};
