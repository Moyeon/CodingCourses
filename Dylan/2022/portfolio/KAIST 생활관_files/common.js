var loginUrlWeb = "/login/ssoLogin.do";

function fncAjax(url, dataType, data, success){
	$.ajax({
		method: "POST",
		dataType: dataType,
		beforeSend : function(xmlHttpRequest) {
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		url: url,
		data : data,
		success : success,
		error : function(jqXHR, textStatus, errorThrown){
			if(jqXHR.status == 401){
				// 로그인 에러
//				location.href = getContextPath() + "/loginTest/login.do";
				location.href = getContextPath() + loginUrlWeb;
			}else{
				alert("Error!", "Request failed: " + errorThrown, "error");
			}
		}
	});
}

function fncAjax2(url, dataType, data, success){
	$.ajax({
		method: "POST",
		dataType: dataType,
		beforeSend : function(xmlHttpRequest) {
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		url: url,
		async: false,
		data : data,
		success : success,
		error : function(jqXHR, textStatus, errorThrown){
			if(jqXHR.status == 401){
				// 로그인 에러
//				location.href = getContextPath() + "/loginTest/login.do";
				location.href = getContextPath() + loginUrlWeb;
			}else{
				alert("Error!", "Request failed: " + errorThrown, "error");
			}
		}
	});
}

function fncAjaxPage(url, data, target){
	$.ajax({
		method: "POST",
		dataType: "html",
		beforeSend : function(xmlHttpRequest) {
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		url: url,
		data : data,
	}).done(function(html) {
			$("#"+target).html(html)
	}).fail(function( jqXHR, textStatus, errorThrown ) {
		if(jqXHR.status == 401){
			// 로그인 에러
//			location.href = getContextPath() + "/loginTest/login.do";
			location.href = getContextPath() + loginUrlWeb;
		}else{
			alert("Error!", "Request failed: " + errorThrown, "error");
		}
	});
}

function fncAjaxPage2(url, data, target, callback){
	$.ajax({
		method: "POST",
		dataType: "html",
		beforeSend : function(xmlHttpRequest) {
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		url: url,
		data : data,
		success: callback
	}).done(function(html) {
			$("#"+target).html(html)
	}).fail(function( jqXHR, textStatus, errorThrown ) {
		if(jqXHR.status == 401){
			// 로그인 에러
//			location.href = getContextPath() + "/loginTest/login.do";
			location.href = getContextPath() + loginUrlWeb;
		}else{
			alert("Error!", "Request failed: " + errorThrown, "error");
		}
	});
}
/*
 * 숫자만 입력
 * ex) <input type="text" onkeydown='return onlyNumber(event)' onkeyup='removeChar(event)' style='ime-mode:disabled;'>
 * */
function onlyNumber(event){
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 || keyID == 9)
		return;
	else
		return false;
}
function removeChar(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 )
		return;
	else
		event.target.value = event.target.value.replace(/[^0-9]/g, "");
}

//소숫점 2자리까지
function scoreRound2(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;

	if(keyID == 110 || keyID == 190 ){
		keyID = 46;
	}
	if(keyID >= 96){
		keyID = keyID-48;
	}

	var check = /^-?(\d{1,3}([.]\d{0,2})?)?$/;

	if(!check.test(event.target.value+String.fromCharCode(keyID))){

		if ( keyID == 8 || keyID == 37 || keyID == 39 || keyID == 46){
			return;
		}else{
			return false;
		}

	}else{
		return;
	}
}

//금액관련 콤마(,)처리 와 숫자만 입력받게 해주는 함수
function inputMoney(obj) {
	 var selector = "input[id=" + obj.id + "]";
	$(selector).keypress(function(event) {
		if (event.which && (event.which < 48 || event.which > 57)) {
			event.preventDefault();
		}
	}).keyup(function() {
		if (obj.value.length == 1) {
			if (obj.value == 0) {
				obj.value = '';
			}
		}
		if ($(this).val() != null && $(this).val() != '') {
			$(this).val($(this).val().replace(/[^0-9]/g, ''));
			$(this).val(addComma($(this).val()));
		}
	});
};

//콤마 추가
function addComma(num) {
//	if(num == 0) return 0;
	var reg = /(^[+-]?\d+)(\d{3})/;
	var n = (num + '');
	while (reg.test(n)) n = n.replace(reg, '$1,$2');
	return n;
}
//콤마 제거
function removeCommas(str) {
    while (str.search(",") >= 0) {
        str = (str + "").replace(',', '');
    }
    return str;
};

//대시 제거
function removeDash(str) {
    while (str.search("-") >= 0) {
        str = (str + "").replace('-', '');
    }
    return str;
};
//콜론 제거
function removeColon(str) {
    while (str.search(":") >= 0) {
        str = (str + "").replace(':', '');
    }
    return str;
};

//입력폼 null 체크
function nullchk(obj,msg,fc){

	if(obj.val().trim() == ""){
		alert(msg);
		if(fc == null || fc == ""){
			//obj.removeClass("is-valid");
			obj.addClass("is-invalid");
			obj.focus()	;

		}
		return false;
	}
	obj.removeClass("is-invalid");
	//obj.addClass("is-valid");
	return true;
}

//이메일 체크
function emailChk(str) {
	var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

	if(!reg_email.test(str)) {
		return false;
	}
	else {
		return true;
	}
}

//입력폼 유효성검사 체크
function validatechk(obj,msg,check,fc){
	if(obj.val() != ""){
		if(!check.test(obj.val())){
			alert(msg);
			if(fc == null || fc == ""){
					obj.addClass("is-invalid");
					obj.focus()	;
				}
			return false;
		}
		obj.removeClass("is-invalid");
		return true;
	}
}

//from~to 날짜 체크
function dateFromToChk(from,to){

	var fromSp = from.split("-");
	var toSp = to.split("-");

	var fromNum = Number(fromSp[0] + fromSp[1] + fromSp[2]);
	var toNum = Number(toSp[0] + toSp[1] + toSp[2]);

	if(fromNum > toNum){

		alert("종료일자가 시작일자보다 클수없습니다.");
		return false;
	}
	return true;
}

//1년 제한 날짜 체크
function dateYearChk(from,to,msg){

	var fromSp = from.split("-");
	var toSp = to.split("-");

	var from = new Date(fromSp[0], fromSp[1], fromSp[2]);
	var to = new Date(toSp[0], toSp[1], toSp[2]);
	var day = 1000*60*60*24;

	if(((to-from)/day)+1 > 365){

		alert(msg);
		return false;
	}
	return true;
}

//from~to 날짜 체크 message
function dateFromToChkMessageCustom(message,from,to){

	var fromSp = from.split("-");
	var toSp = to.split("-");

	var fromNum = Number(fromSp[0] + fromSp[1] + fromSp[2]);
	var toNum = Number(toSp[0] + toSp[1] + toSp[2]);

	if(fromNum > toNum){

		alert(message);
		return false;
	}
	return true;
}

function chkCheckList(chkUrl, returnUrl) {
	$.ajax({
		method: "POST",
		dataType: "json",
		beforeSend : function(xmlHttpRequest) {
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		url: chkUrl,
		success : function(response){
			if(response.result == 'detail' || response.result == 'success'){
				location.href = returnUrl;
			}else{
				alert(response.message);
			}
		},
		error : function(jqXHR, textStatus, errorThrown){
			if(jqXHR.status == 401){
				//location.href = getContextPath() + "/loginTest/login.do";
				location.href = getContextPath() + loginUrlWeb;
			}else{
				alert("Error!");
			}
		}
	});
}

function chkBicycle(chkUrl, returnUrl) {
	$.ajax({
		method: "POST",
		dataType: "json",
		beforeSend : function(xmlHttpRequest) {
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		url: chkUrl,
		success : function(response){
			if(response.result == 'detail' || response.result == 'success'){
				location.href = returnUrl;
			}else{
				alert(response.message);
			}
		},
		error : function(jqXHR, textStatus, errorThrown){
			if(jqXHR.status == 401){
				//location.href = getContextPath() + "/loginTest/login.do";
				location.href = getContextPath() + loginUrlWeb;
			}else{
				alert("Error!");
			}
		}
	});
}

/**************** 입사포기 겹치는기간 시작 (210706) ****************/
function chkDateAsignCancl(chkUrl, returnUrl) {
	$.ajax({
		method: "POST",
		dataType: "json",
		beforeSend : function(xmlHttpRequest) {
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		url: chkUrl,
		success : function(response){
			if(response.result == 'detail' || response.result == 'success'){
				//01. 입사포기 할 배정데이터 1개일 경우
				if(response.length != null && Number(response.length) < 2) {
					location.href = getContextPath() + "/asignCancl/asignCancl.do";
				}
				//02. 입사포기 할 배정데이터 1개 이상일 경우
				else {
					location.href = getContextPath() + "/asignCancl/selectAsignCancl.do";
				}
			}else{
				alert(response.message);
			}
		},
		error : function(jqXHR, textStatus, errorThrown){
			if(jqXHR.status == 401){
				//location.href = getContextPath() + "/loginTest/login.do";
				location.href = getContextPath() + loginUrlWeb;
			}else{
				alert("Error!");
			}
		}
	});
}

function chkDateAsignCancl2(chkUrl, returnUrl, form){
	var frm = document.getElementById(form);
	var data = $("#"+form).serialize();
	$.ajax({
		method: "POST",
		dataType: "json",
		data: data,
		beforeSend : function(xmlHttpRequest) {
			xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을 header에 기록
		},
		url: chkUrl,
		success : function(response){
			if(response.result == 'detail'){
				alert(response.message);
			}else if(response.result == 'success'){
				frm.action = returnUrl;
				frm.submit();
			}else{
				alert(response.message);
			}
		},
		error : function(jqXHR, textStatus, errorThrown){
			if(jqXHR.status == 401){
				// 로그인 에러
//				location.href = getContextPath() + "/loginTest/login.do";
				location.href = getContextPath() + loginUrlWeb;
			}else{
				alert("Error!");
			}
		}
	});
}
/**************** 입사포기 겹치는기간 종료 (210706) ****************/

/**************** 중도퇴사 겹치는기간 시작 (210706) ****************/
function chkDateDropOut(chkUrl, returnUrl) {
	$.ajax({
		method: "POST",
		dataType: "json",
		beforeSend : function(xmlHttpRequest) {
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		url: chkUrl,
		success : function(response){
			// 중도퇴사 할 배정데이터 1개 이상일 경우
			if(response.length != null && Number(response.length) >= 2){
				location.href = getContextPath() + "/inout/dropOut/selectTwoDropOut.do";
			} else if(response.result == 'detail' || response.result == 'success'){
				//01. 중도퇴사 할 배정데이터 1개일 경우
				if(response.length != null && Number(response.length) < 2) {
					location.href = getContextPath() + "/inout/dropOut/dropOutAply.do";
				}
				//02. 중도퇴사 할 배정데이터 1개 이상일 경우
//				else {
//					location.href = getContextPath() + "/inout/dropOut/selectTwoDropOut.do";
//				}
			}else{
				alert(response.message);
			}
		},
		error : function(jqXHR, textStatus, errorThrown){
			if(jqXHR.status == 401){
				//location.href = getContextPath() + "/loginTest/login.do";
				location.href = getContextPath() + loginUrlWeb;
			}else{
				alert("Error!");
			}
		}
	});
}

/** 안되요.. */
function chkDateDropCancel(returnUrl, form) {
	var frm = document.getElementById(form);
	var data = $("#"+form).serialize();
	$.ajax({
		method: "POST",
		dataType: "json",
		data: data,
		beforeSend : function(xmlHttpRequest) {
			xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을 header에 기록
		},
		url: returnUrl,
		success : function(data){
			frm.action = returnUrl;
			frm.submit();
		},
		error : function(jqXHR, textStatus, errorThrown){
			if(jqXHR.status == 401){
				// 로그인 에러
//				location.href = getContextPath() + "/loginTest/login.do";
				location.href = getContextPath() + loginUrlWeb;
			}else{
				alert("Error!");
			}
		}
	});
}

function chkDateDropOut2(chkUrl, returnUrl, form){
	var frm = document.getElementById(form);
	var data = $("#"+form).serialize();
	$.ajax({
		method: "POST",
		dataType: "json",
		data: data,
		beforeSend : function(xmlHttpRequest) {
			xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을 header에 기록
		},
		url: chkUrl,
		success : function(response){
			if(response.result == 'detail'){
				alert(response.message);
			}else if(response.result == 'success'){
				frm.action = returnUrl;
				frm.submit();
			}else{
				alert(response.message);
			}
		},
		error : function(jqXHR, textStatus, errorThrown){
			if(jqXHR.status == 401){
				// 로그인 에러
//				location.href = getContextPath() + "/loginTest/login.do";
				location.href = getContextPath() + loginUrlWeb;
			}else{
				alert("Error!");
			}
		}
	});
}
/**************** 중도퇴사 겹치는기간 종료 (210706) ****************/

function ChkByte(objname, maxlength) {
	var objstr = objname.value; // 입력된 문자열을 담을 변수
	var objstrlen = objstr.length; // 전체길이

	// 변수초기화
	var maxlen = maxlength; // 제한할 글자수 최대크기
	var i = 0; // for문에 사용
	var bytesize = 0; // 바이트크기
	var strlen = 0; // 입력된 문자열의 크기
	var onechar = ""; // char단위로 추출시 필요한 변수
	var objstr2 = ""; // 허용된 글자수까지만 포함한 최종문자열

	// 입력된 문자열의 총바이트수 구하기
	for(i=0; i< objstrlen; i++) {
		// 한글자추출
		onechar = objstr.charAt(i);

		if (escape(onechar).length > 4) {
			bytesize += 2;     // 한글이면 2를 더한다.
		} else {
			bytesize++;      // 그밗의 경우는 1을 더한다.
		}

		if(bytesize <= maxlen)  {   // 전체 크기가 maxlen를 넘지않으면
			strlen = i + 1;     // 1씩 증가
		}
	}

	// 총바이트수가 허용된 문자열의 최대값을 초과하면
	if(bytesize > maxlen) {
		alert( "제목에서 허용된 문자열의 최대값을 초과했습니다. \n초과된 내용은 자동으로 삭제 됩니다.");
		objstr2 = objstr.substr(0, strlen);
		objname.value = objstr2;
	}
	objname.focus();
}

function fncSwalAlert(title, text, callback){
	swal({
		title: title,
		text: text,
	}, callback);
}

//ckeditor 설정
function ckReadSet(editor){
	CKEDITOR.replace( editor, {
		toolbarCanCollapse: true,
		toolbarStartupExpanded: false,
		removePlugins: "elementspath",
		toolbar: 'Custom',
		toolbar_Custom: [[ 'Image','Flash','Table','HorizontalRule','SpecialChar','PageBreak']]
	});
}

function ckCreateSet(editor, url){

	CKEDITOR.on('dialogDefinition', function (ev) {

		var dialogName = ev.data.name;
		var dialog = ev.data.definition.dialog;
		var dialogDefinition = ev.data.definition;

		if (dialogName == 'image') {

			dialog.on('show', function (obj) {
				this.selectPage('Upload'); //업로드텝으로 시작
			});
			dialogDefinition.removeContents('advanced'); // 자세히탭 제거
			dialogDefinition.removeContents('Link'); // 링크탭 제거
		}
	});

	CKEDITOR.replace( editor, {
		height: 320,
		//toolbarCanCollapse: true,
		removePlugins: "elementspath",
		extraPlugins: 'font,colorbutton,justify',
		filebrowserUploadUrl: url,
		uploadUrl: url,
		font_defaultLabel: '굴림',
		font_names: '굴림/Gulim;돋움/Dotum;바탕/Batang;궁서/Gungsuh/Arial/Arial;Tahoma/Tahoma;Verdana/Verdana',
		fontSize_defaultLabel: '12px',
		fontSize_sizes: '8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;',
		specialChars: ['!', '&quot;', '#', '$', '%', '&amp;', "'", '(', ')', '*', '+', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '&lt;', '=', '&gt;', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~', '&euro;', '&lsquo;', '&rsquo;', '&ldquo;', '&rdquo;', '&ndash;', '&mdash;', '&iexcl;', '&cent;', '&pound;', '&curren;', '&yen;', '&brvbar;', '&sect;', '&uml;', '&copy;', '&ordf;', '&laquo;', '&not;', '&reg;', '&macr;', '&deg;', '&sup2;', '&sup3;', '&acute;', '&micro;', '&para;', '&middot;', '&cedil;', '&sup1;', '&ordm;', '&raquo;', '&frac14;', '&frac12;', '&frac34;', '&iquest;', '&Agrave;', '&Aacute;', '&Acirc;', '&Atilde;', '&Auml;', '&Aring;', '&AElig;', '&Ccedil;', '&Egrave;', '&Eacute;', '&Ecirc;', '&Euml;', '&Igrave;', '&Iacute;', '&Icirc;', '&Iuml;', '&ETH;', '&Ntilde;', '&Ograve;', '&Oacute;', '&Ocirc;', '&Otilde;', '&Ouml;', '&times;', '&Oslash;', '&Ugrave;', '&Uacute;', '&Ucirc;', '&Uuml;', '&Yacute;', '&THORN;', '&szlig;', '&agrave;', '&aacute;', '&acirc;', '&atilde;', '&auml;', '&aring;', '&aelig;', '&ccedil;', '&egrave;', '&eacute;', '&ecirc;', '&euml;', '&igrave;', '&iacute;', '&icirc;', '&iuml;', '&eth;', '&ntilde;', '&ograve;', '&oacute;', '&ocirc;', '&otilde;', '&ouml;', '&divide;', '&oslash;', '&ugrave;', '&uacute;', '&ucirc;', '&uuml;', '&yacute;', '&thorn;', '&yuml;', '&OElig;', '&oelig;', '&#372;', '&#374', '&#373', '&#375;', '&sbquo;', '&#8219;', '&bdquo;', '&hellip;', '&trade;', '&#9658;', '&bull;', '&rarr;', '&rArr;', '&hArr;', '&diams;', '&asymp;', '※']
	});
	/*
	CKEDITOR.config.font_defaultLabel = '굴림';
	CKEDITOR.config.font_names = '굴림/Gulim;돋움/Dotum;바탕/Batang;궁서/Gungsuh/Arial/Arial;Tahoma/Tahoma;Verdana/Verdana'
	CKEDITOR.config.fontSize_defaultLabel = '12px'
	CKEDITOR.config.fontSize_sizes = '8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;'
	*/
}


/*
 * 전화번호 masking
 */
function mphon( obj ) {
	obj.value =  PhonNumStr( obj.value );
}

function PhonNumStr( str ){
	 var RegNotNum  = /[^0-9]/g;
	 var RegPhonNum = "";
	 var DataForm   = "";

	 // return blank
	 if( str == "" || str == null ) return "";

	 // delete not number
	 str = str.replace(RegNotNum,'');

	 /* 4자리 이하일 경우 아무런 액션도 취하지 않음. */
	 if( str.length < 4 ) return str;

	 /* 지역번호 02일 경우 10자리 이상입력 못하도록 제어함. */
	 if(str.substring(0,2)=="02" && str.length > 10){
		 str = str.substring(0, 10);
	 }
	 if( str.length > 3 && str.length < 7 ) {
		 if(str.substring(0,2)=="02"){
			 DataForm = "$1-$2";
			 RegPhonNum = /([0-9]{2})([0-9]+)/;
		 } else {
			 DataForm = "$1-$2";
			 RegPhonNum = /([0-9]{3})([0-9]+)/;
		 }
	 } else if(str.length == 7 ) {
		 if(str.substring(0,2)=="02"){
			 DataForm = "$1-$2-$3";
			 RegPhonNum = /([0-9]{2})([0-9]{3})([0-9]+)/;
		 } else {
			 DataForm = "$1-$2";
			 RegPhonNum = /([0-9]{3})([0-9]{4})/;
		 }
	 } else if(str.length == 9 ) {
		  if(str.substring(0,2)=="02"){
			 DataForm = "$1-$2-$3";
			 RegPhonNum = /([0-9]{2})([0-9]{3})([0-9]+)/;
		 } else {
			 DataForm = "$1-$2-$3";
			 RegPhonNum = /([0-9]{3})([0-9]{3})([0-9]+)/;
		 }
	 } else if(str.length == 10){
		 if(str.substring(0,2)=="02"){
			 DataForm = "$1-$2-$3";
			 RegPhonNum = /([0-9]{2})([0-9]{4})([0-9]+)/;
		 }else{
			 DataForm = "$1-$2-$3";
			 RegPhonNum = /([0-9]{3})([0-9]{3})([0-9]+)/;
		 }
	 } else if(str.length > 10){
		 if(str.substring(0,2)=="02"){
			 DataForm = "$1-$2-$3";
			 RegPhonNum = /([0-9]{2})([0-9]{4})([0-9]+)/;
		 }else{
			 DataForm = "$1-$2-$3";
			 RegPhonNum = /([0-9]{3})([0-9]{4})([0-9]+)/;
		 }
	 } else {
		 if(str.substring(0,2)=="02"){
			 DataForm = "$1-$2-$3";
			 RegPhonNum = /([0-9]{2})([0-9]{3})([0-9]+)/;
		 }else{
			 DataForm = "$1-$2-$3";
			 RegPhonNum = /([0-9]{3})([0-9]{3})([0-9]+)/;
		 }
	 }

	 while( RegPhonNum.test(str) ) {
		 str = str.replace(RegPhonNum, DataForm);
	 }
	 return str;
}


function getContextPath() {
	
	//개발
	//var hostIndex = location.href.indexOf( location.host ) + location.host.length;
	//return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1));

	//운영
	return "";
}

function chkMenu(chkUrl, returnUrl){
	$.ajax({
		method: "POST",
		dataType: "json",
		beforeSend : function(xmlHttpRequest) {
			xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을 header에 기록
		},
		url: chkUrl,
		success : function(response){
			if(response.result == 'detail' || response.result == 'success'){
				location.href = returnUrl;
			}else{
				alert(response.message);
			}
		},
		error : function(jqXHR, textStatus, errorThrown){
			if(jqXHR.status == 401){
				// 로그인 에러
//				location.href = getContextPath() + "/loginTest/login.do";
				location.href = getContextPath() + loginUrlWeb;
			}else{
				alert("Error!");
			}
		}
	});
}

function chkMenuDateDormMove(chkUrl, returnUrl){
	$.ajax({
		method: "POST",
		dataType: "json",
		beforeSend : function(xmlHttpRequest) {
			xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을 header에 기록
		},
		url: chkUrl,
		success : function(response){
			console.log(response);
			if(response.result == 'detail'){
				alert(response.message);
			}else if(response.result == 'success'){
				location.href = returnUrl;
			}else{
				alert(response.message);
			}
		},
		error : function(jqXHR, textStatus, errorThrown){
			if(jqXHR.status == 401){
				// 로그인 에러
//				location.href = getContextPath() + "/loginTest/login.do";
				location.href = getContextPath() + loginUrlWeb;
			}else{
				alert("Error!");
			}
		}
	});
}

function chkMenuDateDormMove2(chkUrl, returnUrl, form){
	var frm = document.getElementById(form);
	var data = $("#"+form).serialize();
	$.ajax({
		method: "POST",
		dataType: "json",
		data: data,
		beforeSend : function(xmlHttpRequest) {
			xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을 header에 기록
		},
		url: chkUrl,
		success : function(response){
			if(response.result == 'detail'){
				alert(response.message);
			}else if(response.result == 'success'){
				frm.action = returnUrl;
				frm.submit();
			}else{
				alert(response.message);
			}
		},
		error : function(jqXHR, textStatus, errorThrown){
			if(jqXHR.status == 401){
				// 로그인 에러
//				location.href = getContextPath() + "/loginTest/login.do";
				location.href = getContextPath() + loginUrlWeb;
			}else{
				alert("Error!");
			}
		}
	});
}

function chkDateDormMove(chkUrl, returnUrl, form){
	var frm = document.getElementById(form);
	var data = $("#"+form).serialize();
	$.ajax({
		method: "POST",
		dataType: "json",
		data: data,
		beforeSend : function(xmlHttpRequest) {
			xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을 header에 기록
		},
		url: chkUrl,
		success : function(response){
			if(response.result == 'detail' || response.result == 'success'){
//				location.href = returnUrl;
				frm.action = returnUrl;
				frm.submit();
			}else{
				alert(response.message);
			}
		},
		error : function(jqXHR, textStatus, errorThrown){
			if(jqXHR.status == 401){
				// 로그인 에러
//				location.href = getContextPath() + "/loginTest/login.do";
				location.href = getContextPath() + loginUrlWeb;
			}else{
				alert("Error!");
			}
		}
	});
}

function chkMarried(chkUrl, returnUrl){
	$.ajax({
		method: "POST",
		dataType: "json",
		beforeSend : function(xmlHttpRequest) {
			xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을 header에 기록
		},
		url: chkUrl,
		success : function(response){
			if(response.result == 'success'){
				location.href = returnUrl;
			}else{
				alert(response.message);
			}
		},
		error : function(jqXHR, textStatus, errorThrown){
			if(jqXHR.status == 401){
				// 로그인 에러
				location.href = getContextPath() + loginUrlWeb;
			}else{
				alert("Error!");
			}
		}
	});
}

function openPopup(url, name, width, height){
	var left =  (window.screen.width / 2) - (width / 2);
	var top =  (window.screen.height / 2) - (height / 2);
	var popup = window.open(url, name, "width="+width+"px, height="+height+"px, top="+top+"px, left="+left+"px, resizable=no, scrollbars=yes, status=no;");
	popup.focus();
}

function openPopupPost(form, url, name, width, height){
	openPopup("", name, width, height);
	form.target = name ;
	form.action = url;
	form.submit() ;
}

(function($){
	/* Store View Tab Menu */
    function init_tabs() {
		$(".tab_unit").css("display","none");
		if (!$('ul.unit_tab').length) { return; }
		$('div.tab_unit_wrap').each(function() {
			$(this).find('.tab_unit:first').fadeIn();
		});
		$('ul.unit_tab a').click(function() {
			if (!$(this).hasClass('current')) {
				$(this).addClass('current').parent('li').siblings('li').find('a.current').removeClass('current');
				$($(this).attr('title')).fadeIn().siblings('.tab_unit').hide();
			}
			this.blur();
			return false;
		});
	}

	$(function() {
		$(".datepicker").datepicker({
			dateFormat:'yy-mm-dd',
			changeMonth: true,
			changeYear: true
		  });
	});

	$(document).ready(function(){
		init_tabs()

        // menu icon states, opening main nav
		$('#menu-icon').click(function(){
			$(this).parents('.mnubtn').toggleClass('open');
			$('body').toggleClass('mnuopen');
			if($('#header').hasClass("open")){
				$('#header').removeClass('open');
			}else{
				$('#header').addClass('open');
			}
		});

		// menu icon states, opening main nav
		$('#allmnu, .shadow, .closebtn').click(function(){
			$('body').toggleClass('mnuopen');
			if($('#sitemap').hasClass("open")){
				$('#sitemap').removeClass('open');
				$('.shadow').fadeOut();
			}else{
				$('#sitemap').addClass('open');
				$('.shadow').fadeIn();
			}
		});

		/* Smooth Scroll */
        $('a.pagelink').click(function(){
			$('html, body').animate({
				scrollTop: $( $(this).attr('href') ).offset().top - 50
			}, 500);
			return false;
		});

		/* movTop */
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#wrapper').addClass("scrollOn");
			} else {
				$('#wrapper').removeClass("scrollOn");
			}
		});
	});
})(jQuery)

// isEmpty function
var isEmpty = function(data){
	if(typeof(data) === 'object'){
		if(JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]'){
			return true;
		}else if(!data){
			return true;
		}
		return false;
	}else if (typeof(data) === 'string'){
		if(!data.trim()){
			return true;
		}
		return false;
	}else if (typeof(data) === 'undefined'){
		return true;
	}else{
		return false;
	}
}

// 21.05.07 사이트 바로가기
$("#slShortCut").change(function() {
	//현재창에서 열기
	location.href=$(this).val();
	//새창에서 열기
	//window.open($(this).val());
	$(this).find("option:eq(0)").prop("selected", true);
});

// 앱 여부
function fncIsAppYn(){
	var userAgent = navigator.userAgent.toLowerCase();
	var androidType = "aos";
	var iosType=" ios";
	if(userAgent.indexOf(androidType) > -1 || userAgent.indexOf(iosType) > -1 ){
		return true;
	}else{
		return false;
	}
}
