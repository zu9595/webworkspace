const express = require('express');
const router = express.Router();

// user/
router.get('/', (req, res) => {

}
)

router,post('/insert', (req, res)=>{
    res.send('회원 등록');
})

router.put('/update', (req, res)=>{
    res.send('회원 수정');
})

router.delete('/delete', (req, res)=>{
    res.send('회원 삭제');
})



module.exports = router;