$(function(){
	var domain='';

	var App={
		init:function(){
			var id=location.search.substring(location.search.indexOf('id=')+3);
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

			$('.J_Back').on('click',function(){
				history.back();
			})

			


		},
		
		getDealInfo:function(id){
			var dom=$('.J_Customer');
			var ctpl=_.template($("#customer-tpl").html());
			var ptpl=_.template($("#process-tpl").html());
			Utils.showLoading();
			$.get(domain+'/agent/deal_detail',{deal_id:id},function(data){
				Utils.hideLoading();
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
					'12':'客户带看申请',
					'13':'带看无效',
					'14':'带看有效',
					'15':'带看奖励申请',
					'16':'带看奖励结算确认',
					'17':'带看完成',
					'20':'未认筹',
					'21':'客户认筹确认',
					'22':'客户认筹完成',
					'23':'认筹完成',
					'30':'未成交',
					'31':'成交确认',
					'32':'确认完成',
					'33':'成交完成',
					'40':'未结佣',
					'41':'结佣申请',
					'42':'结佣完成',
					'43':'工单完成'

				}
				var text=textArray[data.data.deal.status+''];
				var operText=['','带看','认筹','成交','结佣',''];
				$('.J_Process').html(ptpl({
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