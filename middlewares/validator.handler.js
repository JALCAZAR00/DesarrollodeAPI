
function validatorHandler (schema, property){
  return (req, res, next ) =>{
    const data = req[property];
    const { error } = schema.validate(data, {abortEarly: false});
    if(error){
      return res.status(400).json({ error });
    }
    next();
  }
}

module.exports = validatorHandler;
