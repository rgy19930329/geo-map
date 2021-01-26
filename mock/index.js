export default {
  'GET /api/area': (req, res) => {
    const { code = '500000' } = req.query;
    setTimeout(() => {
      res.send(require(`./area/${code}.json`));
    }, 300);
  }
};
