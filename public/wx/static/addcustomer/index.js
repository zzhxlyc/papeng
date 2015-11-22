$(function(){
	var domain='http://121.40.70.168';

	var App={
		init:function(){

			this.bindEvents();
		},
		bindEvents:function(){
			var self=this;
			$('.J_Save').on('click',function(e){
				var name=$('.J_Name').val();
				var contact=$('.J_Contact').val();
				var note=$('.J_Note').val();
				var sex=$('.J_Sex .checked').attr('sex');
				if($(this).hasClass('disabled')){
					return;
				}
				if($.trim(name).length===0){
					alert('请填写客户姓名');
					return;
				}
				if($.trim(contact).length===0){
					alert('请填写客户手机');
					return;
				}
				self.addCustomer({
					name:name,
					sex:sex,
					contact:contact,
					note:note
				});

			});

			$('.J_Back').on('click',function(){
				history.back();
			})

			$('.check-field .item').on('click',function(){
				$('.check-field .item').removeClass('checked');
				$(this).addClass('checked');

			});
			


		},
		
		addCustomer:function(param){

			$.post(domain+'/agent/add_customer',param,function(data){
				if(data.status){
					Utils.tip('添加成功');
					$('.J_Save').addClass('disabled');
					//history.back();
				}else{
					Utils.tip('添加失败，请稍后再试');
				}

			});



		}





	}

	App.init();

	

});