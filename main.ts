const PATHNAME = "/text/";
const SEARCH_PARAM = "input";

Deno.serve((req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const isQuery = searchParams.has(SEARCH_PARAM);
  const query = searchParams.get(SEARCH_PARAM);

  return url.pathname !== PATHNAME
    ? new Response(
        `<html>
            <body>
              <form>
                <input type="text" id="input" name="input" />
                <input type="submit" value="Submit" />
              </form>
              <p>
              ${url.origin}${PATHNAME}?${SEARCH_PARAM}=${isQuery ? query : ""}
              </p>
            </body>
          </html>
          `,
        {
          status: 200,
          headers: {
            "content-type": "text/html",
          },
        }
      )
    : new Response(query);
});
