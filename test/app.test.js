const request = require("supertest");
const { app } = require("../src/app");

describe("GET /", () => {
  it("responds with hello world", (done) => {
    console.log("app", app);
    request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect({ message: "Hello World!" })
      .expect(200, done);
  });
});
