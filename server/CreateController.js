module.exports = {
  createLevel: async (req, res) => {
    console.log('level hit');
    let { id } = req.params;
    try {
      let anArray = [];
      const db = req.app.get('db');
      res.set('Content-Type', 'application/json');
      req.body.levels.forEach((val, i, self) => {
        const { daysBetweenSteps, stepNames, actions, name, levelID } = val;
        console.log('val', val);
        const level = db.create.createLevel(
          levelID,
          id,
          name,
          daysBetweenSteps
        );
        anArray.push(level);
        console.log('level', level);
        val.stepNames.forEach((v, index, self) => {
          console.log('v', v);
          const { name } = v;
          const steps = db.create.createSteps(levelID, name);
          anArray.push(steps);
        });
      });
      res.send(anArray).status(200);
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  },
  createContact: async (req, res) => {
    // console.log(req);
    try {
      let { id } = req.params;
      res.set('Content-Type', 'application/json');
      let {
        linkedIn,
        street2,
        zip,
        birthday,
        workphoneextension,
        company,
        contactID,
        facebook,
        city,
        mobilePhone,
        twitter,
        state,
        website,
        email,
        jobTitle,
        firstName,
        instagram,
        workPhone,
        notes,
        actions,
        street1,
        lastName
      } = req.body.contact;
      const db = req.app.get('db');
      console.log(12345, req.body.contact);

      const newContact = await db.create.createContact(
        contactID,
        id,
        firstName,
        lastName,
        jobTitle,
        company,
        website,
        email,
        mobilePhone,
        workPhone,
        street1,
        street2,
        city,
        state,
        zip,
        birthday,
        linkedIn,
        facebook,
        twitter,
        instagram,
        workphoneextension
      );
      actions.forEach((v, index, arr) => {
        console.log('vvv', v);
        console.log('index', index);
        console.log('arr', arr);
        let act = db.create.createAction(
          v.levelID,
          id,
          v.contactID,
          v.followupdate,
          v.priority,
          v.description
        );
      });
      console.log('newCOntact', newContact);
      res.send(newContact).status(200);
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  },
  postContactList: async (req, res) => {
    let { id } = req.params;
    try {
      const db = req.app.get('db');
      res.set('Content-Type', 'application/json');
      const cList = [];
      const actList = [];
      req.body.contacts.forEach((val, i, self) => {
        const {
          firstName,
          lastName,
          jobTitle,
          company,
          website,
          email,
          mobilePhone,
          workPhone,
          street1,
          street2,
          city,
          state,
          zip,
          birthday,
          contactID,
          linkedIn,
          facebook,
          twitter,
          instagram,
          workPhoneExtension,
          actions
        } = val;
        const newContact = db.create.createContactList(
          contactID,
          id,
          firstName,
          lastName,
          jobTitle,
          company,
          website,
          email,
          mobilePhone,
          workPhone,
          street1,
          street2,
          city,
          state,
          zip,
          birthday,
          linkedIn,
          facebook,
          twitter,
          instagram,
          workPhoneExtension
        );
        val.actions.forEach((v, index, arr) => {
          console.log('v', v);
          db.create.createAction(
            v.levelID,
            id,
            v.contactID,
            v.followupDate,
            v.priority,
            v.description
          );
        });
        cList.push(newContact);
      });

      res.send(cList).status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  createAction: async (req, res) => {
    let { id } = req.params;
    try {
      const db = req.app.get('db');
      const action = await db.create.createAction(id);
      res.send(action).status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  createStep: async (req, res) => {
    try {
      const db = req.app.get('db');
      const step = await db.create.createStep(id);
      res.send(step).status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  createSeller: async (req, res) => {
    try {
      const db = req.app.get('db');
      res.set('Content-Type', 'application/json');
      let { username, firstName, lastName, email, password, uuid } = req.body;
      const seller = await db.create.createSeller(
        username,
        email,
        password,
        firstName,
        lastName,
        uuid
      );
      res.send(seller).status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
};
