import "@testing-library/jest-dom";

// framer-motion's useInView relies on IntersectionObserver — stub it for jsdom
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverStub,
});
