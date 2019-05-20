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
        let lid = allLevel[i].level_id;
        level.stepNames = [];
        let getSteps = db.getStepsForLevel(lid);
        level.stepNames.push(getSteps);
        levelArr.push(level);
      }
      console.log('levelArr', levelArr);
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
