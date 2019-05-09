module.exports = {
  getSeller: async (req, res) => {
    try {
      const db = req.app.get('db');
      const seller = await db.getSeller();
      res.send(seller).status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getContact: async (req, res) => {
    let { id } = req.params;
    try {
      const db = req.app.get('db');
      const contact = await db.getContact(id);
      res.send(contact).status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getContactBySeller: async (req, res) => {
    let { id } = req.params;
    try {
      const db = req.app.get('db');
      const contacts = await db.getContactsBySeller(id);
      res.send(contacts).status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  shortContact: async (req, res) => {
    let { id } = req.params;
    try {
      const db = req.app.get('db');
      const sc = await db.shortContact(id);
      res.send(sc).status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  levelByLevel: async (req, res) => {
    let { id } = req.params;
    try {
      const db = req.app.get('db');
      const allLevel = await db.getLevelByLevel(id);
      const levelArr = [];
      for (let i = 0; i < allLevel.length; i++) {
        let level = allLevel[i];
        let getSteps = await db.getStepsForLevel(allLevel[i].level_id);
        level.stepNames = getSteps;
        let getActions = await db.getActionForLevel(allLevel[i].level_id);
        level.actions = getActions;
        levelArr.push(level);
      }
      // console.log(levelArr);
      res.send(levelArr).status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  levelBySeller: async (req, res) => {
    let { id } = req.params;
    try {
      const db = req.app.get('db');
      const sellerID = await db.getLevelBySeller(id);
      res.send(sellerID).status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getActionByContact: async (req, res) => {
    let { id } = req.params;
    try {
      const db = req.app.get('db');
      const actions = await db.getActionByContact(id);
      res.send(actions).status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getActionForContact: async (req, res) => {
    let { contact_id } = req.params;
    try {
      const db = req.app.get('db');
      const contactInfo = await db.getContact(contact_id);
      let arr = [];
      for (let i = 0; i < contactInfo.length; i++) {
        let contact = contactInfo[i];
        let getAction = await db.getActionByContact(contact.contact_id);
        contact.actions = getAction;
        arr.push(contact);
      }
      res.send(arr);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
};

// GetLevelByLevel Endpoint
// 	http://206.189.218.159:4139/api/getLevelByLevel/1
// 	http://206.189.218.159:4139/api/createContact/3
// 	if we could make the /:id be a /:uuid

// GetContactByAction/:uuid
// 	the uuid would be a contact_uuid that exists on an action

// Authentication
// 	do we encrypt passwords?
// 	is there a way to safeguard against hacking our backend?
// 	industry standard method of protection?
// 	will https calls eventually be necessary?

// Login
// 	who sends the "forgot password" email? front or backend
