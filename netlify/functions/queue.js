// Assuming you're using Netlify Functions and environment variables for data storage
const customers = process.env.CUSTOMERS ? JSON.parse(process.env.CUSTOMERS) : [];

function createCustomer(customer) {
  customers.push(customer);
  // Save the updated customers array to environment variables
  process.env.CUSTOMERS = JSON.stringify(customers);
}

// ...
