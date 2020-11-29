
class UtilsTest {
    public getMock(skeleton, value) {
        let data = {};
    
        for (var key in mock) {
            const helper = key === skeleton ? value : mock[key];
            data = { ...data,  [key]: helper};
        }
    
        return data;
    }
}

export default new UtilsTest();
