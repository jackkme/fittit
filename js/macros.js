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

  function calcMacro(){
		var tdee = $("#tdeeMacro").val();
		var lbs = $("#lbs").val(); 
		var kilo = $("#kilo").val();
		//Convert Imperial to metric
		if(lbs != undefined){
			kilo = lbs * 0.453592;
		}
		switch($(" #formMacros input[name=macro]:checked ").val())
		{
		case "normal":
			var protein = Math.round(1.763696 * kilo);
			var fat = Math.round(0.771617 * kilo);
			var carb = Math.round((tdee - ((protein * 4.1) + (fat * 8.8))) / 4.1);
		break;
		case "textbook":
			var protein = Math.round((tdee*0.25)/4.1);
			var fat = Math.round((tdee*0.25)/8.8);
			var carb = Math.round((tdee*0.5)/4.1);
		break;
		case "bodybuilder":
		    var protein = Math.round((tdee*0.4)/4.1);
			var fat = Math.round((tdee*0.2)/4.1);
			var carb = Math.round((tdee*0.4)/4.1);
		break;
		case "zone":
			var protein = Math.round((tdee*0.3)/4.1);
			var fat = Math.round((tdee*0.3)/8.8);
			var carb = Math.round((tdee*0.4)/4.1);		
		break;
		case "lowf":
			var protein = Math.round((tdee*0.25)/4.1);
			var fat = Math.round((tdee*0.15)/8.8);
			var carb = Math.round((tdee*0.6)/4.1);			
		break;
		case "lowc":
			var protein = Math.round((tdee*0.4)/4.1);
			var fat = Math.round((tdee*0.35)/8.8);
			var carb = Math.round((tdee*0.25)/4.1);			
		break;
		case "keto":
			var protein = Math.round((tdee*0.3)/4.1);
			var fat = Math.round((tdee*0.65)/8.8);
			var carb = Math.round((tdee*0.05)/4.1);			
		break;
		default:
			var protein = Math.round(1.763696 * kilo);
			var fat = Math.round(0.771617 * kilo);
			var carb = Math.round((tdee - ((protein * 4.1) + (fat * 8.8))) / 4.1);
		break;	
		}
		$("#protein").html(protein);
		$("#carbs").html(carb);
		$("#fats").html(fat);
		setTimeout(drawChart(protein*4.1, carb*4.1, fat*8.8), 200);
	};
 //call function when radio buttons change	
 $('input:radio[name="macro"]').change(calcMacro);
 //call function on load
 calcMacro();
 
 function drawChart(protein, carb, fat) {

  var data = google.visualization.arrayToDataTable([
    ['Macro', 'Percentage'],
    ['Protein',     protein],
    ['Carb',      carb],
    ['Fat',  fat],
  ]);

  var options = {
 fontName: 'DejaVu',
    backgroundColor: 'transparent',
    title: '',
    pieSliceBorderColor: 'transparent',
    slices: {
      0: { color: '#f7df7c' },
      1: { color: '#e44d26' },
      2: { color: '#0070ba' },
      },
      tooltip:{
      text: 'percentage',
      },
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}
//setTimeout(drawChart, 2000);
