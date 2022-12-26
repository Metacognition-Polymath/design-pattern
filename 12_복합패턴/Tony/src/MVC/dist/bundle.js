/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./counterController.ts":
/*!******************************!*\
  !*** ./counterController.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.CounterController = void 0;\nconst counterView_1 = __webpack_require__(/*! ./counterView */ \"./counterView.ts\");\n// MVC counter controller\nclass CounterController {\n  constructor(model) {\n    this.model = model;\n    this.view = new counterView_1.CounterView(this.model, this);\n  }\n  increase() {\n    this.model.increase();\n  }\n  decrease() {\n    this.model.decrease();\n  }\n  getView() {\n    return this.view;\n  }\n}\nexports.CounterController = CounterController;\n\n//# sourceURL=webpack://mvc/./counterController.ts?");

/***/ }),

/***/ "./counterModel.ts":
/*!*************************!*\
  !*** ./counterModel.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.CounterModel = void 0;\n// MVC 패턴의 Model 클래스\nclass CounterModel {\n  constructor() {\n    this._count = 0;\n    this._listeners = [];\n    this._count = 0;\n  }\n  addListener(listener) {\n    this._listeners.push(listener);\n  }\n  getCount() {\n    return this._count;\n  }\n  increase() {\n    this._count++;\n    this._listeners.forEach(listener => listener.update());\n  }\n  decrease() {\n    this._count--;\n    this._listeners.forEach(listener => listener.update());\n  }\n}\nexports.CounterModel = CounterModel;\n\n//# sourceURL=webpack://mvc/./counterModel.ts?");

/***/ }),

/***/ "./counterView.ts":
/*!************************!*\
  !*** ./counterView.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.CounterView = void 0;\nclass CounterView {\n  constructor(model, controller) {\n    this.model = model;\n    this.controller = controller;\n    this.counterElement = document.getElementById(\"counter\");\n  }\n  increase() {\n    this.controller.increase();\n  }\n  decrease() {\n    this.controller.decrease();\n  }\n  update() {\n    this.counterElement.innerHTML = this.model.getCount().toString();\n  }\n}\nexports.CounterView = CounterView;\n\n//# sourceURL=webpack://mvc/./counterView.ts?");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nconst counterController_1 = __webpack_require__(/*! ./counterController */ \"./counterController.ts\");\nconst counterModel_1 = __webpack_require__(/*! ./counterModel */ \"./counterModel.ts\");\nconst btnIncrement = document.querySelector(\"#btnIncrement\");\nconst btnDecrement = document.querySelector(\"#btnDecrement\");\nconst counterElement = document.querySelector(\"#counter\");\nconst model = new counterModel_1.CounterModel();\nconst controller = new counterController_1.CounterController(model);\nconst view = controller.getView();\nbtnIncrement.addEventListener(\"click\", () => {\n  view.increase();\n});\nbtnDecrement.addEventListener(\"click\", () => {\n  view.decrease();\n});\n// TODO: 리팩터링 하기 - 뷰가 여기에서 생성이 되어야 할 것 같다\n\n//# sourceURL=webpack://mvc/./index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;