$(document).ready(function(){
	// collect.init();
});

function getAvatarImgUrl(user) {
    return `https://avatars.githubusercontent.com/${user}`;
}

var collect = {
	load : function(){
		console.log('commit collect!');
		let date = moment();
		let today = date.format("YYYY-MM-DD");
		let yesterday =  date.subtract('days',1).format("YYYY-MM-DD");

		// var __is_main = '{{ is_main }}'
		return $.ajax({
			url : '/attendance/collect/?start='+yesterday+'&end='+today+'',
			// datatype : 'json',
			method : 'GET',
			data : {
				// 'is_main' : __is_main
			}
		});
	},
	init : function(){
		collect.load()
		collect.__interval.make();
	},
	__interval : {
		obj : -1,
		// 1분에 한번 새로고침
		time : 60 * 1000,
		last_updated_time : new Date(),
		make : function(){
			this.obj = setInterval(()=>{
				collect.load()
			} , this.time);
		},
		clear : function(){
			clearInterval(this.obj);
		}
	},
	refresh : function(){
		collect.__interval.clear();
		collect.init();
	}
}