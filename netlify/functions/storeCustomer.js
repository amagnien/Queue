const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    const filePath = path.join(__dirname, 'customers.json');

    if (event.httpMethod === 'GET') {
        // Read the existing data from the JSON file
        try {
            const data = fs.readFileSync(filePath);
            return {
                statusCode: 200,
                body: data.toString(),
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error reading data' }),
            };
        }
    }

    if (event.httpMethod === 'POST') {
        // Add new customer data to the JSON file
        try {
            const newCustomer = JSON.parse(event.body);
            const data = fs.readFileSync(filePath);
            const customers = JSON.parse(data);

            // Add the new customer to the array
            customers.push(newCustomer);
            fs.writeFileSync(filePath, JSON.stringify(customers, null, 2));

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Customer added successfully' }),
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error saving data' }),
            };
        }
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
};
