module.exports = {
  getActionByContactUuid: async (req, res) => {
    const { id } = req.params;
    try {
      const db = req.app.get('db');
      const action = await db.uuid.getActionByContactUuid(id);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
};
