"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FluxCache = void 0;

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

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

var _data = /*#__PURE__*/new WeakMap();

var _fetchFn = /*#__PURE__*/new WeakMap();

var _loadingPromise = /*#__PURE__*/new WeakMap();

var _currentLoadingPromiseResolved = /*#__PURE__*/new WeakMap();

var _stale = /*#__PURE__*/new WeakMap();

var _staleTimeoutID = /*#__PURE__*/new WeakMap();

var _staleAfterTime = /*#__PURE__*/new WeakMap();

var _startStaleTimerOnLastFetchResolve = /*#__PURE__*/new WeakMap();

var _dependencies = /*#__PURE__*/new WeakMap();

var _performExternalFetch = /*#__PURE__*/new WeakSet();

var _getCopyOfDataFromCache = /*#__PURE__*/new WeakSet();

var _handleStaleTimerStart = /*#__PURE__*/new WeakSet();

var _startStaleTimer = /*#__PURE__*/new WeakSet();

var _cancelStaleTimer = /*#__PURE__*/new WeakSet();

//#endregion
//#region Classes

/**
 * Class representing a singular cache of data. `DataCache`s store cache-able data which can be marked as stale
 * after a set amount of time, and set to auto-renew after a set amount of time, if desired.
 *
 * `DataCache`s are initialized with a function that can be used to fetch the data it is intended to hold. These
 * fetching functions can depend on other `DataCache`s, and can optionally be configured to be marked as stale whenever
 * a `DataCache` it depends on becomes marked as stale.
 *
 * @public
 * @memberof module:@psionic/flux
 * @alias module:@psionic/flux.FluxCache
 */
