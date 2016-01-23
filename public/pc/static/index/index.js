$(function(){

	var App={
		init:function(){
	
			this.bindEvents();


		},
		bindEvents:function(){
			$('.J_View').on('click',function(){
				$('.J_Qrcode').toggle();
			})

			$('.J_Search').on('click',function(){
				var key=$('.key').val();
				location='newhouse.html?name='+key
			});


		}





	}

	App.init();

	

});