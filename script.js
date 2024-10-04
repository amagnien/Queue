document.addEventListener('DOMContentLoaded', () => {
    fetchCustomers(); // Fetch existing customers on page load
});

async function fetchCustomers() {
    const response = await fetch('/.netlify/functions/storeCustomer');
    if (response.ok) {
        const customers = await response.json();
        customers.forEach(customer => {
            waitingCustomers.push(customer);
        });
        updateWaitingTable(); // Update the waiting table with fetched customers
    }
}

async function addNewCustomer(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const service = document.getElementById('service').value;
    const timestamp = new Date();

    const newCustomer = { ticketNumber: ticketCounter++, name, description, service, timestamp };

    // Send POST request to store the new customer
    const response = await fetch('/.netlify/functions/storeCustomer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCustomer),
    });

    if (response.ok) {
        waitingCustomers.push(newCustomer);
        updateWaitingTable();
        customerForm.reset();
    } else {
        console.error('Failed to add customer');
    }
}
