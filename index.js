// Description: Main entry point for the application.
const { RUNNING_PORT } = require('./config');
const app = require('./app');

app.listen(RUNNING_PORT, () => {
    console.log(`Server running @ http://localhost:${RUNNING_PORT}`)
});