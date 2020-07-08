const handleEntryUpdate = (db) => (req, res) => { 
    const { id } = req.body;

    db('users')
    .where({
        id
    })
    .increment('entries', 1)
    .returning('*')
    .then(user => res.json(user[0]))
    .catch(err => res.status(400).json('An error occured while updating entries'));
};

module.exports = {
    handleEntryUpdate
};
