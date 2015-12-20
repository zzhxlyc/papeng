$(function(){
	var domain='';

	var App={
		init:function(){
			this.page=1;
			this.city_id='';
			this.cityList=null;
			this.zone_id='';
			this.block_id='';
			this.renderProvinceList();
			this.renderZoneList();
			this.renderHouseList();
			this.bindEvents();
		},
		bindEvents:function(){
			var self=this;
			$('.J_MoreList').on('click',function(){
				self.page+=1;
				self.renderHouseList({
					page:self.page
				});
			})

			$('.J_Order').on('click',function(e){
				if($(this).hasClass('toggle')){
					$(this).removeClass('toggle')
					$('.J_Mask').hide();
					$('.J_OrderSelect').hide();
				}else{
					$(this).addClass('toggle')
					$('.J_Mask').show();
					$('.J_OrderSelect').show();
				}
				e.stopPropagation();
			})
			$('.J_Search').on('click',function(e){
				var name=$('.J_SearchKey').val();
				var order=$('.J_OrderSelect .cur').attr('order');

				self.renderHouseList({
					name:name
				});
			})
			$('.J_Area').on('click',function(e){
				self.hideCitySelect();
				if($(this).hasClass('toggle')){
					$(this).removeClass('toggle')
					$('.J_Mask').hide();
					$('.J_AreaSelect').hide();
				}else{
					$(this).addClass('toggle')
					$('.J_Mask').show();
					$('.J_AreaSelect').show();
				}
				
			});
			$('.J_City').on('click',function(e){
				self.hideAreaSelect();
				if($(this).hasClass('toggle')){
					$(this).removeClass('toggle')
					$('.J_Mask').hide();
					$('.J_CitySelect').hide();
				}else{
					$(this).addClass('toggle')
					$('.J_Mask').show();
					$('.J_CitySelect').show();
				}
				
			});
			$('.J_ProvinceSelect').delegate('.item','click',function(){
				$('.J_ProvinceSelect .item').removeClass('cur');
				$(this).addClass('cur');
				var cityData=$(this).find('textarea').val();
				self.renderCityList(cityData);
			});

			$('.J_CityList').delegate('.item','click',function(){
				$('.J_CityList .item').removeClass('cur');
				$(this).addClass('cur');
				var cid=$(this).attr('cid');
				self.city_id=cid;
				self.zone_id='';
				self.block_id='';
				self.hideCitySelect();
				self.renderZoneList();
				$('.J_City').removeClass('toggle').text($(this).text());
				self.renderHouseList();

			});


			$('.J_ZoneSelect').delegate('.item','click',function(){
				$('.J_ZoneSelect .item').removeClass('cur');
				$(this).addClass('cur');
				var zoneId=$(this).attr('zoneid');
				var blocklist=$(this).find('textarea').val();
				self.zone_id=zoneId;
				if($(this).hasClass('noblock')){
					$('.J_BlockSelect').hide();
					self.hideAreaSelect();
					self.renderHouseList();
					$('.J_Area').removeClass('toggle');

				}else{
					self.renderBlockList(blocklist);
				}
			});
			$('.J_BlockSelect').delegate('.item','click',function(){
				$('.J_BlockSelect .item').removeClass('cur');
				$(this).addClass('cur');
				var blockId=$(this).attr('blockid');
				self.block_id=blockId;
				self.hideAreaSelect();
				self.renderHouseList();
				$('.J_Area').removeClass('toggle');

			});


			$('.J_OrderSelect .item').on('click',function(e){
				var order=$(this).attr('order');
				$('.J_OrderSelect .item').removeClass('cur');
				$(this).addClass('cur');
				self.renderHouseList();
				self.hideOrderSelect();
				$('.J_Order').removeClass('toggle');

			})
			$('.J_Mask').on('click',function(){
				self.hideOrderSelect();
				self.hideAreaSelect();
			});

			$(window).on('scroll', function () {
		        var scrollTop = $(this).scrollTop(),
		            scrollHeight = $(document).height(),
		            windowHeight = $(this).height();

		        if (scrollTop + windowHeight == scrollHeight) {

		        }
		    });



		},
		hideOrderSelect:function(){
			$('.J_Mask').hide();
			$('.J_OrderSelect').hide();


		},
		hideAreaSelect:function(){
			$('.J_Area').removeClass('toggle');
			$('.J_Mask').hide();
			$('.J_AreaSelect').hide();


		},
		hideCitySelect:function(){
			$('.J_City').removeClass('toggle');
			$('.J_Mask').hide();
			$('.J_CitySelect').hide();


		},
		renderBlockList:function(data){
			var block=$('.J_BlockSelect');
			var blockHtml=[];
			var blockList=JSON.parse(data);
			for(var i=0;i<blockList.length;i++){
				var t=blockList[i];
				blockHtml.push('<div class="item" blockid="'+t.id+'">'+t.name+'</div>');
			}

			block.html(blockHtml.join(''));
			if(blockList.length>0){
				block.show();	
			}else{
				block.hide();
			}

		},
		renderProvinceList:function(){
			var self=this;
			$.get(domain+'/api/base/province_city',{},function(data){
				var province=$('.J_ProvinceSelect');
				var html=[];
				$.each(data.data.list,function(i,t){
					html.push('<div class="item" pid="'+t.id+'">'+t.name+'<textarea style="display:none;">'+JSON.stringify(t.cities)+'</textarea></div>');
				})
				province.html(html.join(''));

			});


		},
		renderCityList:function(data){
			var self=this;
			var list=JSON.parse(data);
			var city=$('.J_CityList');
			var html=[];
			$.each(list,function(i,t){
				html.push('<div class="item" cid="'+t.id+'">'+t.name+'</div>');
			})
			city.html(html.join('')).show();

		},
		renderZoneList:function(){
			var self=this;
			var param={};
			if(self.city_id){
				param.city_id=self.city_id;
			}
			$.get(domain+'/api/base/zone_block',param,function(data){
				var zone=$('.J_ZoneSelect');
				var zoneHtml=[];
				$.each(data.data.list,function(i,t){
					zoneHtml.push('<div class="item '+(t.blocks?'':'noblock')+'" zoneid="'+t.id+'">'+t.name+'<textarea style="display:none;">'+(t.blocks?JSON.stringify(t.blocks):'[]')+'</textarea></div>');

				})
				zone.html(zoneHtml.join(''));

			});


		},
		renderHouseList:function(param){
			var self=this;
			var param=param||{};
			param.page=param.page||1;
			param.order=$('.J_OrderSelect .cur').attr('order');
			if(self.zone_id){
				param.zone_id=self.zone_id;

			}

			if(self.block_id){
				param.block_id=self.block_id;

			}
			if(self.city_id){
				param.city_id=self.city_id;

			}
			
			
			Utils.showLoading();
			$.get(domain+'/api/estate/list',param,function(data){
				var wrap=$('.J_Houselist');
				var html=[];
				Utils.hideLoading();
				var list=data.data.list;
				
				$.each(data.data.list,function(i,t){
					html.push('<a href="/wx/estate/detail?id='+t.id+'" class="item">');
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
					if(t.start_at&&t.end_at){
						html.push('<p>有效期：'+t.start_at+' 至 '+t.end_at+'</p>');
					}
					html.push('</div></a>');
        
				});
				
				if(param.page===1){
					if(list.length===0){
						wrap.html('<div class="no-more">没有对应楼盘</div>');
					}else{
						wrap.html(html.join(''));

					}
					
				}else{
					if(list.length===0){
						wrap.append('<div class="no-more">没有更多了</div>');
						$('.J_MoreList').hide();
					}else{
						wrap.append(html.join(''));

					}
					
				}
				if(list.length<10){
					$('.J_MoreList').hide();
				}
				
				
			})


		}





	}

	App.init();

	

});