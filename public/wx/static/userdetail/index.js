$(function(){
	var domain='';

	var App={
		init:function(){
			var id=location.search.substring(location.search.indexOf('id=')+3);
			this.id=id;
			this.name='';
			this.renderHouseDetail(id);
			this.initWX();
			this.bindEvents();
		},
		bindEvents:function(){
			var self=this;
			$('.J_VisitModal .close').on('click',function(e){
				$('.J_ModalMask').hide();
				$('.J_VisitModal').hide();
			})



			$('#house-detail').delegate('.J_Visit','click',function(){
				$('.J_ModalMask').show();
				$('.J_VisitModal').show().attr('hid',self.id);

			});
			$('.J_Submit').on('click',function(){
				var hid=$('.J_VisitModal').attr('hid');
				var name=$('.J_Name').val();
				var tel=$('.J_Phone').val();
				var btn=$(this);
				if(name.length===0){
					alert('请填写姓名哦');
					return;
				}
				if(tel.length===0){
					alert('请填写手机号哦')
					return;
				}
				if(!/^1[34578]\d{9}$/.test(tel)){
					alert('手机号格式不正确')
					return;
				}
				btn.addClass('disabled');
				self.reserve({
					estate_id:hid,
					name:name,
					tel:tel
				},function(data){
					if(data.status){
						alert('预约成功');
						$('.J_ModalMask').hide();
						$('.J_VisitModal').hide();

					}else{
						btn.removeClass('disabled');
						alert('预约失败，请稍后再试');
					}
				})

			});

			$('.J_Order').on('click',function(e){
				$('.J_Mask').show();
				$('.J_OrderSelect').show();
				e.stopPropagation();
			});
			$('#house-detail').delegate('.section h3','click',function(){

				if($(this).hasClass('toggle')){
					$(this).removeClass('toggle');
					$(this).next().hide();
				}else{
					$(this).addClass('toggle');
					$(this).next().show();
				}
			})


		},
		reserve:function(param,cb){
			var self=this;

			$.get(domain+'/api/estate/reserve',param,function(data){
				cb&&cb(data);
			});


		},
		initWX:function(){
			$.get(domain+'/api/base/jsapi_data?url='+location.href,function(data){
				data=data.data;
				wx.config({
				    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: 'wxd70aeef4396af5a5', // 必填，公众号的唯一标识
				    timestamp:data.timestamp, // 必填，生成签名的时间戳
				    nonceStr: data.noncestr, // 必填，生成签名的随机串
				    signature: data.signature,// 必填，签名，见附录1
				    jsApiList: ['previewImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});

			})
			



		},
		initImagePreview:function(){
			var self=this;
			var dom=$('.image-list');
			var index=0;
			var len=dom.find('.item').length;
			dom.find('.item:eq('+index+')').show();
			dom.find('.prev').on('click',function(){
				dom.find('.next').show();
				if(index>=1){
					index--;
					dom.find('.item').hide();
					dom.find('.item:eq('+index+')').show();
					if(index===0){
						$(this).hide();
					}
					
				}


			});
			dom.find('.next').on('click',function(){
				dom.find('.prev').show();
				if(index<len){
					index++;
					dom.find('.item').hide();
					dom.find('.item:eq('+index+')').show();
					if(index===len-1){
						$(this).hide();

					}
				}

			});

			dom.find('img').on('click',function(){
				var cur=location.protocol+'//'+location.host+$(this).attr('src');
				var all=[];
				dom.find('img').each(function(){
					all.push(location.protocol+'//'+location.host+$(this).attr('src'));
				});
				wx.previewImage({
			      current: cur,
			      urls: all
			    });
			})

			



		},
		
		renderHouseDetail:function(id){
			var self=this;
			var dom=$('#house-detail');
			var tpl=_.template($("#detail-tpl").html());
			Utils.showLoading();

			$.get(domain+'/api/estate/user_show',{id:id},function(data){
				Utils.hideLoading();
				data.data.estate.agent=data.data.agent;
				dom.html(tpl(data.data.estate));
				self.initImagePreview();

			})


		}





	}

	App.init();

	

});