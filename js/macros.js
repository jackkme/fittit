//Calculate Macros

/*Potein/Carbs = 4.1 kcal/g
  Fats = 8.8 kcal/g
  src: http://en.wikipedia.org/wiki/Food_energy 

/u/sknick_ :

Assuming you are not obese, your macros would be:

    Protein = .8g per lb of bodyweight (Total protein calories = result * 4.1)
    * Protein = 1.763696g per kg 
    Fat = .35g per lb of bodyweight (Total fat calories = result * 8.8)
    * Fat = 0.771617g per kg
    Carbs = Take your modified TDEE from above & subtract the protein & fat calories you just calculated. The calories remaining come from carbs. 
             Divide the # of calories by 4.1 to get the # of grams of carbs.

Other Macro formulas (take modified TDEE & multiply by percentages):

Textbook
    P - 25%
    F - 25%
    C - 50%

Bodybuilder (outdated)
    P - 40%
    F - 20%
    C - 40%

Zone Diet
    P - 30%
    F - 30%
    C - 40%

Low Fat
    P - 25%
    F - 15%
    C - 60%

Low Carb
    P - 40%
    F - 35%
    C - 25%

Ketogenic (Atkins)
    P - 30%
    F - 65%
    C - 5%
 */

 //macro calculator

 $(document).ready(function(){
  function calcMacro(){
		var tdee = $("#tdeeMacro").val();
		var lbs = $("#lbs").val(); 
		var kilo = $("#kilo").val();
		var protein;
		var fat;
		var carb;
		//Convert Imperial to metric
		if(lbs != undefined){
			kilo = lbs * 0.453592;
		}
		switch($(" #formMacros input[name=macro]:checked ").val())
		{
		case "normal":
			protein = Math.round(1.763696 * kilo);
			fat = Math.round(0.771617 * kilo);
			carb = Math.round((tdee  - ((protein * 4.1) + (fat * 8.8))) / 4.1);
		break;
		case "textbook":
			protein = Math.round((tdee*0.25)/4.1);
			fat = Math.round((tdee*0.25)/8.8);
			carb = Math.round((tdee*0.5)/4.1);
		break;
		case "bodybuilder":
		    protein = Math.round((tdee*0.4)/4.1);
			fat = Math.round((tdee*0.2)/4.1);
			carb = Math.round((tdee*0.4)/4.1);
		break;
		case "zone":
			protein = Math.round((tdee*0.3)/4.1);
			fat = Math.round((tdee*0.3)/8.8);
			carb = Math.round((tdee*0.4)/4.1);		
		break;
		case "lowf":
			protein = Math.round((tdee*0.25)/4.1);
			fat = Math.round((tdee*0.15)/8.8);
			carb = Math.round((tdee*0.6)/4.1);			
		break;
		case "lowc":
			protein = Math.round((tdee*0.4)/4.1);
			fat = Math.round((tdee*0.35)/8.8);
			carb = Math.round((tdee*0.25)/4.1);			
		break;
		case "keto":
			protein = Math.round((tdee*0.3)/4.1);
			fat = Math.round((tdee*0.65)/8.8);
			carb = Math.round((tdee*0.05)/4.1);			
		break;
		default:
			protein = Math.round(1.763696 * kilo);
			fat = Math.round(0.771617 * kilo);
			carb = Math.round((tdee - ((protein * 4.1) + (fat * 8.8))) / 4.1);
		break;	
		}
		$("#protein").html(protein);
		$("#carbs").html(carb);
		$("#fats").html(fat);
		drawChart(protein*4.1, carb*4.1, fat*8.8);
	};

 //call function when radio buttons change	
 $('input:radio[name="macro"]').change(calcMacro);
 //call function on load
 calcMacro();

  //set default values
$('#normal').prop('checked', true);
 

//chartist.js setup

function drawChart(p, c, f){

var data = {
	labels: ['Protein', 'Carbs', 'Fat'],
	series: [p, c, f]
};

var sum = function(a, b) { return a + b };

var options = {
	labelInterpolationFnc: function(value) {
		return Math.round(value / data.series.reduce(sum) * 100) + '%';
	}
};

var responsiveOptions = [
  ['screen and (min-width: 640px)', {
    chartPadding: 30,
    labelOffset: 100,
    labelDirection: 'explode',
    labelInterpolationFnc: function(value) {
      return value;
    }
  }],
  ['screen and (min-width: 1024px)', {
    labelOffset: 80,
    chartPadding: 20,
    labelInterpolationFnc: function(value) {
      return value;
    }
  }]
];

new Chartist.Pie('#piechart', data, options, responsiveOptions);
}

});
//setTimeout(drawChart, 2000);
