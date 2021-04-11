const Express = require('express');
let validateJWT = require("../middleware/validate-jwt");
const router = Express.Router();
const { JournalModel } = require('../models');

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey! This is a practice route!')
}); 

router.post('/create', validateJWT, async (req, res) => {
    const {description, definition, result} = req.body.log;
    const {id} = req.user;
    const logEntry = {
        description,
        definition,
        result,
        owner_id: id
    }
    try {
        const newLog = await JournalModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({error: err});
    } 
    JournalModel.create(logEntry)
});


router.get('/about', (req, res) => {
    res.send("This is the about route!");
})

router.get("/", async (req, res) => {
    try {
        const entries = await JournalModel.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});

router.get("/mine", validateJWT, async (req, res)=> {
    let {id} = req.user;
    try {
        const userLogs = await JournalModel.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(userLogs);
    } catch (err) {
        res.status(500).json({ error: err});
    }
})

router.get("/:description", async (req, res)=> {
    const {description} = req.params;
    try {
        const results = await JournalModel.findAll({
            where: {description: description}
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({error: err});
    }
});


router.put("/update/:id", validateJWT, async (req, res) => {
    const  {description, definition, result} = req.body.journal;
    const logId = req.params.id;
    const userId = req.user.id;

    const query = {
        where: {
            id: journalId,
            owner_id: userId
        }
    };

    const updatedLog = {
        description: description,
        definition: definition,
        result: result,
    };

    try {
        const update = await JournalModel.update(updatedJournal, query);
        res.status(200).json(update);
    } catch(err) {
        res.status(500).json({error: err});
    }
});

router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const logId = req.params.id;

    try {
        const query = {
            where: {
                id: journalId,
                owner_id: ownerId
            }
        };

        await JournalModel.destroy(query);
        res.status(200).json({message: "Log Entry Removed"});
    } catch(err) {
        res.status(500).json({error: err});
    }
})

module.exports = router;