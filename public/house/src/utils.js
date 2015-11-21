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
