const handleRegister = (db, bcrypt) => (req, res) => {
    let { firstName, email, password } = req.body;

    if(!firstName || !email || !password){
        return res.status(400).json('Incomplete form.');
    }

    db('users').where('email', email).select('*')
    .then(data => {
        if(!data.length) {
            firstName = firstName.slice(0,1).toUpperCase() + firstName.slice(1).toLowerCase();

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            db.transaction(trx => {
                    return trx.insert({
                        email: email,
                        hash: hash
                    }, 'email')
                    .into('login')
                    .then(userEmail => {
                        return trx('users')
                        .insert({
                            first_name: firstName,
                            email: userEmail[0],
                            date_created: new Date()
                        }, '*')
                    }).then(user => res.json(user[0]))
                    .catch(err => res.json('Error: unable to register.')); 
                });  
        } else {
            res.status(400).json('User already exists! Please try logging in.')
        }
    })

};


module.exports = {
    handleRegister
};