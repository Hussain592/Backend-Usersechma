


export default function sendre (res,status,data,error,msg){
    res.status(status).json({
       data: data,
       error,
       msg

    })
    
}


