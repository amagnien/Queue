const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'customers.json');

exports.handler = async function (event, context) {
  if (event.httpMethod === 'POST') {
    const data = JSON.parse(event.body);

    let customers = [];
    if (fs.existsSync(filePath)) {
      const json = fs.readFileSync(filePath, 'utf-8');
      customers = JSON.parse(json);
    }

    customers.push(data);

    fs.writeFileSync(filePath, JSON.stringify(customers, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Customer added successfully' }),
    };
  }

  if (event.httpMethod === 'GET') {
    let customers = [];
    if (fs.existsSync(filePath)) {
      const json = fs.readFileSync(filePath, 'utf-8');
      customers = JSON.parse(json);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(customers),
    };
  }

  return {
    statusCode: 405,
    body: 'Method Not Allowed',
  };
};
