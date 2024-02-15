let expenses = [];

function addExpense() {
    const description = document.getElementById("expenseDescription").value;
    const amount = parseFloat(document.getElementById("expenseAmount").value);
    const category = document.getElementById("expenseCategory").value;

    if (!description || isNaN(amount) || amount <= 0) {
        alert("Please enter valid expense details.");
        return;
    }

    expenses.push({ description, amount, category });

    updateExpenseList();
    updateTotalBalance();
    updateExpenseChart();
}

function updateExpenseList() {
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";
    expenses.forEach(expense => {
        const div = document.createElement("div");
        div.textContent = `${expense.description} - $${expense.amount.toFixed(2)} (${expense.category})`;
        expenseList.appendChild(div);
    });
}

function updateTotalBalance() {
    const totalBalance = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    document.getElementById("totalBalance").textContent = `$${totalBalance.toFixed(2)}`;
}

function updateExpenseChart() {
    const labels = expenses.map(expense => expense.category);
    const data = expenses.map(expense => expense.amount);

    const ctx = document.getElementById("expenseChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Expenses",
                data: data,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
