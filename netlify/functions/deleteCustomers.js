exports.handler = async (event, context) => {
    // Delete all customer data from storage
    // ...
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'All customers deleted' })
    };
};
