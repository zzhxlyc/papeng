$(function(){
	var domain='http://121.40.70.168';

	var App={
		init:function(){
			this.page=1;
			this.city_id='';
			this.zone_id='';
			this.order='';
			this.renderZoneList();
			var name=decodeURIComponent(Utils.getQueryString('name'));
			$('.J_SearchKey').val(name);
			$('.J_SearchedKey').val(name);
			this.renderHouseList();
			
			this.bindEvents();


		},
		bindEvents:function(){
			var self=this;
			$('.J_Search').on('click',function(e){
				var name=$('.J_SearchKey').val();
				$('.J_SearchedKey').val(name);
				self.renderHouseList({
					name:name
				});
			})
			$('.J_ZoneSelect').delegate('.item','click',function(){
				if($(this).hasClass('disabled')){
					return;
				}
				$('.J_ZoneSelect .item').removeClass('selected');
				$(this).addClass('selected');
				var zoneId=$(this).attr('zoneid');
				self.zone_id=zoneId;
				self.renderHouseList();
				
			});
			$('.J_OrderSelect .item').on('click',function(){
				
				if($(this).hasClass('select-item')){
					$(this).find('.list').toggle();
				}else{
					$('.J_OrderSelect .item').removeClass('cur');
					$(this).addClass('cur');
					self.order='';
					self.renderHouseList();

				}

			});
			$('.J_OrderSelect .order').on('click',function(){
				$('.J_OrderSelect .item').removeClass('cur');
				var order=$(this).attr('order');
				var text=$(this).text();
				self.order=order;
				self.renderHouseList();
				$(this).parent().prev().find('span').text(text);
				$(this).parent().parent().addClass('cur');

			});
			


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
				zoneHtml.push('<a href="javascript:;" class="item selected" zoneid="">不限</a>')
				$.each(data.data.list,function(i,t){
					zoneHtml.push('<a href="javascript:;" class="item" zoneid="'+t.id+'">'+t.name+'</a>');

				})
				zone.html(zoneHtml.join(''));

			});


		},

		renderPage:function(data){


		},
		
		renderHouseList:function(param){
			var self=this;
			var param=param||{};
			param.page=param.page||1;


			if(self.zone_id){
				param.zone_id=self.zone_id;

			}

			if(self.city_id){
				param.city_id=self.city_id;

			}

			if(self.order){
				param.order=self.order;

			}

			param.name=$('.J_SearchedKey').val();
			
			
			Utils.showLoading();
			$.get(domain+'/api/estate/user_list',param,function(data){
				var wrap=$('.J_Houselist');
				var html=[];
				Utils.hideLoading();
				var list=data.data.list;
				
				$.each(data.data.list,function(i,t){
					html.push('<div class="item clearfix">');
					html.push('<div class="img"><a href="housedetail.html?id='+t.id+'"><img src="/uploads/'+t.image.path+'" alt=""></a></div>');
					html.push('<h3><a href="housedetail.html?id='+t.id+'">'+t.name+'</a></h3>');
					html.push('<div class="des">');
					html.push('<p></p>');
					html.push('<p></p>');
					html.push('<p>地址：'+t.address+'</p>');
					html.push('<p>开盘时间：'+t.start_at+'</p>');
					html.push('</div>');
					html.push('<div class="price">');
					html.push('<span class="em">'+t.avg_price+'</span>元/平米');
					html.push('</div>');
					html.push('<a href="javascript:;" class="go-view" hid="'+t.id+'">团购带看</a>');
					html.push('</div>');

           
				});
				if(param.page===1){
					if(list.length===0){
						wrap.html('<div class="no-more">没有对应楼盘</div>');
					}else{
						wrap.html(html.join(''));

					}
					
				}
				
				
				
			})


		}





	}

	App.init();

	

});