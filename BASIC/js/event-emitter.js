class EventEmitter {

    constructor() {
        this.eventMap = new Map();
        this.data = null;
    }

    on(eventString, callback) {
        let array;
        if (this.eventMap.get(eventString)) {
            array = this.eventMap.get(eventString);
        } else {
            array = [];
        }
        array.push(callback);
        this.eventMap.set(eventString, array);
    }

    emit(eventString) {
        const array = this.eventMap.get(eventString);
        if (array) {
            array.forEach(callback => {
                callback(this.data);
            });
        }
    }

}