"use strict";

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
     * @returns {FluxCache | FluxState | FluxEngine} The existing Flux object with the matching ID, if it exists; otherwise, returns
     * the Flux object that was added to the Flux Manager
     */
    function getOrCreateFluxObject(fluxObj) {
      return this.getFluxObject(fluxObj.getID()) || this.addFluxObject(fluxObj);
    }
    /**
     * Adds the given Flux object to be managed by the Flux Manager.
     * @public
     *
     * @param {FluxCache | FluxState | FluxEngine} fluxObj The Flux object to add to the manager
     * @returns {FluxCache | FluxState | FluxEngine} The added Flux object
     */

  }, {
    key: "addFluxObject",
    value: function addFluxObject(fluxObj) {
      // If the key is already in the active flux obejcts info map, then do nothing
      if (_classPrivateFieldGet(this, _activeFluxObjectsInfo).has(fluxObj.getID())) return; // Otherwise, add the object to the active flux objects info map

      _classPrivateFieldGet(this, _activeFluxObjectsInfo).set(fluxObj.getID(), {
        fluxObj: fluxObj,
        dependedBy: new Map()
      }); // Return the Flux object back


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