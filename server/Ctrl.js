module.exports = {
  getSeller: async (req, res) => {
    try {
      const db = req.app.get('db');
      const seller = await db.getSeller();
      res.send(seller).status(200)
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getContact: async (req, res) => {
    // contact id
    let { id } = req.params;
    try {
      const db = req.app.get('db');
      const contact = await db.getContact(id);
      res.send(contact).status(200)
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getContactBySeller: async (req, res) => {
    // seller id
    let { id } = req.params;
    try {
      const db = req.app.get('db');
      const contacts = await db.getContactsBySeller(id);
      res.send(contacts).status(200)
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
      res.send(sc).status(200)
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  levelByLevel: async (req, res)=>{
    let { id } = req.params;
    try{
      const db = req.app.get('db');
      const levelID = await db.getLevelByLevel(id);
      res.send(levelID).status(200)
    }catch(error){
      console.log(error)
      res.status(500).send(error);
    }
  },
  levelBySeller: async (req, res)=>{
    let { id } = req.params;
    try{
      const db = req.app.get('db');
      const sellerID = await db.getLevelBySeller(id)
      res.send(sellerID).status(200)
    }catch(error){
      console.log(error)
      res.status(500).send(error);
    }
  }
  
};
