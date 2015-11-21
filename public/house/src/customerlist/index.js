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

			$('.J_Recommend').on('click',function(){
				$('.before').hide();
				self.renderHouseList();
				$('.J_Selected').html('<div class="item checked">'+$('.J_List .checked').html()+'</div>');
				$('.after').show();

			});
			$('.J_Back').on('click',function(){
				$('.before').show();
				$('.after').hide();

			});

			


		},
		
		getCustomerList:function(){
			var dom=$('.J_List');
			var html=[];
			Utils.showLoading();

			$.get(domain+'/agent/customers',{},function(data){
				Utils.hideLoading();
				$.each(data.data.customers,function(i,t){
			
					html.push('<div class="item">');
					html.push('<i></i>');
					html.push('<span class="name">'+t.name+'</span>');
					html.push('<span class="more">'+(t.sex==='男'?'先生':'女士')+' '+t.contact+'</span>');
				})
				dom.html(html.join(''));

			});



		},
		renderHouseList:function(){
			var param=param||{};
			param.page=param.page||1;
			Utils.showLoading();
			$.get(domain+'/api/estate/list',param,function(data){
				var wrap=$('.J_Houselist');
				var html=[];
				Utils.hideLoading();
				if(data.data.list.length===0){
					if(param.page===1){
						wrap.html('<div class="nodata">没有对应楼盘</div>');
					}else{
						wrap.append('<div class="nodata">没有更多楼盘了</div>');

					}
					return;
				}
				$.each(data.data.list,function(i,t){
					html.push('<a href="/detail?id='+t.id+'" class="item">');
					html.push('<div class="top">');
					html.push('<img src="/uploads/'+t.image.path+'" class="preview" alt="">');
					html.push('<div class="info">');
					html.push('<h3>'+t.name+'<i class="icon-new"></i></h3>');
					html.push('<div class="info-item clearfix">');
					html.push('<span class="left"><label>佣金</label><strong>'+(t.yongjin_kind===1?t.yongjin_info.replace('/套',''):t.yongjin_info)+'</strong></span>');
					html.push('<span class="right"><label>界定</label><span>'+(t.jieding_time=='0'?'实时':t.jieding_time+'分钟')+'</span></span>');
					html.push('</div>');
					html.push('<div class="info-item clearfix">');
					html.push('<span class="left"><i class="icon-increase"></i></span>');
					html.push('<span class="right"><label>结佣</label><span class="orange">'+t.jieyong_time+'工作日</span></span>');
					html.push('</div></div></div>');
					html.push('<div class="bottom">');
					html.push('<table><tr>');
					html.push('<td><i class="'+(t.if_daikan?'icon-checked':'icon-check')+'"></i>需带看</td>');
					html.push('<td><i class="icon-checked"></i>须'+t.daikan_days+'天内带看</td>');
					html.push('<td><i class="'+(t.if_daikan_reward?'icon-checked':'icon-check')+'"></i>带看奖</td>');
					html.push('<td><i class="'+(t.if_renchou?'icon-checked':'icon-check')+'"></i>认筹奖</td>');
					html.push('</tr></table>');
					html.push('<p>有效期：'+t.start_at+' 至 '+t.end_at+'</p>');
					html.push('</div></a>');
        
				});
				if(param.page===1){
					wrap.html(html.join(''));
				}else{
					wrap.append(html.join(''));
				}	
				
				
			})


		}





	}

	App.init();

	

});