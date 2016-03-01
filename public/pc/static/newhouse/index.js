$(function(){
	var domain='http://www.papong.net';

	var App={
		init:function(){
			this.page=1;
			this.city_id='';
			this.zone_id='';
			this.order='';
			this.renderProvinceList();
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
					if(self.order===''){
						return;
					}
					self.order='';
					self.renderHouseList();

				}

			});
			$('.J_OrderSelect .order').on('click',function(){
				$('.J_OrderSelect .item').removeClass('cur');
				var order=$(this).attr('order');
				var text=$(this).text();
				$(this).parent().prev().find('span').text(text);
				$(this).parent().parent().addClass('cur');
				if(self.order===order){
					return;
				}
				self.order=order;
				self.renderHouseList();
				

			});

			$('.J_Houselist').delegate('.go-view','click',function(){
				var hid=$(this).attr('hid');
				Utils.showDaikanModal(hid)
			});

			$('.J_SelectedCity').on('click',function(){
				$('.J_CitySelect').toggle();

			});
			$('.J_ProvinceList').delegate('.item','click',function(){
				var pid=$(this).attr('pid');
				var cities=$(this).find('textarea').val();
				self.renderCityList(JSON.parse(cities));
				$('.J_ProvinceWrap').show();
				$('.J_SelectedProvince').text($(this).find('span').text());
			});
			$('.J_CityList').delegate('.item','click',function(){
				var cid=$(this).attr('cid');
				self.city_id=cid;
				$('.J_CitySelect').hide();
				self.renderZoneList();
				self.renderHouseList();
				$('.J_ProvinceWrap').hide();

				$('.J_SelectedCity span').text($(this).text());
				$('.J_ProvinceList').show();
				$('.J_CityList').hide();
			});
			$('.J_ProvinceWrap .J_Back').on('click',function(){
				$('.J_ProvinceList').show();
				$('.J_CityList').hide();
				$('.J_ProvinceWrap').hide();
			});

			$('.J_Page').delegate('.item','click',function(){
				self.page=$(this).attr('page');
				self.renderHouseList();

			});


		},
		renderProvinceList:function(){
			var wrap=$('.J_ProvinceList');
			var html=[];
			$.get(domain+'/api/base/province_city',{},function(data){
				for(var i=0;i<data.data.list.length;i++){
					var t=data.data.list[i];
					html.push('<span class="item" pid="'+t.id+'"><span>'+t.name+'</span><textarea style="display:none;">'+JSON.stringify(t.cities)+'</textarea></span>')
				}
				wrap.html(html.join(''));
				
			});


		},		
		renderCityList:function(data){
			var wrap=$('.J_CityList');
			var html=[];
			for(var i=0;i<data.length;i++){
				var t=data[i];
				html.push('<span class="item" cid="'+t.id+'">'+t.name+'</span>')
			}
			$('.J_ProvinceList').hide();
			wrap.html(html.join('')).show();

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
			var cur=data.page;
			var pageNum=Math.ceil(data.size/data.per_page);
			if(pageNum<2){
				return;
			}
			var wrap=$('.J_Page');
			var html=[];
			for(var i=0;i<pageNum;i++){
				if((i+1)===cur){
					html.push('<span class="item cur" page="'+(i+1)+'">'+(i+1)+'</span>');
				}else{
					html.push('<a href="javascript:;" class="item" page="'+(i+1)+'">'+(i+1)+'</a>');
				}
			}
			wrap.html(html.join(''));


		},
		
		renderHouseList:function(param){
			var self=this;
			var param=param||{};

			if(self.page){
				param.page=self.page;
			}

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
				self.renderPage(data.data);
				$.each(data.data.list,function(i,t){
					html.push('<div class="item clearfix">');
					html.push('<div class="img"><a href="housedetail.html?id='+t.id+'"><img src="/uploads/'+t.image.path+'" alt=""></a></div>');
					html.push('<h3><a href="housedetail.html?id='+t.id+'">'+t.name+'</a></h3>');
					html.push('<div class="des">');
					html.push('<p></p>');
					html.push('<p></p>');
					html.push('<p>地址：'+t.address+'</p>');
					html.push('<p>开盘时间：'+t.online_at+'</p>');
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