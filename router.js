const router = require('express').Router()
const fs = require('fs')
const db = require('./db')
const { resSuc, resErr } = require('./tool')
const routeName = '/api'
// 增加
router.post(`${routeName}/add`, (req, res) => {
    const payload = req.body
    if (!payload) return res.send(resErr('没有传参数'))
    if (!payload.content) return res.send(resErr('content为必填项'))
    if (payload.isCompleted === undefined || payload.isCompleted === '') return res.send(resErr('isCompleted必填项'))
    payload.isCompleted = payload.isCompleted === 1? true: false
    db.add(payload, () => res.send(resSuc('添加成功！')))
})

// 删
router.get(`${routeName}/edit`, (req, res) => {
    if (!req.query.body) return res.send(resErr('id必填项'))
    var payload = JSON.parse(req.query.body)
	if (payload.id === undefined || payload.id === '') return res.send(resErr('id必填项'))
    db.del(payload, () => res.send(resSuc('删除成功！')))
})

// 改
router.post(`${routeName}/edit`, (req, res) => {
    if (!req.query.body) return res.send(resErr('id必填项'))
    const payload = req.body
    if (payload.id === undefined || payload.id === '') return res.send(resErr('id必填项'))
    db.edit(payload, () => res.send(resSuc('修改成功！')))
})

// 查
router.get(`${routeName}/get`, (req, res) => {
    db.get((data) => res.send(resSuc('查询成功！',data)))
})

// 删除已完成
router.get(`${routeName}/clear`, (req, res) => {
    db.clear(() => res.send(resSuc('删除成功！')))
})

module.exports = router