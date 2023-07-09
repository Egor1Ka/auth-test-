const User = require('./modeles/Users')
const  bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')
const {secret} = require("./config");
const Company = require('./modeles/Company');
const Storage = require('./modeles/Storage')
const generateAccessToken = (id,login)=>{
    const payload = {
        id,
        login
    }

    return jwt.sign(payload,secret,{expiresIn:"24h"})
}


class authController {
    async registration(req,res){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json(errors)
            }

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
            const {login,password} = req.body
  
            const user = await User.findOne({login})

            if(!user){
                res.status(400).json({
                    message:"error user not found"
                })
            }

            const valdPassword = bcrypt.compareSync(password,user.password)

            !valdPassword && res.status(400).json({message:"not corect password"})

            const token = generateAccessToken(user._id,login);
            console.log(user._id)
            console.log(login)
            console.log(token)

            res.status(200).json({token});
            
        }catch(e){
            console.log(e)
            res.status(400).json({message:"registration error"})
        }
    }

    async getUsers(req,res){
        try{
            const company= new Company({type:"companny",title:"my first Company",users:['64a88d7922e030816ce70aed']});
            //const storage = new Storage({type:"Storage",title:"myFirst storage",users:['64a88d7922e030816ce70aed'],components:{emptyStorage:[]}})
            await company.save()
            res.json('serwer Work')
        }catch(e){
            console.log(e)
        }
    }

    async checkWorkSpace (req,res){
        const {companyId,userId} = req.body;
        //const userId = '64a88d7922e030816ce70aed';
        console.log(companyId)
        const candidateCompany = await Company.findOne({_id:companyId})

        if(!candidateCompany){
            return res.status(400).json({message:'no such company exists'})
        }

        res.json({message:"user have permission",result:'succsess'})
    }

    async storage (req,res){
        const {companyId,userId} = req.body;

        const companny = await Company.findOne({_id:companyId})
        //const storages = [];

        const storagesId = companny.storage;
        
        const storages = await Storage.find({ _id: { $in: storagesId } })
        
        const result = storages.filter(storage=>{
            if(storage.users.includes(userId))return storage
        })

        res.status(200).json([...result])
    }
}

module.exports = new authController()



/*const user = new User({login:'login',password:'password'})

const company= new Company({type:"companny",title:"my first Company",users:[user]});
            
await company.save()

await Company.findByIdAndUpdate("64aa8cf557583203c413937b", { type: 'company',storage:["64aa87008e924d550e1946c5"]   })
            .then ((err)=> {
              console.error("поле поменяли");
            }).catch(error=>console.log(error))
 */

