let express = require('express');
let router = express.Router();
const validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log');



// router.post('/log', validateSession, (req, res) => {
//     const workoutLog = {
//         description: req.body.log.description,
//         definition: req.body.log.definition,
//         result: req.body.log.result,
//         owner_id: req.user.id
//     }
//     Log.create(workoutLog)
//     .then(log => res.status(200).json(log))
//     .catch(err => res.status(500).json({error: err}))
// });

router.post("/", validateSession, (req, res) => {
    const logentry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner: req.user.id
    };
    Log.create(logentry)
        .then((log) => res.status(200).json(log))
        .catch((err) => res.status(500).json({ error: err }));
});

router.get("/", validateSession, (req, res)=> {
    Log.findAll()
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});

router.get("/:id", validateSession, (req, res) => {
    const logentry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result
    }
    Log.create(logentry)
    .then((log) => res.status(200).json(log))
    .catch((err)=> res.status(500).json({error:err}))
    
});

router.put("/update/:entryid", validateSession, (req, res) => {
    const updateLogEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result
    };
    const query = {where: {id:req.params.entryid, owner: req.user.id} };

    Log.update(updateLogEntry, query)
    .then((logs)=> res.status(200).json(logs))
    .catch((err)=> res.status(500).json({error:err}));
    
});

router.delete("/delete/:id", validateSession, (req, res) => {
    const query = {where: {id: req.params.id, owner: req.user.id} };

    Log.destroy(query)
    .then(()=> res.status(200).json({message: "Log Entry Deleted"}))
    .catch((err)=> res.status(500).json({error:err}));


});

module.exports = router;