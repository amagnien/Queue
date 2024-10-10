// Global variable to store the current ticket number
let currentTicketNumber = 1;

// Submit customer data
document.getElementById('submit').addEventListener('click', () => {
    const ticketNumber = generateTicketNumber();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const serviceRequested = document.getElementById('serviceRequested').value;
    const serviceType = document.getElementById('serviceType').value;
    const currentTime = new Date().getTime();

    // Call Netlify Function to create a new customer
    fetch('/.netlify/functions/createCustomer', {
        method: 'POST',
        body: JSON.stringify({
            ticketNumber,
            name,
            description,
            serviceRequested,
            serviceType,
            arrivalTime: currentTime
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Handle successful creation
            console.log('Customer created successfully');
            // Reset form
            document.getElementById('name').value = '';
            document.getElementById('description').value = '';
            document.getElementById('serviceRequested').value = '';
            document.getElementById('serviceType').value = '';
        } else {
            // Handle errors
            console.error('Error creating customer:', data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Generate report
document.getElementById('generateReport').addEventListener('click', () => {
    fetch('/.netlify/functions/generateReport')
    .then(response => response.json())
    .then(data => {
        // Render report in the HTML
        const waitingTableHTML = data.waitingTableHTML;
        const servedTableHTML = data.servedTableHTML;

        document.getElementById('waitingCustomersTable').innerHTML = waitingTableHTML;
        document.getElementById('servedCustomersTable').innerHTML = servedTableHTML;
    })
    .catch(error => {
        console.error('Error generating report:', error);
    });
});

// Delete all customers
document.getElementById('deleteEOD').addEventListener('click', () => {
    if (confirm('Caution: All customer data will be cleared. Are you sure?')) {
        fetch('/.netlify/functions/deleteCustomers')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('All customers deleted successfully');
            } else {
                console.error('Error deleting customers:', data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

// Function to generate ticket numbers starting from 1
function generateTicketNumber() {
    return `TICKET-${currentTicketNumber++}`;
}
