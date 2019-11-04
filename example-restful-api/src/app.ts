import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
});

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    console.log('Server started on port: ' + port);
});
