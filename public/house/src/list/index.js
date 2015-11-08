$(function(){
	var App={
		init:function(){

			this.bindEvents();
		},
		bindEvents:function(){
			$('.J_Order').on('click',function(e){
				$('.J_Mask').show();
				$('.J_OrderSelect').show();
				e.stopPropagation();
			})
			$('.J_Mask').on('click',function(){
				$('.J_Mask').hide();
				$('.J_OrderSelect').hide();
			})



		}





	}

	App.init();

	

});