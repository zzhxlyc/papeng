define("alicareActivity/alipay/index",["node","base","event-dom"],function(i,n,t){{var e=i("node"),a=i("base");i("event-dom")}t.exports=a.extend({initializer:function(){this.initUI(),this.bindEvents()},initUI:function(){},bindEvents:function(){e("#J_OpenRule").on("click",function(){e("#J_Mask").show(),e("#J_Rule").show().css({top:e(window).height()/2-e("#J_Rule").height()/2})}),e("#J_Mask").on("click",function(){e("#J_Mask").hide(),e("#J_Rule").hide()}),e(".top-btn").on("click",function(){window.scrollTo(0,0)}),e(".share-btn").on("click",function(){var i={title:"憨豆",text:"～憨豆～哈哈哈哈～",image:"http://img0.bdstatic.com/img/image/4359213b07eca806538f43aff0495dda144ac3482d1.jpg",url:"http://img0.bdstatic.com/img/image/4359213b07eca806538f43aff0495dda144ac3482d1.jpg"};window.WindVane.call("TBSharedModule","showSharedMenu",i,function(i){alert("success: "+JSON.stringify(i))},function(i){alert("failure: "+JSON.stringify(i))})})}})});