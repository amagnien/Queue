let ticketNumber = 1;
let waitingCustomers = [];
let servedCustomers = [];

// Generate ticket number and show form
document.getElementById('newCustomerBtn').addEventListener('click', () => {
    document.getElementById('ticketNumber').textContent = ticketNumber++;
    document.getElementById('newCustomerForm').style.display = 'block';
});

// Handle form submission
document.getElementById('submitCustomer').addEventListener('click', () => {
    let name = document.getElementById('customerName').value;
    let description = document.getElementById('customerDescription').value;
    let serviceRequested = document.getElementById('serviceRequested').value;
    let serviceType = document.getElementById('serviceType').value;
    
    waitingCustomers.push({ 
        ticket: ticketNumber - 1, 
        name, 
        description, 
        serviceRequested, 
        serviceType, 
        time: new Date().toLocaleTimeString() 
    });
    
    displayWaitingCustomers();
    document.getElementById('newCustomerForm').style.display = 'none';
});

// Display waiting customers
function displayWaitingCustomers() {
    let container = document.getElementById('waitingCustomers');
    container.innerHTML = '';
    
    waitingCustomers.forEach(customer => {
        let div = document.createElement('div');
        div.textContent = `Ticket ${customer.ticket}: ${customer.name} - ${customer.serviceRequested}`;
        let serveBtn = document.createElement('button');
        serveBtn.textContent = 'Serve Customer';
        serveBtn.addEventListener('click', () => {
            serveCustomer(customer);
        });
        div.appendChild(serveBtn);
        container.appendChild(div);
    });
}

// Move customer to served
function serveCustomer(customer) {
    servedCustomers.push(customer);
    waitingCustomers = waitingCustomers.filter(c => c.ticket !== customer.ticket);
    displayWaitingCustomers();
    displayServedCustomers();
}

// Display served customers
function displayServedCustomers() {
    let container = document.getElementById('servedCustomers');
    container.innerHTML = '';
    
    servedCustomers.forEach(customer => {
        let div = document.createElement('div');
        div.textContent = `Ticket ${customer.ticket}: ${customer.name} - ${customer.serviceRequested}`;
        container.appendChild(div);
    });
}
