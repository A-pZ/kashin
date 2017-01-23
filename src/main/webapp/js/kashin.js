/**
 * 家臣団計算機スクリプト。
 * Original source : A-pZ
 * 2017/1/23 Version 3.0
 *
 */

// 家臣レベル
var lv = 10;
var lv_max = 65;

// 家臣ステータスの幅
var status_min = 0;
var status_max = 80;

// PCステータス
var base_status_min = 2;
var base_status_max = 10;

// ステータス
var str = 0;
var vit = 0;
var agl = 0;
var itl = 0;
var cha = 0;
var earth = 0;
var water = 0;
var fire = 0;
var wind = 0;

// 初期ステータス
var i_str = 0;
var i_vit = 0;
var i_agl = 0;
var i_itl = 0;
var i_cha = 0;
var i_earth = 0;
var i_water = 0;
var i_fire = 0;
var i_wind = 0;

// 選択した職
var job = 0;

// 職ラベル
var job_label = ('侍','陰陽','忍者','僧','神職','鍛冶屋','薬師','傾奇者');

// 職別の初期振り
var job_base = [
	[5,5,3,3,2,5,5,5,5],
	[2,2,4,6,4,7,7,7,7],
	[4,4,5,3,2,6,6,6,6],
	[4,4,2,4,4,6,7,6,6],
	[2,2,4,5,5,7,6,6,7],
	[4,4,5,2,3,5,5,5,5],
	[3,3,4,5,3,6,6,7,6],
	[4,2,5,4,3,6,6,6,6],
];

// 成長率
// 生命、気合、腕力、耐久、器用、知力、魅力のそれぞれ10倍した値
var job_addition = [
	[280,220,28,28,18,18,18] ,
	[220,280,18,18,20,28,26] ,
	[244,232,26,20,28,20,20] ,
	[268,256,22,24,18,24,18] ,
	[220,268,18,18,22,26,28] ,
	[256,220,24,26,24,18,22] ,
	[232,244,20,22,26,22,24] ,
	[232,244,22,18,28,24,22]
];

var hitpoint = function() {
	// 生命＝（基本成長率＋初期ステータス耐久値×１．２）×Ｌｖ
	return parseInt( ( job_addition[job][0] + i_vit * 12 ) *0.1 * lv );
};

var mentalpoint = function() {
	// 気合＝（基本成長率＋初期知力値×１．２）×Ｌｖ
	return parseInt( ( job_addition[job][1] + i_itl * 12 ) *0.1 * lv );
};

/**
 * 職業を選択した後の初期振り値
 */
var jobselect = function() {
	i_str = job_base[job][0];
	i_vit = job_base[job][1];
	i_agl = job_base[job][2];
	i_itl = job_base[job][3];
	i_cha = job_base[job][4];
	i_earth = job_base[job][5];
	i_water = job_base[job][6];
	i_fire = job_base[job][7];
	i_wind = job_base[job][8];
};

/**
 * 初期振り＋レベルによる基本ステータス計算
 */
var statuscalc = function() {
	// 初期ステータス値＋（基本成長率＋初期ステータス値×０．１）×（Ｌｖ－１）
	str = i_str + ( job_addition[job][2] + i_str) *0.1* ( lv - 1) ;
	vit = i_vit + ( job_addition[job][3] + i_vit) *0.1* ( lv - 1) ;
	agl = i_agl + ( job_addition[job][4] + i_agl) *0.1* ( lv - 1) ;
	itl = i_itl + ( job_addition[job][5] + i_itl) *0.1* ( lv - 1) ;
	cha = i_cha + ( job_addition[job][6] + i_cha) *0.1* ( lv - 1) ;
};

/**
 * 属性ステータス計算
 */
var magicelement = function() {
	// 初期ステータス値＋（初期ステータス値÷２）×（Ｌｖ－１）
	earth = i_earth + ( i_earth / 2 ) * ( lv - 1);
	water = i_water + ( i_water / 2 ) * ( lv - 1);
	fire = i_fire + ( i_fire / 2 ) * ( lv - 1);
	wind = i_wind + ( i_wind / 2 ) * ( lv - 1);
};