var FluxCache = /*#__PURE__*/function () {
  //#region Public Variables
  //#endregion
  //#region Private Variables

  /**
   * Variable tracking the last data fetched.
   * @private
   * @type {*}
   */

  /**
   * Tracker for the function to call to fetch the data from outside the cache.
   * @private
   * @type {function}
   */

  /**
   * Tracker for the active loading promise. Starts off `null` since no loading promise is active.
   * @private
   * @type {Promise<null> | null}
   */

  /**
   * Tracker for whether the current loading promise has resolved or not yet.
   * @private
   * @type {boolean}
   */

  /**
   * Tracker for whether the data in the data cache is stale or not. Starts off `true`, since no data has been
   * fetched yet, which means we can't rely on the cache.
   * @private
   * @type {boolean}
   */

  /**
   * Tracker for the timeout function ID that sets the cache as stale after a set amount of time. Starts off
   * `null` since no timeout function has been defined yet.
   * @private
   * @type {number}
   */

  /**
   * Tracker for the amount of time in milliseconds to wait before marking the data cache as stale.
   * @private
   * @type {number}
   */

  /**
   * Tracker for whether the stale timer should start when the last fetch resolves, or when the last fetch begins.
   * @private
   * @type {boolean}
   */

  /**
   * Array of dependencies for the FluxCache; if any of the dependencies becomes stale, then this cache also becomes stale.
   * @private
   * @type {Array<FluxCache | FluxState>}
   */
  //#endregion
  //#region Constructor

  /**
   * @constructor
   * @param {function} fetchFn The function to call to fetch the data represented by this
   * cache
   */
  function FluxCache(fetchFn) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        staleAfter = _ref.staleAfter,
        autoRefreshWhenStale = _ref.autoRefreshWhenStale,
        dependencies = _ref.dependencies,
        fetchOnInit = _ref.fetchOnInit,
        startStaleTimerOnLastFetchResolve = _ref.startStaleTimerOnLastFetchResolve;

    _classCallCheck(this, FluxCache);

    _classPrivateMethodInitSpec(this, _cancelStaleTimer);

    _classPrivateMethodInitSpec(this, _startStaleTimer);

    _classPrivateMethodInitSpec(this, _handleStaleTimerStart);

    _classPrivateMethodInitSpec(this, _getCopyOfDataFromCache);

    _classPrivateMethodInitSpec(this, _performExternalFetch);

    _classPrivateFieldInitSpec(this, _data, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _fetchFn, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _loadingPromise, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _currentLoadingPromiseResolved, {
      writable: true,
      value: true
    });

    _classPrivateFieldInitSpec(this, _stale, {
      writable: true,
      value: true
    });

    _classPrivateFieldInitSpec(this, _staleTimeoutID, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _staleAfterTime, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _startStaleTimerOnLastFetchResolve, {
      writable: true,
      value: false
    });

    _classPrivateFieldInitSpec(this, _dependencies, {
      writable: true,
      value: []
    });

    // Force the fetching function to be asynchronous for consistency
    _classPrivateFieldSet(this, _fetchFn, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetchFn();

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _classPrivateFieldSet(this, _staleAfterTime, staleAfter || null);

    _classPrivateFieldSet(this, _startStaleTimerOnLastFetchResolve, startStaleTimerOnLastFetchResolve);

    _classPrivateFieldSet(this, _dependencies, dependencies);

    if (fetchOnInit) {
      this.fetch();
    }
  } //#endregion
  //#region Public Functions

  /**
   * Gets the data for the `FluxCache`. If the data in the cache is not marked as stale, the data from the cache will be used.
   * Otherwise, the data will be fetched with the `fetchFn` from the constructor, stored in the cache, and returned.
   * @public
   *
   * @example
   * async () => {
   *      // Create the friends FluxCache
   *      const friendsCache = new FluxCache(
   *          () => {
   *              return [
   *                  { name: 'John' },
   *                  { name: 'Roni' },
   *              ];
   *          }
   *      );
   *
   *      // Get the friends data from the friends FluxCache (will call the fetch function, since it hasn't been fetched yet
   *      // and is thus currently stale)
   *      let friends = await friendsCache.get();
   *
   *      // Get the friends data from the friends FluxCache (will use local cache, since it has been fetched in the line above,
   *      // and it has not been marked as stale yet)
   *      friends = await friendsCache.get();
   * }
   *
   * @returns {Promise<*>} Resolves with the data from either the cache if it wasn't stale, or from the result of the fetching function,
   * if the cache was stale
   */


  _createClass(FluxCache, [{
    key: "get",
    value: function get() {
      // If the data is not marked as stale, use whatever is in the cache
      if (!_classPrivateFieldGet(this, _stale)) {
        return _classPrivateMethodGet(this, _getCopyOfDataFromCache, _getCopyOfDataFromCache2).call(this);
      } // If there is an active loading promise waiting to be resolved, just wait for it to resolve and return the result


      if (!_classPrivateFieldGet(this, _currentLoadingPromiseResolved)) {
        return _classPrivateFieldGet(this, _loadingPromise);
      } // Otherwise, perform an external fetching operation and return the result


      return _classPrivateMethodGet(this, _performExternalFetch, _performExternalFetch2).call(this);
    }
    /**
     * Sets the stale state manually. If the stale state would transition from !stale -> stale and a stale timer callback was active,
     * then the stale timer callback will be canceled to prevent errors. If the stale state would transition from stale -> !stale
     * and cache has been configured to automatically be marked as stale after a set amount of time, then a new stale timer callback
     * will start running.
     * @public
     *
     * @example
     * async () => {
     *      // Create the friends FluxCache
     *      const friendsCache = new FluxCache(
     *          () => {
     *              return [
     *                  { name: 'John' },
     *                  { name: 'Roni' },
     *              ];
     *          }
     *      );
     *
     *      // Manually set the friends cache to not be stale
     *      friendsCache.setStale(false);
     *
     *      // Manually set the friends cache to be stale
     *      friendsCache.setStale(true);
     * }
     *
     * @param {boolean} isStale Flag indicating whether the cache should be marked as stale or not
     */

  }, {
    key: "setStale",
    value: function setStale(isStale) {
      // If transitioning from !stale -> stale
      if (!_classPrivateFieldGet(this, _stale) && isStale) {
        // If there is an active stale timer, cancel it
        if (_classPrivateFieldGet(this, _staleTimeoutID)) {
          _classPrivateMethodGet(this, _cancelStaleTimer, _cancelStaleTimer2).call(this);
        }
      } // If transitioning from stale -> !stale


      if (_classPrivateFieldGet(this, _stale) && !isStale) {
        // If the `staleAfterTime` value is set, start the stale timer
        if (_classPrivateFieldGet(this, _staleAfterTime)) {
          _classPrivateMethodGet(this, _startStaleTimer, _startStaleTimer2).call(this);
        }
      } // Set the stale state


      _classPrivateFieldSet(this, _stale, isStale);
    }
    /**
     * Gets the flag indicating whether the cache is stale or not.
     * @public
     *
     * @example
     * async () => {
     *      // Create the friends FluxCache
     *      const friendsCache = new FluxCache(
     *          () => {
     *              return [
     *                  { name: 'John' },
     *                  { name: 'Roni' },
     *              ];
     *          }
     *      );
     *
     *      // Determine whether the cache is stale
     *      let isStale = friendsCache.getStale(); // true, since no data has been fetched yet
     *
     *      // Fetch the data
     *      let friends = await friendsCache.get();
     *
     *      // Determine whether the cache is stale
     *      isStale = friendsCache.getStale(); // false, since the data has been fetched and there is no stale timer set
     * }
     *
     * @returns {boolean} The flag indicating whether the cache is stale or not
     */

  }, {
    key: "getStale",
    value: function getStale() {
      return _classPrivateFieldGet(this, _stale);
    } //#endregion
    //#region Private Functions

    /**
     * Performs an external fetching operation using the `fetchFn` from the constructor.
     * @private
     *
     * @returns {Promise<*>} Resolves with the result from the `fetchFn` call
     */
    //#endregion

  }]);

  return FluxCache;
}(); //#endregion
//#region


