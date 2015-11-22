$(function(){
	var domain='';

	var App={
		init:function(){
			this.page=1;
			this.key='';
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
			$('.J_MoreList').on('click',function(){
				self.page+=1;
				self.getCustomerList({
					page:self.page,
					type:$('.list-wrap .item .selected').attr('type'),
					name:self.key
				});
			})

			$('.list-wrap .item .title').on('click',function(){
				var dom=$(this).parent();
				$('.list-wrap .item').removeClass('selected');
				var type=dom.attr('type');
				var param={
					type:type
				};
				if(self.hasEstate){
					param.estate_id=self.estateid;
				}
				dom.addClass('selected');
				self.getCustomerList(param);

				
			

			});

			$('.J_Back').on('click',function(){
				history.back();

			});


			$('.J_Search').on('click',function(){
				self.key=$('.J_SearchKey').val();
				self.getCustomerList({
					type:$('.list-wrap .selected').attr('type'),
					name:$('.J_SearchKey').val()
				});

			});

			


		},

		getCustomerCount:function(){
			var self=this;
			var param={};
			if(self.hasEstate){
				param.estate_id=self.estateid;
			}
			$.get(domain+'/agent/deal_status',param,function(data){
				
				for(var key in data.data){
					$('.'+key).text(data.data[key]);
				}

			});



		},
		
		getCustomerList:function(param){
			var html=[];
			var url='/agent/search';
			var dom=$('.J_List');
			param.page=param.page||1;
			Utils.showLoading();
			$.get(domain+url,param,function(data){
				Utils.hideLoading();
				var list=data.data.list;
				
				$.each(list,function(i,t){
					html.push('<a href="'+(t.id?'/wx/agent/detail.html?id='+t.id:'javascript:;')+'" class="item" cid="'+t.id+'">');
					html.push('<span class="name">'+t.customer.name+'</span>');
					html.push('<span class="more">'+(t.customer.sex==='男'?'先生':'女士')+' '+t.customer.contact+'</span>');
					html.push('</a>')
				})
				if(param.page===1){
					dom.html(html.join(''));
					$('.J_MoreList').show();
				}else{
					if(list.length===0){
						$('.J_MoreList').hide();
						dom.append('<div class="no-more">没有更多了</div>');
					}else{
						dom.append(html.join(''));
						$('.J_MoreList').show();
					}
				}
				if(list.length<5){
					$('.J_MoreList').hide();
				}
				
			});



		}



	}

	App.init();

	

});