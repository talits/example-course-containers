var express = require('express');
var router = express.Router();
var commands = require("../commands/app.sale.command");
var repository = require("../repository/app.sale.repository");
router.route("/")
    .get(function (req, res) {
        repository.all(response => {
            res.json(response);
        });

    })
    .post(function (req, res) {
        commands.create(req.body, response => {
            res.json(response);
        });
    });
router.route("/:id")
    .get(function (req, res) {
        repository.get(req.params.id, response => {
            res.json(response);
        });
    })
    .put(function (req, res) {
        commands.update(req.params.id, req.body, response => {
            res.json(response);
        });
    })
    .delete(function (req, res) {
        commands.delete(req.params.id, response => {
            res.json(response);
        });
    });
module.exports = router;