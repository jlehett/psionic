"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FluxState = void 0;
exports.createFluxState = createFluxState;

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _fluxManager = require("../flux-manager/flux-manager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _id = /*#__PURE__*/new WeakMap();

var _data = /*#__PURE__*/new WeakMap();

//#endregion
//#region Protected Classes

/**
 * Class representing a state whose value can be set, read, and used as a dependency within the Flux framework.
 *
 * @protected
 * @memberof module:@psionic/flux
 * @alias module:@psionic/flux.FluxState
 */
var FluxState = /*#__PURE__*/function () {
  //#region Public Variables
  //#endregion
  //#region Private Variables

  /**
   * The ID of the Flux object.
   * @private
   * @type {string}
   */

  /**
   * The data to track in the Flux state.
   * @private
   * @type {*}
   */
  //#endregion
  //#region Constructor

  /**
   * @constructor
   * @param {Object} config The configuration object
   * @param {string} config.id The ID to use for the FluxState; should be unique among all other active Flux objects
   * @param {*} config.value The initial value to set as data; this will be recursively cloned so that any changes to
   * this value (if it is an object) will not affect the `FluxState` instance's value
   */
  function FluxState(_ref) {
    var id = _ref.id,
        value = _ref.value;

    _classCallCheck(this, FluxState);

    _classPrivateFieldInitSpec(this, _id, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _data, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _id, id);

    _classPrivateFieldSet(this, _data, (0, _cloneDeep["default"])(value));
  } //#endregion
  //#region Public Functions

  /**
   * Gets a deeply-cloned copy of the current data from the FluxState.
   * @public
   *
   * @example
   * // Create a FluxState object
   * const profileState = createFluxState({
   *      id: 'profileState',
   *      value: { name: 'John' },
   * });
   *
   * // Read the FluxState object's current value
   * const profile = profileState.get(); // { name: 'John' }
   *
   * @returns {*} A deeply-cloned copy of the current data from the FluxState.
   */


  _createClass(FluxState, [{
    key: "get",
    value: function get() {
      return (0, _cloneDeep["default"])(_classPrivateFieldGet(this, _data));
    }
    /**
     * Sets the new value for the FluxState.
     * @public
     *
     * @example
     * // Create a FluxState object
     * const profileState = createFluxState({
     *      id: 'profileState',
     *      value: null,
     * });
     *
     * // Set the FluxState object's new value
     * profileState.set({ name: 'John' });
     *
     * // The FluxState will now hold the new value
     * const profile = profileState.get(); // { name: 'John' }
     *
     * @param {*} newValue The new value to store in the FluxState
     */

  }, {
    key: "set",
    value: function set(newValue) {
      _classPrivateFieldSet(this, _data, newValue); // Ask the manager to mark all Flux objects depending on this object as stale


      _fluxManager.FluxManager.markAllObjectsRelyingOnObjAsStale(_classPrivateFieldGet(this, _id));
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
    } //#region
    //#region Private Functions
    //#endregion

  }]);

  return FluxState;
}(); //#endregion
//#region Public Functions

/**
 * Creates a new `FluxState` with the given ID. If the ID is already taken by another Flux object, that object will be returned instead of
 * a new Flux object being created.
 * @public
 * @memberof module:@psionic/flux
 * @alias module:@psionic/flux.createFluxState
 *
 * @example
 * // Create a new Flux State representing a user ID
 * const userIDState = createFluxState({
 *      id: 'userIDState',
 *      value: 'test-user',
 * });
 *
 * @example
 * // If you attempt to create another Flux object with the same ID, the existing Flux object with that ID will be returned instead of
 * // a new one being created:
 * const userIDState = createFluxState({
 *      id: 'userIDState',
 *      value: 'original',
 * });
 *
 * const newUserIDState = createFluxState({
 *      id: 'userIDState',
 *      value: 'new',
 * });
 *
 * await userIDState.get(); // 'original'
 * await newUserIDState.get(); // 'original' as well, because the `createFluxState` call simply returned the existing object with ID `userIDState`
 *
 * @param {Object} config The configuration object
 * @param {string} config.id The ID to use for the FluxState; should be unique among all other active Flux objects
 * @param {*} config.value The initial value to set as data; this will be recursively cloned so that any changes to
 * this value (if it is an object) will not affect the `FluxState` instance's value
 * @returns {FluxState | FluxCache} The created Flux object, or the old Flux object with the given ID
 */


exports.FluxState = FluxState;

function createFluxState(_ref2) {
  var id = _ref2.id,
      value = _ref2.value;
  return _fluxManager.FluxManager.getOrCreateFluxObject(new FluxState({
    id: id,
    value: value
  }));
} //#endregion
//#region Exports
//#endregion