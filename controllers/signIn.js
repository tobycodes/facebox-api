const handleSignIn = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json('Incomplete form.');
    }
    
    db('login').where('email', email).select('email', 'hash')
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);

        if(isValid) {
            return db('users').where('email', email).select('*')
            .then(user => res.json(user[0]))
            .catch(err => res.status(400).json('could not get user'));
        } else {
            throw new Error('Invalid credentials');
        }

    }).catch(err => res.status(400).json('Invalid credentials, please try again.'));
};

module.exports = {
    handleSignIn
};