const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const notes = require('./db/db.json');
const joinString = "/db/db.json";
app.route('/api/notes')
    .get((req, res) => {
        res.json(notes)
    })
    .post((req, res) => {
        const jsonFile = path.join(__dirname, joinString);
        const newNote = req.body;
        newNote.Id = notes.length + 1;
        notes.push(newNote);
        fs.writeFile(jsonFile, JSON.stringify(notes), (err) => {
            if (err) { throw err}
            console.log(`The note ${newNote} is saved`);
        })
        res.json(newNote);
    })

app.get('/',(req, res) => {
        res.sendFile(path.join(__dirname, './public/index.html'))
    })

app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, "/public/notes.html"))
})


app.delete('/api/notes/:id', (req, res) => {
        const jsonFile = path.join(__dirname, joinStringc)
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id == req.params.id) {
                notes.splice(i,1)
            }            
        }
        fs.writeFile(jsonFile, JSON.stringify(notes), (err) => {
            if (err) { throw err}
            console.log(`The note ${req.params.id} was removed`);
        })
        res.json(notes);
    })

app.listen(PORT, () => {
    console.log(`Server is live on the ${PORT} port`);
});