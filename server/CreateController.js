let shortList = {
  linkedIn: '',
  street2: 'Floor 3',
  zip: '88888',
  birthday: '010203',
  workPhoneExtension: '',
  company: 'TyndaleApps',
  contactID: '2A6FD95F-9C00-4936-B926-E851745A7828',
  facebook: '',
  city: 'Lehi',
  mobilePhone: '3335559999',
  twitter: '',
  state: 'UT',
  website: '',
  email: 'arkin.hill@tyndaleapps.com',
  jobTitle: 'Boss',
  firstName: 'Arkin',
  instagram: '',
  workPhone: '2224448888',
  notes: [],
  actions: [],
  street1: '123 Dev 456 Mountain',
  lastName: 'Hill'
};

module.exports = {
  createLevel: async (req, res) => {
    console.log('level hit');
    let { id } = req.params;
    try {
      const db = req.app.get('db');
      res.set('Content-Type', 'application/json');
      req.body.levels.forEach((val, i, self) => {
        const { daysBetweenSteps, stepNames, actions, name, levelID } = val;
        console.log('val', val);
        const level = db.create.createLevel(
          id,
          name,
          daysBetweenSteps,
          levelID
        );
        // console.log('level', level);
        val.stepNames.forEach((v, index, self) => {
          const { name } = v;
          const steps = db.create.createSteps(null, name, null, levelID);
        });
      });
      res.send(level).status(200);
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  },
  createContact: async (req, res) => {
    console.log(req);
    try {
      let { id } = req.params;
      res.set('Content-Type', 'application/json');
      let {
        linkedIn,
        street2,
        zip,
        birthday,
        workPhoneExtension,
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

      const newContact = await db.create.createContact(
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
        contactID,
        linkedIn,
        facebook,
        twitter,
        instagram,
        workPhoneExtension
        // notes,
        // actions,
      );

      res.send(newContact).status(200);
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  },
  postContactList: async (req, res) => {
    // console.log('hit list');
    let { id } = req.params;
    try {
      const db = req.app.get('db');
      res.set('Content-Type', 'application/json');
      const cList = [];
      const actList = [];
      // console.log(11, req.body);
      // console.log(22, req.body.contacts);
      req.body.contacts.forEach((val, i, self) => {
        console.log('val', val);
        console.log('i', i);
        console.log('self', self);
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
          workPhoneExtension
        } = val;
        const newContact = db.create.createContactList(
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
          contactID,
          linkedIn,
          facebook,
          twitter,
          instagram,
          workPhoneExtension
          // notes,
          // actions,
        );
        val.actions.forEach((v, index, arr) => {
          console.log('v', v);
          console.log('index', index);
          console.log('arr', arr);
          console.log('wut', newContact.contactID);

          db.create.createAction(
            null,
            // v.levelID,
            // seller id
            id,
            //contact id
            newContact.contactID,
            //contact uuid
            v.contactID,
            //
            v.followupDate,
            v.priority,
            v.description,
            null
          );
        });

        // let newAction = db.create.createAction(
        //   contactID,
        //   followupDate,
        //   description,
        //   levelID,
        //   priority
        // );
        // console.log('nc', newContact);
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
