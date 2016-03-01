$(function(){
	var domain='http://www.papong.net';

	var App={
		init:function(){

			var id=decodeURIComponent(Utils.getQueryString('id'));
			this.id=id;
			this.renderHouseInfo(id);
			this.bindEvents();


		},
		bindEvents:function(){
			var self=this;
			$('.J_Search').on('click',function(){
				var key=$('.key').val();
				location='newhouse.html?name='+key
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

			$('.J_Overview').delegate('.go-view','click',function(){
				Utils.showDaikanModal(self.id)
			});
			


		},

		renderHouseInfo:function(id){
			var self=this;
			var param=param||{};			
			
			Utils.showLoading();
			$.get(domain+'/api/estate/user_show',{
				id:id
			},function(data){

				var t=data.data.estate;
				Utils.hideLoading();
				self.renderOverview(t);
        		self.renderInfo(t);
        		self.renderPeitao(t);
        		self.renderHuXing(t);
				
				
				
			})


		},
		renderInfo:function(t){
			var wrap=$('.J_Info');
			var html=[];

			html.push('<table>');
			html.push('<tr>');
			html.push('<td class="label">开盘时间</td>');
			html.push('<td class="field">'+t.online_at+'</td>');
			html.push('<td class="label">交房时间</td>');
			html.push('<td class="field">'+t.submit_at+'</td>');
			html.push('</tr><tr>');
			html.push('<td class="label">楼盘地址</td>');
			html.push('<td class="field">'+t.address+'</td>');
			html.push('<td class="label">售楼处地址</td>');
			html.push('<td class="field">'+''+'</td>');
			html.push('</tr><tr>');
			html.push('<td class="label">占地面积</td>');
			html.push('<td class="field">'+''+'</td>');
			html.push('<td class="label">建筑面积</td>');
			html.push('<td class="field">'+t.area+'</td>');
			html.push('</tr><tr>');
			html.push('<td class="label">开发商</td>');
			html.push('<td class="field">'+''+'</td>');
			html.push('<td class="label">容积率</td>');
			html.push('<td class="field">'+t.rongji+'</td>');
			html.push('</tr><tr>');
			html.push('<td class="label">绿化率</td>');
			html.push('<td class="field">'+t.green_rate+'</td>');
			html.push('<td class="label">规划户数</td>');
			html.push('<td class="field">'+t.guihua_hushu+'</td>');
			html.push('</tr><tr>');
			html.push('<td class="label">车位数</td>');
			html.push('<td class="field">'+t.car_num+'</td>');
			html.push('<td class="label">车位比</td>');
			html.push('<td class="field">'+''+'</td>');
			html.push('</tr><tr>');
			html.push('<td class="label">产权年限</td>');
			html.push('<td class="field">'+t.chanquan+'</td>');
			html.push('<td class="label">装修情况</td>');
			html.push('<td class="field">'+t.decoration+'</td>');
			html.push('</tr><tr>');
			html.push('<td class="label">装修标准</td>');
			html.push('<td class="field">'+''+'</td>');
			html.push('<td class="label">物业公司</td>');
			html.push('<td class="field">'+t.wuye+'</td>');
			html.push('</tr><tr>');
			html.push('<td class="label">物业费</td>');
			html.push('<td class="field">'+t.wuye_fee+'</td>');
			html.push('</tr>');
			html.push('</table>');
			
			wrap.html(html.join(''))
		},
		renderPeitao:function(t){
			var wrap=$('.J_Peitao');
			var html=[];

			html.push('<table>');
			html.push('<tr>');
			html.push('<td class="label">地段配套</td>');
			html.push('<td class="field">'+t.info1+'</td>');
			html.push('<td class="label">生活配套</td>');
			html.push('<td class="field">'+t.info2+'</td>');
			html.push('</tr><tr>');
			html.push('<td class="label">医疗配套</td>');
			html.push('<td class="field">'+t.info6+'</td>');
			html.push('<td class="label">环境描述</td>');
			html.push('<td class="field">'+t.info4+'</td>');
			html.push('</tr><tr>');
			html.push('<td class="label">教育配套</td>');
			html.push('<td class="field">'+t.info3+'</td>');
			html.push('<td class="label">交通配套</td>');
			html.push('<td class="field">'+t.info5+'</td>');
			html.push('</tr>');
			html.push('</table>');
			
			wrap.html(html.join(''))
		},
		renderOverview:function(t){
			var wrap=$('.J_Overview');
			var html=[];

			html.push('<div class="img">');
			html.push('<img src="/uploads/'+t.image.path+'" alt="" />');
			html.push('</div>');
			html.push('<h3>'+t.name+'</h3>');
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
			
			wrap.html(html.join(''))

		},
		renderHuXing:function(t){
			var wrap=$('.J_ImageList');
			var html=[];
			var len=t.images.length;
			for(var i=0;i<len;i++){
				var m=t.images[i];
				html.push('<div class="item"><a href="/uploads/'+m.path+'" data-lightbox="lightbox"><img src="/uploads/'+m.path+'" alt="" /></a></div>');
			}

			wrap.css('width',220*len)
			wrap.html(html.join(''));
			this.initImagePreview();
			
		},
		initImagePreview:function(){
			var self=this;
			var dom=$('.image-list');
			var inner=$('.J_ImageList');
			var index=0;
			var len=dom.find('.item').length;
			var width=220;
			var limit=4;
			if(len<=limit){
				dom.find('.next').hide();
			}
			dom.find('.prev').on('click',function(){
				index--;
				inner.css('margin-left',-index*width);
				if(index<1){
					dom.find('.prev').hide();
				}

			});
			dom.find('.next').on('click',function(){
				dom.find('.prev').show();
				
				index++;      
				inner.css('margin-left',-index*width);
				if(index+limit>=len){
					dom.find('.next').hide();
				}
			});

			dom.find('img').on('click',function(){

				
			})

			



		}





	}

	App.init();

	

});