/**
 * ステータスのトータル再計算。複数関数をまとめる。
 */
var recalcStatus = function() {
	setLevel();
	statuscalc();
	magicelement();
	sumStatus();
	trainCalc();
}

/**
 * 初期振りとレベルの値を取得。
 */
var getInitialStatus = function() {
	//lv = $("#lv").val();
	i_str = parseInt($("#i_str").val());
	i_vit = parseInt($("#i_vit").val());
	i_agl = parseInt($("#i_agl").val());
	i_itl = parseInt($("#i_itl").val());
	i_cha = parseInt($("#i_cha").val());
}

var changejob = function () {
	job = $("#selectjob").val();
	jobselect();
	$("#i_str").val(i_str);
	$("#i_vit").val(i_vit);
	$("#i_agl").val(i_agl);
	$("#i_itl").val(i_itl);
	$("#i_cha").val(i_cha);
	$("#lv").val(lv);
	sumStatus();
};

var sumStatus = function() {
	$("#str").val( parseInt(str));
	$("#vit").val( parseInt(vit));
	$("#agl").val( parseInt(agl));
	$("#itl").val( parseInt(itl));
	$("#cha").val( parseInt(cha));
	$("#earth").val( parseInt(earth));
	$("#water").val( parseInt(water));
	$("#fire").val( parseInt(fire));
	$("#wind").val( parseInt(wind));
	$("#hp").val( hitpoint() );
	$("#mp").val( mentalpoint() );
};

var setLevel = function() {
	var str_add = parseInt( $("#str_add").val());
	var vit_add = parseInt( $("#vit_add").val());
	var agl_add = parseInt( $("#agl_add").val());
	var itl_add = parseInt( $("#itl_add").val());
	var cha_add = parseInt( $("#cha_add").val());
	var earth_add = parseInt( $("#earth_add").val());
	var water_add = parseInt( $("#water_add").val());
	var fire_add = parseInt( $("#fire_add").val());
	var wind_add = parseInt( $("#wind_add").val());
	var hp_add = parseInt( $("#hp_add").val());
	var mp_add =parseInt( $("#mp_add").val());

	var trainCount = str_add + vit_add + agl_add + itl_add + cha_add + earth_add + water_add + fire_add + wind_add + hp_add + mp_add;
	lv = 10 + parseInt(trainCount / 3);

	if ( lv >= lv_max ) {
		lv = lv_max;
	}
	$("#lv").val(lv);
}

