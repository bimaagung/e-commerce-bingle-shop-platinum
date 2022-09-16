
module.exports = {
    getOneAddress : async (req, res, next )=>{
        try {
            
            let id = req.params.id
            let address = await req.addressUC.getAddressByID(id)
            if(address == null){
                return res.status(404).json({
                    message : "faild",
                    data : null
                })
            } res.status(200).json({
                status : "OK",
                message : "success",
                data : address

            })
        } catch (error) {
            next(error)
        }
    },
    // todo get all address
    getAllAddress : async (req, res, next)=>{
        try {
            //your code here 
        } catch (error) {
            
        }
    }
    // todo create address
    // addres field
    // province: "abc",
    // city: "abc",
    // postal_code: "41232",
    // detail: "jl. abc kec abc",
    // user_id : 2
    
    
    // todo update address
    // todo delete address
    
}