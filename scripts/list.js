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
//跳转到意见反馈页面
$('.plan').on('tap',function(){
	location.href = 'feedback.html';
});
//商品大分类设置默认值
$('#pType p').eq(sessionStorage.type-1).addClass('active');
$('#pTypeTitle').text($('#pType p').eq(sessionStorage.type-1).text());

//查询商品
function queryProduct(){
	var par = '&type='+sessionStorage.type;
	if( sessionStorage.cityId ){
		par += '&cityId='+sessionStorage.cityId;
	}
	if( sessionStorage.categoryId ){
		par += '&categoryId='+sessionStorage.categoryId;
	}
	if( sessionStorage.minPurchase ){
		par += '&minPurchase='+sessionStorage.minPurchase;
	}
	if( sessionStorage.maxPurchase ){
		par += '&maxPurchase='+sessionStorage.maxPurchase;
	}
	$.ajaxJSONP({
	    url: 'http://cms.jd.com/tb/pm/crossProductListCondition?callback=?'+par,
	    success: function(json){
	    	var _tpls = '';
	    	for( var i = 0; i < json.data.length; i++ ){
	    		var flagTlp = '';
	    		for( var j = 0; j < json.data[i].tagEntities.length; j++ ){
	    			flagTlp += '<span class="f'+j+'">'+json.data[i].tagEntities[j].name+'</span>';	
	    		}
	    		_tpls+='<dd sku="'+json.data[i].sku+'" price="'+json.data[i].price+'" purchase="'+json.data[i].purchase+'"  detailimg="'+json.data[i].detailImg+'"><img src="http://storage.jd.com/'+json.data[i].thumbnail+'"><p class="desc">'+json.data[i].title+'</p><div class="flag">'+flagTlp+'</div><div><span class="cGrayD">员工专享</span><span class="amount">￥'+json.data[i].purchase+'</span><span class="cGray">|<del>￥'+json.data[i].price+'</del></span></div></dd>';	
	    	}
	    	if( _tpls == ''){
	    		_tpls = '<dd class="empty">暂无商品</dd>'	
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
}

/*loading city*/ 
$.ajaxJSONP({
    url: 'http://cms.jd.com/tb/pm/crossCityList?callback=?',
    success: function(json){
    	var cityListTlp = '';
    	for( var i = 0; i < json.data.length; i++ ){
    		var cityListTlpTlp = '';
    		cityListTlp+='<p cityid="'+json.data[i].id+'" '+(i==0?'class=active':'')+'>'+json.data[i].name+'</p>';	
    	}
    	//默认选中第一个城市
    	//sessionStorage.cityId = json.data[0].id;
	    $('#cityList').empty().append(cityListTlp);
	    /*loading category*/ 
		$.ajaxJSONP({
		    url: 'http://cms.jd.com/tb/pm/crossCategoryList?callback=?',
		    success: function(json){
		    	var categoryListTlp = '<p categoryid="0" class="active">全部类型</p>';
		    	for( var i = 0; i < json.data.length; i++ ){
		    		var cityListTlpTlp = '';
		    		categoryListTlp+='<p categoryid="'+json.data[i].id+'">'+json.data[i].name+'</p>';	
		    	}
			    $('#categoryList').empty().append(categoryListTlp);
			    $('.p-tab-wrap dd').on('tap',function(e){
					e.stopPropagation();
					$('.p-tab-wrap dd i').removeClass('rotate');
					$('.p-tab-wrap dd').removeClass('active');
					$('.pannel-wrap dd').removeClass('active');
					$(this).find('i').addClass('rotate');
					$(this).addClass('active');
					$( $('.pannel-wrap dd')[$(this).index()] ).addClass('active');
					$('.overlay').show();
				});
				$('.pannel-wrap dd p').on('tap',function(e){
					e.stopPropagation();
					$('#'+$(this).parent('dd').attr('id')+'Title').text($(this).text());
					$(this).addClass('active').siblings().removeClass('active');
					$('.p-tab-wrap dd i').removeClass('rotate');
					$('.p-tab-wrap dd').removeClass('active');
					$('.pannel-wrap dd').removeClass('active');
					$('.overlay').hide();
					if($(this).attr('ptypeid')){ //筛选条件-大类型
						sessionStorage.type = $(this).attr('ptypeid');
					}
					if($(this).attr('cityid')){ //筛选条件-城市 
						sessionStorage.cityId = $(this).attr('cityid');
					}
					if($(this).attr('categoryid')){ //筛选条件-小类型
						sessionStorage.categoryId = $(this).attr('categoryid');
					}
					if($(this).attr('purchase')){ //筛选条件-价格区间
						var minPurchase = $(this).attr('purchase').split(',')[0];
						var maxPurchase = $(this).attr('purchase').split(',')[1];
						if( minPurchase != -1 ){
							sessionStorage.minPurchase = minPurchase;	
						}
						if( maxPurchase != -1 ){
							sessionStorage.maxPurchase = maxPurchase;	
						}
					}else {
						sessionStorage.minPurchase = '';
						sessionStorage.maxPurchase = '';
					}
					queryProduct();
				});
				$('body').on('tap',function(){
					$('.p-tab-wrap dd i').removeClass('rotate');
					$('.p-tab-wrap dd').removeClass('active');
					$('.pannel-wrap dd').removeClass('active');
					$('.overlay').hide();
				});
				queryProduct();
		    }
		});
    }
});
