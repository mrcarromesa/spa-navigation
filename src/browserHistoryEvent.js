(function () {
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  function fireStateChangeEvent() {
    const event = new Event("statechange");
    window.dispatchEvent(event);
  }

  history.pushState = function (...args) {
    originalPushState.apply(this, args);
    fireStateChangeEvent();
  };

  history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    fireStateChangeEvent();
  };

  window.addEventListener("popstate", fireStateChangeEvent);
})();