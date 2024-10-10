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
        // Handle response from Netlify Function
        console.log(data);
        // Reset form
        // ...
    })
    .catch(error => {
        console.error(error);
    });
});

// Generate report
document.getElementById('generateReport').addEventListener('click', () => {
    fetch('/.netlify/functions/generateReport')
    .then(response => response.json())
    .then(data => {
        // Render report in the HTML
        document.getElementById('reportContainer').innerHTML = data.reportHTML;
    })
    .catch(error => {
        console.error(error);
    });
});

// Delete all customers
document.getElementById('deleteEOD').addEventListener('click', () => {
    if (confirm('Caution: All customer data will be cleared. Are you sure?')) {
        fetch('/.netlify/functions/deleteCustomers')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
    }
});
