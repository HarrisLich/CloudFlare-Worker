import associationFile from "../apple-developer-merchantid-domain-association.txt";

const ASSOCIATION_PATH =
  "/.well-known/apple-developer-merchantid-domain-association.txt";

const RESPONSE_HEADERS: HeadersInit = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "public, max-age=3600",
};

export default {
  fetch(request: Request): Response {
    const { pathname } = new URL(request.url);

    if (pathname === ASSOCIATION_PATH) {
      return new Response(associationFile, {
        status: 200,
        headers: RESPONSE_HEADERS,
      });
    }

    return new Response("Not Found", { status: 404 });
  },
};
