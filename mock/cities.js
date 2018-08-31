export default {
  'get /cities': function (req, res, next) {
    setTimeout(() => {
      res.json({
        result: [
          {
            id: 1,
            name: 'beijing',
            alias: '北京'
          },
          {
            id: 2,
            name: 'shanghai',
            alias: '上海'
          }
        ]
      })
    }, 1500)
  }
}