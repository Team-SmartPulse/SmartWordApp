"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 5656:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6921);
/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8998);
/* harmony import */ var wagmi_providers_public__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8577);
/* harmony import */ var viem_chains__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9263);
/* harmony import */ var wagmi_providers_infura__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9737);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_1__, wagmi__WEBPACK_IMPORTED_MODULE_2__, wagmi_providers_public__WEBPACK_IMPORTED_MODULE_3__, viem_chains__WEBPACK_IMPORTED_MODULE_4__, wagmi_providers_infura__WEBPACK_IMPORTED_MODULE_5__]);
([_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_1__, wagmi__WEBPACK_IMPORTED_MODULE_2__, wagmi_providers_public__WEBPACK_IMPORTED_MODULE_3__, viem_chains__WEBPACK_IMPORTED_MODULE_4__, wagmi_providers_infura__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const { chains , publicClient , webSocketPublicClient  } = (0,wagmi__WEBPACK_IMPORTED_MODULE_2__.configureChains)([
    viem_chains__WEBPACK_IMPORTED_MODULE_4__.celoAlfajores,
    viem_chains__WEBPACK_IMPORTED_MODULE_4__.celo, 
], [
    (0,wagmi_providers_infura__WEBPACK_IMPORTED_MODULE_5__.infuraProvider)({
        apiKey: "22ac6fb2115642d39311d9e2072bc13e"
    }),
    (0,wagmi_providers_public__WEBPACK_IMPORTED_MODULE_3__.publicProvider)()
]);
const { connectors  } = (0,_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_1__.getDefaultWallets)({
    appName: "Smart Word App",
    projectId: "YOUR_PROJECT_ID",
    chains
});
const wagmiConfig = (0,wagmi__WEBPACK_IMPORTED_MODULE_2__.createConfig)({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient
});
function MyApp({ Component , pageProps  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(wagmi__WEBPACK_IMPORTED_MODULE_2__.WagmiConfig, {
        config: wagmiConfig,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_1__.RainbowKitProvider, {
            chains: chains,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                ...pageProps
            })
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 6921:
/***/ ((module) => {

module.exports = import("@rainbow-me/rainbowkit");;

/***/ }),

/***/ 9263:
/***/ ((module) => {

module.exports = import("viem/chains");;

/***/ }),

/***/ 8998:
/***/ ((module) => {

module.exports = import("wagmi");;

/***/ }),

/***/ 9737:
/***/ ((module) => {

module.exports = import("wagmi/providers/infura");;

/***/ }),

/***/ 8577:
/***/ ((module) => {

module.exports = import("wagmi/providers/public");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(5656));
module.exports = __webpack_exports__;

})();