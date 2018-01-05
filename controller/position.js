const positionModel = require("../model/position.js")

module.exports = {
    addPosition(req, res) {
        const {
            company,
            position,
            salary,
            address
        } = req.body;
        positionModel.addPosition(company, position, salary, address, (err) => {
            res.json({
                ret: true,
                data: {
                    inserted: !err
                }
            })
        })
    },
    getListInfo(req, res) {
        const {
            size,
            page
        } = req.body;
        let totalPage = 0;
        positionModel.getPosition({}, (result) => {
            if (result && result !== "error") {
                totalPage = Math.ceil(result.length / size);
                positionModel.getPositionByPage(size, page, (result) => {
                    res.json({
                        ret: true,
                        data: {
                            list: (result && result !== "error") ? result : [],
                            totalPage
                        }
                    })
                })
            }
        })
    },
    deletePositionById(req, res) {
        positionModel.deletePositionById(req.query.id, (result) => {
            res.json({
                ret: true,
                data: {
                    delete: (result && result !== "error") ? true : false
                }
            })
        })
    },
    getPositionById(req, res) {
        positionModel.getPositionById(req.query.id, (result) => {
            res.json({
                ret: true,
                data: {
                    info: (result && result !== "error") ? result : {}
                }
            })
        })
    },
    updatePositionById(req, res) {
        const {
            id,
            company,
            position,
            salary,
            address
        } = req.body;
        positionModel.updatePositionById(id, {
            company,
            position,
            salary,
            address
        }, (result) => {
            res.json({
                ret: true,
                data: {
                    update: (result && result !== "error") ? true : false
                }
            })
        })
    },
    getSalaryList(req, res) {
        const min = parseInt(req.query.salary.split("-")[0], 10),
              max = parseInt(req.query.salary.split("-")[1], 10);
        let arr = [];
        positionModel.getPosition({}, (result) => {
            result.forEach((value, index) => {
                const itemMin = parseInt(value.salary.split("-")[0], 10);
                const itemMax = parseInt(value.salary.split("-")[1], 10);
                if (itemMin >= min && itemMax <= max) {
                    arr.push(value);
                }
            });
            res.json({
                ret: true,
                data: {
                    list: arr
                }
            })
        })
    }
}