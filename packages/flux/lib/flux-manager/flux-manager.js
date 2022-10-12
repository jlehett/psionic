"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _activeFluxObjectsInfo = /*#__PURE__*/new WeakMap();

//#region Imports
//#endregion
//#region Classes

/**
 * Class representing the manager responsible for handling all of the Flux caches, states, engines, etc.
 *
 * @protected
 * @memberof module:@psionic/flux
 * @alias module:@psionic/flux.FluxManager
 */
var FluxManager = /*#__PURE__*/function () {
  function FluxManager() {
    _classCallCheck(this, FluxManager);

    _classPrivateFieldInitSpec(this, _activeFluxObjectsInfo, {
      writable: true,
      value: new Map()
    });
  }

  _createClass(FluxManager, [{
    key: "getOrCreateFluxObject",
    value: //#endregion
    //#region Public Functions

    /**
     * Retrieves the existing Flux object with a matching ID if it exists, or creates / adds the Flux object to the Manager
     * and returns it if an existing Flux object did not exist for that ID.
     * @public
     *
     * @param {FluxCache | FluxState | FluxEngine} fluxObj The Flux object to add if an existing Flux object with a matching
     * ID does not exist
     * @param {Array<FluxCache | FluxState | FluxEngine>} [config.dependsOn=[]] The array of Flux objects this cache depends on; if any of the
     * Flux objects' values change or become marked as stale, then this cache will also become marked as stale
     * @returns {FluxCache | FluxState | FluxEngine} The existing Flux object with the matching ID, if it exists; otherwise, returns
     * the Flux object that was added to the Flux Manager
     */
    function getOrCreateFluxObject(fluxObj) {
      var dependsOn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return this.getFluxObject(fluxObj.getID()) || this.addFluxObject(fluxObj, dependsOn);
    }
    /**
     * Adds the given Flux object to be managed by the Flux Manager.
     * @public
     *
     * @param {FluxCache | FluxState | FluxEngine} fluxObj The Flux object to add to the manager
     * @param {Array<FluxCache | FluxState | FluxEngine>} [config.dependsOn=[]] The array of Flux objects this cache depends on; if any of the
     * Flux objects' values change or become marked as stale, then this cache will also become marked as stale
     * @returns {FluxCache | FluxState | FluxEngine} The added Flux object
     */

  }, {
    key: "addFluxObject",
    value: function addFluxObject(fluxObj) {
      var dependsOn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      // If the key is already in the active flux objects info map, then do nothing
      if (_classPrivateFieldGet(this, _activeFluxObjectsInfo).has(fluxObj.getID())) return; // Otherwise, add the object to the active flux objects info map

      _classPrivateFieldGet(this, _activeFluxObjectsInfo).set(fluxObj.getID(), {
        fluxObj: fluxObj,
        dependedBy: []
      }); // Handle any `dependsOn` values by adding them to the appropriate `dependedBy` arrays in the active flux object info map


      var _iterator = _createForOfIteratorHelper(dependsOn || []),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var dependencyObj = _step.value;
          var dependencyID = dependencyObj.getID();

          var dependencyFluxObjectInfo = _classPrivateFieldGet(this, _activeFluxObjectsInfo).get(dependencyID); // If the dependency flux object is found, add the new flux object to its `dependedBy` array


          if (dependencyFluxObjectInfo) {
            dependencyFluxObjectInfo.dependedBy.push(fluxObj);
          }
        } // Return the Flux object back

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return fluxObj;
    }
    /**
     * Gets the existing Flux object for the given ID if one exists.
     * @public
     *
     * @param {string} id The ID of the existing Flux object to fetch
     * @returns {FluxCache | FluxState | FluxEngine} The existing Flux object for the given ID
     */

  }, {
    key: "getFluxObject",
    value: function getFluxObject(fluxObjID) {
      var _classPrivateFieldGet2;

      return (_classPrivateFieldGet2 = _classPrivateFieldGet(this, _activeFluxObjectsInfo).get(fluxObjID)) === null || _classPrivateFieldGet2 === void 0 ? void 0 : _classPrivateFieldGet2.fluxObj;
    } //#endregion
    //#region Protected Functions

    /**
     * Marks all Flux objects that depend on the given Flux object as stale.
     * @protected
     */

  }, {
    key: "markAllObjectsRelyingOnObjAsStale",
    value: function markAllObjectsRelyingOnObjAsStale(fluxObjID) {
      // Get the active flux object from the manager
      var activeFluxObjectInfo = _classPrivateFieldGet(this, _activeFluxObjectsInfo).get(fluxObjID); // If the active flux object does not exist, do not do anything


      if (!activeFluxObjectInfo) return; // Iterate through all of the dependencies, marking them as stale

      var _iterator2 = _createForOfIteratorHelper(activeFluxObjectInfo.dependedBy),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var dependency = _step2.value;
          dependency.setStale(true);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    /**
     * Nukes the Flux Manager's data. Useful for testing... not much else.
     * @protected
     */

  }, {
    key: "_UNSAFE_nuke",
    value: function _UNSAFE_nuke() {
      _classPrivateFieldSet(this, _activeFluxObjectsInfo, new Map());
    } //#endregion
    //#region Private Functions
    //#endregion

  }]);

  return FluxManager;
}(); //#endregion
//#region Exports


var fluxManagerSingleton = new FluxManager();
module.exports = {
  FluxManager: fluxManagerSingleton,
  _UNSAFE_nukeFluxManager: function _UNSAFE_nukeFluxManager() {
    return fluxManagerSingleton._UNSAFE_nuke();
  }
}; //#endregion