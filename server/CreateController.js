module.exports={
    createLevel: async(req, res)=>{
        let { id } = req.params;
        try{
            const db = req.app.get('db');
      const level = await db.create.createLevel(id);
      res.send(level).status(200)
        } catch(error){
          res.status(500).send(error);
            console.log(error)
        }
    },createContact: async (req, res) => {
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
          const newContact = await db.create.createContact(
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
          res.send(newContact).status(200)
        } catch (error) {
          res.status(500).send(error);
          console.log(error);
        }
      },
      createAction: async (req, res)=>{
        let {id} = req.params;
        try{
          const db = req.app.get('db');
          const action = await db.create.createAction(id)
          res.send(action).status(200)
        }catch(error){
          console.log(error)
          res.status(500).send(error);
        }
      },
      createStep: async(req, res)=>{
          try{
            const db = req.app.get('db');
            const step = await db.create.createStep(id)
          res.send(step).status(200)
          }catch(error){
              console.log(error)
              res.status(500).send(error);
          }
      },
      createSeller: async(req, res)=>{
          try{
            const db = req.app.get('db');
            const seller = await db.create.createSeller(id)
            res.send(seller).status(200)
          }catch(error){
              console.log(error)
              res.status(500).send(error);
          }
      }
}