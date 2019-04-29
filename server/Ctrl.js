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
      const allLevel = await db.getLevelByLevel(id);
      const levelArr = []
      for (let i = 0; i < allLevel.length; i++) {
        let level = allLevel[i];

        let getSteps = await db.getStepsForLevel(allLevel[i].level_id)
        level.stepNames = getSteps
        
        let getActions = await db.getActionForLevel(allLevel[i].level_id)
        level.actions = getActions

       levelArr.push(level)
        
       
      }
      console.log(levelArr)
      res.send(levelArr).status(200)
    }catch(error){
      console.log(error)
      res.status(500).send(error);
    }
  },
  // levelByLevel: async (req, res)=>{
  //   let { id } = req.params;
  //   try{
  //     const db = req.app.get('db');
  //     const level = await db.getLevelByLevel(id);
  //     const levelArr = []



  //     var promise1 = new Promise(function(resolve, reject) {
  //       setTimeout(function() {
  //         resolve('foo');
  //       }, 300);
  //     }).then(level.forEach((val,i,self)=>{
  //       console.log(val.level_id)
  //       // const steps = 
        
        // levelArr.push(db.getStepsForLevel(val.level_id))
  //     }))
  //     console.log('pp',promise1)

      
  //     const levelActions = await db.getActionForLevelBySellerID(1)

  //     var stepNames = [];
  //     var object1 = {a: 1, b: 2, c: 3};

  //     // for (var property1 in steps) {
  //     //     steps.forEach((val, i, self)=>{
  //     //       stepNames.push(val.step_name)
  //     //     })
  //     //   }
  //       // console.log(stepNames)
  //       level.stepName = stepNames
  //       level.actions = levelActions
  //       console.log('levelArr', levelArr)
  //       console.log('level', level)
    
  //     // console.log('steps', steps)
  //     // console.log('actions', actions)
      
  //     res.send(level).status(200)
  //   }catch(error){
  //     console.log(error)
  //     res.status(500).send(error);
  //   }
  // },
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

  //  {
  // "levelname": 'value',
  // "daysBetweenSteps": "value",
  // "stepNAMes": ["value", "value", "value"],
  // "Actions": ["value", "value", "value"]
  //  }
