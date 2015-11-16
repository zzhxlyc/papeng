$(function(){
	var domain='http://121.40.70.168';
	var App={
		init:function(){

			this.bindEvents();
		},
		bindEvents:function(){
			var self=this;
			$('.check-field').on('click',function(){

				if($(this).hasClass('checked-field')){
					$(this).removeClass('checked-field');
				}else{
					$(this).addClass('checked-field');
				}
			})
			$('.J_Shop').on('keyup',function(){
				var name=$(this).val();
				self.renderSuggest(name);
			});
			$('body').on('click',function(){
				var dom=$('.J_Suggest');
				dom.hide();
			});

			$('.J_Reg').on('click',function(){
				var shop=$('.J_Shop').val();
				if(shop.length===0){
					alert('请填写门店代码');
					return;
				}
				self.checkPhone(function(){
					$('.J_Mask').show();
					$('.J_RegConfirm').show();
				});	
			})

			$('.J_Cancel').on('click',function(){
				$('.J_Mask').hide();
				$('.J_RegConfirm').hide();

			})
			$('.J_Submit').on('click',function(){

				$('#form')[0].submit();

			})

			$('.J_Suggest').delegate('.item','click',function(){
				var id=$(this).attr('cid');
				$('#company_id').val(id);
				$('.J_Shop').val($(this).text());
				$('.J_Suggest').hide();
				$('.J_ModalShop').text('【'+$(this).text()+'】');

			})

		},

		checkPhone:function(cb){
			var cell=$('.J_Phone').val();
			$.get(domain+'/api/base/check_agent',{cell:cell},function(data){
				if(data.status){
					if(cb) cb();
				}else{
					alert(data.message);
				}
			});


		},


		renderSuggest:function(name){
			$.get(domain+'/api/base/search_company',{name:name},function(data){
				var dom=$('.J_Suggest');
				var html=[];
				$.each(data.data.list,function(i,t){
					html.push('<div class="item" cid="'+t.id+'">'+t.name+'</div>');
				})
				dom.html(html.join(''));
				if(data.data.list.length>0){
					dom.show();
				}else{
					dom.hide();
				}
			})

		}




	}

	App.init();

	

});