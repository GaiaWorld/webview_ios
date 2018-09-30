_$define("app/utils/account", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 和账号相关的工具
 */
var store_1 = require("../store/store");
var constants_1 = require("./constants");
var tools_1 = require("./tools");
// 密码强度列表
var walletPswStrengthList = [{
    text: '弱',
    color: '#FF0000'
}, {
    text: '一般',
    color: '#FF9900'
}, {
    text: '强',
    color: '#33CC00'
}];
/**
 * 钱包名称是否合法
 * @param walletName wallet name
 */
exports.walletNameAvailable = function (walletName) {
    return tools_1.getStrLen(walletName.trim()) >= 1 && tools_1.getStrLen(walletName.trim()) <= 20;
};
/**
 * 钱包密码是否合乎规则
 * @param walletPsw  wallet password
 */
exports.walletPswAvailable = function (walletPsw) {
    var reg = /^[.@$&*#a-zA-Z0-9]{8,}$/;
    return reg.test(walletPsw.trim());
};
/**
 * 判断密码是否相等
 * @param psw1 password one
 * @param psw2 password two
 */
exports.pswEqualed = function (psw1, psw2) {
    if (!psw1 || !psw2) return false;
    return psw1.trim() === psw2.trim();
};
/**
 * 钱包数量是否合乎规则
 */
exports.walletCountAvailable = function () {
    var walletList = store_1.find('walletList');
    return walletList ? walletList.length < constants_1.walletNumLimit : true;
};
/**
 * 获取密码强度对象
 * @param walletPsw wallet password
 */
exports.getWalletPswStrength = function (walletPsw) {
    if (!walletPsw || !walletPsw.trim()) {
        return walletPswStrengthList[0];
    }
    var strength = checkStrong(walletPsw);
    return walletPswStrengthList[strength];
};
// 判断输入密码的类型    
var CharMode = function CharMode(iN) {
    if (iN >= 48 && iN <= 57) {
        // 数字    
        return 1;
    }
    if (iN >= 65 && iN <= 90) {
        // 大写    
        return 2;
    }
    if (iN >= 97 && iN <= 122) {
        // 小写    
        return 4;
    } else {
        return 8;
    }
};
// bitTotal函数    
// 计算密码模式    
var bitTotal = function bitTotal(num) {
    var modes = -1;
    for (var i = 0; i < 4; i++) {
        if (num & 1) modes++;
        num >>>= 1;
    }
    return modes;
};
// 返回强度级别    
var checkStrong = function checkStrong(sPW) {
    if (sPW.length < 8) {
        return 0;
    } // 密码太短，不检测级别  
    var Modes = 0;
    for (var i = 0; i < sPW.length; i++) {
        // 密码模式    
        Modes |= CharMode(sPW.charCodeAt(i));
    }
    return bitTotal(Modes);
};
/**
 * 名字显示截取
 */
exports.nickNameInterception = function (name) {
    var ret = '';
    if (name.length > 6) {
        ret = name.slice(0, 6) + "...";
    } else {
        ret = name;
    }
    return ret;
};
/**
 * 随机获取头像
 */
exports.getAvatarRandom = function () {
    // tslint:disable-next-line:max-line-length
    var avatarsSrc = ['img_avatar1.png', 'img_avatar2.png', 'img_avatar3.png', 'img_avatar4.png', 'img_avatar5.png', 'img_avatar6.png', 'img_avatar7.png', 'img_avatar8.png', 'img_avatar9.png', 'img_avatar10.png'];
    var walletList = store_1.find('walletList');
    var avatarUsed = [];
    if (walletList) {
        walletList.forEach(function (item) {
            avatarUsed.push(item.avatar);
        });
    }
    var avatarAvailable = avatarsSrc.filter(function (item) {
        return avatarUsed.indexOf(item) === -1;
    });
    var shuffledAvatars = tools_1.shuffle(avatarAvailable);
    var avatar = shuffledAvatars.splice(0, 1);
    return avatar[0];
};
})