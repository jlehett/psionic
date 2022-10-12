"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _fluxManager = require("../flux-manager/flux-manager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _stale = /*#__PURE__*/new WeakMap();

var _data = /*#__PURE__*/new WeakMap();

var _id = /*#__PURE__*/new WeakMap();

var _fetch = /*#__PURE__*/new WeakMap();

var _fetchPromise = /*#__PURE__*/new WeakMap();

var _staleAfter = /*#__PURE__*/new WeakMap();

var _cancelStaleSetter = /*#__PURE__*/new WeakMap();

var _cacheData = /*#__PURE__*/new WeakSet();

var _markStale = /*#__PURE__*/new WeakSet();

var _unmarkStale = /*#__PURE__*/new WeakSet();

//#endregion
//#region Protected Classes

/**
 * Class representing a Flux cache. A Flux cache has a defined `fetch` function which can be used to
 * fetch the data asynchronously. After the data has been fetched, it will be cached. The next time the
 * data needs to be fetched, it will be taken from the cache, unless it was marked as stale.
 *
 * @protected
 * @memberof module:@psionic/flux
 * @alias module:@psionic/flux.FluxCache
 */
var FluxCache = /*#__PURE__*/function () {
  //#region Public Variables
  //#endregion
  //#region Private Variables

  /**
   * Tracks whether the cache is currently stale or not.
   * @private
   * @type {boolean}
   */

  /**
   * The data to track in the Flux cache.
   * @private
   * @type {*}
   */

  /**
   * The ID of the Flux object.
   * @private
   * @type {string}
   */

  /**
   * The function to call to fetch the data from outside the cache.
   * @private
   * @type {function}
   */

  /**
   * The promise tracking the most recent external `fetch` call.
   * @private
   * @type {Promise<*>}
   */

  /**
   * The number of milliseconds after which the data in the cache should be marked as stale.
   * @private
   * @type {Number}
   */

  /**
   * The function to call to cancel the active stale setter timer.
   * @private
   * @type {function}
   */
  //#endregion
  //#region Constructor

  /**
   * @constructor
   * @param {Object} config The configuration object
   * @param {string} config.id The ID to use for the FluxCache; should be unique among all other active Flux objects
   * @param {function} config.fetch The function to call to asynchronously fetch the data to store in the cache, if non-stale
   * data does not already exist in the cache
   */
  function FluxCache(_ref) {
    var id = _ref.id,
        fetch = _ref.fetch,
        staleAfter = _ref.staleAfter;

    _classCallCheck(this, FluxCache);

    _classPrivateMethodInitSpec(this, _unmarkStale);

    _classPrivateMethodInitSpec(this, _markStale);

    _classPrivateMethodInitSpec(this, _cacheData);

    _classPrivateFieldInitSpec(this, _stale, {
      writable: true,
      value: true
    });

    _classPrivateFieldInitSpec(this, _data, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _id, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _fetch, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _fetchPromise, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _staleAfter, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _cancelStaleSetter, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _id, id); // We want to make sure this fetch function is async so we can treat all potential fetch operations identically


    _classPrivateFieldSet(this, _fetch, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", fetch());

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _classPrivateFieldSet(this, _staleAfter, staleAfter);
  } //#endregion
  //#region Public Functions

  /**
   * Retrieves the appropriate data from the cache, if it is available and non-stale, or externally via
   * the Flux cache's `fetch` function if the data is not available or is stale in the cache.
   * @public
   *
   * @example
   * // Create a FluxCache object
   * const profileCache = createFluxCache({
   *      id: 'profileCache',
   *      fetch: async () => {
   *          await delay(5000);
   *          return { name: 'John' };
   *      }
   * });
   *
   * // Read the value from the FluxCache for the first time (runs the fetch function passed to the cache; promise should take ~5s)
   * const profile = await profileCache.get(); // { name: 'John' }
   *
   * // Read the value from the FluxCache for the second time (retrieves the stored data from the cache; promise should only take a few milliseconds)
   * const cachedProfile = await profileCache.get();
   *
   * @returns {Promise<*>} Resolves with the data from either the cache or from the external fetch function
   */


  _createClass(FluxCache, [{
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _this = this;

        var result;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_classPrivateFieldGet(this, _data) && !_classPrivateFieldGet(this, _stale))) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", (0, _cloneDeep["default"])(_classPrivateFieldGet(this, _data)));

              case 4:
                if (!_classPrivateFieldGet(this, _fetchPromise)) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", _classPrivateFieldGet(this, _fetchPromise).call(this));

              case 8:
                _classPrivateFieldSet(this, _fetchPromise, _classPrivateFieldGet(this, _fetch).call(this)); // Clear out the fetch promise once it resolves


                _classPrivateFieldGet(this, _fetchPromise).then(function () {
                  _classPrivateFieldSet(_this, _fetchPromise, null);
                }); // Get the result from the fetch promise, cache the data, and return the result


                _context2.next = 12;
                return _classPrivateFieldGet(this, _fetchPromise);

              case 12:
                result = _context2.sent;

                _classPrivateMethodGet(this, _cacheData, _cacheData2).call(this, result);

                return _context2.abrupt("return", result);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function get() {
        return _get.apply(this, arguments);
      }

      return get;
    }()
    /**
     * Getter for the `stale` flag on the cache.
     * @public
     *
     * @example
     * // Create a FluxCache object
     * const profileCache = createFluxCache({
     *      id: 'profileCache',
     *      fetch: async () => {
     *          return { name: 'John' };
     *      },
     *      staleAfter: 5000, // Data will be marked as stale 5s after it is cached
     * });
     *
     * // The cache is always stale when first initialized
     * let isStale = profileCache.getStale(); // true
     *
     * // Fetch the profile to remove the stale state
     * profileCache.get();
     *
     * // The cache will no longer be stale, since the profile was just fetched
     * isStale = profileCache.getStale(); // false
     *
     * // If we wait 5 seconds, the data will become stale since we set `staleAfter` to `5000`
     * await delay(5000);
     * isStale = profileCache.getStale(); // true
     *
     * @returns {boolean} The flag indicating whether the data in the cache is currently stale or not
     */

  }, {
    key: "getStale",
    value: function getStale() {
      return _classPrivateFieldGet(this, _stale);
    }
    /**
     * Updates the function this cache uses to externally fetch the data it stores. Calling this function will automatically
     * mark the cache as stale.
     * @public
     *
     * @example
     * // Create a FluxCache object
     * const profileCache = createFluxCache({
     *      id: 'profileCache',
     *      fetch: async () => {
     *          return { name: 'John' };
     *      }
     * });
     *
     * // Fetch the initial profile; the cache will not be marked as stale anymore
     * profileCache.get();
     *
     * // Update the fetch function to retrieve a different user's profile; the cache will immediately be marked as stale
     * profileCache.updateFetch(async () => {
     *      return { name: 'Roni' };
     * });
     *
     * @param {function} fetch The new function to call to fetch data to store in this cache
     */

  }, {
    key: "updateFetch",
    value: function updateFetch(fetch) {
      // We want to make sure this fetch function is async so we can treat all potential fetch operations identically
      _classPrivateFieldSet(this, _fetch, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", fetch());

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      })));

      _classPrivateMethodGet(this, _markStale, _markStale2).call(this);
    }
    /**
     * Manually sets the stale state of the FluxCache. If setting the stale state to `false`, and the `staleAfter` value is set for the FluxCache,
     * the stale timer will start immediately after setting the stale state to `false`.
     * @public
     *
     * @example
     * // Create a FluxCache object
     * const profileCache = createFluxCache({
     *      id: 'profileCache',
     *      fetch: async () => {
     *          return { name: 'John' };
     *      }
     * });
     *
     * // Set the stale state of the cache to `false`, manually
     * profileCache.setStale(false);
     *
     * // Set the stale state of the cache to `true`, manually
     * profileCache.setStale(true);
     *
     * @param {boolean} isStale Flag indicating whether the cache is stale or not
     */

  }, {
    key: "setStale",
    value: function setStale(isStale) {
      isStale ? _classPrivateMethodGet(this, _markStale, _markStale2).call(this) : _classPrivateMethodGet(this, _unmarkStale, _unmarkStale2).call(this);
    } //#endregion
    //#region Protected Functions

    /**
     * Get the Flux object's ID.
     * @protected
     *
     * @return {string} The Flux object's ID
     */

  }, {
    key: "getID",
    value: function getID() {
      return _classPrivateFieldGet(this, _id);
    } //#endregion
    //#region Private Functions

    /**
     * Caches the given data, and handles any stale timer logic, if needed.
     * @private
     *
     * @param {*} data The data to store in the cache
     */
    //#endregion

  }]);

  return FluxCache;
}(); //#endregion
//#region Public Functions

