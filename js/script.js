$(document).ready(function () {	

//get Parameter from url
function getUrlParameter(sParam)
{
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++) 
	{
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) 
		{
			return sParameterName[1];
		}
	}
}

//Array of all ="name" (variable of the Attr)
var names = [getUrlParameter('system'), getUrlParameter('gender'), getUrlParameter('age'), getUrlParameter('kilo'), getUrlParameter('centi'),
			getUrlParameter('lbs'), getUrlParameter('foot'), getUrlParameter('inch'), getUrlParameter('activity'), getUrlParameter('formula'),
			getUrlParameter('bfp')];
//Array of all "name"= (Attr)
var nameAttr = ["system", "gender", "age", "kilo", "centi", "lbs", "foot", "inch", "activity", "formula", "bfp"]

//When page loads, put the params in the inputs
for(i=0; i<11; i++){
	if(names[i] != undefined){
		//console.log(nameAttr[i] + ": " +names[i]);
		//console.log($('#' + nameAttr[i]).val());
		if($('#' + nameAttr[i]).val() == undefined){
			$('#' + names[i]).prop('checked', true);
		}
		$('#' + nameAttr[i]).val(names[i]);
	}
}

//change metric/imperial system	when loaded
if($("#formStats input[name=system]:checked").val() == "imperial"){
	$('.metric').css("display", "none");
	$('.imperial').css("display", "initial");
	$("#inch").prop('disabled', false);
	$("#foot").prop('disabled', false);
	$("#lbs").prop('disabled', false);
	$("#centi").prop('disabled', true);
	$("#kilo").prop('disabled', true);
} else {
	$('.imperial').css("display", "none");
	$('.metric').css("display", "initial");
	$("#inch").prop('disabled', true);
	$("#foot").prop('disabled', true);
	$("#lbs").prop('disabled', true);
	$("#centi").prop('disabled', false);
	$("#kilo").prop('disabled', false);
}

//change mifflin/katch
if( $("#formTdee input[name=formula]:checked").val() == "katch"){
	$("#bfp").prop('disabled', false);
} else {
	$("#bfp").prop('disabled', true);
}

});

//change metric/imperial system		
$('input:radio[name="system"]').change(
function (){
	if( $( this ).val() == "metric"){
		$("#inch").prop('disabled', true);
		$("#foot").prop('disabled', true);
		$("#lbs").prop('disabled', true);
		$("#centi").prop('disabled', false);
		$("#kilo").prop('disabled', false);
	} else {
		$("#inch").prop('disabled', false);
		$("#foot").prop('disabled', false);
		$("#lbs").prop('disabled', false);
		$("#centi").prop('disabled', true);
		$("#kilo").prop('disabled', true);
	}
    $('.imperial').toggle();
    $('.metric').toggle()
});

//change mifflin/katch
$('input:radio[name="formula"]').change(
function(){
	if( $( this ).val() == "mifflin"){
		$("#bfp").prop('disabled', true);
	} else {
		$("#bfp").prop('disabled', false);
	}
});

//change url	
 function formSubmit(id){
	var form1 = $('#formStats').serialize();
	var form2 = $(id).serialize();
	var dat = form1 + '&' + form2;
	window.location.href = "?" + dat;
	//Ajax test;
    //$.ajax({
    //    url : '',
    //    type: "GET",
    //    data: dat,
        //success: function (data) {
		//	alert(dat);
        //},
    //    error: function (jXHR, textStatus, errorThrown) {
    //        alert(errorThrown);
    //    }
    //});
};
