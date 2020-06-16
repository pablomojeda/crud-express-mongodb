const express = require('express');
const router = express.Router();

const model = require('../model/task')();

router.get('/', (req,res) => {

    model.find({}, (err, tasks) => {
        if(err) throw err;

        res.render('index', {
            title: 'CRUD',
            tasks: tasks
        }); 
    });   
});

router.post('/add', (req, res) =>{
    let body = req.body; //creo una variable y guardo lo que me envio el formulario
    body.status = false;   // agrego una propiedad status donde defino que es falso que esté realizado

    model.create(body, (err, task) => {
        if (err) throw err; //si recibo un error parar todo y mostrarlo

        res.redirect('/'); // si esta todo bien redireccionar al index;
    });

    console.log(body);
});

router.get('/turn/:id', (req, res) => {
    let id = req.params.id; //guardo el id en una variable
    model.findById(id, (err, task) => { //busco en el id en el modelo
        if (err) throw err; // si hay un error lanza un error
        task.status = !task.status; // sino cambia el estado por el estado contrario que al tenia
        task.save() // ahora que lo guarde
            .then( () => res.redirect('/') ) // cuando se termina redirecciona al /
    });
});

router.get('/delete/:id', (req, res) => {
    let id = req.params.id; //guardo el id en una variable
    model.remove({_id: id}, (err, task) => { //puedo recibir un error o una tarea
        if (err) throw err; //si hay un error lo muestra
        res.redirect('/'); // sino redirecciona a /
    });
});

module.exports = router;