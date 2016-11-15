jQuery(function($){
	var maxLength = 6;
	var memory = "";
	$("#calc").on("click", ".num", function(){
		var num = $(this).text();
		var current = $(".result").text();
		var newVal;
		
		if (current == "0") {
        newVal = num;
    } else if (
    memory.length == 0 ||
    memory.match(/[\+\-\*\/\%]$/)){//opeの後にクリアするように//
      newVal = num;    
		} else {
        newVal = current + num;
		}
		if (newVal.length > maxLength) {
			return;
		}
		$(".result").text(newVal);
		memory = memory + num;
	})
	.on("click", ".clear", function(){
		$(".result").text(0);
		memory = "";
	})
	.on("click", ".ope", function(){
		var ope = $(this).text();
		if (memory.length == 0) {
			memory = $(".result").text() + ope;
		} else if (isEndOpe()){
			memory = memory.replace(/[\+\-\*\/\%]$/, ope);//最後のopeに置き換える// 
		} else {
		memory = memory + ope;
		}	
		if (!isEndOpe()) {
		 if (checkOverflow()) {
			return;
		} else {
      showResult(eval(memory));
    }
	  }
	  })


   
	 .on("click", ".secret", function(){
	 	$("#calc").toggleClass("pari").toggleClass("ny");
	 	$("#calc .iro").toggleClass("kuro");
	 })


	.on("click", ".eq", function(){
		new Audio("images/retro25.mp3").play();
		if (isEndOpe()) {
			return;
		}
		//var result = eval(memory);
		if (!checkOverflow()) {
			showResult(eval(memory));
			memory = "";
		}
	}).on("click", ".switch", function(){
		var current = $(".result").text();
		if (current == "0") {
			return;
		}
		var newVal;
		if (current.startsWith("-")) {
			newValue = current.replace(/^\-?/,"");
		} else {
			newValue = "-" + current;
		}
		showResult(newValue);
	})
	.on("click", ".button", function(){

		console.log(memory);
	});
   
   var isEndOpe = function(){
    return memory.match(/[\+\-\*\/\%]$/);
   };
   var checkOverflow = function(){
   	var result = eval(memory);
   	if (result && result.toString().length > maxLength) {//toStringは文字列に変える//
   		alert("桁数オーバーフロー");
   		showResult(0);
   		memory = "";
   		return true;
   	}
   	return false;
   };

	function showResult(value) {
    $(".result").text(value);
	}


});
//この下は何も書かない//