import {Dispatcher} from "flux";
import _ from "lodash";

class AppDispatcher extends Dispatcher {

    // TODO still not certain about name... maybe
    //      bindServiceAction?
    //      bindAsyncAction?
    //      createAsyncAction?
    createServiceAction (promise, successActionType, failureActionType) {
        
        promise
        .then((serviceResponse) => {
            if (_.isFunction(successActionType)) {
                successActionType(serviceResponse);
            } else {
                this.dispatch({
                    actionType: successActionType,
                    payload: serviceResponse
                });
            }
        })
        .catch((serviceResponse) => {
            this.dispatch({
                actionType: failureActionType,
                payload: serviceResponse
            });
        });

    }

}

let dispatcher = new AppDispatcher();

dispatcher.register(function (action) {
    console.log("ACTION => ", action.actionType, action.payload);
});

export default dispatcher;