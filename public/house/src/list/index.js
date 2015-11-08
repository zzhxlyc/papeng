$(function(){
	var domain='http://121.40.70.168';

	var App={
		init:function(){
			this.renderZoneList();
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
			$('.J_Search').on('click',function(e){
				var name=$('.J_SearchKey').val();
				var order=$('.J_OrderSelect .cur').attr('order');
				self.renderHouseList({
					name:name
				});
			})
			$('.J_Area').on('click',function(e){
				$('.J_Mask').show();
				$('.J_AreaSelect').show();
			});
			$('.J_ZoneSelect').delegate('.item','click',function(){
				$('.J_ZoneSelect .item').removeClass('cur');
				$(this).addClass('cur');
				var zoneId=$(this).attr('zoneid');
				self.renderBlockList(zoneId);
				self.renderHouseList();
				if(!zoneId){
					self.hideAreaSelect();
				}
			});
			$('.J_BlockSelect').delegate('.item','click',function(){
				$('.J_BlockSelect .item').removeClass('cur');
				$(this).addClass('cur');
				var blockId=$(this).attr('blockid');
				self.hideAreaSelect();
				self.renderHouseList();


			});


			$('.J_OrderSelect .item').on('click',function(e){
				var order=$(this).attr('order');
				$('.J_OrderSelect .item').removeClass('cur');
				$(this).addClass('cur');
				self.renderHouseList();
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
		hideAreaSelect:function(){
			$('.J_Mask').hide();
			$('.J_AreaSelect').hide();


		},
		renderBlockList:function(zoneId){
			var block=$('.J_BlockSelect');
			var blockHtml=[];
			for(var i=0;i<this.blockList.length;i++){
				var t=this.blockList[i];
				if(t.zone_id==zoneId){
					blockHtml.push('<div class="item" blockid="'+t.id+'">'+t.name+'</div>');
				}
			}

			block.html(blockHtml.join(''));
			if(blockHtml.length>0){
				block.show();	
			}else{
				block.hide();
			}

		},
		renderZoneList:function(){
			var self=this;
			$.get(domain+'/api/base/base_data',{},function(data){
				var zone=$('.J_ZoneSelect');
				var zoneHtml=[];
				zoneHtml.push('<div class="item" zoneid="">不限</div>');
				$.each(data.data.zones,function(i,t){
					zoneHtml.push('<div class="item" zoneid="'+t.id+'">'+t.name+'</div>');

				})
				self.blockList=data.data.blocks;

				zone.html(zoneHtml.join(''));

			});


		},
		renderHouseList:function(){
			var param={};
			param.order=$('.J_OrderSelect .cur').attr('order');
			param.zone_id=$('.J_ZoneSelect .cur').attr('zoneid');
			param.block_id=$('.J_BlockSelect .cur').attr('blockid');

			$.get(domain+'/api/estate/list',param,function(data){
				var wrap=$('.J_Houselist');
				var html=[];
				$.each(data.data.list,function(i,t){
					html.push('<a href="#" class="item">');
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
					html.push('</div></a>');
        
				});
				wrap.html(html.join(''));
				
			})


		}





	}

	App.init();

	

});