const generateUniqueId = require('../../src/utils/generateUniqueId')
//documentação em jestjs.io
describe('Generate Unique ID',()=>{
    it('should generate an unique ID',()=>{
        const id = generateUniqueId();
        expect(id).toHaveLength(8);
    })
})