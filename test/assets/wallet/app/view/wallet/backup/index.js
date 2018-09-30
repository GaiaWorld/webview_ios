_$define("app/view/wallet/backup/index", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * backup index
 */
var root_1 = require("../../../../pi/ui/root");
var widget_1 = require("../../../../pi/widget/widget");
var tools_1 = require("../../../utils/tools");

var BackupIndex = function (_widget_1$Widget) {
    _inherits(BackupIndex, _widget_1$Widget);

    function BackupIndex() {
        _classCallCheck(this, BackupIndex);

        return _possibleConstructorReturn(this, (BackupIndex.__proto__ || Object.getPrototypeOf(BackupIndex)).apply(this, arguments));
    }

    _createClass(BackupIndex, [{
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }, {
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(BackupIndex.prototype.__proto__ || Object.getPrototypeOf(BackupIndex.prototype), "setProps", this).call(this, props, oldProps);
            this.state = {
                cfgData: tools_1.getLanguage(this)
            };
        }
    }, {
        key: "standardBackupClick",
        value: function standardBackupClick() {
            var _this2 = this;

            root_1.popNew('app-view-wallet-backup-backupMnemonicWordConfirm', { mnemonic: this.props.mnemonic }, function () {
                _this2.ok && _this2.ok();
            });
        }
    }, {
        key: "fragmentsBackupClick",
        value: function fragmentsBackupClick() {
            var _this3 = this;

            root_1.popNew('app-view-wallet-backup-shareMnemonic', { fragments: this.props.fragments }, function () {
                _this3.ok && _this3.ok();
            });
        }
    }]);

    return BackupIndex;
}(widget_1.Widget);

exports.BackupIndex = BackupIndex;
})