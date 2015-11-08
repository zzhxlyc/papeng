$(function(){
	var App={
		init:function(){
			this.renderHouseList();
			this.bindEvents();
		},
		bindEvents:function(){
			var self=this;
			$('.J_Order').on('click',function(e){
				$('.J_Mask').show();
				$('.J_OrderSelect').show();
				e.stopPropagation();
			})
			$('.J_OrderSelect .item').on('click',function(e){
				var order=$(this).attr('order');
				$('.J_OrderSelect .item').removeClass('cur');
				$(this).addClass('cur');
				self.renderHouseList({
					order:order
				});
				self.hideOrderSelect();
			})
			$('.J_Mask').on('click',function(){
				self.hideOrderSelect();
			})



		},
		hideOrderSelect:function(){
			$('.J_Mask').hide();
			$('.J_OrderSelect').hide();


		},
		renderHouseList:function(param){
			var domain='http://121.40.70.168';
			$.get(domain+'/api/estate/list',param,function(data){
				var wrap=$('.J_Houselist');
				var html=[];
				$.each(data.data.list,function(i,t){
					html.push('<div class="item">');
					html.push('<div class="top">');
					html.push('<img src="/uploads/'+t.image.path+'" class="preview" alt="">');
					html.push('<div class="info">');
					html.push('<h3>'+t.name+'<i class="icon-new"></i></h3>');
					html.push('<div class="info-item clearfix">');
					html.push('<span class="left"><label>佣金</label><strong>'+t.yongjin_info+'</strong></span>');
					html.push('<span class="right"><label>界定</label><span>'+(t.jieding_time=='0'?'实时':t.jieding_time+'分钟')+'</span></span>');
					html.push('</div>');
					html.push('<div class="info-item clearfix">');
					html.push('<span class="left"><i class="icon-increase"></i></span>');
					html.push('<span class="right"><label>结佣</label><span class="orange">'+t.jieyong_time+'工作日</span></span>');
					html.push('</div></div></div>');
					html.push('<div class="bottom">');
					html.push('<table><tr>');
					html.push('<td><i class="'+(t.if_daikan?'icon-checked':'icon-check')+'"></i>需带看</td>');
					html.push('<td><i class="icon-checked"></i>须2天内带看</td>');
					html.push('<td><i class="icon-checked"></i>代扣奖</td>');
					html.push('<td><i class="icon-checked"></i>认筹奖</td>');
					html.push('</tr></table>');
					html.push('<p>有效期：'+t.start_at+' 至 '+t.end_at+'</p>');
					html.push('</div></div>');
        
				});
				wrap.html(html.join(''));
				
			})


		}





	}

	App.init();

	

});