module.exports ={
    generateRandomNumber(len) {
        let randStr = ''
        for (let i = 0; i < len; i++) {
            randStr += Math.floor(Math.random() * 10)
        }
        return randStr
    }
}