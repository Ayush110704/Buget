const budgetForm = document.getElementById("Budgetform");
const amountInput = document.getElementById("amount");
const totalBudgetEl = document.getElementById("total");
const balanceEl = document.getElementById("balance"); 

const expForm = document.getElementById("expenceForm");
const expName = document.getElementById("expenceName");
const expAmount = document.getElementById("expenceAmount");
const expCategory = document.getElementById("expenceCategory");
const expList = document.getElementById("expenceList");

let budget = 0; 
let expenses = [];

//save data to localStorage
// function saveData() {
//   localStorage.setItem("budget", budget);
//   localStorage.setItem("expenses", JSON.stringify(expenses));
// }

// Load data from localStorage on page load
function loadData() {
  const storedBudget = localStorage.getItem("budget");
  const storedExpenses = localStorage.getItem("expenses");

  if (storedBudget) {
    budget = parseInt(storedBudget)||0;
    totalBudgetEl.textContent = budget;
  }

  if (storedExpenses) {
    expenses = JSON.parse(storedExpenses);
    renderExpenses();
  }   
}

// Function to update balance
function updateBalance() {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const balance = budget - totalExpenses; // total balance calculate karne k liye
  console.log("Balance:", balance);
  console.log("Budget:", budget);

  balanceEl.textContent = balance;
    localStorage.setItem("budget", budget);


  if (balance < 0) {
    balanceEl.style.color = "red";
  } else {
    balanceEl.style.color = "green";
  }if ( balance < 0 ){
    alert("You have exceeded your budget!");
  }  
}

// Function to render expense list
function renderExpenses() {
  expList.innerHTML = "";// jab bhi render karenge to pehle list ko clear kr ne k liye 
 const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
 console.log(storedExpenses);
  storedExpenses.forEach((exp, index) => {
    const row = document.createElement("tr");
  console.log("Rendering Expenses:", expenses);

    row.innerHTML = `
      <td>${exp.name}</td>
      <td>${exp.amount}</td>
      <td>${exp.category}</td>
      <td>
       <button onclick="editExpense(${index})">edit</button>
        <button onclick="deleteExpense(${index})">delete</button>
      </td>
    `; 
    expList.appendChild(row);
  }); 
  updateBalance();
}

// Add Expense Function
function addExpense(name, amount, category) {
  expenses.push({ name, amount, category });
  console.log("Added expense:", { name, amount, category }); 
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses(); 
}

// Delete expense
function deleteExpense(index) {
  console.log("Deleting expense at index:", index);

  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  renderExpenses();
  // saveData();
}

// Edit expense
function editExpense(index) {   
  const exp = expenses[index];  // single expence ko get karne k liye
  console.log("Editing expense at index:", index, exp);
  const storedExpenses = localStorage.getItem("expenses"); 
  console.log("Stored Expenses:", storedExpenses);

  expName.value = exp.name;      
  expAmount.value = exp.amount;
  expCategory.value = exp.category;

  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses(); 
}


// Handle budget form submit 
budgetForm.addEventListener("submit", (e) => {
  e.preventDefault();
  budget = parseInt(amountInput.value) || 0; // string ko number me convert karne k liye
  totalBudgetEl.textContent = budget; // jab expenses add ya delete hote hain tab balance update karne k liye
  updateBalance(); 
  budgetForm.reset(); 
});

// Handle expense form submit
expForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = expName.value.trim();
  const amount = parseInt(expAmount.value) || 0;
  const category = expCategory.value; 

  if (!name || isNaN(amount) || category === "Select Category") {
    alert("Please fill all fields correctly!");
    return;
  }

  addExpense(name, amount, category); 
  expForm.reset(); 
});  
window.onload = loadData;