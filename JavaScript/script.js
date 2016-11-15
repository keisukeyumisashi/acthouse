document.getElementById("remove-child")
 .addEventListener("click", function(){
 	var container =
 	 document.getElementById("container");
 	var children = container.children;
 	//console.log(children);
 	//container.removeChild(children[2]);
 	var firstChild = container.firstChild;
 	var lastChild = container.lastChild;
 	if (lastChild) {
 	container.removeChild(lastChild);
  }
 });

document.getElementById("add-class")
 .addEventListener("click", function(){
 	var e = document.createElement("div");
 	e.setAttribute("class", "child");
 	document.getElementById("container")
 	 .appendChild(e);
 });

document.getElementById("add-child")
 .addEventListener("click", function(){
 	var e = document.createElement("div");
 	document.getElementById("container")
   .appendChild(e);
    });
var timerId,time = 0;
document.getElementById("start")
 .addEventListener("click" ,function(){
 	timerId = setInterval(function(){
 		document.getElementById("timer").innerHTML = time;
 		time++;
 	},1000);
 });
 document.getElementById("stop")
  .addEventListener("click", function(){
   clearInterval(timerId);
  });

document.getElementById("interval")
.addEventListener("click", function(){
	setInterval(function(){
		var div = document.getElementById("div3");
		if (div.style.backgroundColor == "") {
			div.style.backgroundColor = "blue";
		} else {
			div.style.backgroundColor = "";
		}
	},3000)
});


document.getElementById("deley")
.addEventListener("click", function(){
	setTimeout(function(){
		alert("ご登録ありがとうございます！後ほど請求書を送ります");
}, 5000);
});

var imageIndex = 0;
document.getElementById("image")
  .addEventListener("click", function(){
  	var images =
  	["sirokku.jpg",
  	"red.jpg",
  	"sirokku2.jpeg",
  	"sirokku3.jpeg"];
  	this.src = images[imageIndex];
  	if (imageIndex < 3) {
  		imageIndex++;
  	} else {
  		imageIndex = 0;
  	}
  });

  
var p1 = document.getElementById("p1");
    console.log(p1);
    
    var clz = document.getElementsByClassName("p");
    console.log(clz[1].innerHTML);
    
    var tags = document.getElementsByTagName("p");
    console.log(tags[2].innerHTML);

    var oldColor;
    document.getElementById("div1")
    .addEventListener("mouseover",function(){
    	//var div = document.getElementById("div1");
    	oldColor = this.style.backgroundColor;
 
    	this.style.backgroundColor = "#ffcccc";
    });
    div1.addEventListener("mouseout", function(){
    	this.style.backgroundColor = oldColor;
    });

    var div2 = document.getElementById("div2")
    div2.addEventListener("click", function(){
     this.style.backgroundColor = "pink";
    });
     var div2 = document.getElementById("div2")
    div2.addEventListener("mouseover", function(){
     this.style.backgroundColor = "black";
    });
    



   	document.getElementById("open-self")
    .addEventListener('click',function(){
    	location.href = "http://www.yahoo.co.jp";//リンク
    });
    document.getElementById("open-new")
    .addEventListener('click',function(){
    	window,open("http://www.yahoo.co.jp");//別タグウィンドウ
    });


    document.getElementById("btn-while")
    .addEventListener('click',function(){
    	var from = document.getElementById("from").value;
    	var to = document.getElementById("to").value;
    	if (from == "" || to == "") {
    		alert("数字を入力してください");
    		return;
    	}
    	var num = +from;
    	var total = 0;
    	while(num <= +to) {
    		total = total + num;
    		num++;
    	}
    	alert(from + "から" + to + "までの合計は" + total + "です");

    });
    
    function showP1(message, message2) {
    	var p1 = document.getElementById("p1");
    	p1.innerHTML = message;
    	document.getElementById("p2").innerHTML = message2;

    }
    document.getElementById("change-p1")
      .addEventListener('click', function(){
      	document.getElementById("p1").innerHTML = "イベントリスナから変更";
    });	
    function showP4() {
    		var p4 = document.getElementById("p4");
    		p4.innerHTML = "ハイボール";
    	}

    	var btn = document.getElementById("change-p5");
    	btn.addEventListener('click', function() {
      var paragragh5 = document.getElementById("p5");
      paragragh5.innerHTML = "キューバリバー";
    	});

    	document.getElementById("alert")
      .addEventListener('click', function(){
      	alert("hello JavaScript !");
      });

			document.getElementById("confirm")
      .addEventListener('click', function(){
      	var result = confirm("オカマは好きですか？");
      	if (result == true) {
      		alert("今日は駄目ですよ");
      	} else {
      		alert("お願いです。死んでください。");
      	}
      });

			document.getElementById("prompt")
      .addEventListener('click', function(){
      	var response = prompt("あなたの名前を教えてください");
      	alert("ようこそ"+ response + "さん!");
      });
　　　　document.getElementById("btn1")
       .addEventListener('click', function(){
       	 var val = document.getElementById("text1").value;
       	 if (val == "") {
       	 	alert("オカマを入れてください！");
       	} else if (val == "1") {
       		alert("1が入力されました");
       	} else if (val == "あ") {
       		alert("あが入力されました");
       	} else{
       		alert("1以外のものが入力されました");
       	 }
       	});

       document.getElementById("btn2")
       .addEventListener('click', function(){
       	 var val = document.getElementById("text1").value;
       	 switch(val) {
       	 	case '0':
       	 	 alert("0です!");
       	 	 break;
       	 	case '1':
       	 	 alert("1です!");
       	 	 break;
       	 	case '2':
       	 	 alert("2です!");
       	 	 break;
       	 	 case '1':
       	 	 alert("1です!");
       	 	 break;
       	 	default:
       	 	 alert("0,1,2以外です!");
       	 	}
       	 });
       	 
         document.getElementById("btn-array")
       .addEventListener('click', function(){
        var gender = new Array();
        gender[0] = "男";
        gender[1] = "女";
        gender[2] = "不明";
        document.getElementById("array").innerHTML = gender[2];
        var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        document.getElementById("array").innerHTML = month[4];
        for(var i=0; i<month.length; i++) {
        	console.log(month[i]);
        }
        var drink = ["水","お茶","コーラ","お湯","カレー"];
        for(var i=0; i<drink.length; i++) {
        	if (i ==2) {
        		continue;
        	}
        	console.log(drink[i]);
        }
       }); 
