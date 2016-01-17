$(function(){

	var App={
		init:function(){
	
			this.bindEvents();


		},
		bindEvents:function(){
			$('.J_View').on('click',function(){
				$('.J_Qrcode').toggle();
			})


		}





	}

	App.init();

	

});