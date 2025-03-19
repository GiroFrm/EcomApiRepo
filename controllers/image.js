const handleImage = (req, res)=>{
    const { id } = req.body;
    db('users').where('id','=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0].entries);
      console.log(entries)
    })
  }

  export default handleImage;