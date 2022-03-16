const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());

morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (req, res) => {
    const numberOfPeople = persons.length;
    const currentDate = new Date();

    res.send(`
        <p>Phonebook has info for ${numberOfPeople} people</p>
        <p>${currentDate}</p>
    `);
})


//HELPER FUNCTIONS
const generateId = () => {
    return Math.floor(Math.random() * 10000);
}


//CREATE
app.post('/api/persons', (req, res) => {
    const body = req.body;

    //Handle missing name
    if (!body.name) {
        return res.status(400).json({
            error: 'missing name'
        })
    }

    //Handle missing number
    if (!body.number) {
        return res.status(400).json({
            error: 'missing number'
        })
    }

    const arrayOfNames = persons.map(person => person.name.toLowerCase());

    //Handle name that already exists
    if (arrayOfNames.indexOf(body.name.toLowerCase()) > -1) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person);

    res.json(person);
})


//READ
app.get('/api/persons', (req, res) => {
    res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    
    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
})


//UPDATE


//DELETE

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);

    res.status(204).end();
})



const PORT = 3001;
app.listen(3001, () => {
    console.log(`Server running on port ${PORT}`);
})