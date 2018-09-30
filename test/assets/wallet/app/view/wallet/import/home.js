_$define("app/view/wallet/import/home", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * import enter
 */
var root_1 = require("../../../../pi/ui/root");
var forelet_1 = require("../../../../pi/widget/forelet");
var widget_1 = require("../../../../pi/widget/widget");
var tools_1 = require("../../../utils/tools");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var ImportHome = function (_widget_1$Widget) {
    _inherits(ImportHome, _widget_1$Widget);

    function ImportHome() {
        _classCallCheck(this, ImportHome);

        return _possibleConstructorReturn(this, (ImportHome.__proto__ || Object.getPrototypeOf(ImportHome)).apply(this, arguments));
    }

    _createClass(ImportHome, [{
        key: "create",
        value: function create() {
            _get(ImportHome.prototype.__proto__ || Object.getPrototypeOf(ImportHome.prototype), "create", this).call(this);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            var cfg = tools_1.getLanguage(this);
            this.state = _defineProperty({
                cfgData: cfg,
                tabList: [{
                    tab: cfg.tabs[0],
                    components: 'app-view-wallet-import-standardImport'
                }, {
                    tab: cfg.tabs[1],
                    components: 'app-view-wallet-import-imageImport'
                }, {
                    tab: cfg.tabs[2],
                    components: 'app-view-wallet-import-fragmentImport'
                }]
            }, "cfgData", tools_1.getLanguage(this));
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }, {
        key: "importSuccess",
        value: function importSuccess() {
            console.log('-----------success');
            this.ok && this.ok();
            root_1.popNew('app-components-modalBox-modalBox', this.state.cfgData.modalBox, function () {
                // popNew('app-view-wallet-create-createEnter');
            });
        }
    }]);

    return ImportHome;
}(widget_1.Widget);

exports.ImportHome = ImportHome;
})