var trainCalc = function() {
	var str = $("#str").val();
	var vit = $("#vit").val();
	var agl = $("#agl").val();
	var itl = $("#itl").val();
	var cha = $("#cha").val();
	var earth = $("#earth").val();
	var water = $("#water").val();
	var fire = $("#fire").val();
	var wind = $("#wind").val();
	var hp = $("#hp").val();
	var mp = $("#mp").val();

	i_str = parseInt($("#i_str").val());
	i_vit = parseInt($("#i_vit").val());
	i_agl = parseInt($("#i_agl").val());
	i_itl = parseInt($("#i_itl").val());
	i_cha = parseInt($("#i_cha").val());

	var str_add = parseInt( $("#str_add").val());
	var vit_add = parseInt( $("#vit_add").val());
	var agl_add = parseInt( $("#agl_add").val());
	var itl_add = parseInt( $("#itl_add").val());
	var cha_add = parseInt( $("#cha_add").val());
	var earth_add = parseInt( $("#earth_add").val());
	var water_add = parseInt( $("#water_add").val());
	var fire_add = parseInt( $("#fire_add").val());
	var wind_add = parseInt( $("#wind_add").val());
	var hp_add = parseInt( $("#hp_add").val());
	var mp_add =parseInt( $("#mp_add").val());

	var trainCount = str_add + vit_add + agl_add + itl_add + cha_add + earth_add + water_add + fire_add + wind_add + hp_add + mp_add;
	var maxTrainCount = ( lv_max - 10 ) *3;
	lv = parseInt( $("#lv").val());

	message = "訓練を行うステータスのボタンを押して訓練回数を指定してください";
	i_all = i_str + i_vit + i_agl + i_itl + i_cha;
	if ( i_all < 30 ) {
		message ="初期能力に " + (30 - i_all) + "ポイント追加できます";
	} else if ( i_all > 30 ) {
		message ="初期能力が " + (i_all-30) + "ポイント超過しています";
	} else {

	}

	if ( trainCount > maxTrainCount ) {
		message = "訓練回数の上限を超えています。現在：" + trainCount + "/最大合計：" + maxTrainCount;
	}

	$("#message").text(message);
	rate = $("#trainingRate").val();

	str_ex = parseInt( $("#str_add").val() * ( 5 + rate*0.25) ) + parseInt(str);
	vit_ex = parseInt( $("#vit_add").val() * ( 5 + rate*0.25) ) + parseInt(vit);
	agl_ex = parseInt( $("#agl_add").val() * ( 5 + rate*0.25) ) + parseInt(agl);
	itl_ex = parseInt( $("#itl_add").val() * ( 5 + rate*0.25) ) + parseInt(itl);
	cha_ex = parseInt( $("#cha_add").val() * ( 5 + rate*0.25) ) + parseInt(cha);
	earth_ex = parseInt( $("#earth_add").val() * ( 5 + rate*0.25) ) + parseInt(earth);
	water_ex = parseInt( $("#water_add").val() * ( 5 + rate*0.25) ) + parseInt(water);
	fire_ex = parseInt( $("#fire_add").val() * ( 5 + rate*0.25) ) + parseInt(fire);
	wind_ex = parseInt( $("#wind_add").val() * ( 5 + rate*0.25) ) + parseInt(wind);
	hp_ex = parseInt( $("#hp_add").val() * ( 60 + rate*2.5) ) + parseInt(hp);
	mp_ex = parseInt( $("#mp_add").val() * ( 60 + rate*2.5) ) + parseInt(mp);

	$("#str_ex").val(str_ex);
	$("#vit_ex").val(vit_ex);
	$("#agl_ex").val(agl_ex);
	$("#itl_ex").val(itl_ex);
	$("#cha_ex").val(cha_ex);
	$("#earth_ex").val(earth_ex);
	$("#water_ex").val(water_ex);
	$("#fire_ex").val(fire_ex);
	$("#wind_ex").val(wind_ex);
	$("#hp_ex").val(hp_ex);
	$("#mp_ex").val(mp_ex);
};

var pushStatus = function(target) {
	buttonId = target.id;
	position_status_name = buttonId.indexOf("_");
	position_status_method = buttonId.indexOf("_" , position_status_name +1);
	status_name = buttonId.substring(0,position_status_name);
	status_method = buttonId.substring(position_status_name+1 , position_status_method);
	status_value = buttonId.substring(position_status_method+1);

	// 計算方法を決定
	status_sign = ( status_method == 'minus') ? -1 : 1;
	status_add_element = status_name + "_add";

	status_add_value = parseInt($("#"+status_add_element ).val());
	status_add_value += status_sign * status_value;

	if ( status_add_value < status_min ) {
		status_add_value = status_min;
	} else if (status_add_value > status_max) {
		status_add_value = status_max;
	}
	$("#"+status_add_element ).val(status_add_value);

	getInitialStatus();
	job = $("#selectjob").val();
	recalcStatus();
};

var baseStatus=function(target) {
	buttonId = target.id;
	status_button_name = buttonId.substring(2);
	position_status_method = status_button_name.indexOf("_");
	// i_str_add
	status_method = status_button_name.substring(position_status_method+1);
	status_sign = ( status_method == 'minus') ? -1 : 1;

	status_add_element = "i_" +buttonId.substring(2,position_status_method +2);
	status_add_value = parseInt($("#"+status_add_element ).val());
	status_add_value += status_sign;

	if ( status_add_value < base_status_min ) {
		status_add_value = base_status_min;
	} else if (status_add_value > base_status_max) {
		status_add_value = base_status_max;
	}
	$("#"+status_add_element ).val(status_add_value);
	getInitialStatus();
	job = $("#selectjob").val();
	recalcStatus();
};
