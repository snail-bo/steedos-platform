"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-06-08 23:28:39
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2022-07-16 16:18:31
 * @Description:
 */
const express = require("express");
const account_1 = require("./account");
const passport = require('passport');
const router = express.Router();
router.use('/accounts/jwt/login', passport.authenticate('jwt', { session: false }), (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    account_1.Account.ssoLogin(req, res, { err: null, user: req.user, redirect: false, accessToken: null }).then((loginResult) => {
        delete loginResult.user.services;
        delete loginResult.user.thirdPartyUser;
        return res.status(200).send(loginResult);
    }).catch((err) => {
        console.log(`err`, err);
        return res.status(500).send(err.message);
    });
}));
exports.default = router;
