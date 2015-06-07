$(document).ready(function () {	

var lbs = $("#lbs").val();
var foot = $("#foot").val(); 
var inch = $("#inch").val();
var kilo = $("#kilo").val();
var centi = $("#centi").val();
var lbm = $("#lbm").val();
var activity = $("#activity").val();
var age = $("#age").val();
//Convert Imperial to metric
if(lbs != undefined && foot != undefined && inch != undefined){
	kilo = lbs * 0.453592;
	centi = (foot * 30.48) + (inch * 2.54);
}


//Calculate TDEE
if($("#formTdee input[name=formula]:checked").val() == "katch" && lbm != undefined)
{
	/*Katch-McArdle equation
	  BMR = 370 + [21.6 x lean mass(kg)]*/
	lbm = kilo * (1 - (1/bfp));
	bmr = 370 + (21.6 * lbm);
}
else if($("#formTdee input[name=formula]:checked").val() == "mifflin") 
{
	/*Mifflin-St Jeor equation
	  Man: BMR = [10 x weight(kg)] + [6.25 x height(cm)] - [5 x age(yrs)] + 5
	  Woman: BMR = [10 x weight(kg)] + [6.25 x height(cm)] - [5 x age(yrs)] - 161*/
	  if($("#formTdee input[name=formula]:checked").val() == "female")
	  {
		  bmr = (10 * kilo) + (6.25 * centi) - (5 * age) - 161;
	  } else {
		  bmr = (10 * kilo) + (6.25 * centi) - (5 * age) + 5;
	  }
	
}

var tdee = Math.round(bmr * activity);
$("#bmr").html(Math.round(bmr));
$("#tdee").html(tdee);
$("#cut").html(tdee-500);
$("#bulk").html(tdee+500);
$("#tdeeMacro").val(tdee);

});
