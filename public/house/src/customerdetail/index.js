$(function(){
	var domain='http://121.40.70.168';

	var App={
		init:function(){
			this.getCustomerList();
			this.bindEvents();
		},
		bindEvents:function(){
			var self=this;
			$('.J_List').delegate('.item','click',function(){
				if($(this).hasClass('checked')){
					$(this).removeClass('checked');
				}else{
					$(this).addClass('checked');
				}

			

			});

			


		},
		
		getCustomerList:function(){
			var dom=$('.J_List');
			var html=[];
			$.post(domain+'/agent/customers',{},function(data){


			});



		}





	}

	App.init();

	

});