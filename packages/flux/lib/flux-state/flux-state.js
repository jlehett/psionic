"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FluxState = void 0;

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var _changeListenerCallbacksByID = /*#__PURE__*/new WeakMap();

var _getClonedCopyOfLocalData = /*#__PURE__*/new WeakSet();

//#endregion
//#region Classes

/**
 * Class representing a state whose value can be set, read, and used as a dependency within the Flux framework.
 *
 * @public
 * @memberof module:@psionic/flux
 * @alias module:@psionic/flux.FluxState
 */
var FluxState = /*#__PURE__*/function () {
  //#region Public Variables
  //#endregion
  //#region Private Variables

  /**
   * Variable tracking the data in state.
   * @private
   * @type {*}
   */

  /**
   * Variable tracking the change listener callbacks by ID.
   * @private
   * @type {Map<string, function>}
   */
  //#endregion
  //#region Constructor

  /**
   * @constructor
   * @param {*} initialValue The initial value to set as data; this will be recursively cloned so that any changes
   * to this value (if it is an object) will not affect the `FluxState` instance's value
   */
  function FluxState(initialValue) {
    _classCallCheck(this, FluxState);

    _classPrivateMethodInitSpec(this, _getClonedCopyOfLocalData);

    _classPrivateFieldInitSpec(this, _data, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _changeListenerCallbacksByID, {
      writable: true,
      value: new Map()
    });

    _classPrivateFieldSet(this, _data, (0, _cloneDeep["default"])(initialValue));
  } //#endregion
  //#region Public Functions

  /**
   * Sets the `FluxState` instance's new value.
   * @public
   *
   * @example
   * async () => {
   *      // Create the profile FluxState
   *      const profileState = new FluxState(null);
   *
   *      // Fetch the profile data
   *      const profile = await getProfileData();
   *
   *      // Set the profile FluxState's value
   *      profileState.set(profile);
   * }
   *
   * @param {*} value The new value to store in the `FluxState` instance
   */


  _createClass(FluxState, [{
    key: "set",
    value: function set(value) {
      _classPrivateFieldSet(this, _data, value);

      var _iterator = _createForOfIteratorHelper(_classPrivateFieldGet(this, _changeListenerCallbacksByID)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var callback = _step.value;
          callback();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    /**
     * Reads the `FluxState` instance's current value.
     * @public
     *
     * @example
     * async () => {
     *      // Create the profile FluxState
     *      const profileState = new FluxState({ name: 'John' });
     *
     *      // Read the profile FluxState's value
     *      return profileState.get(); // { name: 'John' }
     * }
     *
     * @returns {*} The recursively cloned copy of the `FluxState` instance's current value
     */

  }, {
    key: "get",
    value: function get() {
      return _classPrivateMethodGet(this, _getClonedCopyOfLocalData, _getClonedCopyOfLocalData2).call(this);
    } //#endregion
    //#region Protected Functions

    /**
     * Add a change listener function to the change listener callbacks by ID.
     * @protected
     *
     * @param {string} id The ID to use for the callback
     * @param {function} callback The function to call whenever changes occur to this `FluxState` instance's
     * data
     */

  }, {
    key: "_addChangeListener",
    value: function _addChangeListener(id, callback) {
      _classPrivateFieldGet(this, _changeListenerCallbacksByID).set(id, callback);
    }
    /**
     * Removes a change listener callback by ID.
     * @protected
     *
     * @param {string} id The ID of the change listener callback to remove
     */

  }, {
    key: "_removeChangeListener",
    value: function _removeChangeListener(id) {
      _classPrivateFieldGet(this, _changeListenerCallbacksByID)["delete"](id);
    } //#endregion
    //#region Private Functions

    /**
     * Returns a recursively cloned copy of the data currently stored in the `FluxState` instance.
     * @private
     *
     * @returns {*} The recursively cloned copy of the `FluxState` instance's current value
     */
    //#endregion

  }]);

  return FluxState;
}(); //#endregion
//#region Exports


exports.FluxState = FluxState;

function _getClonedCopyOfLocalData2() {
  return (0, _cloneDeep["default"])(_classPrivateFieldGet(this, _data));
} //#endregion