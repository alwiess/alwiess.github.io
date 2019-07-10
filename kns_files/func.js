var Func = {folders: {}};
Func.folders.static = ["costume", "dirt", "wound", "drown", "poisoning", "disease"];
Func.folders.animationCode = ["base", "eyes", "forepaw_left", "forepaw_right", "body", "head", "tail", "ear_left", "ear_right", "breast", "tuft", "neck", "belly", "hindpaw_left", "hindpaw_right", "base_tail", "base_mane", "base_ears", "base_hair", "eye_right", "mane", "hair"];
Func.folders.animationLayers = ["base", "hindpaw_left", "hindpaw_right", "breast", "neck", "body", "forepaw_left", "forepaw_right", "belly", "head", "base_mane", "mane", "tuft", "base_ears", "ear_left", "ear_right", "base_hair", "hair", "base_tail", "tail", "eyes", "eye_right", "costume", "dirt", "wound", "drown", "poisoning", "disease"];

//"base", "hindpaw_left", "hindpaw_right", "body", "forepaw_left", "forepaw_right", "belly", "head", "breast", "neck", "base_mane", "mane", "base_ears", "ear_left", "ear_right", "base_hair", "hair", "base_tail", "tail", "tuft", "eyes", "eye_right", "costume", "dirt", "wound", "drown", "poisoning", "disease"

Func.type = {tail: "base_tail", mane: "base_mane", hair: "base_hair", ear_left: "base_ears", ear_right: "base_ears", tuft: "base_ears"};
Func.isGenerate = false;
Func.times = {
	1: {
		base: {
			1: [1000, 200, 200, 300],
			2: [1000, 200, 200, 300],
			3: [1000, 200, 200, 300],
			4: [1000, 200, 200, 300],
			5: [1000, 200, 200, 300],
			6: [1000, 200, 200, 300],
			7: [1000, 200, 200, 300],
			8: [1000, 200, 200, 300],
			9: [1000, 200, 200, 300],
			10: [1000, 200, 200, 300],
			11: [1000, 200, 200, 300],
			12: [1000, 200, 200, 300],
			13: [1000, 200, 200, 300],
			14: [1000, 200, 200, 300],
			15: [1000, 200, 200, 300],
			16: [1000, 200, 200, 300],
			17: [1000, 200, 200, 300],
			18: [1000, 200, 200, 300],
			19: [1000, 200, 200, 300],
			20: [1000, 200, 200, 300],
			21: [1000, 200, 200, 300],
			22: [1000, 200, 200, 300],
			23: [1000, 200, 200, 300],
			24: [1000, 200, 200, 300],
			25: [1000, 200, 200, 300, 1000, 100, 100, 100],
			26: [1000, 200, 200, 300, 1000, 100, 100, 100],
			27: [1000, 200, 200, 300, 1000, 100, 100, 100],
			28: [1000, 200, 200, 300, 1000, 100, 100, 100],
			29: [1000, 200, 200, 300, 1000, 100, 100, 100],
			30: [1000, 200, 200, 300, 1000, 100, 100, 100],
			31: [1000, 200, 200, 300, 1000, 100, 100, 100],
			32: [1000, 200, 200, 300, 1000, 100, 100, 100],
			33: [1000, 200, 200, 300, 1000, 100, 100, 100],
			34: [1000, 200, 200, 300, 1000, 100, 100, 100],
			35: [1000, 200, 200, 300, 1000, 100, 100, 100],
			36: [1000, 200, 200, 300, 1000, 100, 100, 100],
			37: [1000, 200, 200, 300, 1000, 100, 100, 100],
			38: [1000, 200, 200, 300, 1000, 100, 100, 100],
			39: [1000, 200, 200, 300, 1000, 100, 100, 100],
			40: [1000, 200, 200, 300, 1000, 100, 100, 100],
			41: [1000, 200, 200, 300, 1000, 100, 100, 100],
			42: [1000, 200, 200, 300, 1000, 100, 100, 100],
			43: [1000, 200, 200, 300, 1000, 100, 100, 100],
			44: [1000, 200, 200, 300, 1000, 100, 100, 100],
			45: [1000, 200, 200, 300, 1000, 100, 100, 100],
			46: [1000, 200, 200, 300, 1000, 100, 100, 100],
		},
		base_tail: {
			1: [5000, 100, 100, 100],
			2: [5000, 100, 100, 100],
			3: [5000, 100, 100, 100],
			4: [5000, 100, 100, 100],
			5: [5000, 100, 100, 100],
		},
		"body": [1000, 200, 200, 300],
		"tail": [5000, 100, 100, 100],
		"hindpaw_left": [1000, 200, 200, 300],
	},
};

