const apiUrl = "https://mysqlfastapi.vercel.app";

// Add customer
document.getElementById("customerForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const customerName = document.getElementById("customerName").value;
    const response = await fetch(`${apiUrl}/customer/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer_name: customerName }),
    });

    if (response.ok) {
        alert("Customer added successfully!");
    } else {
        alert("Error adding customer.");
    }
});

// Add order
document.getElementById("orderForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const customerId = document.getElementById("customerId").value;
    const response = await fetch(`${apiUrl}/order/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer_id: parseInt(customerId) }),
    });

    if (response.ok) {
        alert("Order added successfully!");
    } else {
        alert("Error adding order.");
    }
});

// Fetch customers
async function fetchCustomers() {
    const response = await fetch(`${apiUrl}/customers`);
    const data = await response.json();
    const customerList = document.getElementById("customerList");
    customerList.innerHTML = data.map(customer => `
        <p>Customer ID: ${customer.customer_id}, Name: ${customer.customer_name}</p>
    `).join("");
}

// Fetch customer orders
async function fetchCustomerOrders() {
    const customerId = document.getElementById("orderCustomerId").value;
    const response = await fetch(`${apiUrl}/customers/${customerId}/orders`);
    const data = await response.json();
    const orderList = document.getElementById("orderList");
    if (data.length > 0) {
        orderList.innerHTML = data.map(order => `
            <p>Order ID: ${order.order_id}, Date: ${order.order_date}</p>
        `).join("");
    } else {
        orderList.innerHTML = "<p>No orders found for this customer.</p>";
    }
}
