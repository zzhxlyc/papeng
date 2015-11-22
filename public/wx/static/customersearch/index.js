$(function(){
	var domain='http://121.40.70.168';

	var App={
		init:function(){
			this.initUI();
			this.getCustomerCount();
			this.bindEvents();

		},
		initUI:function() {
			if(location.search.indexOf('estateid')>=0){
				var estateid=location.search.substring(location.search.indexOf('estateid=')+9,location.search.indexOf('&'));
				var estatename=location.search.substring(location.search.indexOf('estatename=')+11);
				$('.estate-wrap span').text(decodeURIComponent(estatename));
				$('.estate-wrap').show();
				this.hasEstate=true;
				this.estateid=estateid;
			}


		},
		bindEvents:function(){
			var self=this;

			$('.list-wrap .item .title').on('click',function(){
				var dom=$(this).parent();
				if(dom.hasClass('selected')){
					dom.removeClass('selected');
					dom.find('.list').hide();
				}else{
					var type=dom.attr('type');
					var param={
						type:type
					};
					if(self.hasEstate){
						param.estate_id=self.estateid;
					}
					dom.addClass('selected');
					self.getCustomerList(dom.find('.list'),param);

				}
				
			

			});

			$('.J_Back').on('click',function(){
				history.back();

			});


			$('.J_Search').on('click',function(){
				self.getCustomerList($('.list-wrap .selected .list'),{
					type:$('.list-wrap .selected').attr('type'),
					name:$('.J_SearchKey').val()
				});

			});

			


		},

		getCustomerCount:function(){

			$.get(domain+'/agent/deal_status',{},function(data){
				
				for(var key in data.data){
					$('.'+key).text(data.data[key]);
				}

			});



		},
		
		getCustomerList:function(dom,param){
			var html=[];
			var url='/agent/search';
			Utils.showLoading();
			$.get(domain+url,param,function(data){
				Utils.hideLoading();
				var list=data.data.list;
				if(list.length===0){
					dom.html('<div class="no-data">没有对应客户</div>');
					return;
				}
				$.each(list,function(i,t){
					html.push('<a href="'+(t.id?'/wx/agent/detail.html?id='+t.id:'javascript:;')+'" class="item" cid="'+t.id+'">');
					html.push('<span class="name">'+t.customer.name+'</span>');
					html.push('<span class="more">'+(t.customer.sex==='男'?'先生':'女士')+' '+t.customer.contact+'</span>');
					html.push('</a>')
				})
				dom.html(html.join('')).show();

			});



		}



	}

	App.init();

	

});