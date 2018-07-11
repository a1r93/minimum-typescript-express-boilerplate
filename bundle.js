/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var bodyParser = __webpack_require__(2);
var errorHandler = __webpack_require__(3);
var express = __webpack_require__(4);
var utils_1 = __webpack_require__(5);
var DEFAULT_PORT = 8000;
// Load environment variables from .env file
utils_1.loadEnvironment();
// Create Express server
var app = express();
// Express configuration
app.set("port", process.env.PORT || DEFAULT_PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler());
var logger = utils_1.createLogger();
/**
 * Default app route.
 */
app.get("/", function (req, res) {
    res.status(utils_1.HttpStatus.Ok).send("Hello World");
});
var server = app.listen(app.get("port"), function () {
    logger.info("  App is running at http://localhost:" + app.get("port") + " in " + app.get("env") + " mode");
    logger.info("  Press CTRL-C to stop\n");
});
exports["default"] = server;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
module.exports = __webpack_require__(0);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("errorhandler");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(__webpack_require__(6));
__export(__webpack_require__(10));
__export(__webpack_require__(11));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var path_1 = __webpack_require__(7);
var winston = __webpack_require__(8);
var tsFormat = function () { return new Date().toLocaleTimeString(); };
/**
 * @brief Creates a new Logger with the given name, and returns it.
 *
 * @description
 *
 * As the logName is used in the log filename, it must not
 * contains characters that could interfers with the path ("/", "\", ":", ...")
 *
 * @param {string} logName The log name
 *
 * @returns {winston.LoggerInstance} The logger.
 */
