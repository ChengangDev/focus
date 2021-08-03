

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
	symbol = symbol.replace(".html", "");
	symbol = symbol.replace("xueqiu_", "");
	symbol = symbol.replace("xueqiuetf_", "");
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

function xueqiucharts2cols(starts){
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
			var pattern = "^" + starts;
			if(path.match(pattern) && path.match("html$"))
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

function components(type){
	var headers = {
		"SECURITY_CODE":"SEC_CODE",
		"SECURITY_NAME_ABBR":"SEC_NAME",
		"CLOSE_PRICE":"SEC_CLOSE",
		"INDUSTRY":"SEC_INDUSTRY",
		"REGION":"SEC_REGION",
		"WEIGHT":"WEIGHT",
		"EPS":"EPS",
		"BPS":"BPS",
		"ROE":"ROE",
		"TOTAL_SHARES":"TOTAL",
		"FREE_SHARES":"FREE",
		"FREE_CAP":"FREE_CAP",
		"f2":"SEC_PRICE",
		"f3":"INCREASE",
	};
	//https://datacenter-web.eastmoney.com/api/data/v1/get?sortColumns=WEIGHT&sortTypes=-1&pageSize=500&pageNumber=1&reportName=RPT_INDEX_TS_COMPONENT&columns=SECURITY_CODE%2CSECURITY_NAME_ABBR%2CCLOSE_PRICE%2CINDUSTRY%2CREGION%2CWEIGHT%2CEPS%2CBPS%2CROE%2CTOTAL_SHARES%2CFREE_SHARES%2CFREE_CAP&quoteColumns=f2%2Cf3&source=WEB&client=WEB&filter=(TYPE%3D%224%22)
	$.get("https://datacenter-web.eastmoney.com/api/data/v1/get?sortColumns=WEIGHT&sortTypes=-1&pageSize=500&pageNumber=1&reportName=RPT_INDEX_TS_COMPONENT&columns=SECURITY_CODE%2CSECURITY_NAME_ABBR%2CCLOSE_PRICE%2CINDUSTRY%2CREGION%2CWEIGHT%2CEPS%2CBPS%2CROE%2CTOTAL_SHARES%2CFREE_SHARES%2CFREE_CAP&quoteColumns=f2%2Cf3&source=WEB&client=WEB&filter=(TYPE%3D%22"+type+"%22)", function(data){
		//console.log(data);
		var result = JSON.parse(data);
		var coms = result["result"]["data"];
		//console.log(JSON.stringify(coms));
		var html = "";
		for(i in coms)
		{
			var sec = coms[i];
			if(i == 0)
			{
				html += "<thead><tr>";
				for(col in sec)
				{
					html += "<th>" + headers[col] + "</th>";
				}
				html += "</tr></thead>";
				html += "<tbody>";
			}
			
			html += "<tr>";
			for(col in sec)
			{
				if(col == "SECURITY_CODE")
				{
					var mkt = "SH";
					if(parseInt(sec[col]) < 500000)
						mkt = "SZ";
					var url = "https://xueqiu.com/S/" + mkt + sec[col]; //https://xueqiu.com/S/SH510050
					html += "<td><a target=\"_blank\" href=\"" + url + "\">" + sec[col] + "</a></td>";
				}
				else
				{
					html += "<td>" + sec[col] + "</td>";
				}
			}
			html += "</tr>";
			
		}
		html += "</tbody>";
		//console.log(html);
		//console.log($("table"));
		$("table").html(html);
		//console.log($("table"));
	});
}

function selectIndex()
{
	var x = document.getElementById("index").value;
	components(x);
}
