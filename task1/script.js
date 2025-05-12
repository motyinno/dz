// Array to store expenses
let expenses = [];

// Function to add a new expense
function addExpense() {
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (category && amount) {
        expenses.push({ category, amount });
        updateExpensesList();
        clearInputs();
    }
}

// Function to clear input fields
function clearInputs() {
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
}

// Function to update the expenses list in the table
function updateExpensesList() {
    const tbody = document.getElementById('expensesList');
    tbody.innerHTML = '';

    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>$${expense.amount.toLocaleString()}</td>
            <td><button onclick="deleteExpense(${index})">Delete</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpensesList();
}

// Function to calculate and display expense statistics
function calculateExpenses() {
    // Calculate total amount
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    // Calculate average daily expense (assuming 30 days)
    const averageDailyExpense = totalAmount / 30;
    
    // Get top 3 expenses
    const topExpenses = [...expenses]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);
    
    // Update the display
    document.getElementById('totalAmount').textContent = `$${totalAmount.toLocaleString()}`;
    document.getElementById('averageExpense').textContent = `$${averageDailyExpense.toLocaleString()}`;
    
    const topExpensesList = document.getElementById('topExpenses');
    topExpensesList.innerHTML = '';
    topExpenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.category}: $${expense.amount.toLocaleString()}`;
        topExpensesList.appendChild(li);
    });
}
