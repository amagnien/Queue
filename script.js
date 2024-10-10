const newCustomerBtn = document.getElementById('newCustomer');
const reportBtn = document.getElementById('report');
const deleteEODBtn = document.getElementById('deleteEOD');
const waitingCustomersDiv = document.getElementById('waitingCustomers');
const servedCustomersDiv = document.getElementById('servedCustomers');

const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const serviceRequestedInput = document.getElementById('serviceRequested');
const serviceTypeSelect = document.getElementById('serviceType');

let customers = [];

function createCustomer() {
  const name = nameInput.value;
  const description = descriptionInput.value;
  const serviceRequested = serviceRequestedInput.value;
  const serviceType = serviceTypeSelect.value;

  if (!name || !description || !serviceRequested || !serviceType) {
    alert('Please fill in all required fields.');
    return;
  }

  const customer = {
    name,
    description,
    serviceRequested,
    serviceType,
    waitingTime: Date.now()
  };

  customers.push(customer);

  updateWaitingCustomersList();

  // Clear form fields
  nameInput.value = '';
  descriptionInput.value = '';
  serviceRequestedInput.value = '';
  serviceTypeSelect.value = 'RT';
}

function updateWaitingCustomersList() {
  waitingCustomersDiv.innerHTML = '';

  customers.forEach((customer, index) => {
    const customerDiv = document.createElement('div');
    customerDiv.textContent = `${index + 1}. ${customer.name}`;
    customerDiv.addEventListener('click', () => serveCustomer(index));
    waitingCustomersDiv.appendChild(customerDiv);
  });
}

function serveCustomer(index) {
  const servedCustomer = customers.splice(index, 1)[0];
  servedCustomer.servedTime = Date.now();

  updateServedCustomersList();
  updateWaitingCustomersList();
}

function updateServedCustomersList() {
  servedCustomersDiv.innerHTML = '';

  customers.forEach((customer, index) => {
    const customerDiv = document.createElement('div');
    customerDiv.textContent = `${index + 1}. ${customer.name}`;
    servedCustomersDiv.appendChild(customerDiv);
  });
}

function generateReport() {
  const report = `
    <h2>Queue Management System Report</h2>

    <table>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Description</th>
        <th>Service Requested</th>
        <th>Service Type</th>
        <th>Waiting Time (ms)</th>
        <th>Served Time (ms)</th>
      </tr>
      ${customers.map((customer, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${customer.name}</td>
          <td>${customer.description}</td>
          <td>${customer.serviceRequested}</td>
          <td>${customer.serviceType}</td>
          <td>${customer.waitingTime}</td>
          <td>${customer.servedTime || '-'}</td>
        </tr>
      `).join('')}
    </table>

    <p>Average Waiting Time: ${calculateAverageWaitingTime()} ms</p>
  `;

  const reportWindow = window.open('', 'Report', 'width=800,height=600');
  reportWindow.document.write(report);
  reportWindow.document.close();
}

function calculateAverageWaitingTime() {
  const waitingTimes = customers.filter(customer => customer.servedTime).map(customer => customer.servedTime - customer.waitingTime);
  return waitingTimes.length > 0 ? Math.round(waitingTimes.reduce((sum, time) => sum + time, 0) / waitingTimes.length) : 0;
}

function deleteEOD() {
  if (confirm('Are you sure you want to delete all customer data?')) {
    customers = [];
    updateWaitingCustomersList();
    updateServedCustomersList();
  }
}

newCustomerBtn.addEventListener('click', createCustomer);
reportBtn.addEventListener('click', generateReport);
deleteEODBtn.addEventListener('click', deleteEOD);