exports.createLogger = function (logName) {
    var logPath = process.env.LOGS_PATH || "";
    var fileTransport = logName
        ? new (__webpack_require__(9))({
            datePattern: "YYYY-MM-DD",
            filename: path_1.join(logPath, "%DATE%-" + logName + ".log"),
            prepend: true,
            timestamp: tsFormat
        })
        : undefined;
    var transports = fileTransport
        ? [new winston.transports.Console(), fileTransport]
        : [new winston.transports.Console()];
    return new winston.Logger({ transports: transports });
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("winston-daily-rotate-file");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * Exports the used HTTP status codes, for convenience.
 * See: https://httpstatuses.com/
 */
var HttpStatus;
(function (HttpStatus) {
    // 1xx Informational
    HttpStatus[HttpStatus["Continue"] = 100] = "Continue";
    HttpStatus[HttpStatus["SwitchingProtocols"] = 101] = "SwitchingProtocols";
    HttpStatus[HttpStatus["Processing"] = 102] = "Processing";
    // 2xx Success
    HttpStatus[HttpStatus["Ok"] = 200] = "Ok";
    HttpStatus[HttpStatus["Created"] = 201] = "Created";
    HttpStatus[HttpStatus["Accepted"] = 202] = "Accepted";
    HttpStatus[HttpStatus["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
    HttpStatus[HttpStatus["NoContent"] = 204] = "NoContent";
    HttpStatus[HttpStatus["ResetContent"] = 205] = "ResetContent";
    HttpStatus[HttpStatus["PartialContent"] = 206] = "PartialContent";
    HttpStatus[HttpStatus["MultiStatus"] = 207] = "MultiStatus";
    HttpStatus[HttpStatus["AlreadyReported"] = 208] = "AlreadyReported";
    // 3xx Redirection
    HttpStatus[HttpStatus["MultipleChoice"] = 300] = "MultipleChoice";
    HttpStatus[HttpStatus["MovedPermanently"] = 301] = "MovedPermanently";
    HttpStatus[HttpStatus["Found"] = 302] = "Found";
    HttpStatus[HttpStatus["SeeOther"] = 303] = "SeeOther";
    HttpStatus[HttpStatus["NotModified"] = 304] = "NotModified";
    HttpStatus[HttpStatus["UseProxy"] = 305] = "UseProxy";
    HttpStatus[HttpStatus["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpStatus[HttpStatus["PermanentRedirect"] = 308] = "PermanentRedirect";
    // 4xx Client Error
    HttpStatus[HttpStatus["BadRequest"] = 400] = "BadRequest";
    HttpStatus[HttpStatus["Unauthorized"] = 401] = "Unauthorized";
    HttpStatus[HttpStatus["PaymentRequired"] = 402] = "PaymentRequired";
    HttpStatus[HttpStatus["Forbidden"] = 403] = "Forbidden";
    HttpStatus[HttpStatus["NotFound"] = 404] = "NotFound";
    HttpStatus[HttpStatus["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpStatus[HttpStatus["NotAcceptable"] = 406] = "NotAcceptable";
    HttpStatus[HttpStatus["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpStatus[HttpStatus["RequestTimeout"] = 408] = "RequestTimeout";
    HttpStatus[HttpStatus["Conflict"] = 409] = "Conflict";
    HttpStatus[HttpStatus["Gone"] = 410] = "Gone";
    HttpStatus[HttpStatus["LengthRequired"] = 411] = "LengthRequired";
    HttpStatus[HttpStatus["PreconditionFailed"] = 412] = "PreconditionFailed";
    HttpStatus[HttpStatus["PayloadTooLarge"] = 413] = "PayloadTooLarge";
    HttpStatus[HttpStatus["RequestUriTooLong"] = 414] = "RequestUriTooLong";
    HttpStatus[HttpStatus["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
    HttpStatus[HttpStatus["RequestedRangeNotSatisfiable"] = 416] = "RequestedRangeNotSatisfiable";
    HttpStatus[HttpStatus["ExpectationFailed"] = 417] = "ExpectationFailed";
    HttpStatus[HttpStatus["ImaTeapot"] = 418] = "ImaTeapot";
    HttpStatus[HttpStatus["MisdirectedRequest"] = 421] = "MisdirectedRequest";
    HttpStatus[HttpStatus["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    HttpStatus[HttpStatus["Locked"] = 423] = "Locked";
    HttpStatus[HttpStatus["FailedDependecy"] = 424] = "FailedDependecy";
    HttpStatus[HttpStatus["UpgradeRequired"] = 426] = "UpgradeRequired";
    HttpStatus[HttpStatus["PreconditionRequired"] = 428] = "PreconditionRequired";
    HttpStatus[HttpStatus["TooManyRequests"] = 429] = "TooManyRequests";
    HttpStatus[HttpStatus["RequestHeaderFieldsTooLarge"] = 431] = "RequestHeaderFieldsTooLarge";
    HttpStatus[HttpStatus["ConnectionClosedWithoutResponse"] = 444] = "ConnectionClosedWithoutResponse";
    HttpStatus[HttpStatus["UnavailableForLegalReasons"] = 451] = "UnavailableForLegalReasons";
    HttpStatus[HttpStatus["ClientClosedRequest"] = 499] = "ClientClosedRequest";
    // 5xx Server Error
    HttpStatus[HttpStatus["InternalServerError"] = 500] = "InternalServerError";
    HttpStatus[HttpStatus["NotImplemented"] = 501] = "NotImplemented";
    HttpStatus[HttpStatus["BadGateway"] = 502] = "BadGateway";
    HttpStatus[HttpStatus["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpStatus[HttpStatus["GatewayTimeout"] = 504] = "GatewayTimeout";
    HttpStatus[HttpStatus["HttpVersionNotSupported"] = 505] = "HttpVersionNotSupported";
    HttpStatus[HttpStatus["VariantAlsoNegotiates"] = 506] = "VariantAlsoNegotiates";
    HttpStatus[HttpStatus["InsufficientStorage"] = 507] = "InsufficientStorage";
    HttpStatus[HttpStatus["LoopDetected"] = 508] = "LoopDetected";
    HttpStatus[HttpStatus["NotExtended"] = 510] = "NotExtended";
    HttpStatus[HttpStatus["NetworkAuthenticationRequired"] = 511] = "NetworkAuthenticationRequired";
    HttpStatus[HttpStatus["NetworkConnectTimeoutError"] = 599] = "NetworkConnectTimeoutError";
})(HttpStatus = exports.HttpStatus || (exports.HttpStatus = {}));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var dotenv = __webpack_require__(12);
/**
 * @brief Loads the .env file into process.env, and returns the loaded
 * key/values.
 *
 * @return The loaded values.
 *
 * @throws {SquidApiException} The loading failed.
 */
exports.loadEnvironment = function () {
    var _a = dotenv.config(), parsed = _a.parsed, error = _a.error;
    if (error) {
        throw new Error("Error while trying to load environment file");
    }
    return parsed;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map