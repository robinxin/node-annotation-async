/**
 * Description
 * @Author:      wyw   <wyw.wang@qunar.com>
 * @Date:    2016-06-21 15:56:11
 */
/*@AutoLoad*/
var Future = require('fibers/future');
var Async = module.exports = require('node-annotation').Annotation.extend({
    /**
     *  the annotation affect
     * @return {[type]} [description]
     */
    execute: function() {
         var model = this.model,
            vo = model.vo(),
            instance = model.instance(),
            method = instance[vo].bind(instance);

        instance[vo] = function(){
            var argu = arguments,
                future = method.future(),
                futureInst = future.apply(future, argu);
            var promise = futureInst.promise();
            promise.await = function(){
                return futureInst.wait();
            }
            return promise;
        }
    },
    compile: function(model){
        //model.exports()
    }
}, {
    //annotation name
    name: "Async"
});