exports.FluxCache = FluxCache;

function _performExternalFetch2() {
  var _this = this;

  // If a stale timer exists, cancel it
  if (_classPrivateFieldGet(this, _staleTimeoutID)) {
    _classPrivateMethodGet(this, _cancelStaleTimer, _cancelStaleTimer2).call(this);
  } // Start the fetch and store the promise in the private loading promise tracker


  _classPrivateFieldSet(this, _loadingPromise, _classPrivateFieldGet(this, _fetchFn).call(this));

  _classPrivateFieldSet(this, _currentLoadingPromiseResolved, false); // When the fetching operation resolves, store the result in the cache


  _classPrivateFieldGet(this, _loadingPromise).then(function (result) {
    _classPrivateFieldSet(_this, _data, result);

    _classPrivateFieldSet(_this, _currentLoadingPromiseResolved, true);

    _classPrivateFieldSet(_this, _stale, false);
  }); // Start the stale timer if/when appropriate


  _classPrivateMethodGet(this, _handleStaleTimerStart, _handleStaleTimerStart2).call(this, _classPrivateFieldGet(this, _loadingPromise)); // Return the loading promise


  return _classPrivateFieldGet(this, _loadingPromise);
}

function _getCopyOfDataFromCache2() {
  return (0, _cloneDeep["default"])(_classPrivateFieldGet(this, _data));
}

function _handleStaleTimerStart2(loadingPromise) {
  // If the staleAfterTime value is not defined, don't do anything
  if (!_classPrivateFieldGet(this, _staleAfterTime)) return; // If the `startStaleTimerOnLastFetchResolve` flag is set to true, then start the timer after the loading promise resolves

  if (_classPrivateFieldGet(this, _startStaleTimerOnLastFetchResolve)) {
    loadingPromise.then(_classPrivateMethodGet(this, _startStaleTimer, _startStaleTimer2));
    return;
  } // Otherwise, start the timer immediately


  _classPrivateMethodGet(this, _startStaleTimer, _startStaleTimer2).call(this);
}

function _startStaleTimer2() {
  var _this2 = this;

  if (!_classPrivateFieldGet(this, _staleAfterTime)) {
    throw {
      message: "Tried to start a stale timer, but the `staleAfterTime` value was set to ".concat(_classPrivateFieldGet(this, _staleAfterTime), "."),
      code: 'INVALID_STALE_AFTER_TIME_VALUE_DURING_START'
    };
  }

  if (_classPrivateFieldGet(this, _staleTimeoutID)) {
    throw {
      message: "Tried to start a stale timer, but a stale timeout function already exists.",
      code: 'TRIED_TO_CREATE_DUPLICATE_STALE_TIMER'
    };
  }

  _classPrivateFieldSet(this, _staleTimeoutID, setTimeout(function () {
    return _this2.setStale(true);
  }, _classPrivateFieldGet(this, _staleAfterTime)));
}

function _cancelStaleTimer2() {
  if (!_classPrivateFieldGet(this, _staleTimeoutID)) {
    throw {
      message: "Tried to cancel a stale timer, but no stale timeout function exists.",
      code: 'TRIED_TO_CANCEL_NON_EXISTENT_STALE_TIMER'
    };
  }

  clearTimeout(_classPrivateFieldGet(this, _staleTimeoutID));

  _classPrivateFieldSet(this, _staleTimeoutID, null);
} //#endregion