/**
 * Creates a new `FluxCache` with the given ID. If the ID is already taken by another flux object, that object will be returned instead of
 * a new Flux object being created.
 * @public
 * @memberof module:@psionic/flux
 * @alias module:@psionic/flux.createFluxCache
 *
 * @example
 * // Create a new Flux Cache representing a profile
 * const profileCache = createFluxCache({
 *      id: 'profileCache',
 *      fetch: async () => {
 *          return { name: 'John' };
 *      }
 * });
 *
 * @example
 * // If you attempt to create another Flux object with the same ID, the existing Flux object with that ID will be returned instead of
 * // a new one being created:
 * const profileCache = createFluxCache({
 *      id: 'profileCache',
 *      fetch: async () => {
 *          return { name: 'John' };
 *      }
 * });
 *
 * const newProfileCache = createFluxCache({
 *      id: 'profileCache',
 *      fetch: async () => {
 *          return { name: 'Roni' };
 *      }
 * });
 *
 * await profileCache.get(); // { name: 'John' }
 * await newProfileCache.get(); // { name: 'John' } as well, because the `createFluxCache` call simply returned the existing object with ID `profileCache`
 *
 * @example
 * // Sometimes you may want to invalidate a cache based on 1+ dependencies becoming stale; you can use the `dependsOn` config value to specify this
 * const userIDState = createFluxState({
 *      id: 'userIDState',
 *      value: 'original',
 * });
 *
 * const profileCache = createFluxCache({
 *      id: 'profileCache',
 *      fetch: async () => {
 *          const userID = await userIDState.get();
 *          return fetchProfileByUserID(userID);
 *      },
 *      dependsOn: [userIDState],
 * });
 *
 * profileCache.getStale(); // `true`, Caches start off stale
 * await profileCache.get();
 * profileCache.getStale(); // `false`, Data has now been cached
 * userIDState.set('new');
 * profileCache.getStale(); // `true`, One of the cache's dependencies has become stale
 *
 * @param {Object} config The configuration object
 * @param {string} config.id The ID to use for the FluxCache; should be unique among all other active Flux objects
 * @param {function} config.fetch The function to call to asynchronously fetch the data to store in the cache, if non-stale
 * data does not already exist in the cache
 * @param {Array<FluxCache | FluxState | FluxEngine>} [config.dependsOn=[]] The array of Flux objects this cache depends on; if any of the
 * Flux objects' values change or become marked as stale, then this cache will also become marked as stale
 * @param {Number} [config.staleAfter=null] The amount of time to wait before declaring the data in the cache as stale; if this value is
 * not passed, then the cache will not be marked stale in response to the age of the data in the cachegit s
 * @returns {FluxState | FluxCache | FluxEngine} The created Flux object, or the old Flux object with the given ID
 */


