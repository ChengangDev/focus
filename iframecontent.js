
function sina_ihfc(type){
	$.get("http://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/Market_Center.getNameList?page=1&num=80&sort=symbol&asc=1&node=szgz_qh&_s_r_a=init", function(data){
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