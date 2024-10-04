let waitingCustomers = [];
let servedCustomers = [];
let ticketCounter = 1;

const newCustomerBtn = document.getElementById('newCustomerBtn');
const deleteEODBtn = document.getElementById('deleteEODBtn');
const reportBtn = document.getElementById('reportBtn');
const newCustomerForm = document.getElementById('newCustomerForm');
const customerForm = document.getElementById('customerForm');
const tabs = document.querySelectorAll('.tab');
const waitingCustomersDiv = document.getElementById('waitingCustomers');
const servedCustomersDiv = document.getElementById('servedCustomers');

newCustomerBtn.addEventListener('click', toggleNewCustomerForm);
deleteEODBtn.addEventListener('click', clearAllCustomers);
reportBtn.addEventListener('click', generateReport);
customerForm.addEventListener('submit', addNewCustomer);
tabs.forEach(tab => tab.addEventListener('click', switchTab));

function toggleNewCustomerForm() {
    newCustomerForm.style.display = newCustomerForm.style.display === 'none' ? 'block' : 'none';
}

function addNewCustomer(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const service = document.getElementById('service').value;
    const timestamp = new Date();

    const newCustomer = { ticketNumber: ticketCounter++, name, description, service, timestamp };
    waitingCustomers.push(newCustomer);
    updateWaitingTable();
    newCustomerForm.style.display = 'none';
    customerForm.reset();
}

function serveCustomer(ticketNumber) {
    const index = waitingCustomers.findIndex(c => c.ticketNumber === ticketNumber);
    if (index !== -1) {
        const servedCustomer = waitingCustomers.splice(index, 1)[0];
        servedCustomer.servedAt = new Date();
        servedCustomers.push(servedCustomer);
        updateWaitingTable();
        updateServedTable();
    }
}

function switchTab(event) {
    tabs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    if (event.target.dataset.tab === 'waiting') {
        waitingCustomersDiv.style.display = 'block';
        servedCustomersDiv.style.display = 'none';
    } else {
        waitingCustomersDiv.style.display = 'none';
        servedCustomersDiv.style.display = 'block';
    }
}

function updateWaitingTable() {
    const tableBody = document.querySelector('#waitingTable tbody');
    tableBody.innerHTML = '';
    waitingCustomers.forEach(customer => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = customer.ticketNumber;
        row.insertCell(1).textContent = customer.name;
        row.insertCell(2).textContent = customer.description;
        row.insertCell(3).textContent = customer.service;
        row.insertCell(4).textContent = customer.timestamp.toLocaleString();
        const actionCell = row.insertCell(5);
        const receiveButton = document.createElement('button');
        receiveButton.textContent = 'Customer Received';
        receiveButton.addEventListener('click', () => serveCustomer(customer.ticketNumber));
        actionCell.appendChild(receiveButton);
    });
}

function updateServedTable() {
    const tableBody = document.querySelector('#servedTable tbody');
    tableBody.innerHTML = '';
    servedCustomers.forEach(customer => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = customer.ticketNumber;
        row.insertCell(1).textContent = customer.name;
        row.insertCell(2).textContent = customer.description;
        row.insertCell(3).textContent = customer.service;
        row.insertCell(4).textContent = customer.timestamp.toLocaleString();
        row.insertCell(5).textContent = customer.servedAt.toLocaleString();
        row.insertCell(6).textContent = calculateWaitingTime(customer.timestamp, customer.servedAt);
    });
}

function calculateWaitingTime(start, end) {
    const diff = end - start;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) {
        return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours} hour${hours !== 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
    }
}

function clearAllCustomers() {
    waitingCustomers = [];
    servedCustomers = [];
    ticketCounter = 1;
    updateWaitingTable();
    updateServedTable();
}

function generateReport() {
    alert(`Report:\n\nTotal Served: ${servedCustomers.length}\nRemaining in Queue: ${waitingCustomers.length}`);
}
