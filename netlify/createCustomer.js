exports.handler = async (event, context) => {
    const data = JSON.parse(event.body);
    // Store customer data in a database or other storage
    // ...
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Customer created successfully' })
    };
};