$(function(){
	var domain='http://121.40.70.168';

	var App={
		init:function(){
			var id=location.search.substring(location.search.indexOf('id=')+3);
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
				dom.html(tpl(data.data.estate))

			})


		}





	}

	App.init();

	

});