module.exports = {
  getSeller: async (req, res) => {
    try {
      const db = req.app.get('db');
      const seller = await db.getSeller();
      res.send(seller);
    } catch (error) {
      console.log(error);
    }
  },
  getContact: async (req, res) => {
    let { id } = req.params;
    try {
      const db = req.app.get('db');
      const contact = await db.getContact(id);
      res.send(contact);
    } catch (error) {
      console.log(error);
    }
  },
  createContact: async (req, res) => {
    try {
      let { id } = req.params;
      let {
        contact_first_name,
        contact_last_name,
        job_title,
        company_name,
        website,
        email,
        mobile_phone,
        work_phone,
        Street1,
        Street2,
        City,
        State,
        zipcode,
        birthday,
        last_contact,
        past_due,
        follow_up_date,
        stage_level,
        priority
      } = req.body;
      const db = req.app.get('db');
      const newContact = await db.createContact(
        id,
        contact_first_name,
        contact_last_name,
        job_title,
        company_name,
        website,
        email,
        mobile_phone,
        work_phone,
        Street1,
        Street2,
        City,
        State,
        zipcode,
        birthday,
        last_contact,
        past_due,
        follow_up_date,
        stage_level,
        priority
      );
      res.send(newContact);
    } catch (error) {
      console.log(error);
    }
  },
  shortContact: async (req, res) => {
    let { id } = req.params;
    try {
      const db = req.app.get('db');
      const sc = await db.shortContact(id);
      res.send(sc);
    } catch (error) {
      console.log(error);
    }
  },
  levelByLevel: async (req, res)=>{
    let { id } = req.params;
    try{
      const db = req.app.get('db');
      const levelID = await db.getLevelByLevel(id);
      res.send(levelID);
    }catch(error){
      console.log(error)
    }
  },
  levelBySeller: async (req, res)=>{
    let { id } = req.params;
    try{
      const db = req.app.get('db');
      const sellerID = await db.getLevelBySeller(id)
      res.send(sellerID);
    }catch(error){
      console.log(error)
    }
  }
};
