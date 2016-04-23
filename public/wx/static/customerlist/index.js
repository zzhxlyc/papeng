$(function(){
	var domain='';

	var App={
		init:function(){
			this.selectedCustomer=0;
			this.key='';
			this.page=1;
			this.getCustomerList();
			this.bindEvents();
		},
		bindEvents:function(){
			var self=this;
			$('.J_List').delegate('.item','click',function(){
				$('.J_List .item').removeClass('checked');
				$(this).addClass('checked');
				self.selectedCustomer=$(this).attr('cid');

			

			});
			$('.J_MoreList').on('click',function(){
				self.page+=1;
				self.getCustomerList(self.key,self.page);
			})

			$('.J_Houselist').delegate('.item','click',function(){
				var dom=$(this);
				if(dom.hasClass('checked')){
					dom.removeClass('checked');
				}else{
					var hid=dom.attr('hid');

					self.checkBaobei(hid,function(data){
						if(data){
							if(confirm('在'+data.deal.created_at+'已有相同的订单，是否继续下单')){
								dom.addClass('checked');
								self.addBaobei(hid);
							}
						}else{
							if(confirm('确定对'+$('.J_Selected .name').text()+'推荐'+dom.find('h3').text()+'楼盘？')){
								dom.addClass('checked');
								self.addBaobei(hid);
							}
						}
						
					});
					
				}

			

			});


			$('.J_Recommend').on('click',function(){
				if($('.J_List .checked').length===0){
					alert('请选择客户');
					return;
				}
				$('.before').hide();
				self.renderHouseList();
				$('.J_Selected').html('<div class="item checked">'+$('.J_List .checked').html()+'</div>');
				$('.after').show();

			});
			$('.J_Back').on('click',function(){
				$('.before').show();
				$('.after').hide();

			});

			$('.J_Search').on('click',function(){
				self.key=$('.J_SearchKey').val();
				self.getCustomerList(self.key);

			});

			


		},
		checkBaobei:function (hid,cb) {
			var self=this;
			Utils.showLoading('正在提交');
			$.get(domain+'/agent/deal_baobei_check',{
				customer_id:self.selectedCustomer,
				estate_id:hid
			},function(data){

				Utils.hideLoading();
				if(data.status===1){
					if(cb) cb(data.data);

				}else{
					Utils.tip(data.message);
				}
				

			});

		},
		addBaobei:function (hid) {
			var self=this;
			Utils.showLoading('正在推荐');
			$.post(domain+'/agent/deal_baobei',{
				customer_id:self.selectedCustomer,
				estate_id:hid
			},function(data){

				Utils.hideLoading();
				if(data.status===1){
					Utils.tip('操作成功',function(){
						$('.J_Back').trigger('click');
					});

				}else{
					Utils.tip(data.message);
				}
				

			});

		},
		getCustomerList:function(key,page){
			var dom=$('.J_List');
			var html=[];
			var url='/agent/search_customer';
			var param={};
			page=page||1;
			Utils.showLoading();
			param.name=key;
			param.page=page;
			param.ts=new Date().getTime();
			$.get(domain+url,param,function(data){
				Utils.hideLoading();
				var list=data.data.list;

				$.each(list,function(i,t){
			
					html.push('<div class="item" cid="'+t.customer.id+'">');
					html.push('<i></i>');
					html.push('<span class="name">'+t.customer.name+'</span>');
					html.push('<span class="more">'+(t.customer.sex==='男'?'先生':'女士')+' '+t.customer.contact+'</span>');
					html.push('</div>')
				})
				if(page===1){
					if(list.length===0){
						dom.html('<div class="nodata">没有对应客户</div>');
					}else{
						dom.html(html.join(''));
					}
					
				}else{
					if(list.length===0){
						dom.append('<div class="no-more">没有更多了</div>');
						$('.J_MoreList').hide();
					}else{
						dom.append(html.join(''));

					}
					
				}
				if(list.length<10){
					$('.J_MoreList').hide();
				}
				

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
					html.push('<a href="javascript:;" hid="'+t.id+'" class="item">');
					html.push('<div class="top">');
					if(t.image&&t.image.path){
						html.push('<img src="'+t.image.path+'" class="preview" alt="">');
					}else{
						html.push('<img src="http://www.yupoo.com/img/spacer.gif" alt="" class="preview" />')
					}
					html.push('<div class="info">');
					html.push('<h3>'+t.name+'<i class="icon-new"></i><i class="radio"></i></h3>');
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