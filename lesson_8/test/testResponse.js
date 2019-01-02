const sinon = require("sinon");
const testSubject = require("../src/controller.js");

describe("controller", () => {
  it("Test de response", () => {
    let res = {
      send: () => {}
    }

    const mock = sinon.mock(res);

    mock.expects("send").atMost(1).withExactArgs("Ejemplo");

    testSubject.response(res);

    mock.verify();
  });
});
