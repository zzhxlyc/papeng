var Utils={
	showLoading:function(msg){
		msg = msg || "加载中...";

		var loading = document.getElementById('loading') || $('<div id="loading"></div>').appendTo($('body'))[0];

		$(loading).css({
		  top    : $(window).scrollTop(),
		  display: "-webkit-box",
		  opacity: 1
		});
		loading.innerHTML = '<span><i class="loading-icon icon iconfont"></i>' + (msg.join ? msg.join('<br>') : msg) + '</span>';
		

	},
	hideLoading :function () {
		var loading = document.getElementById('loading') || $('<div id="loading"></div>').appendTo($('body'))[0];
		loading.style.cssText = '';
		$(loading).detach('touchstart');
	},
	tip:function(msg,cb){
		var success = document.getElementById('successTip') || $('<div id="successTip"></div>').appendTo($('body'))[0];
		$(success).show().html(msg);
		setTimeout(function(){
			$(success).hide();
			if(cb) cb();
		},1600);
	}

	




}
$(function(){
	$(window).on('scroll',function(){
		var top=$(this).scrollTop();

		if(top<=0){
			$('.J_Top').animate({'opacity':0});
		}else{
			$('.J_Top').css('opacity',1);
		}
	})

	$('.J_Top').on('click',function(){
		$('html, body').animate({scrollTop:0},300);

	});

});
