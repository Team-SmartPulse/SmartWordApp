/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/Marketplace/discover",{

/***/ "./Components/Discover.tsx":
/*!*********************************!*\
  !*** ./Components/Discover.tsx ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports on update so we can compare the boundary
                // signatures.
                module.hot.dispose(function (data) {
                    data.prevExports = currentExports;
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevExports !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevExports !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "./pages/Marketplace/discover.tsx":
/*!****************************************!*\
  !*** ./pages/Marketplace/discover.tsx ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../styles/Home.module.css */ \"./styles/Home.module.css\");\n/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _Components_images_pngs_discArrowDown_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Components/images/pngs/discArrowDown.png */ \"./Components/images/pngs/discArrowDown.png\");\n/* harmony import */ var _Components_Discover__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Components/Discover */ \"./Components/Discover.tsx\");\n/* harmony import */ var _Components_Discover__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Components_Discover__WEBPACK_IMPORTED_MODULE_4__);\nvar _this = undefined;\n\n\n\n\n\n\nvar Header = function() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().discoverCtn),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().bannerCtn),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().popularText),\n                    children: \"Popular Collection\"\n                }, void 0, false, {\n                    fileName: \"/Users/mac/Desktop/SmartWordApp/Frontend/pages/Marketplace/discover.tsx\",\n                    lineNumber: 12,\n                    columnNumber: 9\n                }, _this)\n            }, void 0, false, {\n                fileName: \"/Users/mac/Desktop/SmartWordApp/Frontend/pages/Marketplace/discover.tsx\",\n                lineNumber: 11,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().belowBannerCtn),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().inputCtn),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"select\", {\n                                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().input),\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                    children: \"All Categories\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/mac/Desktop/SmartWordApp/Frontend/pages/Marketplace/discover.tsx\",\n                                    lineNumber: 17,\n                                    columnNumber: 17\n                                }, _this)\n                            }, void 0, false, {\n                                fileName: \"/Users/mac/Desktop/SmartWordApp/Frontend/pages/Marketplace/discover.tsx\",\n                                lineNumber: 16,\n                                columnNumber: 13\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().discDropdown),\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                    src: _Components_images_pngs_discArrowDown_png__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n                                    alt: \"dropdown\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/mac/Desktop/SmartWordApp/Frontend/pages/Marketplace/discover.tsx\",\n                                    lineNumber: 20,\n                                    columnNumber: 13\n                                }, _this)\n                            }, void 0, false, {\n                                fileName: \"/Users/mac/Desktop/SmartWordApp/Frontend/pages/Marketplace/discover.tsx\",\n                                lineNumber: 19,\n                                columnNumber: 13\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/mac/Desktop/SmartWordApp/Frontend/pages/Marketplace/discover.tsx\",\n                        lineNumber: 15,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_Components_Discover__WEBPACK_IMPORTED_MODULE_4___default()), {}, void 0, false, {\n                        fileName: \"/Users/mac/Desktop/SmartWordApp/Frontend/pages/Marketplace/discover.tsx\",\n                        lineNumber: 23,\n                        columnNumber: 9\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/mac/Desktop/SmartWordApp/Frontend/pages/Marketplace/discover.tsx\",\n                lineNumber: 14,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/mac/Desktop/SmartWordApp/Frontend/pages/Marketplace/discover.tsx\",\n        lineNumber: 10,\n        columnNumber: 5\n    }, _this);\n};\n_c = Header;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Header);\nvar _c;\n$RefreshReg$(_c, \"Header\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9NYXJrZXRwbGFjZS9kaXNjb3Zlci50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQTBCO0FBQ0s7QUFFbUI7QUFDb0I7QUFDdEI7QUFFaEQsSUFBTUssTUFBTSxHQUFhLFdBQU07SUFDN0IscUJBQ0UsOERBQUNDLEtBQUc7UUFBQ0MsU0FBUyxFQUFFTCw0RUFBa0I7OzBCQUNoQyw4REFBQ0ksS0FBRztnQkFBQ0MsU0FBUyxFQUFFTCwwRUFBZ0I7MEJBQzlCLDRFQUFDUSxHQUFDO29CQUFDSCxTQUFTLEVBQUVMLDRFQUFrQjs4QkFBRSxvQkFBa0I7Ozs7O3lCQUFJOzs7OztxQkFDcEQ7MEJBQ04sOERBQUNJLEtBQUc7Z0JBQUNDLFNBQVMsRUFBRUwsK0VBQXFCOztrQ0FDbkMsOERBQUNJLEtBQUc7d0JBQUNDLFNBQVMsRUFBRUwseUVBQWU7OzBDQUMzQiw4REFBQ1ksUUFBTTtnQ0FBQ1AsU0FBUyxFQUFFTCxzRUFBWTswQ0FDM0IsNEVBQUNjLFFBQU07OENBQUMsZ0JBQWM7Ozs7O3lDQUFTOzs7OztxQ0FDMUI7MENBQ1QsOERBQUNWLEtBQUc7Z0NBQUNDLFNBQVMsRUFBRUwsNkVBQW1COzBDQUNuQyw0RUFBQ0QsbURBQUs7b0NBQUNpQixHQUFHLEVBQUVmLGlGQUFRO29DQUFFZ0IsR0FBRyxFQUFDLFVBQVU7Ozs7O3lDQUFHOzs7OztxQ0FDakM7Ozs7Ozs2QkFDSjtrQ0FDTiw4REFBQ2YsNkRBQVE7Ozs7NkJBQUc7Ozs7OztxQkFDUjs7Ozs7O2FBQ0osQ0FDTjtBQUNGLENBQUM7QUFuQktDLEtBQUFBLE1BQU07QUFxQlosK0RBQWVBLE1BQU0sRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9NYXJrZXRwbGFjZS9kaXNjb3Zlci50c3g/ZTgyYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnO1xuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJ1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi8uLi9zdHlsZXMvSG9tZS5tb2R1bGUuY3NzJztcbmltcG9ydCBEcm9wZG93biBmcm9tICcuLi8uLi9Db21wb25lbnRzL2ltYWdlcy9wbmdzL2Rpc2NBcnJvd0Rvd24ucG5nJztcbmltcG9ydCBEaXNjb3ZlciBmcm9tICcuLi8uLi9Db21wb25lbnRzL0Rpc2NvdmVyJ1xuXG5jb25zdCBIZWFkZXI6IFJlYWN0LkZDID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZGlzY292ZXJDdG59PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5iYW5uZXJDdG59PlxuICAgICAgICA8cCBjbGFzc05hbWU9e3N0eWxlcy5wb3B1bGFyVGV4dH0+UG9wdWxhciBDb2xsZWN0aW9uPC9wPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJlbG93QmFubmVyQ3RufT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dEN0bn0+XG4gICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT17c3R5bGVzLmlucHV0fT5cbiAgICAgICAgICAgICAgICA8b3B0aW9uPkFsbCBDYXRlZ29yaWVzPC9vcHRpb24+XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZGlzY0Ryb3Bkb3dufT5cbiAgICAgICAgICAgIDxJbWFnZSBzcmM9e0Ryb3Bkb3dufSBhbHQ9XCJkcm9wZG93blwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxEaXNjb3ZlciAvPlxuICAgICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlcjtcblxuXG5cblxuXG5cblxuIl0sIm5hbWVzIjpbIlJlYWN0IiwiSW1hZ2UiLCJzdHlsZXMiLCJEcm9wZG93biIsIkRpc2NvdmVyIiwiSGVhZGVyIiwiZGl2IiwiY2xhc3NOYW1lIiwiZGlzY292ZXJDdG4iLCJiYW5uZXJDdG4iLCJwIiwicG9wdWxhclRleHQiLCJiZWxvd0Jhbm5lckN0biIsImlucHV0Q3RuIiwic2VsZWN0IiwiaW5wdXQiLCJvcHRpb24iLCJkaXNjRHJvcGRvd24iLCJzcmMiLCJhbHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/Marketplace/discover.tsx\n"));

/***/ })

});