Func.getHTML = function(name, id, size, cl, act, i, arr) {
	if (id == "0") {
		return;
	}
	var result = "";

	var base_type;
	var parent = Func.type[name];
	if (parent) {
		base_type = +arr[parent][0].split("/")[0];
		id = base_type + "/" + id;
	}

	if (!base_type) {
		base_type = id.split("/");
		base_type = (base_type[1] ? base_type[0] : undefined);
	}
	var times = Func.times[act] && Func.times[act][name];
	if (base_type && times && !(times instanceof Array)) {
		times = times[base_type];
	}
	if (typeof times == "object" && !(times instanceof Array)) {
		times = times[id];
	}
	var isAnimation = !!times;
	var frames = (isAnimation ? times.length : 1);

	result += "<div style=\"" + Func.getUrlStyle(act, name, id) + (isAnimation ? "width:" + size + "px;" : "" ) + "background-size:" + frames * 100 + "%\"";

	cl = (i == 1 ? cl : "");
	cl = (isAnimation ? (cl + " animation").trim() : cl);
	if (cl) {
		result += " class='" + cl + "'";
	}

	if (isAnimation) {
		var uniqid = "anim" + (Math.random() + "").substr(2);
		result += ' id="' + uniqid + '"';
		var frame = 0, el;
		setTimeout(function anim() {
			if (!el) {
				el = $("#" + uniqid);
				if (el.length < 1) {
					return;
				}
				el.removeAttr("id");
			}

			frame++;
			if (frame >= times.length) {
				frame = 0;
			}
			el.css("background-position", -frame * size + "px 0");

			setTimeout(anim, times[frame]);
		}, times[0]);
	}

	result += '>';
	return result;
};

Func.generateHTMLofCat = function(arr, size, cl, act, url, layersProperty) {
	var i = 1;
	var result = "";
	if (url) {
		result = "<div style=\"background-image:url('" + url + "');background-size:" + size + "%;\" class='" + cl + "'>";
		i++;
	}

	for (var a in Func.folders[layersProperty]) {
		var folder = Func.folders[layersProperty][a];
		var ids = arr[folder];
		if (ids === undefined) {
			continue;
		}

		for (var j = ids.length - 1; j >= 0; j--) {
			if (ids[j] === undefined) {
				continue;
			}

			var html = Func.getHTML(folder, ids[j], size, cl, act, i, arr);
			if (html) {
				i++;
				result += html;
			}
		}
	}

	for (j = 0; j < i; j++) {
		result += '</div>';
	}
	return result;
};

Func.showCat = function(code, size, type, act, factors, dirt, costume) {
	size = 55 + 10 * (isNaN(size) ? 4.5 : size);
	size = Math.round(size);
	var cl = ['d', 'e', 'f'][type || 0];
	act = act || 0;
	factors = factors || {};

	var isAnimation = !Func.isGenerate;
	var layersProperty = (isAnimation ? "animationLayers" : "static");
	var codeProperty = (isAnimation ? "animationCode" : "static");
	var url;
	if (code.indexOf(" ") == -1) {
		url = "/cw3/composited/" + code + ".png" + (size < 55 ? "?1" : "");
	} else if (!isAnimation) {
		url = "/compositeByCode?code=" + code + "&act=" + act;
	}
	code = code.split(" ");

	var arr = {};
	for (var i = 0; i < Func.folders[layersProperty].length; i++) {
		var folder = Func.folders[layersProperty][i];
		var val = 0;
		if (folder == "costume") {
			val = costume || 0;
		} else if (folder == "dirt") {
			val = dirt || 0;
		} else if (folder in factors) {
			val = factors[folder] || 0;
		} else {
			var index = Func.folders[codeProperty].indexOf(folder);
			if (index > -1) {
				val = code[index];
			}
		}

		if (typeof val === "string" || typeof val === "number") {
			val = (val + "").split("-");
		}

		arr[folder] = val;
	}

	return Func.generateHTMLofCat(arr, size, cl, act, url, layersProperty);
};

Func.getUrlStyle = function(act, name, id) {
	var folder = name;
	if (["dirt", "wound", "drown", "poisoning"].indexOf(name) != -1) {
		folder = "defects/" + name;
	} else if (["costume"].indexOf(name) == -1 && name.substr(0, 4) != "base") {
		folder = "elements/" + name;
	}
	return "background-image:url('cats/" + act + "/" + folder + "/" + id + ".png');";
};

Func.start = function() {
	if (typeof Vue === "undefined") {
		return;
	}

	Vue.component("cat", {
		props: ["code", "size", "type", "act", "factors", "dirt", "costume"],
		data: function() {
			return {html: ""};
		},
		template: '<div v-html="html"></div>',
		created: function() {
			var factors = this.factors;
			try {
				factors = (typeof this.factors == "string" ? JSON.parse(factors) : factors);
			} catch(e) {}

			this.html = Func.showCat(this.code, this.size, this.type, this.act, factors, this.dirt, this.costume);
		}
	});

	if ($("#app").length < 1) {
		var app = new Vue({el: "#main"});
	}
};

$(Func.start);