const yup=require('yup')
const userSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });
  
  const validateUser = async (req, res, next) => {
    try {
      await userSchema.validate(req.body);
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = validateUser;