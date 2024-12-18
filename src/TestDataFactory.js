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
            for (let key in data) {
                if (Object.hasOwn(data, key)) {
                    newData[key] = TestDataFactory.cloneDeep(data[key]);
                }
            }

            return newData;
        }

        return data;
    }

    createFromTemplate(templateName) {
        if (!Object.hasOwn(this.templates, templateName)) {
            throw new Error(`I dont have template "${templateName}"`);
        }

        return this.constructor.cloneDeep(this.templates[templateName]);
    }

    createDefault() {
        return this.getFromTamplate('default');
    }
}

export default TestDataFactory;
