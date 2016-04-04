$(function(){
	var domain='';

	var App={
		init:function(){
			var id=location.search.substring(location.search.indexOf('id=')+3);
			this.step='';
			this.id=id;
			this.hid='';
			this.getDealInfo(id);
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
			$('.J_Process').delegate('.J_Oper','click',function(){
				var step=$(this).attr('step');
				self.step=step;
				$('.J_ConfirmMask').show();
				$('.J_Confirm').show();
				$('.J_Confirm .J_Text').text('确认'+$(this).text()+'申请?');
				//self.setDealInfo(step);

			});
			$('.J_Confirm .J_Submit').on('click',function(){
				self.setDealInfo(self.step);

			})
			$('.J_Confirm .J_Cancel').on('click',function(){
				$('.J_ConfirmMask').hide();
				$('.J_Confirm').hide();
			})

			$('.J_Back').on('click',function(){
				history.back();
			})
			$('.J_GoHouse').on('click',function(){
				location.href='/wx/estate/detail?id='+self.hid;
			})

			


		},
		setDealInfo:function(step){
			var self=this;
			var url='';
			if(step==='1'){
				url='/agent/deal_daikan_confrim';

			}else if(step==='2'){
				url='/agent/deal_renchou_apply';
			}else if(step==='3'){
				url='/agent/deal_chengjiao_apply';
			}else if(step==='4'){
				url='/agent/deal_jieyong_apply';
			}else if(step==='5'){
			}


			$.post(domain+url,{deal_id:self.id},function(data){
				if(data.status){
					location.reload();
				}else{
					alert(data.message);
				}

			});

		},
		getDealInfo:function(id){
			var self=this;
			var dom=$('.J_Customer');
			var ctpl=_.template($("#customer-tpl").html());
			var ptpl=_.template($("#process-tpl").html());
			Utils.showLoading();
			$.get(domain+'/agent/deal_detail',{deal_id:id},function(data){
				Utils.hideLoading();
				self.hid=data.data.estate.id;
				dom.html(ctpl(data.data.customer));
				$('.J_Note').html(data.data.deal.note);
				var status=data.data.deal.status+'';
				if(status.length===1){
					status='0'+status;
				}
				var process=parseInt(status.substring(0,1),10)+1;
				var textArray={
					'0':'报备审核中',
					'1':'报备通过',
					'2':'报备不通过',
					'10':'未带看',
					'11':'带看超时',
					'12':'带看申请中',
					'13':'带看无效',
					'14':'带看有效',
					'15':'带看奖励申请',
					'16':'带看奖励结算确认',
					'17':'带看完成',
					'20':'未认筹',
					'21':'认筹申请中',
					'22':'客户认筹完成',
					'23':'认筹完成',
					'30':'未成交',
					'31':'成交申请中',
					'32':'确认完成',
					'33':'成交完成',
					'40':'未结佣',
					'41':'结佣申请中',
					'42':'结佣完成',
					'43':'工单完成'

				}
				var text=textArray[data.data.deal.status+''];
				var operText=['','带看','认筹','成交','结佣',''];
				$('.J_Process').html(ptpl({
					status:data.data.deal.status,
					oper:operText[process],
					name:data.data.estate.name,
					process:process,
					text:text
				}));
			});



		}





	}

	App.init();

	

});