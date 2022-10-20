# @psionic/flux

## 0.0.4

<i>Oct 19, 2022</i>

* 📨 Add additional emit events to track when the `FluxCache` transitions to "loading". This is to support the upcoming `@psionic/flux-react` package.
* 🛠️ Fix issue that could occur when calling multiple `FluxCache.get` operations at once before waiting for the previous `FluxCache.get` operation to resolve.

## 0.0.3

<i>Oct 19, 2022</i>

* 🔄 Add `getIsLoading` function to `FluxCache` class in order to fetch a flag indicating whether the cache is actively loading data or not. This is to support the upcoming `@psionic/flux-react` package.

## 0.0.2

<i>Oct 19, 2022</i>

* 📨 Emit events whenever a `FluxState` or `FluxCache` updates to support the upcoming `@psionic/flux-react` package.

## 0.0.1

<i>Oct 12, 2022</i>

* 🥳 First publish of `@psionic/flux`.
* 📝 Introduction of `FluxState` Flux objects for tracking values that other Flux objects can depend on.
* 📚 Introduction of `FluxCache` Flux objects for tracking and caching asynchronous data, with automated pipelines for determining when cached data has become stale.