function _cacheData2(data) {
  _classPrivateFieldSet(this, _data, data);

  _classPrivateMethodGet(this, _unmarkStale, _unmarkStale2).call(this);
}

function _markStale2() {
  _classPrivateFieldSet(this, _stale, true); // If there is an active timeout function, cancel it


  if (_classPrivateFieldGet(this, _cancelStaleSetter)) {
    _classPrivateFieldGet(this, _cancelStaleSetter).call(this);
  } // Ask the manager to mark all Flux objects depending on this object as stale


  _fluxManager.FluxManager.markAllObjectsRelyingOnObjAsStale(_classPrivateFieldGet(this, _id));
}

function _unmarkStale2() {
  var _this2 = this;

  _classPrivateFieldSet(this, _stale, false); // If a `staleAfter` timer has been provided, perform the necessary stale timer logic


  if (_classPrivateFieldGet(this, _staleAfter)) {
    // Cancel any active timeout functions
    if (_classPrivateFieldGet(this, _cancelStaleSetter)) {
      _classPrivateFieldGet(this, _cancelStaleSetter).call(this);
    } // Create the timeout function and the function to cancel it


    var staleTimeout = setTimeout(function () {
      _classPrivateFieldSet(_this2, _stale, true);

      _classPrivateFieldSet(_this2, _cancelStaleSetter, null);
    }, _classPrivateFieldGet(this, _staleAfter));

    _classPrivateFieldSet(this, _cancelStaleSetter, function () {
      return clearTimeout(staleTimeout);
    });
  }
}

function createFluxCache(_ref4) {
  var id = _ref4.id,
      fetch = _ref4.fetch,
      _ref4$dependsOn = _ref4.dependsOn,
      dependsOn = _ref4$dependsOn === void 0 ? [] : _ref4$dependsOn,
      staleAfter = _ref4.staleAfter;
  return _fluxManager.FluxManager.getOrCreateFluxObject(new FluxCache({
    id: id,
    fetch: fetch,
    staleAfter: staleAfter
  }), dependsOn);
} //#endregion
//#region Exports


module.exports = {
  createFluxCache: createFluxCache,
  FluxCache: FluxCache
}; //#endregion