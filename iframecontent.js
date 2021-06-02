

function sina_ihfc(type){
	$.get("https://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/Market_Center.getNameList?page=1&num=80&sort=symbol&asc=1&node=szgz_qh&_s_r_a=init", function(data){
		console.log(JSON.stringify(data));
		var month = type.substring(2);
		var symbol = type.substring(0, 2);
		if(month == "DY")
			symbol = symbol + data[1].symbol.substring(2);
		else if(month == "XY")
			symbol = symbol + data[2].symbol.substring(2);
		else if(month == "DJ")
			symbol = symbol + data[3].symbol.substring(2);
		else if(month == "XJ")
			symbol = symbol + data[4].symbol.substring(2);
		console.log(symbol);
		var url = "https://finance.sina.com.cn/futures/quotes/" + symbol + ".shtml"; //https://finance.sina.com.cn/futures/quotes/IH2008.shtml
		$("iframe").attr("src", url);
	});
}

function xueqiu(){
	var arr = document.URL.split("/");
	var symbol = arr[arr.length-1];
	symbol = symbol.replace("xueqiu_", "").replace(".html", "");
	console.log(symbol);
	var mkt = "SH";
	if(parseInt(symbol) < 500000)
		mkt = "SZ";
	var url = "https://xueqiu.com/S/" + mkt + symbol; //https://xueqiu.com/S/SH510050
	$("iframe").attr("src", url);
	console.log(url);
	//chrome://flags/ samesite disable
	//alert(url);
}

function xueqiucharts2cols(){
	//https://api.github.com/repos/chengangdev/focus/git/trees/main
	$.get("https://api.github.com/repos/chengangdev/focus/git/trees/main", function(data){
		console.log(JSON.stringify(data));
		var files = data["tree"];
		//console.log(JSON.stringify(files));
		var urls = [];
		for( f of files)
		{
			//console.log(JSON.stringify(f));
			var path = f["path"];
			if(path.match("^xueqiu_") && path.match("html$"))
			{
				//console.log(path);
				path = path.replace(".html", "");
				var url = "https://chengangdev.github.io/Focus/" + path;
				urls.push(url);
			}
		}
		
		console.log(urls);
		var html = "";
		for(i in urls)
		{
			if(i%2 == 0)
			{
				html += "<tr>";
			}
			
			html += "<td>";
			html += "<iframe class=\"xueqiu_kline_wrapper\" scrolling=\"no\" src=\"" + urls[i] + "\">";
			html += "</iframe>";
			html += "</td>";
			
			if(i%2==1 || i == urls.length-1)
			{
				html += "</tr>";
			}
		}
		console.log(html);
		console.log($("tbody"));
		$("tbody").html(html);
		console.log($("tbody"));
	});
}
