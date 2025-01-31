"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-06-09 10:19:47
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2022-06-10 15:52:17
 * @Description:
 */
const objectql_1 = require("@steedos/objectql");
const express = require("express");
const router = express.Router();
const core = require('@steedos/core');
const callObjectServiceAction = function (actionName, userSession, data) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const broker = (0, objectql_1.getSteedosSchema)().broker;
        return broker.call(actionName, data, { meta: { user: userSession } });
    });
};
router.get('/service/api/:objectServiceName/fields', core.requireAuthentication, function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const userSession = req.user;
        try {
            const { objectServiceName } = req.params;
            const result = yield callObjectServiceAction(`${objectServiceName}.getFields`, userSession);
            res.status(200).send(result);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
});
router.get('/service/api/:objectServiceName/getUserObjectPermission', core.requireAuthentication, function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const userSession = req.user;
        try {
            const { objectServiceName } = req.params;
            const result = yield callObjectServiceAction(`${objectServiceName}.getUserObjectPermission`, userSession);
            res.status(200).send(result);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
});
router.get('/service/api/:objectServiceName/recordPermissions/:recordId', core.requireAuthentication, function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const userSession = req.user;
        try {
            const { objectServiceName, recordId } = req.params;
            const result = yield callObjectServiceAction(`${objectServiceName}.getRecordPermissionsById`, userSession, {
                recordId: recordId
            });
            res.status(200).send(result);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
});
router.get('/service/api/:objectServiceName/uiSchema', core.requireAuthentication, function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const userSession = req.user;
        try {
            const { objectServiceName } = req.params;
            const result = yield callObjectServiceAction(`${objectServiceName}.getRecordView`, userSession);
            res.status(200).send(result);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
});
router.post('/service/api/:objectServiceName/defUiSchema', core.requireAuthentication, function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const userSession = req.user;
        try {
            const { objectServiceName } = req.params;
            const result = yield callObjectServiceAction(`${objectServiceName}.createDefaultRecordView`, userSession);
            res.status(200).send(result);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
});
router.get('/service/api/:objectServiceName/uiSchemaTemplate', core.requireAuthentication, function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const userSession = req.user;
        try {
            const { objectServiceName } = req.params;
            const result = yield callObjectServiceAction(`${objectServiceName}.getDefaultRecordView`, userSession);
            res.status(200).send(result);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
});
router.get('/service/api/:objectServiceName/relateds', core.requireAuthentication, function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const userSession = req.user;
        try {
            const { objectServiceName } = req.params;
            const result = yield callObjectServiceAction(`${objectServiceName}.getRelateds`, userSession);
            res.status(200).send(result);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
});
exports.default = router;
