$(function(){
	var App={
		init:function(){

			this.bindEvents();
		},
		bindEvents:function(){
			$('.check-field').on('click',function(){

				if($(this).hasClass('checked-field')){
					$(this).removeClass('checked-field');
				}else{
					$(this).addClass('checked-field');
				}
			})

			$('.J_Reg').on('click',function(){
				$('.J_Mask').show();
				$('.J_RegConfirm').show();

			})

			$('.J_Cancel').on('click',function(){
				$('.J_Mask').hide();
				$('.J_RegConfirm').hide();

			})

			$('.J_Submit').on('click',function(){


			})

		}




	}

	App.init();

	

});