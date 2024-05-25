const UserModel=require('../model/userModel');
const bcrypt=require('bcrypt');
const JWT=require('../strategies/JWT');
const AuthController={
    async signup(req,res){
        const data=req.body;
        try{
            if(!(await UserModel.findOne({email:data.email}))){
                const user=await UserModel.create({
                    firstName:data.firstName,
                    lastName:data.lastName,
                    email:data.email,
                    password:await bcrypt.hash(data.password,10),
                    mobile:data.mobile,
                    role:data.role
                })
                if(user){
                    res.status(201).send("User created successfully");
                }
                else{
                    res.status(400).send("User not registered");
                }
            }
            else{
                res.status(403).send("Already Existing");
            }
        }
        catch(error){
            console.log("Error creating user",error);
            res.status(500).send("Internal server error");
        }
    },


    async login(req,res){
        const {email,password}=req.body;
        try{
            const user=await UserModel.findOne({email});
            if(!user){
                res.status(204).send("User does not exist");
            }
            else{
                const pass=await bcrypt.compare(password,user.password);
                if(pass){
                    const {accessToken,refreshToken}=await JWT.createToken(user);
                    res.cookie("JWT",accessToken,{maxAge:60*60*1000,});
                    res.cookie("refresh",refreshToken,{maxAge:60*60*1000,});
                    // return res.json({status:200,_id:user._id,role:user.role});
                    res.status(200).json({ user: { _id: user._id, email: user.email, role: user.role } });
                }
                else{
                    res.status(400).send("Incorrect password");
                }
            }
        }
        catch(error){
            console.log(error);
            res.status(500).send("Internal server error");
        }
    },

    async logout(req,res){
        try{
            res.clearCookie("JWT");
            console.log("logged out");
            res.status(200).send("Logged out");
        }
        catch(error){
            res.status(500).send("Internal server error");
        }
    }
}
module.exports=AuthController