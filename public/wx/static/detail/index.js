$(function(){
	var domain='';

	var App={
		init:function(){
			var id=location.search.substring(location.search.indexOf('id=')+3);
			this.id=id;
			this.name='';
			this.renderHouseDetail(id);
			this.bindEvents();
		},
		bindEvents:function(){
			var self=this;
			$('.J_Order').on('click',function(e){
				$('.J_Mask').show();
				$('.J_OrderSelect').show();
				e.stopPropagation();
			});


		},
		
		renderHouseDetail:function(id){

			var dom=$('#house-detail');
			var tpl=_.template($("#detail-tpl").html());
			Utils.showLoading();

			$.get(domain+'/api/estate/show',{id:id},function(data){
				Utils.hideLoading();
				data.data.estate.agent=data.data.agent;
				dom.html(tpl(data.data.estate));

			})


		}





	}

	App.init();

	

});