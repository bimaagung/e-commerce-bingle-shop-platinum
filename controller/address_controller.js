module.exports = {
    getOneAddress : async (req, res )=>{
        let id = req.params.id
        let address = await addressUC.getAddressByID(id)
        if(address == null){
            return res.status(404).json({
                message : "faild",
                data : null
            })
            return res.status(200).json({
                message : "success",
                data : address
            })
        }
    }
}