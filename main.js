var ie = getXmlHttp();
var width_of_table; 
var height_of_table;
Array.prototype.shuffle = function() {
	for (var i = this.length - 1; i > 0; i--) {
		var num = Math.floor(Math.random() * (i + 1));
		var d = this[num];
		this[num] = this[i];
		this[i] = d;
	}
	return this;
}
function getXmlHttp(){
	var xmlhttp;
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			xmlhttp = false;
		}
	}
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}
var images = [];
function load_data(callback){
	images = ["https://kde.link/test/1.png","https://kde.link/test/2.png","https://kde.link/test/9.png","https://kde.link/test/7.png","https://kde.link/test/6.png","https://kde.link/test/3.png","https://kde.link/test/4.png","https://kde.link/test/0.png","https://kde.link/test/5.png","https://kde.link/test/8.png"];
	ie.open("GET", "https://kde.link/test/get_field_size.php" ,true)
	ie.onreadystatechange =  function (){
		try {
			if (ie.readyState == 4) {

				if (ie.status == 200) {
					var response = JSON.parse(ie.responseText)
					width_of_table = response.width;
					height_of_table = response.height;
					callback();
				} else {
					alert("Не удалось получить данные:\n" +
					ie.statusText);
				}
			}
		}
		catch( e ) {
			//alert('Ошибка: ' + e.description);
		}
	}
	ie.send(null);
}
function start_new_game(){	
	var temp_mass =[];
	var completed =[];
	var last = [];
	var counter = 0;
	document.getElementById('main_table').innerHTML = '<input id="but" class="but" type="button" value="START NEW GAME" onclick="load_data(start_new_game)">';
	//document.getElementById('main_table').innerHTML += "Размер поля:"+width_of_table+" х "+height_of_table+"<br />";
	for(i=0;i<(width_of_table*height_of_table/2);i++){
		for(var t=0;t<2;t++){
			temp_mass.push(images[i%images.length]);
		}
	}
	temp_mass = temp_mass.shuffle();
	for(i=0;i<(width_of_table*height_of_table);i++){
		now_pic = temp_mass[i];
		document.getElementById('main_table').innerHTML += '<div class="picture_box" id="pic_'+i+'"><img class="pics" style="opacity: 0" checked alt="" src='+now_pic+'></img></div>';
	}
	document.getElementById('main_table').style.width = (width_of_table*102) + "px";
	$(".pics").on("click", function(){
		
		if($(this).css("opacity") == 1) 
			return;
		if(counter == 2){ 
			if (last[0].attr("src")!=last[1].attr("src")) {
				last[0].css("opacity", "0");
				last[1].css("opacity", "0");
			}
			
			counter = 0;
			last = [];}

		last.push($(this));
		$(this).css("opacity", "1");			
		if(counter == 1 && last[0].attr("src")==last[1].attr("src")){
			completed.push($(this));
		}
		op1 = document.body.innerHTML.split("style=\"opacity");
		if(completed.length == (op1.length-1)/2){
			alert("You WIN!");
			completed = [];
		}

		counter++;
	});
}