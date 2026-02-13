const balanceE1 = document.getElementById("balance");
const balanceE1 = document.getElementById("income");
const balanceE1 = document.getElementById("expenses");
const transactionList = document.getElementById("transaction-list");
const form = document.getElementById("transaction-form");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

//Add Transaction
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const description = document.getElementById("description").value;
    const amount = +document.getElementById("amount").value;
    const type = document.getElementById("type").value;

    const transaction = {
        id: Date.now(),
        description,
        amount,
        type
    };

    transactions.push(transaction);
    updateLocalStorage();
    updateUI();

    form.reset();
});

//Update UI
function updateUI() {
    transactionList.innerHTML ="";

    let income = 0;
    let expenses = 0;

    transactions.forEach(transaction => {
        const li =document.createElement("li");
        li.classList.add(transaction.type);

        li.innerHTML = '
        ${transaction.description}
        <span>R${transaction.amount.toFixed(2)}</span>
        ';
        transactionList.appendChild(li);

        if(transaction.type === "income") {
            income += transaction.amount;
        } else {
            expenses += transaction.amount;
        }
    });

    const balance = income - expenses;

    incomeE1.textContent = 'R${income.toFixed(2)}';
    expensesE1.textContent = 'R${expenses.toFixed(2)}';
    balanceE1.textContent = 'R${balance.toFixed(2)}';
}

// Save to LocalStorage
function updateLocalStorage(){
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

//Initial Load
updateUI();