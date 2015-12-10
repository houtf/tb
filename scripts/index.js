sessionStorage.removeItem('cityId');
sessionStorage.removeItem('categoryId');
sessionStorage.removeItem('minPurchase');
sessionStorage.removeItem('maxPurchase');
/*返回京东ME首页*/
function backToHomePage() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	if (bIsIphoneOs) {
		//var cmd="objc://"+"backToHomePage:"+":/";
		window.location.href = "objc://" + escape("backToHomePage:" + ":/");
		//window.location.href=cmd;
	} else if (bIsAndroid) {
		Android.goBack();
	}
}

function jumpToDetail(n) {
	sessionStorage.num = n;
	window.location.href = 'detail.html?skin=' + getUrlParam('skin');
}
//获得url参数
function getUrlParam(name, url) {
	url = url || location.href;
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
	if (!results) {
		return '';
	}
	return results[1] || '';
}

//换肤
function chageSkin(type) {
	var img = "url(" + JDME.getSkinURL(type) + ")";
	document.querySelector('.nav').style.backgroundImage = img;
}
chageSkin(getUrlParam('skin'));
var jap = {
	siteId : 'UA-J2011-41',
	topic: 'traffic-oth',
	account : '',
	skuid: '',
	shopid: '',
	orderid: '',
	adsCookieName: ''
};
(function() {
	var ja = document.createElement('script');
	ja.type = 'text/javascript';
	ja.async = true;
	ja.src = 'http://misc.360buyimg.com/jdf/1.0.0/unit/ja/1.0.0/ja.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ja, s);
})();
/*loading broadcast*/
$.ajaxJSONP({
    url: 'http://cms.jd.com/tb/sliders/crossList?type=0&callback=?',
    success: function(json){
    	alert(json);
    	var _tpls = '';
    	for( var i = 0; i < json.data.length; i++ ){
    		var _txt = json.data[i].description;
    		if( json.data[i].description.length > 18 ){
    			_txt = json.data[i].description.substring(0,18) + '...';	
    		}
    		_tpls+='<div class="swiper-slide">'+_txt+'</div>';	
    	}
	    $('#broadcast .swiper-wrapper').empty().append(_tpls);
	    var broadcastSlide = new Swiper ('#broadcast', {
			direction: 'vertical',
		    loop : true, 
		    autoplay : 2000
		});
    }
});
/*loading banner*/ 
$.ajaxJSONP({
    url: 'http://cms.jd.com/tb/sliders/crossList?type=1&callback=?',
    success: function(json){
    	var _tpls = '';
    	for( var i = 0; i < json.data.length; i++ ){
    		_tpls+='<div class="swiper-slide"><img src="http://storage.jd.com/'+json.data[i].imgUrl+'"><span>'+json.data[i].description+'</span></div>';	
    	}
	    $('#bannerSlide .swiper-wrapper').empty().append(_tpls);
	    var bannerSlide = new Swiper ('#bannerSlide', {
			direction: 'horizontal',
		    loop : true, 
		    autoplay : 3000,
		    observer:true,
		    observeParents:true,
		    autoplayDisableOnInteraction : false,
			pagination: '#banner-pagination'
		});
    }
});

/*loading product*/ 
$.ajaxJSONP({
    url: 'http://cms.jd.com/tb/pm/crossProductList?callback=?',
    success: function(json){
    	var _tpls = '';
    	for( var i = 0; i < json.data.length; i++ ){
    		var flagTlp = '';
    		for( var j = 0; j < json.data[i].tagEntities.length; j++ ){
    			flagTlp += '<span class="f'+j+'">'+json.data[i].tagEntities[j].name+'</span>';	
    		}
    		_tpls+='<dd sku="'+json.data[i].sku+'" price="'+json.data[i].price+'" purchase="'+json.data[i].purchase+'"  detailimg="'+json.data[i].detailImg+'"><img src="http://storage.jd.com/'+json.data[i].thumbnail+'"><p class="desc">'+json.data[i].title+'</p><div class="flag">'+flagTlp+'</div><div><span class="cGrayD">员工专享</span><span class="amount">￥'+json.data[i].purchase+'</span><span class="cGray">|<del>￥'+json.data[i].price+'</del></span></div></dd>';	
    	}
	    $('#productList').empty().append(_tpls);
	    //跳转到详商品情页面
		$('.g-list dd').on('tap',function(){
			sessionStorage.sku = $(this).attr('sku');
			sessionStorage.price = $(this).attr('price');
			sessionStorage.purchase = $(this).attr('purchase');
			sessionStorage.detailImg = $(this).attr('detailimg');
			location.href = 'detail.html';
		});
    }
});
//跳转到意见反馈页面 
$('.plan').on('tap',function(){
	location.href = 'feedback.html?skin=' + getUrlParam('skin') + '&t='+new Date().getTime();
	//location.href = 'http://p.m.jd.com/norder/order.action?wareId=1124951596';
});
////跳转到商品列表页面
$('.sx dd').on('tap',function(){
	sessionStorage.type = $(this).attr('typeid');
	location.href = 'list.html?skin=' + getUrlParam('skin');
});
