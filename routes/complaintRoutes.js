const express = require('express')
const { getById, addComplaint, updateComplaint, updateStatus, deleteComplaint, getAll } = require('../controllers/complaintController')


const router = express.Router()

router.get("/:id",getById)
router.get("/",getAll)
router.post("/",addComplaint)
router.put("/:id",updateComplaint)
router.patch("/:id/status",updateStatus)
router.delete("/:id",deleteComplaint)

module.exports = router