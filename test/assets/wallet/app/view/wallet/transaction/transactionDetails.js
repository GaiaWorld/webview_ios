_$define("app/view/wallet/transaction/transactionDetails", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 交易详情页面
 */
var root_1 = require("../../../../pi/ui/root");
var forelet_1 = require("../../../../pi/widget/forelet");
var widget_1 = require("../../../../pi/widget/widget");
var native_1 = require("../../../logic/native");
var interface_1 = require("../../../store/interface");
var store_1 = require("../../../store/store");
var constants_1 = require("../../../utils/constants");
// tslint:disable-next-line:max-line-length
var tools_1 = require("../../../utils/tools");
var walletTools_1 = require("../../../utils/walletTools");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var TransactionDetails = function (_widget_1$Widget) {
    _inherits(TransactionDetails, _widget_1$Widget);

    function TransactionDetails() {
        _classCallCheck(this, TransactionDetails);

        return _possibleConstructorReturn(this, (TransactionDetails.__proto__ || Object.getPrototypeOf(TransactionDetails)).apply(this, arguments));
    }

    _createClass(TransactionDetails, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(TransactionDetails.prototype.__proto__ || Object.getPrototypeOf(TransactionDetails.prototype), "setProps", this).call(this, props, oldProps);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            var tx = walletTools_1.fetchLocalTxByHash1(this.props.hash);
            console.log(tx);
            var obj = tools_1.parseStatusShow(tx);
            var cfg = tools_1.getLanguage(this);
            var qrcodePrefix = tx.currencyName === 'BTC' ? constants_1.blockchainUrl : constants_1.etherscanUrl;
            var webText = tx.currencyName === 'BTC' ? cfg.tips[0] : cfg.tips[1];
            this.state = {
                tx: tx,
                hashShow: tools_1.parseAccount(tx.hash),
                timeShow: tools_1.timestampFormat(tx.time),
                statusShow: obj.text,
                statusIcon: obj.icon,
                minerFeeUnit: tx.currencyName !== 'BTC' ? 'ETH' : 'BTC',
                canResend: tools_1.canResend(tx),
                qrcode: "" + qrcodePrefix + tx.hash,
                webText: webText,
                cfgData: cfg
            };
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }, {
        key: "resendClick",
        value: function resendClick() {
            var tx = this.state.tx;
            if (tx.txType === interface_1.TxType.RECHARGE) {
                root_1.popNew('app-view-wallet-cloudWallet-recharge', { tx: tx, currencyName: this.state.tx.currencyName });
            } else {
                root_1.popNew('app-view-wallet-transaction-transfer', { tx: tx, currencyName: this.state.tx.currencyName });
            }
            this.ok && this.ok();
        }
    }, {
        key: "copyToAddr",
        value: function copyToAddr() {
            tools_1.copyToClipboard(this.state.tx.toAddr);
            tools_1.popNewMessage(this.state.cfgData.tips[2]);
        }
    }, {
        key: "copyFromAddr",
        value: function copyFromAddr() {
            tools_1.copyToClipboard(this.state.tx.fromAddr);
            tools_1.popNewMessage(this.state.cfgData.tips[2]);
        }
    }, {
        key: "copyHash",
        value: function copyHash() {
            tools_1.copyToClipboard(this.state.tx.hash);
            tools_1.popNewMessage(this.state.cfgData.tips[2]);
        }
    }, {
        key: "openNewWeb",
        value: function openNewWeb() {
            native_1.openNewActivity(this.state.qrcode);
        }
    }, {
        key: "updateTransaction",
        value: function updateTransaction() {
            // this.state.tx = fetchTxByHash(this.props.hash);
            this.init();
            this.paint();
        }
    }]);

    return TransactionDetails;
}(widget_1.Widget);

exports.TransactionDetails = TransactionDetails;
// 交易记录变化
store_1.register('transactions', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.updateTransaction();
    }
});
})