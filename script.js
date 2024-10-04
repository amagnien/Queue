const newCustomerBtn = document.getElementById('newCustomerBtn');
const deleteEODBtn = document.getElementById('deleteEODBtn');
const reportBtn = document.getElementById('reportBtn');
const newCustomerForm = document.getElementById('newCustomerForm');
const customerForm = document.getElementById('customerForm');

newCustomerBtn.addEventListener('click', toggleNewCustomerForm);
deleteEODBtn.addEventListener('click', clearAllCustomers);
reportBtn.addEventListener('click', generateReport);
customerForm.addEventListener('submit', addNewCustomer);

function toggleNewCustomerForm() {
    console.log('New Customer button clicked');
    newCustomerForm.style.display = newCustomerForm.style.display === 'none' ? 'block' : 'none';
}

function addNewCustomer(e) {
    e.preventDefault();
    console.log('Form submitted');
    // Your code to add the customer
}

function clearAllCustomers() {
    console.log('EOD delete button clicked');
    // Your code to clear customers
}

function generateReport() {
    console.log('Report button clicked');
    // Your code to generate report
}
