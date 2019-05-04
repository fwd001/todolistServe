const {writeData, readData} = require('./tool')
module.exports = {
	add(payload, callback) {
        readData(function (res) {
            const data = {...payload, id: res.index + 1}
            res.index += 1
            res.list.unshift(data)
            writeData(res, callback)
        })
    },
	del(payload, callback) {
        readData(function (res) {
            res.list = res.list.filter(v => v.id !== payload.id)
            writeData(res, callback)
        })
    },
	// 删除已完成
	clear(callback) {
        readData(function (res) {
            res.list = res.list.filter(v => !v.isCompleted)
            writeData(res, callback)
        })
    },
	edit(payload, callback) {
        readData(function (res) {
            let list = [...res.list]
            let item = list.find(v => v.id === payload.id)
            item.isCompleted = !item.isCompleted
            res.list = [...list]
            writeData(res, callback)
        })
    },
	// 查
	get(callback) {
        readData((res) => {
            callback(res.list)
        })
    }
}

