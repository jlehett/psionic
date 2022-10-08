"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fluxCache = require("./flux-cache/flux-cache");

Object.keys(_fluxCache).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _fluxCache[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _fluxCache[key];
    }
  });
});

var _fluxState = require("./flux-state/flux-state");

Object.keys(_fluxState).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _fluxState[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _fluxState[key];
    }
  });
});