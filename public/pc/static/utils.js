
var Utils = {
	showLoading: function(msg) {
		msg = msg || "加载中...";

		var loading = document.getElementById('loading') || $('<div id="loading"></div>').appendTo($('body'))[0];

		$(loading).css({
			top: $(window).scrollTop(),
			display: "-webkit-box",
			opacity: 1
		});
		loading.innerHTML = '<span><i class="loading-icon icon iconfont"></i>' + (msg.join ? msg.join('<br>') : msg) + '</span>';


	},
	hideLoading: function() {
		var loading = document.getElementById('loading') || $('<div id="loading"></div>').appendTo($('body'))[0];
		loading.style.cssText = '';
		$(loading).detach('touchstart');
	},
	showDaikanModal:function(id){
		$('.J_DaikanModal').show().attr('hid',id);
		$('.mask').show();
	},
	hideDaikanModal:function(){
		$('.J_DaikanModal').hide();
		$('.mask').hide();

	},
	tip: function(msg, cb) {
		var success = document.getElementById('successTip') || $('<div id="successTip"></div>').appendTo($('body'))[0];
		$(success).show().html(msg);
		setTimeout(function() {
			$(success).hide();
			if (cb) cb();
		}, 1600);
	},
	getQueryString: function(name) {
		var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
		if (result == null || result.length < 1) {

			return "";

		}

		return result[1];
	}



}
$(function() {
	var domain='http://121.40.70.168';

	$(window).on('scroll', function() {
		var top = $(this).scrollTop();

		if (top <= 0) {
			$('.J_Top').animate({
				'opacity': 0
			});
		} else {
			$('.J_Top').css('opacity', 1);
		}
	})

	$('.J_DaikanModal .close').on('click',function(){
		$('.J_DaikanModal').hide();
		$('.mask').hide();
	});
	$('.J_DaikanModal .submit').on('click',function(){
		var id=$('.J_DaikanModal').attr('hid');
		var name=$('.J_DaikanModal .name').val();
		var phone=$('.J_DaikanModal .phone').val();
		var btn=$(this);
		if(name.length===0){
			alert('请填写姓名哦');
			return;
		}
		if(phone.length===0){
			alert('请填写手机号哦');
			return;
		}
		if(!/^1[34578]\d{9}$/.test(phone)){
			alert('手机号格式不正确')
			return;
		}
		btn.addClass('disabled');
		Utils.showLoading();
		$.post(domain+'/api/estate/reserve',{
			estate_id:id,
			name:name,
			tel:phone
		},function(data){
			Utils.hideLoading();
			if(data.status){
				alert('提交成功');
				Utils.hideDaikanModal();
			}else{
				alert('提交失败，请稍后再试');
			}
			
			btn.removeClass('disabled');
		});


	});

	$('.J_Top').on('click', function() {
		$('html, body').animate({
			scrollTop: 0
		}, 300);

	});

});