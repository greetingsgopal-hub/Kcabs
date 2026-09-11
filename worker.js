export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve the checkout page explicitly at both canonical paths.
    if (url.pathname === "/checkout" || url.pathname === "/checkout/") {
      return env.ASSETS.fetch(new Request(new URL("/checkout.html", url), request));
    }

    return env.ASSETS.fetch(request);
  }
};
