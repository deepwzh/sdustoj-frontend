import { getAPIUrl } from "../../src/utils/config";
describe('Enzyme Shallow', function () {
    it('App\'s title should be Todos', function () {
      let url  = getAPIUrl("login");
      expect(url).to.equal('http://www.92ac.cn:8008/login');
    });
});