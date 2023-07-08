const User = require('./modeles/Users')
const  bcrypt = require('bcryptjs');

class authController {
    async registration(req,res){
        try{
            const {login,password} = req.body
            const candidate = await User.findOne({login})
          
            const  passwordHash = bcrypt.hashSync(password, 7);
            const user = new User({login,password:passwordHash})
            console.log(user)
            await user.save()
            return res.json({message:'User registration succsess'})
        }catch(e){
            console.log(e)
            res.status(400).json({message:"registration error"})
        }
    }

    async login(req,res){
        try{

        }catch(e){
            console.log(e)
            res.status(400).json({message:"registration error"})
        }
    }

    async getUsers(req,res){
        try{
            const user= new User();
            

            res.json('serwer Work')
        }catch(e){
            console.log(e)
        }
    }
}

module.exports = new authController()