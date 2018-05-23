const express = require('express');
const bodyParser = require('body-parser');
const ctrl = require('./controller');

const app = express();

app.use(bodyParser.json());

app.get('/api/getMatches', ctrl.displayMatches);
app.get('/api/getPercentage/:fName/:sName', ctrl.getPercentage);
app.post('/api/createMatch', ctrl.matchMaker);
app.put('/api/editMatches/:id', ctrl.matchEditor);
app.delete('/api/deleteMatch/:id', ctrl.matchDeleter);
app.delete('/api/deleteAll', ctrl.deleteAll)


const port = 8080;

app.listen(port, () => {
    console.log('yo yo yo from port: ' + port)
});