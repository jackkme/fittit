function log10(val) {
  return Math.log(val) / Math.LN10;
}

$(document).ready(function () {	
	/*
	 body fat calculator formula for man:
	495/(1.0324-0.19077(LOG(waist-neck))+0.15456(LOG(height)))-450

	body fat calculator formula for woman:
	495/(1.29579-0.35004(LOG(waist+hip-neck))+0.22100(LOG(height)))-450
	 */
	
	if($("#formStats input[name=system]:checked").val() == "imperial"){
		var neck = $("#neckin").val() * 2.54;
		var waist = $("#waistin").val() * 2.54;
		var hip = $("#hipin").val() * 2.54;
		var	centi = ($("#foot").val() * 30.48) + ($("#inch").val() * 2.54);
	}else{
		var neck = $("#neckcm").val() * 1;
		var waist = $("#waistcm").val() * 1;
		var hip = $("#hipcm").val() * 1;
		var centi = $("#centi").val() * 1;
	}
	
	console.log(centi, hip, waist, neck, $("#formStats input[name=gender]:checked").val() );

	if($("#formStats input[name=gender]:checked").val() == "female")
	{
		bfp = 495/(1.29579-0.35004*(log10(hip+waist-neck))+0.22100*(log10(centi)))-450;
	} else {
		bfp = 495/(1.0324-0.19077*(log10(waist-neck))+0.15456*(log10(centi)))-450;
	} 

	$(".bodyfatestimate").html(bfp.toFixed(1));
});
