class TestDataFactory {
    constructor(templates) {
        this.templates = templates;
    }

    static cloneDeep(data) {
        if (!data) return data;

        if (Array.isArray(data)) {
            const newData = new Array(data.length);
            for (let i = 0; i < data.length; i++) {
                newData[i] = TestDataFactory.cloneDeep(data[i]);
            }

            return newData;
        }

        if (typeof data == 'object') {
            const newData = {};
            for (let i = 0; i < data.length; i++) {
                newData[i] = TestDataFactory.cloneDeep(data[i]);
            }

            return newData;
        }

        return data;
    }
}

export default TestDataFactory;