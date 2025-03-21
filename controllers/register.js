const handleRegister = (req, res, db, bcrypt, saltRounds)=>{
    const {email, name, password} = req.body;
   const hash =  bcrypt.hash(password, saltRounds).then(function(hash) {
      // Store hash in your password DB.
      console.log(hash);
      db.transaction(trx => {
        trx.insert({
          hash: hash,
          email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
          return  trx('users').
          returning('*')
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date()
          }).then(user=> {
            res.json(user[0])
          })
        })
          .then(trx.commit)
          .catch(trx.rollback)
        })
        .catch(err=> res.status(400).json('unable to REGISTER'))
          
      })
  }

  export default handleRegister;