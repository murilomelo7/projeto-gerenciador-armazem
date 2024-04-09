import { test } from "tap";
// import supertest from "supertest";
import fastify from "../server";

test("GET / retorna hello world", async (t) => {
  const response = await app.inject({
    method: "GET",
    url: "/",
  });

  t.equal(response.statusCode, 200);
  t.same(JSON.parse(response.payload), { hello: "world" });
});
