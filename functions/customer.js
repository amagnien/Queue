const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/customers.json');

exports.handler = async (event, context) => {
    if (event.httpMethod === 'GET') {
        // Read the data from the JSON file
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return {
                statusCode: 200,
                body: data,
            };
        } catch (err) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Could not read data' }),
            };
        }
    } else if (event.httpMethod === 'PUT') {
        // Update the data in the JSON file
        try {
            const newData = JSON.parse(event.body);
            fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Data saved successfully' }),
            };
        } catch (err) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Could not save data' }),
            };
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }
};
