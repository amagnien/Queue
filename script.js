import firebaseConfig from './firebase.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the database
const database = firebase.database();

// Function to generate unique ticket numbers
function generateTicketNumber() {
  const timestamp = new Date().getTime();
  return `TICKET-${timestamp}`;
}

// Submit customer data
document.getElementById('submitCustomer').addEventListener('click', () => {
  const ticketNumber = generateTicketNumber();
  const name = document.getElementById('customerName').value;
  const description = document.getElementById('customerDescription').value;
  const serviceRequested = document.getElementById('customerServiceRequested').value;
  const serviceType = document.getElementById('customerServiceType').value;
  const currentTime = new Date().getTime();

  // Push data to Firebase with serviceTime initially set to 0
  database.ref('customers').push({
    ticketNumber,
    name,
    description,
    serviceRequested,
    serviceType,
    arrivalTime: currentTime,
    serviceTime: 0 // Placeholder for service completion time
  });

  // Reset form after submission
  document.getElementById('customerName').value = '';
  document.getElementById('customerDescription').value = '';
  document.getElementById('customerServiceRequested').value = '';
  document.getElementById('customerServiceType').value = '';
});

// Generate report with waiting times
document.getElementById('generateReport').addEventListener('click', () => {
  database.ref('customers').once('value', (snapshot) => {
    const customers = snapshot.val();

    // Calculate waiting times based on arrival and service times (assuming serviceTime is set)
    const customersWithWaitingTimes = Object.entries(customers).map(([key, customer]) => {
      const waitingTime = customer.serviceTime ? customer.serviceTime - customer.arrivalTime : 0;
      return { ...customer, waitingTime };
    });

    // Calculate average waiting time
    const totalWaitingTime = customersWithWaitingTimes.reduce((sum, customer) => sum + customer.waitingTime, 0);
    const averageWaitingTime = totalWaitingTime / customersWithWaitingTimes.length;

    // Generate HTML report with formatted waiting times
    const reportHTML = `
      <table>
          <thead>
              <tr>
                  <th>Ticket Number</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Service Requested</th>
                  <th>Service Type</th>
                  <th>Arrival Time</th>
                  <th>Waiting Time</th>
              </tr>
          </thead>
          <tbody>
              ${customersWithWaitingTimes.map(customer => `
                  <tr>
                      <td>${customer.ticketNumber}</td>
                      <td>${customer.name}</td>
                      <td>${customer.description}</td>
                      <td>${customer.serviceRequested}</td>
                      <td>${customer.serviceType}</td>
                      <td>${new Date(customer.arrivalTime).toLocaleString()}</td>
                      <td>${new Date(customer.waitingTime).toISOString().substr(11, 8)}</td>
                  </tr>
              `).join('')}
          </tbody>
      </table>
      <p>Average Waiting Time: ${new Date(averageWaitingTime).toISOString().substr(11, 8)}</p>
    `;

    document.getElementById('reportContainer').innerHTML = reportHTML;
  });
});

// Delete all customer data with confirmation
document.getElementById('deleteEOD').addEventListener('click', () => {
  if (confirm('Caution: All customer data will be cleared. Are you sure?')) {
    database.ref('customers').remove();
  }
});
