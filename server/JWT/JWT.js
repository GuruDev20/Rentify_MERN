const {sign,verify, decode}=require('jsonwebtoken');

const createToken=(user)=>{
    const accessToken=sign(
        {username:user.username,id:user._id},
        process.env.SECRET,
        {expiresIn:'1hr'}
    )

    const refreshToken=sign(
        {username:user.username,id:user._id},
        process.env.SECRET,
        {expiresIn:'1hr'}
    )
    return {accessToken,refreshToken}
};


const validateToken=async(req,res,next)=>{
    const header=req.headers.authorization;
    if(!header){
        return res.status(401).send("Un Authorized");
    }
    try{
        const auth=req.headers.authorization.split(" ")[1];
        if(!auth){
            if(renewToken(req,res)){
                next();
            }
        }
        else{
            const validToken=verify(auth,process.env.SECRET);
            if(validToken){
                req.authenticated=true;
                req.userId=validToken.id;
                return next();
            }
        }
    }
    catch(e){
        return res.status(400).send({error:e});
    }
}

const renewToken=async(req,res)=>{
    const refreshToken=req.cookies.refresh;
    let exist=false;
    if(!refreshToken){
        return res.status(401).send({error:e});
    }
    else{
        verify(refreshToken,process.env.SECRET,(err,decoded)=>{
            if(err){
                return res.status(400).send({error:e});
            }
            else{
                const accessToken=sign(
                    {username:user.username,id:user._id},
                    process.env.SECRET,
                    {expiresIn:'1hr'}
                );
                res.cookie("JWT",accessToken,{
                    maxAge:60*60*1000,
                });
                exist=true;
            }
        })
    }
    return exist;
}

module.exports={createToken,validateToken}