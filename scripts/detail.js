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
/*loading banner*/
$.ajaxJSONP({
    url: 'http://cms.jd.com/tb/sliders/crossList?type=2&callback=?',
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
$('#price').text(sessionStorage.price);
$('#purchase').text(sessionStorage.purchase);
$('#detailImg').html('<img src="http://storage.jd.com/'+sessionStorage.detailImg+'">');
