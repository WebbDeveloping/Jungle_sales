const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    const { session } = req;
    const db = req.app.get('db');

    // const usernameCheck = await db.auth.getUsernames(username);
    const emailCheck = await db.auth.getEmails(email);

    if (emailCheck.length !== 0) {
      let errMessages = [];

      if (emailCheck.length !== 0) {
        errMessages.push('*Email already registered');
      }

      return res.status(409).send(errMessages);
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    let newUser = await db.auth.register([email, hash, firstName, lastName]);
    newUser = newUser[0];

    delete newUser.password;
    session.user = { ...newUser };

    res.status(201).send(session.user);
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const db = req.app.get('db');
    const { session } = req;

    let user = await db.auth.login(email);
    user = user[0];

    if (!user) {
      return res.status(404).send('*Email does not exist');
    }

    const foundUser = bcrypt.compareSync(password, user.password);

    if (foundUser) {
      session.user = user;
      return res.status(200).send(session.user);
    } else {
      res.status(401).send('*Incorrect Password! Try Again');
    }
  },

  logout: (req, res) => {
    try {
      req.session.destroy();
      res.sendStatus(200);
    } catch (err) {
      console.log('hit');
    }
  },

  getUser: (req, res) => {
    const { user } = req.session;
    if (user) {
      res.status(200).send(user);
    } else {
      res.sendStatus(401);
    }
  }
};
