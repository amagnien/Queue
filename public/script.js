const customers = [];

function createCustomer(name, description, serviceRequested, serviceType) {
  // Create a customer object
  const customer = {
    name,
    description,
    serviceRequested,
    serviceType,
    waitingTime: Date.now()
  };

  // Add the customer to the array
  customers.push(customer);

  // Update the UI
  // ...
}

// ...