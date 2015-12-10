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
function getCookie(c_name){
	if (document.cookie.length>0){
		var c_start=document.cookie.indexOf(c_name + "=");
　　　　if (c_start!=-1){ 
　　　　　　c_start = c_start + c_name.length+1
　　　　　　c_end=document.cookie.indexOf("=;",c_start)
　　　　　　if (c_end==-1) c_end=document.cookie.length　　
　　　　　　return unescape(document.cookie.substring(c_start,c_end))
　　　　} 
	}
　　return ""
}

$('#erpId').text( getCookie('third_name') );　
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
function submitForm(){ //提交表单
	$.ajaxJSONP({
	    url: 'http://cms.jd.com/tb/feedback/save?activityLocation='+$('#activityLocation').val()+'&activityTheme='+$('#activityTheme').val()+'&activityCount='+$('#activityCount').val()+'&budget='+$('#budget').val()+'&phone='+$('#pNum').val()+'&erpId='+$('#erpId').text()+'&activityTime='+$('#activityTime').val()+'&callback=?',
	    success: function(data){
		    $('body').append('<div class="tip"><i class="success"></i><span>提交成功！</span></div>');
		    setTimeout(function(){
				location.href = 'index.html';
			},2000);
	    }
	});
}
function validate(){ //验证表单
	var _pNum = $('#pNum').val();
	if( _pNum == '' ){
		$('body').append('<div class="tip"><i class="fail"></i><span>请填写手机号！</span></div>');
	}else if( _pNum.length != 11 ){
		$('body').append('<div class="tip"><i class="fail"></i><span>手机号格式错误！</span></div>');
	}else {
		submitForm();
	}
}
$('.submitBtn').on('tap',function(){
	validate();
});
$('body').on('tap',function(){
	setTimeout(function(){
		$('.tip').remove();
	},2000);
});