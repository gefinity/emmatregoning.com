import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let BaseStore = Object.assign({}, EventEmitter.prototype, {

    get dispatchToken () {
        return this._dispatchToken;
    },

    emitChange () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    registerCallbacks (dispatcher, actionMap = {}) {
        
        this._dispatchToken = dispatcher.register((action) => {

            let actionHandler = actionMap[action.actionType];
            if (actionHandler) {
                actionHandler.call(this, action);
            }

        });

    }

});

export default BaseStore;