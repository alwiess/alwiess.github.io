//var Kns = {};

var initAll = function(data) {
	//Kns = data;
	Kns.circleR = 100;
	Kns.smolCircleR = 25;
	Kns.paletteScale = 1;
	Kns.isAnimation = true;
	Kns.error_tm = 0;
	Kns.canvaKey = {};
	Kns.canvaAnim = {};
	Kns.warning = 3; // убрать, когда будут действия
	Kns.vipLevel = 0;
	Kns.detailVariant = 1;
	Kns.backupInfo = JSON.stringify(Kns.parts);
	Kns.blocks = [["Основа", [0, 22, 23, 16], 15, 18, 17], ["Шея и морда", [1, 19, 7, 8, 10, 20, 21], 5, 11], ["Туловище", 4, 9, 12], ["Лапы и хвост", 6, 2, 3, 13, 14]];
	Kns.isBaseSpecial = function (base) {
		if (base.indexOf(":") !== -1) {
			return false;
		}
		return !(Kns.palette[Kns.paletteNormalBases].colours.filter(function (el) {
			return base == el.id;
		})[0])
	};
	Kns.isEyesSpecial = function (eye, vip) {
		if (vip < 1) {
		return !(Kns.palette[Kns.paletteNormalEyes].colours.filter(function (el) {
			return eye == el.id;
			})[0]);
		}
		if (vip < 3) {
			return !(Kns.palette[Kns.paletteAugmentedEyes].colours.filter(function (el) {
				return eye == el.id;
			})[0]);
		}
	};

	Kns.start = function() {
		/// инициализация буферов канв для котиков
		var html = '';
		for (var i = 0; i < Kns.actions.length; i++) {
			var id = Kns.actions[i].id;
			var size = Kns.actions[i].size || 100;
			html += '<div id="block-cat_' + id + '" style="width: ' + size + 'px;height: ' + Math.ceil(size * 1.5) + 'px;" class="cat_dis">';
			html += '<canvas id="cat_' + id + '" width="100px" style="width: ' + size + 'px;"></canvas>';
			html += '<div id="top_' + id + '" class="cat_dis"></div>';
			html += '<canvas id="buffer_' + id + '" style="display: none;"></canvas>';
			html += '<canvas id="buffer_blend_' + id + '" style="display: none;"></canvas>';
			var times = 1;
			if (Kns.compositeTimes[id]) {
				times += Kns.compositeTimes[id].length;
			}
			for (var j = 0; j < times; j++) {
				html += '<canvas id="cat_' + id + '_' + j + '" style="display: none;" width="100px"></canvas>';
			}
			html += '</div>';
		}
		$("#canvacat").html(html);

		Kns.vip();
		Kns.drawBlocks();
		Kns.refresh(true);
	};

	Kns.code = function() {
		var code = [];
		for (var i = 0; i < Kns.parts.length; i++) {
			var now = [];
			for (var el in Sel.main[i]) {
				if (!Sel.main[i].hasOwnProperty(el)) continue;
				var arr = Sel.main[i][el];
				var line;
				if (arr.id === undefined) {
					line = arr.colour;
				} else {
					line = arr.id + "/" + arr.colour;
				}
				if (arr.opacity !== undefined && arr.opacity < Kns.getOpacityForCode(100)) {
					line += "|" + arr.opacity;
				}
				now.push(line);
			}
			now = now.join("-");
			if (now == "") {
				now = 0;
			}
			code.push(now);
		}
		code = code.join(" ");
		return code;
	};

	Kns.getOpacityForCode = function (procent) {
		return (procent - 50) / 5;
	};
	Kns.getOpacityFromCode = function (code) {
		return (code * 5 + 50) / 100;
	};

	Kns.canvasBlend = function (paletteId, path, colour, act, onload, key) {
		if (key != Kns.canvaKey[act]) {
			return;
		}

		var paths = colour.split("/");
		for (var i = 0; i < paths.length - 1; i++) {
			path += "/" + paths[i];
		}
		colour = paths[i];
		var props = colour.split(":");
		var palette = Kns.palette[paletteId];
		if (!palette || !palette.circle || !props[2]) {
			return null;
		}

		var brightness = props[2] / 100;
		var hue = props[1] / 100;
		var saturation = props[0] / 100;

		var bufferCtx = document.getElementById("buffer_blend_" + act).getContext('2d');
		bufferCtx.canvas.width *= 1;

		// определяем оттенок
		var borderPalette;
		for (borderPalette = 1; borderPalette < palette.colours.length; borderPalette++) {
			if (hue >= palette.colours[borderPalette - 1].point && hue <= palette.colours[borderPalette].point) {
				break;
			}
		}
		if (borderPalette === palette.colours.length) {
			hue = 0;
			borderPalette = 1;
		}
		var opacity;
		var opacityFirst, opacitySecond;
		borderPalette--;
		var images = [];
		for (var j = 0; j < 2 + (palette.center ? 1 : 0); j++) {
			var gradSet;
			switch (j) {
				case 0:
					gradSet = palette.colours[borderPalette];
					opacity = 1;
					break;
				case 1:
					gradSet = palette.colours[borderPalette + 1];
					opacity = (hue - palette.colours[borderPalette].point) / (palette.colours[borderPalette + 1].point - palette.colours[borderPalette].point);;
					break;
				case 2:
					opacity = 1 - saturation;
					gradSet = palette.center;
					break;
				default:
					break;
			}

			if (opacity <= 0) {
				continue;
			}
			if (opacity >= 1) {
				images = [];
			}
			for (var k = 1; k < gradSet.shades.length; k++) {
				if (brightness >= gradSet.shades[k].bright && brightness <= gradSet.shades[k-1].bright) {
					var opacityCoeff = gradSet.shades[k-1].bright - gradSet.shades[k].bright;
					opacityFirst = 1 + (brightness - gradSet.shades[k-1].bright) / opacityCoeff;
					opacitySecond = 1 + (gradSet.shades[k].bright - brightness) / opacityCoeff;
					opacityFirst *= opacity;
					opacitySecond *= opacity;

					if (opacity >= 1) {
						opacityFirst = 1;
					}

					if (opacitySecond >= 1) {
						opacitySecond = 1;
						images = [{image: gradSet.shades[k].id, opacity: opacitySecond}]; // непрозрачное изображение заменяет предыдущие
						break;
					}
					opacityFirst /= (1 - opacitySecond);
					images.push({image: gradSet.shades[k-1].id, opacity: opacityFirst});
					images.push({image: gradSet.shades[k].id, opacity: opacitySecond});
					break;
				}
			}
		}
		var loaded = function(allimages, success, first, obj) {
			if (!first) {
				var newImage = allimages[0].opacity;
				allimages.splice(0, 1);

				if (success) {
					if (newImage > 0) {
						bufferCtx.globalCompositeOperation = "source-over";
						bufferCtx.globalAlpha = newImage;
						bufferCtx.drawImage(obj, 0, 0);
					}
				}
			}
			if (!allimages.length) {
				if (onload) {
					onload(bufferCtx.canvas);
				}
				return;
			}
			var loadedSuccess = function(obj) {
				loaded(allimages, true, false, obj);
			}
			var loadedError = function(obj) {
				loaded(allimages, false, false, obj);
			}
			Kns.loadImage(p, path, allimages[0].image, loadedSuccess, loadedError, act, key);
		}
		loaded(images, true, true);

		return {onload: true};
	}

	Kns.addLayer = function (canvases, position, id, act, key) {
		if (key != Kns.canvaKey[act]) {
			return;
		}
		var folder = Kns.folders["animationLayers"][position];
		while (id < 0) {
			position++;
			if (position >= Kns.folders["animationLayers"].length) {
				Kns.finishCanvas(canvases, act, key);
				return;
			}
			folder = Kns.folders["animationLayers"][position];
			id = Sel.main[folder].length - 1;
		}

		var parent = Kns.parts[folder];
		parent = parent ? parent.parent : undefined;
		var baseType;
		if (parent !== undefined) {
			baseType = Sel.main[parent][0];
			baseType = baseType ? baseType.id : 0;
			baseType = Kns.parts[parent].info.filter(function (el) {
				return el.id == baseType;
			})[0];
			if (baseType) {
				baseType = baseType[Kns.parts[folder].folder] || baseType.elements || baseType.id;
			}
		}

		var opacity = Sel.main[folder][id].opacity;
		opacity = opacity === undefined ? Kns.getOpacityForCode(100) : opacity;

		var img;
		if (Sel.main[folder][id].id === undefined) {
			img = Sel.main[folder][id].colour;
		} else {
			img = Sel.main[folder][id].id + "/" + Sel.main[folder][id].colour;
		}
		var name = Kns.parts[folder].folder;
		opacity = Kns.getOpacityFromCode(opacity);

		var paletId;
		var cut_from;
		var times;
		if (Kns.parts[folder].info && Sel.main[folder][id].id) {
			var detail = Kns.parts[folder].info.filter(function (el) {
				return el.id == Sel.main[folder][id].id;
			})[0];
			if (detail) {
				paletId = detail.palette;
				cut_from = detail.cut_from;
				times = detail.times;
			}
		}
		if (paletId === undefined) {
			paletId = Kns.parts[folder].palette || 0;
		}
		if (cut_from === undefined) {
			cut_from = Kns.parts[folder].cut_from;
		}
		if (!times) {
			times = Kns.parts[folder].times;
		}
		times = (times ? times[act] : undefined) || [];
		var canvas = times.length ? canvases.filter(function (el) {
			return JSON.stringify(el.times) == JSON.stringify(times);
		})[0] : canvases[0];
		if (!times.length) {
			times = undefined;
		}
		if (!canvas) {
			var elname = "cat_" + act + "_" + canvases.length;
			canvas = {};
			canvas.canvas = document.getElementById(elname);
			canvas.times = times;
			canvases.push(canvas);
			canvas.canvas.width = (canvas.times ? canvas.times.length : 1) * 100;
			canvas.canvas.height = 150;
		}
		var tcanvas = canvas.canvas.getContext('2d');
		if (cut_from === undefined) {
			if (Kns.palette[paletId].cut_from !== undefined && Kns.palette[paletId].cut) {
				cut_from = Kns.palette[paletId].cut_from;
			}
		}
		if (cut_from || cut_from === Kns.num.Base) {
			parent = cut_from;
			var base = Sel.main[parent][0];
			if (base) {
				if (base.id !== undefined) {
					cut_from = base.id + "/" + Sel.main[folder][id].colour;
				} else {
					cut_from = Sel.main[folder][id].colour;
				}
				if (Sel.main[folder][id].id === undefined) {
					img = "1";
				} else {
					img = Sel.main[folder][id].id;
				}
				cut_from = Kns.parts[parent].folder + "/" + cut_from;
			}
		} else {
			cut_from = undefined;
		}
		if (baseType) {
			img = baseType + "/" + img;
		}

		var buffer = document.getElementById("buffer_" + act);
		var buffer_blend = document.getElementById("buffer_blend_" + act);
		var bufferCtx = buffer.getContext('2d');
		buffer_blend.width = buffer.width = (canvas.times ? canvas.times.length : 1) * 100;
		buffer_blend.height = buffer.height = 150;

		var loadNext = function() {
			Kns.addLayer(canvases, position, id - 1, act, key);
		};
		var addImage = function (obj) {
			if (key != Kns.canvaKey[act]) {
				return;
			}
			bufferCtx.globalCompositeOperation = "copy";
			bufferCtx.globalAlpha = opacity;
			bufferCtx.drawImage(obj, 0, 0);
			if (cut_from === undefined) {
				for (var i = 0; i < (canvas.times ? canvas.times.length : 1); i += (times ? times.length : 1)) {
					tcanvas.drawImage(bufferCtx.canvas, i * 100, 0);
				}
				loadNext();
			} else {
				var doBlend = function(obj) {
					if (key != Kns.canvaKey[act]) {
						return;
					}
					bufferCtx.globalCompositeOperation = "source-in";
					bufferCtx.globalAlpha = 1;
					bufferCtx.drawImage(obj, 0, 0);
					for (var i = 0; i < (canvas.times ? canvas.times.length : 1); i += (times ? times.length : 1)) {
						tcanvas.drawImage(bufferCtx.canvas, i * 100, 0);
					}
					loadNext();
				};
				Kns.loadImage(paletId, "cats/" + act, cut_from, doBlend, loadNext, act, key);
			}
		};
		Kns.loadImage(paletId, "cats/" + act + "/" + name, img, addImage, loadNext, act, key);
	};
	Kns.loadImage = function(palette, path, filename, onload, onerror, act, key) {
		if (key != Kns.canvaKey[act]) {
			return;
		}
		if ((filename+'').indexOf(":") !== -1) {
			var newImage = Kns.canvasBlend(palette, path, filename, act, onload, key);
			if (newImage) {
				if (!newImage.onload) {
					newImage.onload = onload;
					newImage.onload();
				}
				return;
			}
		}
		var file = new Image();
		var success = function() { onload(this) };
		var error = function() { onerror(this) };
		file.onload = success;
		file.onerror = error;
		file.src = path + "/" + filename + ".png";
		return file;
	}

	Kns.finishCanvas = function (canvases, act, key) {
		Kns.canvaAnim[act] = {};
		var canvas = document.getElementById("cat_" + act).getContext('2d');
		canvas.clearRect(0, 0, 100, 150);
		var doSetTimeout = function (ci) {
			setTimeout(function anim() {
				if (key != Kns.canvaKey[act])
					return;

				canvas.globalCompositeOperation = 'source-over';
				canvas.clearRect(0, 0, 100, 150);
				Kns.canvaAnim[act][ci]++;
				if (Kns.canvaAnim[act][ci] >= canvases[ci].times.length) {
					Kns.canvaAnim[act][ci] = 0;
				}

				for (var j = 0; j < canvases.length; j++) {
					canvas.drawImage(canvases[j].canvas, 100 * Kns.canvaAnim[act][j], 0, 100, 150, 0, 0, 100, 150);
				}

				setTimeout(anim, canvases[ci].times[Kns.canvaAnim[act][ci]]);
			}, canvases[ci].times[0]);
		};
		for (var i = 0; i < canvases.length; i++) {
			canvas.drawImage(canvases[i].canvas, 0, 0);
			Kns.canvaAnim[act][i] = 0;
			if (canvases[i].times && canvases[i].times.length) {
				doSetTimeout(i);
			}
		}
		$("#canvacat").show();
		$("#top_" + act).show();
	};

	Kns.generateHTMLofCat = function (arr, size, cl, act, url, layersProperty) {
		var result = "";
		if (url) {
			result = "<div style=\"background-image:url('" + url + "');width: " + size + "px;background-size: 100%;\" class='" + cl + "'>";
		} else {
			result = "<div class='" + cl + "' style=\"width: " + size + "px;\">";
		}

		result += '</div>';
		return result;
	};

	Kns.doCanvas = function (size, act) {
		var canvases = [];

		for (var i = 0; i < Kns.folders.animationLayers.length; i++) {
			var buffer = document.getElementById("cat_" + act + "_" + i);
			if (buffer) {
				buffer.width = buffer.width;
			}
		}

		if (Kns.canvaKey[act] === undefined) {
			Kns.canvaKey[act] = 0;
		}
		Kns.canvaKey[act] += Math.floor(Math.random() * 100);
		Kns.addLayer(canvases, 0, 0, act, Kns.canvaKey[act]);
		Kns.doTop(act);
	};

	Kns.clearCanvas = function() {
		for (var i = 0; i < Kns.actions.length; i++) {
			var id = Kns.actions[i].id;
			var buffer = document.getElementById("cat_" + id);
			if (buffer) {
				buffer.width = buffer.width;
			}
			$("#top_" + id).hide();
		}
	};
	
	Kns.doTop = function(act) {
		var top = [];
		for (var i = 0; i < Kns.actions.length; i++) {
			if (Kns.actions[i].id != act) {
				continue;
			}
			top = Kns.actions[i].top;
			break;
		}
		if (top && top.length) {
			var html = '';
			for (var it = 0; it < top.length; it++) {
				if (top[it].operation && top[it].operation != "replace") {
					continue;
				}
				html += '<img src="cats/' + act + '/base/top/' + top[it].file + '">';
			}
		}
		$("#top_" + act).html(html);
	}

	Kns.showCat = function (size, type, act, factors, dirt, costume) {
		act = act || 0;
		if (Kns.isAnimation) {
			Kns.doCanvas(size, act);
			$("#cat").hide();
			return "";
		} else {
			$("#cat").show();
			$("#canvacat").hide();
		}
		var cl = ['d', 'e', 'f'][type || 0];
		factors = factors || {};

		var isAnimation = !!Kns.isAnimation;
		var layersProperty = (isAnimation ? "animationLayers" : "static");
		var url;
		var code = Kns.code();
		if (!isAnimation) {
			url = "/compositeByCode?code=" + code + "&act=" + act;
		}
		code = code.split(" ");

		var arr = {};
		for (var i = 0; i < Kns.folders[layersProperty].length; i++) {
			var folder = Kns.folders[layersProperty][i];
			var val = 0;
			if (folder == "costume") {
				val = costume || 0;
			} else if (folder == "dirt") {
				val = dirt || 0;
			} else if (folder in factors) {
				val = factors[folder] || 0;
			} else {
				val = code[folder];
			}

			if (typeof val === "string" || typeof val === "number") {
				val = (val + "").split("-");
			}

			arr[folder] = val;
		}

		return Kns.generateHTMLofCat(arr, size, cl, act, url, layersProperty);
	};

	Kns.getUrlStyle = function (act, name, id) {
		return "background-image:url('cats/" + act + "/" + name + "/" + id + ".png');";
	};

	Kns.drawCat = function() {
		var html = "";
		for (var i = 0; i < Kns.actions.length; i++) {
			var size = Kns.actions[i].size || 100;
			html += "<td>" + Kns.showCat(size, 0, Kns.actions[i].id, {"costume": 0, "dirt": 0, "wound": 0, "drown": 0, "poisoning": 0, "disease": 0}) + "</td>";
		}
		html = "<table><tr>" + html + "</tr></table>";
		$("#cat").html(html);
		$("#code").val(Kns.code());
	};

	Kns.drawBlocks = function() {
		var html = "", blocks = [];
		for (var block = 0; block < Kns.blocks.length; block++) {
			var table = '<table class="block" id="block' + block + '"><tr><td><b>' + Kns.blocks[block][0] + '</b></td></tr>';
			for (var i = 1; i < Kns.blocks[block].length; i++) {
				var all_n = Kns.blocks[block][i];
				if (!(all_n instanceof Array)) {
					all_n = [all_n];
				}
				for (var j = 0; j < all_n.length; j++) {
					var n = all_n[j];
					if (!Kns.parts[n].name) {
						continue;
					}
					table += '<tr id="part' + n + '"><td><a href="#" class="edit' + n + '">' + Kns.parts[n].name + '</a></td></tr>'
				}
			}
			table += '</table>';
			blocks.push(table);
		}
		blocks = "<p>" + blocks.join("<br>") + "</p>";
		html = blocks + html;
		$("#blocks").html(html);
	};
	Kns.adaptBlocks = function() {
		for (var block = 0; block < Kns.blocks.length; block++) {
			var showAny = false;
			for (var i = 1; i < Kns.blocks[block].length; i++) {
				var all_n = Kns.blocks[block][i];
				if (!(all_n instanceof Array)) {
					all_n = [all_n];
				}
				for (var j = 0; j < all_n.length; j++) {
					var n = all_n[j];
					if (Kns.partAvailable(false, n)) {
						showAny = true;
						$("#part" + n).show();
					} else {
						$("#part" + n).hide();
					}
				}
			}
			if (showAny) {
				$("#block" + block).show();
			} else {
				$("#block" + block).hide();
			}
		}
	};

	Kns.drawDetail = function (newSelect) {
		var html = "";
		delete Sel.nowSelected;
		var dataNum = 0;
		if (!newSelect) {
			dataNum = $(".sel").attr("data-num") || dataNum;
		}
		var info = [];
		var selectedList = [];
		if (Kns.parts[Sel.now].info && !Kns.parts[Sel.now].noVariations) {
			if (Sel.main[Sel.now].length > 0) {
				for (var l in Sel.main[Sel.now]) {
					if (!Sel.main[Sel.now].hasOwnProperty(l)) continue;
					selectedList[l] = Sel.main[Sel.now][l].id;
				}
			}
			if (dataNum >= selectedList.length) {
				dataNum = selectedList.length - 1;
			}
			for (var n = 0; n < Kns.parts[Sel.now].info.length; n++) {
				if (!Kns.partAvailable(false, Sel.now, Kns.parts[Sel.now].info[n].id)) {
					continue;
				}
				if (Kns.parts[Sel.now].info[n].id == selectedList[dataNum]) {
					Sel.nowSelected = n;
				}
				var data = {};
				data.num = n;
				data.data = Kns.parts[Sel.now].info[n];
				info.push(data);
			}
		} else if (Kns.parts[Sel.now].maxLayers && Kns.parts[Sel.now].maxLayers > 1) {
			for (n = 0; n < Kns.parts[Sel.now].maxLayers; n++) {
				data = {};
				data.num = n;
				data.data = {};
				data.data.id = n;
				data.data.name = n + 1;
				info.push(data);
			}
			for (n = 0; n < Sel.main[Sel.now].length; n++) {
				selectedList.push(n);
			}
			Sel.nowSelected = 0;
		}
		if (info.length > 0) {
			var canAdd = false;
			var max = 1;
			if (!Kns.parts[Sel.now].noCombine) {
				max = Kns.detailsMax;
			}
			max = Kns.parts[Sel.now].maxLayers || max;
			if (selectedList.length < max && selectedList.length < info.length) {
				canAdd = true;
			}
			html += '<div class="row-column">';
			for (var i = 0; i < selectedList.length; i++) {
				var style = i != dataNum ? '' : ' class="sel"';
				var moveup = '';
				var movedown = '';
				if (i >= selectedList.length) {
					break;
				}

				var down = selectedList.length > i + 1;
				var up = i > 0;
				moveup = up ? '<a id="moveup" data-num="' + i + '" onclick="Kns.moveLine(true, this);">↑</a>' : '';
				movedown = down ? '<a id="movedown" data-num="' + i + '" onclick="Kns.moveLine(false, this);">↓</a>' : '';
				var name;
				switch (Kns.detailVariant) {
					case 1:
						name = info.filter(function (el) {
							return el.data.id == selectedList[i];
						})[0];
						name = name ? name.data.name : '';
						style += ' style="border-width: 1px; border-style: solid; width: 33px; height: 33px; border-radius: 5px; margin: 2px;' + Kns.getPreviewStyle(selectedList[i] || 0) + '"';

						html += '<div class="container-panel"><div class="tdarrow">' + moveup + '<br>' + movedown + '</div>';
						html += '<div ' + style + ' onclick="Kns.clickedDetail(this);" data-num="' + i + '" data-value="' + (selectedList[i] || 0) + '" id="select' + i + '" title="' + name + '"/>';
						break;
					case 0:
					default:
						html += '<div class="container-panel"><div class="tdarrow">' + moveup + '</div><div class="tdarrow">' + movedown + '</div>';
						html += '<select style="width:100px;"' + style + ' onchange="Kns.selectedDetail(this);" onclick="Kns.clickedDetail(this);" data-num="' + i + '" id="select' + i + '">';
						if (!Kns.parts[Sel.now].noVariations) {
							for (var j = 0; j < info.length; j++) {
								var id = info[j].data.id;
								if (selectedList.filter(function (el) {
									return el == id;
								}).length >= (Kns.parts[Sel.now].opaque ? 1 : Kns.maxSimilarElements) && selectedList[i] != id) {
									continue;
								}
								name = info[j].data.name;
								var selected = selectedList[i] == id ? ' selected' : '';
								html += '<option value="' + info[j].num + '"' + selected + '>' + name + '</option>';
							}
						} else {
							html += '<option value="' + (+selectedList[i] + 1) + '">' + (+selectedList[i] + 1) + '</option>';
						}
						html += "</select>";
						break;
				}
				html += '<div class="td_x">';
				if (!Kns.parts[Sel.now].obligatory || selectedList.length > 1) {
					html += '<a class="a_none" onclick="Kns.removeDetail(' + i + ');">✖</a>';
				}
				html += '</div></div>';
			}
			if (canAdd) {
				html += '<div class="container-panel"><div class="tdarrow"></div><div class="td_plus"><a onclick="Kns.addDetail();" class="a_none">+</a></div></div>';
			}
			html += "</div>";
			if (!Kns.parts[Sel.now].noVariations) {
				switch (Kns.detailVariant) {
					case 1:
						if (dataNum >= 0 && dataNum < selectedList.length) {
							html += '<div class="elem-row">';
							for (j = 0; j < info.length; j++) {
								id = info[j].data.id;
								if (selectedList.filter(function (el) {
									return el == id;
								}).length >= (Kns.parts[Sel.now].opaque ? 1 : Kns.maxSimilarElements) && selectedList[dataNum] != id) {
									continue;
								}
								name = info[j].data.name;
								html += '<div data-num="' + dataNum + '" data-value="' + info[j].num + '" style="border-width: 1px; border-style: solid; width: 33px; height: 33px; border-radius: 5px; margin: 2px;' + Kns.getPreviewStyle(id) + '" onclick="Kns.selectedDetail(this)" title="' + name + '"/>';
							}
							html += '</div>';
						}
						break;
					case 0:
						break;
				}
			}
		} else {
			Sel.nowSelected = 0;
		}
		$("#detail").html(html);
		$("[title]").tipTip();
	};

	Kns.getPreviewStyle = function (part) {
		var id = "icons";
		if (part !== undefined && Kns.parts[Sel.now].info) {
			id = id + "/" + part;
		}
		var parent = Kns.parts[Sel.now].parent;
		if (parent !== undefined) {
			parent = Kns.parts[parent].info.filter(function (el) {
				return el.id == Sel.main[parent][0].id;
			})[0];
			if (parent) {
				parent = parent[Kns.parts[Sel.now].folder] || parent.elements || parent.id;
				id = parent + '/' + id;
			}
		}
		return Kns.getUrlStyle(0, Kns.parts[Sel.now].folder, id) + 'background-size: 100%;';
	};

	Kns.refresh = function (allnew, detailnotnew, noblocks, newselect, nodetail, nocats, nopalette) {
		if (!noblocks) {
			if (newselect) {
				Kns.drawBlocks();
			}
			Kns.adaptBlocks();
		}
		if (!nodetail) {
			Kns.drawDetail(!detailnotnew);
		}
		if (!nocats) {
			Kns.drawCat();
		}
		if (!nopalette) {
			Kns.drawPalette();
		}
		if (allnew) {
			Kns.clearCanvas();
			$(".edit0").click();
		}
	};

	Kns.selectedDetail = function (menu) {
		Sel.nowSelected = menu.value || menu.getAttribute('data-value') || '1';
		var dataNum = menu.getAttribute("data-num");
		if (Sel.main[Sel.now].length <= dataNum) {
			return;
		}
		Sel.main[Sel.now][dataNum].id = Kns.parts[Sel.now].info[Sel.nowSelected].id;
		var palette = Kns.parts[Sel.now].info[Sel.nowSelected].palette || Kns.parts[Sel.now].palette || 0;
		if (Kns.palette[palette].circle) {
			if ((Sel.main[Sel.now][dataNum].colour+"").indexOf(":") === -1) {
				Sel.main[Sel.now][dataNum].colour = Kns.palette[palette].default[0];
			}
		} else {
			if (Kns.palette[palette].colours.filter(function (el) {
			return el.id == Sel.main[Sel.now][dataNum].colour;
			}).length < 1) {
				for (var c = 0; c < Kns.palette[palette].colours.length; c++) {
					if (+Kns.palette[palette].colours[c].id === 0) {
						continue;
					}
					if (!Kns.partAvailable(false, Sel.now, Sel.main[Sel.now][dataNum].id, Kns.palette[palette].colours[c].id)) {
						continue;
					}
					Sel.main[Sel.now][dataNum].colour = Kns.palette[palette].colours[c].id;
					break;
				}
			}
		}
		Kns.cleanMain(Sel.now);
		Kns.refresh(false, true, false, false, true);
		var selected = $('.sel');
		selected.css('background-image', menu.style.backgroundImage);
		var name = Kns.parts[Sel.now].info[Sel.nowSelected].name;
		selected.attr('title', name);
		$("[title]").tipTip();
	};

	Kns.selectedOpacity = function (opacity) {
		var dataNum = Kns.parts[Sel.now].noCombine ? 0 : $(".sel").attr("data-num");
		if (dataNum === undefined) {
			return;
		}
		if (Sel.main[Sel.now].length <= dataNum) {
			return;
		}
		var opacityPresent = Sel.main[Sel.now][dataNum].opacity;
		opacityPresent = opacityPresent !== undefined ? Kns.getOpacityFromCode(opacityPresent) * 100 : 100;
		if (opacityPresent == opacity) {
			return;
		}
		opacity = (opacity > 100 ? 100 : (opacity < 0 ? 0 : opacity));
		var display = $("#opacity_value");
		if (display) {
			display.html(opacity + "%");
		}

		if (opacity >= 100) {
			delete Sel.main[Sel.now][dataNum].opacity;
		} else {
			Sel.main[Sel.now][dataNum].opacity = Kns.getOpacityForCode(opacity);
		}
		Kns.refresh(false, false, true, true, true, false, true);
	};

	Kns.clickedDetail = function (menu) {
		if (menu.classList.contains('sel')) {
			return;
		}
		$(".sel").each(function() {
			$(this).removeClass('sel')
		});
		menu.className += 'sel';
		Sel.nowSelected = menu.value || menu.getAttribute("data-value");
		Kns.refresh(false, true, false, false, Kns.detailVariant != 1, true);
	};

	Kns.addDetail = function() {
		if (Kns.parts[Sel.now].noCombine && Kns.parts[Sel.now][0]) {
			Kns.error("Невозможно добавить элемент.");
			return;
		}
		var getDefault = function(palette) {
			if (!palette.default) {
				return palette.colours[0];
			}
			return palette.default[Math.max(Math.random() * palette.default.length, palette.default.length - 1)];
		}
		var info = Kns.parts[Sel.now].info;
		if (!Kns.parts[Sel.now].noVariations) {
			var selectedList = [];
			for (var i = 0; i < Sel.main[Sel.now].length; i++) {
				var type = Sel.main[Sel.now][i].id;
				if (type) {
					selectedList.push(type);
				}
			}
			var data = {};
			for (var j = 0; j < info.length; j++) {
				if (selectedList.filter(function (el) {
					return el == info[j].id;
				}).length >= (Kns.parts[Sel.now].opaque ? 1 : Kns.maxSimilarElements)) {
					continue;
				}
				if (!Kns.partAvailable(false, Sel.now, info[j].id)) {
					continue;
				}
				var palette = info[j].palette || Kns.parts[Sel.now].palette || 0;
				if (Kns.palette[palette].circle) {
					data = {id: info[j].id, colour: getDefault(Kns.palette[palette])};
				} else {
					for (var c = 0; c < Kns.palette[palette].colours.length; c++) {
						if (+Kns.palette[palette].colours[c].id === 0) {
							continue;
						}
						if (!Kns.partAvailable(false, Sel.now, info[j].id, Kns.palette[palette].colours[c].id)) {
							continue;
						}
						data = {id: info[j].id, colour: Kns.palette[palette].colours[c].id};
						break;
					}
				}
				break;
			}
		} else {
			palette = Kns.parts[Sel.now].palette || 0;
			var palList = [palette];
			if (info) {
				for (var dat in info) {
					if (!info.hasOwnProperty(dat)) continue;
					palette = info[dat].palette;
					if (palette !== undefined && palList.indexOf(palette) === -1) {
						palList.push(palette);
					}
				}
			}
			for (var p in palList) {
				if (!palList.hasOwnProperty(p)) continue;
				palette = palList[p];
				if (Kns.palette[palette].circle) {
					data = {colour: getDefault(Kns.palette[palette])};
				} else {
					for (c = 0; c < Kns.palette[palette].colours.length; c++) {
						if (+Kns.palette[palette].colours[c].id === 0) {
							continue;
						}
						if (!Kns.partAvailable(false, Sel.now, 0, Kns.palette[palette].colours[c].id)) {
							continue;
						}
						data = {colour: Kns.palette[palette].colours[c].id};
						break;
					}
				}
			}
		}
		if (data) {
			if (Sel.now == Kns.num.RightHindPaw && Kns.warning > 0) { // убрать, когда будут действия
				Kns.error("Некоторые элементы на задней правой лапе будут видны только на действиях.");
				Kns.warning--;
			}
			Sel.main[Sel.now].push(data);
			Kns.drawDetail(false);
			$('#select' + (Sel.main[Sel.now].length - 1)).click();
			Kns.refresh(false, true);
		}
	};

	Kns.removeDetail = function (index) {
		if (Sel.main[Sel.now].length <= index) {
			return;
		}
		Sel.main[Sel.now][index] = 0;
		Kns.cleanMain(Sel.now);
		Kns.refresh(false, true, false, false, true);
	};

	Kns.prerenderPalettes = function() {
		var cR = Kns.circleR, cX = cR, cY = cR, cXC = cR*2, cYC = cR*2;
		for (var id in Kns.palette) {
			if (!Kns.palette.hasOwnProperty(id)) {
				continue;
			}
			var palette = Kns.palette[id];

			if (!palette.circle) {
				continue;
			}

			var maxI = 0, i, centerI = [];
			for (i = 0; i < palette.colours.length; i++) {
				palette.colours[i].shades.sort(function(a, b) { return b.bright - a.bright; });
				if (palette.colours[i].center) {
					centerI.push(i);
				} else {
					if (palette.colours[i].point > maxI) {
						maxI = palette.colours[i].point;
					}
				}
			}
			for (i = 0; i < centerI.length; i++) {
				if (!palette.center) {
					palette.center = JSON.parse(JSON.stringify(palette.colours[centerI[i]]));
				}
				palette.colours.splice(centerI[i], 1);
			}
			var circles = palette.colours, center = palette.center;
			for (i = 0; i < circles.length; i++) {
				circles[i].point /= maxI;
				if (circles[i].point >= 1) {
					var newcol = JSON.parse(JSON.stringify(circles[i]));
					newcol.point = 0;
					circles.push(newcol);
				}
			}
			circles.sort(function(a, b) { return a.point - b.point; });

			var elId = 'circle_palette_' + id;
			var html = '<div id="div_' + elId + '"><canvas id="' + elId + '" width="' + cXC + '" height="' + cYC + '"></canvas></div>';

			$("#color_circles").append(html);

			var ctx = document.getElementById(elId).getContext('2d');
			var ctx2 = document.getElementById("palettebuffer").getContext('2d');
			var circum = Math.PI * 2 * 2 * cR;
			ctx2.canvas.height = 1;
			ctx2.canvas.width = circum;
			var linearGrad = ctx2.createLinearGradient(0, 0, circum, 0);
			for (i = 0; i < circles.length; i++) {
				linearGrad.addColorStop(circles[i].point, circles[i].shades[0].colour);
			}

			function getLinearGradientColors(grad, length, ct) {
				ct.fillStyle = grad;
				ct.fillRect(0,0,length, 1);
				return ct.getImageData(0,0,length,1).data
					.reduce(function(out, channel, i) {
						var px_index = Math.floor(i/4);
						var px_slot = out[px_index] || (out[px_index] = []);
						px_slot.push(channel);
						if(px_slot.length === 4) {
							px_slot[3] /= 255;
							out[px_index] = 'rgba(' + px_slot.join() + ')';
						}
						return out;
					}, []);
			}
			var colors = getLinearGradientColors(linearGrad, circum, ctx2);

			ctx2.canvas.width = cXC;
			ctx2.canvas.height = cYC;
			ctx2.setTransform(1,0,0,1,cX, cY);
			for(i = 0; i< colors.length; i++) {
				ctx2.beginPath();
				ctx2.moveTo(0,0);
				ctx2.lineTo(cR, 0);
				ctx2.strokeStyle = colors[i];
				ctx2.stroke();
				ctx2.rotate((Math.PI*2)/colors.length);
			}

			// return a Pattern so we can use it as fillStyle or strokeStyle
			ctx.fillStyle = ctx2.createPattern(ctx2.canvas, 'no-repeat');
			ctx.beginPath();
			ctx.arc(cX, cY, cR,Math.PI*2,0);
			ctx.fill();

			if (center) {
				var centerGrad = ctx.createRadialGradient(cX, cY, 0, cX, cY, cR);
				centerGrad.addColorStop(0, center.shades[0].colour);
				centerGrad.addColorStop(1, center.shades[0].colour + '00');
				ctx.fillStyle = centerGrad;
				ctx.fillRect(cX - cR, cY - cR,cX + cR, cY + cR);
			}
			ctx2.canvas.width = ctx2.canvas.height = 1;
		}
	}

	Kns.drawPalette = function() {
		var html = '';
		var colourCircle = ($("#color_circle").html(''));
		var p;
		try {
			p = Kns.parts[Sel.now].info[Sel.nowSelected].palette;
		} catch (e) {
		}
		p = p || Kns.parts[Sel.now].palette || 0;
		p = Sel.nowSelected === undefined ? -1 : p;
		var dataNum = Kns.parts[Sel.now].noCombine ? 0 : $(".sel").attr("data-num");
		var pList = [{palette: p, id: 1}];
		if (dataNum === undefined) {
			p = -1;
			pList = [];
		}
		var colour = Sel.main[Sel.now][dataNum];
		colour = colour ? colour.colour : colour;

		if (Kns.parts[Sel.now].info && Kns.parts[Sel.now].noVariations) {
			for (var data in Kns.parts[Sel.now].info) {
				if (!Kns.parts[Sel.now].info.hasOwnProperty(data)) continue;
				p = Kns.parts[Sel.now].info[data].palette;
				if (p === undefined) {
					continue;
				}
				p = {palette: p, id: +Kns.parts[Sel.now].info[data].id};
				if (!pList.filter(function (el) {
					return el.id === p.id && +el.palette === p.palette; })[0]) {
					pList.push(p);
				}
			}
		}

		var detailId = (Kns.parts[Sel.now].info && Kns.parts[Sel.now].info[Sel.nowSelected]) ? Kns.parts[Sel.now].info[Sel.nowSelected].id : 0;
		for (var j in pList) {
			if (!pList.hasOwnProperty(j)) continue;
			p = pList[j].palette;
			if (!Kns.palette[p]) {
				continue;
			}
			if (Kns.palette[p].circle && colour) {
				var deltaX = Kns.smolCircleR * 7, deltaY = Kns.smolCircleR;
				var tHeight = (Kns.circleR + deltaY) * 2, tWidth = Kns.smolCircleR * 6 + (Kns.circleR + Kns.smolCircleR) * 2;

				var canvasCtx = document.getElementById("palettebuffer_work").getContext('2d');
				var paletteCtx = document.getElementById('circle_palette_' + p).getContext('2d');
				canvasCtx.canvas.width = tWidth;
				canvasCtx.canvas.height = tHeight;
				canvasCtx.drawImage(paletteCtx.canvas, deltaX, deltaY);

				Kns.paletteScale = Math.min($("#field").outerWidth() / (tWidth), 1);
				if (Kns.paletteScale < 1) {
					tHeight *= Kns.paletteScale;
					tWidth *= Kns.paletteScale;
				}

				var id = 0;
				if (Kns.parts[Sel.now].info && Kns.parts[Sel.now].noVariations) {
					id = pList[j].id;
				}
				var htmlTop = '<div id="show_palette_' + p + '" style="white-space:nowrap;"><canvas class="palette" height="' + tHeight + '" width="'+ tWidth + '" onclick="Kns.circlePaletteClicked(event);" data-detail="' + id + '"></canvas></div>';
				colourCircle.append(htmlTop);

				Kns.drawCircle(colour, p);

				continue;
			}
			for (var i = 0; i < Kns.palette[p].colours.length; i++) {
				if (Kns.palette[p].colours[i].name === '' || !Kns.palette[p].colours[i].name) {
					continue;
				}
				if (!Kns.partAvailable(false, Sel.now, detailId, Kns.palette[p].colours[i].id)) {
					continue;
				}
				var bg = (Kns.palette[p].colours[i].colour ? Kns.palette[p].colours[i].colour : "url(cats/palette/" + +Kns.palette[p].colours[i].image + ".png)");
				var name = Kns.palette[p].colours[i].name;
				if (name.trim() != name) {
					name = name.trim();
				}
				var id = Kns.palette[p].colours[i].id;
				if (Kns.parts[Sel.now].info && Kns.parts[Sel.now].noVariations) {
					id = pList[j].id + "/" + id;
				}
				html += '<div style="background: ' + bg + ' center no-repeat; border-width: 1px; border-style: solid;" title="' + name + '" data-num="' + id + '"' + (Kns.palette[p].colours[i].id == colour ? ' class="selected_colour"' : '') + '> </div>';
			}
		}
		p = pList[0];
		if (!Kns.parts[Sel.now].opaque && p && Kns.palette[p.id]) {
			var opacity = Sel.main[Sel.now][dataNum].opacity
			opacity = opacity === undefined ? Kns.getOpacityForCode(100) : opacity;
			opacity = Kns.getOpacityFromCode(opacity) * 100;
			var minOpacity = Kns.getOpacityFromCode(0) * 100;
			var stepOpacity = (100 - minOpacity) / Kns.getOpacityForCode(100);
			var opacitystr = (opacity + "").split(".")[0] || minOpacity;
			html += "<label><b>Непрозрачность: </b>" +
				"<input type='range' max='100' min='" + minOpacity + "' step='" + stepOpacity + "' value='" + opacity + "' onchange='Kns.selectedOpacity(this.value);' oninput='Kns.selectedOpacity(this.value);' id='opacity_range'>" +
				"<span id='opacity_value'>" + opacitystr + "%</span></label>";
		}
		($("#color").html(html))[(html ? "show" : "hide")]();
		(colourCircle)[(colourCircle.html() ? "show" : "hide")]();
		$("[title]").tipTip();
	};
	Kns.drawCircle = function(colour, p, hold) {
		var props = (colour+"").split(":");
		var complete = true;
		if (props.length !== 3) {
			complete = false;
			props = [0, 0, 100];
		}

		var palette = Kns.palette[p];
		if (!palette.circle) {
			return;
		}

		var finalCtx = $(".palette", "#show_palette_" + p)[0].getContext('2d');
		var paletteCtx = document.getElementById("palettebuffer_work").getContext('2d');
		var target_left = document.getElementById('target_img' + (hold === 'l' ? "_wide" : ''));
		var target_right = document.getElementById('target_img' + (hold === 'r' ? "_wide" : ''));

		var brightness = (100 - props[2]) * 2 * Kns.circleR / 100;
		props[1] /= 100;
		var angle = 2 * Math.PI * props[1];
		var radius = props[0] * Kns.circleR / 100;

		finalCtx.canvas.width++;finalCtx.canvas.width--;

		finalCtx.scale(Kns.paletteScale, Kns.paletteScale);

		finalCtx.drawImage(paletteCtx.canvas, 0, 0);
		var i;
		for (i = 1; i < palette.colours.length; i++) {
			if (props[1] >= palette.colours[i - 1].point && props[1] <= palette.colours[i].point) {
				break;
			}
		}
		if (i === palette.colours.length) {
			props[1] = 0;
			i = 1;
		}
		var opacity = (props[1] - palette.colours[i - 1].point) / (palette.colours[i].point - palette.colours[i - 1].point);
		i--;
		for (var j = 0; j < 2 + (palette.center ? 1 : 0); j++) {
			var gradSet;
			switch (j) {
				case 1:
					opacity = 1 - props[0] / 100;
				case 0:
					gradSet = palette.colours[i + j];
					break;
				case 2:
					gradSet = palette.center;
					opacity = 1;
					break;
				default:
					break;
			}

			var grad = finalCtx.createLinearGradient(Kns.smolCircleR * 2, Kns.smolCircleR + 2 * Kns.circleR, Kns.smolCircleR * 2, Kns.smolCircleR);
			for (var k = 0; k < gradSet.shades.length; k++) {
				grad.addColorStop(gradSet.shades[k].bright, gradSet.shades[k].colour);
			}
			finalCtx.fillStyle = grad;
			finalCtx.fillRect(Kns.smolCircleR * 2, Kns.smolCircleR, Kns.smolCircleR, Kns.circleR * 2);
			finalCtx.globalAlpha = opacity;
		}
		if (complete) {
			finalCtx.drawImage(target_left, Kns.smolCircleR * 2, brightness + Kns.smolCircleR - target_left.width / 2);
			finalCtx.drawImage(target_right, Kns.smolCircleR * 7 + Kns.circleR + radius * Math.cos(angle) - target_right.width / 2, Kns.smolCircleR + Kns.circleR + radius * Math.sin(angle) - target_right.width / 2);
		}
		finalCtx.scale(1, 1);
	};

	Kns.cleanMain = function (el) {
		if (!(Sel.main[el] instanceof Array)) {
			return;
		}
		var isNew = false;
		for (var i = 0; i < Kns.parts.length; i++) {
			if (!Kns.partAvailable(false, i)) {
				Sel.main[i] = [];
				continue;
			}
			var newArr = [];
			for (var j = 0; j < Sel.main[i].length; j++) {
				var partdetail = Sel.main[i][j].id || 0;
				var partcolour = Sel.main[i][j].colour;
				if (!Kns.partAvailable(false, i, partdetail, partcolour)) {
					Sel.main[i][j] = 0;
				}
				if (!(Sel.main[i][j] > 0 || (Sel.main[i][j] != "" && Sel.main[i][j] != "0"))) {
					continue;
				}
				newArr.push(Sel.main[i][j]);
			}
			if (el == i) {
				isNew = Sel.main[i].length !== newArr.length;
			}
			Sel.main[i] = newArr;
			if (!Sel.main[i].length && Kns.parts[i].obligatory && Kns.parts[i].default) {
				Sel.main[i] = [JSON.parse(JSON.stringify(Kns.parts[i].default))];
			}
		}
		if (isNew) {
			Kns.drawDetail(false);
		}
	};
	Kns.reset = function() {
		Sel.main = [];
		for (var i = 0; i < Kns.parts.length; i++) {
			Sel.main[i] = Kns.parts[i].default ? [JSON.parse(JSON.stringify(Kns.parts[i].default))] : [];
		}
		Kns.refresh(true);
	};
	Kns.random = function (coeff) {
		if (coeff === undefined) {
			coeff = 0.5;
		}
		Sel.random = true;
		Kns.reset();
		for (var mode = 0; mode < 2; mode++) {
			for (var i = 0; i < Kns.parts.length; i++) {
				if ((Kns.parts[i].type || Kns.parts[i].noVariations) && mode !== 0) {
					continue;
				}
				Sel.main[i] = [];
				var pastParts = [];
				if (!Kns.parts[i] || !Kns.parts[i].name || !Kns.partAvailable(false, i)) {
					continue;
				}
				for (var dataNum = 0; dataNum < ((Kns.parts[i].noCombine) ? 1 : (Kns.parts[i].maxLayers || Kns.detailsMax)); dataNum++) {
					if (Math.random() >= coeff && !Kns.parts[i].obligatory) {
						continue;
					}
					var result = {};
					var palette = Kns.parts[i].palette || 0;
					var detail = 0;
					if (Kns.parts[i].info) {
						var parts = [];
						for (var one = 0; one < Kns.parts[i].info.length; one++) {
							if (pastParts.indexOf(Kns.parts[i].info[one].id) !== -1) {
								continue;
							}
							if (!Kns.partAvailable(false, i, Kns.parts[i].info[one].id)) {
								continue;
							}
							parts.push(Kns.parts[i].info[one]);
						}
						if (parts.length < 1) {
							break;
						}
						var part = Math.floor(Math.random() * parts.length);
						result.id = parts[part].id;
						pastParts.push(parts[part].id);
						palette = parts[part].palette || palette;
						detail = parts[part].id;
					}
					if (Kns.palette[palette].circle) {
						var props = [0, 0, 0];
						for (var li = 0; li < 3; li++) {
							props[li] = Math.round(Math.min(100, Math.random() * 101));
						}
						result.colour = props.join(":");
					} else {
						var colours = [];
						for (var c = 0; c < Kns.palette[palette].colours.length; c++) {
							if (+Kns.palette[palette].colours[c].id === 0 || +Kns.palette[palette].colours[c].name === 0) {
								continue;
							}
							if (!Kns.partAvailable(false, i, detail, Kns.palette[palette].colours[c].id)) {
								continue;
							}
							colours.push(Kns.palette[palette].colours[c].id);
						}
						var colourNum = Math.floor(Math.random() * colours.length);
						result.colour = colours[colourNum];
					}
					if (!Kns.parts[i].opaque) {
						var maxOpacity = Kns.getOpacityForCode(100);
						var opacity = Math.floor(Math.random() * (maxOpacity + 1));
						if (opacity < maxOpacity) {
							result.opacity = opacity;
						}
					}
					Sel.main[i].push(result);
				}
			}
		}
		Kns.refresh(true);
		Sel.random = false;
	};

	Kns.partAvailable = function (showError, block, detail, colour) {
		if (block === undefined) {
			return true;
		}
		// анализ блоков
		if (Kns.vipLevel < 1 && block == Kns.num.RightEye) { //правые глаза не разрешены в любом случае, если vip < 1
			if (showError) {
				Kns.error("Невозможно выбирать правые глаза.");
			}
			return false;
		}
		var baseId = Sel.main[Kns.num.Base][0];
		baseId = baseId ? baseId.id : baseId;
		var baseInfo = Kns.parts[Kns.num.Base].info.filter(function (el) {
			return el.id == baseId;
		})[0];
		if (block != Kns.num.Base && !baseInfo) {
			if (showError) {
				Kns.error("Ошибка базы.");
			}
			return false;
		}
		if (block != Kns.num.Base && baseInfo.allowedChildren) {
			var ok = !baseInfo.allowedChildren.whitelist;
			if (baseInfo.allowedChildren.blocks && baseInfo.allowedChildren.blocks.indexOf(block) !== -1) {
				ok = !ok;
			}
			if (!ok) {
				if (showError) {
					Kns.error("На особых окрасах нельзя выбирать какие-либо элементы.");
				}
				return false;
			}
		}

		switch (block) {
			case Kns.num.ManeElement:
				if (!Sel.main[Kns.num.ManeBase][0] || !Sel.main[Kns.num.ManeBase][0].id) {
					if (showError) {
						Kns.error("Выберите сперва гриву-основу.");
					}
					return false;
				}
				break;
			case Kns.num.TuftElement:
				if (!Sel.main[Kns.num.TuftBase][0] || !Sel.main[Kns.num.TuftBase][0].id) {
					if (showError) {
						Kns.error("Выберите сперва шерсть-основу.");
					}
					return false;
				}
				break;
		}
		if (detail === undefined) {
			return true;
		}

		// анализ частей, показываемых в блоке
		switch (block) {
			case Kns.num.EarTufts:
				var numEar = Sel.main[Kns.num.EarBase][0];
				if (numEar) {
					numEar = numEar.id;
				}
				if (numEar == Kns.num.EarLay) {
					if (detail == Kns.num.EarTuftsNormal) {
						if (showError) {
							Kns.error("Вислоухим не доступны кисточки.");
						}
						return false;
					}
				}
				break;
			case Kns.num.Base:
				baseInfo = Kns.parts[Kns.num.Base].info.filter(function (el) {
					return el.id == detail;
				})[0];
				var basePalette = baseInfo ? (baseInfo.palette || Kns.parts[Kns.num.Base].palette || 0) : -1;
				if (basePalette != Kns.paletteNormalBases) {
					if (Kns.vipLevel < 2) {
						if (showError) {
							Kns.error("Вам не доступны специальные окрасы.");
						}
						return false;
					}
				}
				break;
		}

		if (colour === undefined) {
			return true;
		}

		// анализ цветов
		//смотрим полупрозрачность
		var colourWithOpacity = colour.split('|');
		if (Kns.parts[block].opaque && colourWithOpacity[1]) {
			if (showError) {
				Kns.error("Некорректное значение непрозрачности.");
			}
			return false;
		}
		colour = colourWithOpacity[0];
		switch (block) {
			case Kns.num.LeftEye:
			case Kns.num.RightEye:
				if (Kns.isEyesSpecial(colour, Kns.vipLevel)) {
						if (showError) {
						Kns.error("Вам не доступны специальные глаза.");
						}
						return false;
					}
				break;
			case Kns.num.Base:
				if (Kns.isBaseSpecial(colour)) {
					if (Kns.vipLevel < 2) {
						if (showError) {
							Kns.error("Вам не доступны специальные окрасы.");
						}
						return false;
					}
				}
				break;
		}

		return true;
	};

	Kns.vip = function (temp) {
		Kns.vipLevel = +$("#main").data("vip");
		if (temp !== undefined) {
			Kns.vipLevel = +temp;
			Kns.parts = JSON.parse(Kns.backupInfo);
		}
	};
	Kns.error = function (text) {
		if (Sel.random) {
			return;
		}
		$("#error").text(text).show();
		clearTimeout(Kns.error_tm);
		Kns.error_tm = setTimeout(function() {
			Kns.hideError();
		}, 10000);
	};
	Kns.hideError = function() {
		clearTimeout(Kns.error_tm);
		$("#error").fadeOut(500);
	};
	Kns.confirm = function (text, func) {
		$("#confirm_text").html(text);
		var confirm = $("#confirm");
		confirm.show();
		var yes = $("#confirm_yes");
		yes.off();
		yes.on("click", function() {
			confirm.hide();
			Kns.canvaKey = {};
			Kns.canvaAnim = {};
			func();
		});
	};

	Kns.parseCode = function (input) {
		var code = input.value;
		if (code === undefined) {
			code = input;
		}
		var blocks = code.split(" ");
		Kns.clearCanvas();
		for (var num = 0; num < Kns.parts.length; num++) {
			if (num >= blocks.length) {
				if (Kns.parts[num] && Kns.parts[num].default) {
					Sel.main[num] = [JSON.parse(JSON.stringify(Kns.parts[i].default))];
				} else {
					Sel.main[num] = [];
				}
				if (!Kns.partAvailable(false, num)) {
					Sel.main[num] = [];
				}
				continue;
			}
			blocks[num] = (blocks[num] + '').split("-");

			Sel.main[num] = [];
			for (var inter = 0; inter < blocks[num].length; inter++) {
				var part = blocks[num][inter];
				var result = {};
				part = (part + '').split('|');
				result.opacity = part[1];
				if (Kns.parts[num].opaque) {
					delete result.opacity;
				}
				part = part[0] + "";
				if (+part !== 0) {
					part = part.split("/");
					if (part.length > 1) {
						result.id = part[0];
						result.colour = part[1];
					} else {
						result.colour = part[0];
					}
					Sel.main[num].push(result);
				}
			}
		}
		Kns.refresh(true);
	};

	Kns.moveLine = function (up, line) {
		if (Kns.parts[Sel.now].noCombine) {
			return;
		}
		if (!(Sel.main[Sel.now] instanceof Array)) {
			return;
		}
		var dataNum = +line.getAttribute("data-num");
		if (dataNum + (up ? 1 : 0) < 0 || dataNum + (up ? 0 : 1) >= Sel.main[Sel.now].length) {
			return;
		}
		var dataNumNew = dataNum + (up ? -1 : 1);
		Sel.main[Sel.now][dataNumNew] = [Sel.main[Sel.now][dataNum], Sel.main[Sel.now][dataNum] = Sel.main[Sel.now][dataNumNew]][0];
		var selected = $(".sel");
		if (+selected.attr("data-num") == dataNumNew) {
			dataNumNew = [dataNum, dataNum = dataNumNew][0];
		}
		if (+selected.attr("data-num") === dataNum) {
			selected.removeClass('sel');
			$('#select' + dataNumNew).addClass('sel');
		}
		Kns.refresh(false, true, true);
	};

	var Sel = {};
	Sel.main = [];
	for (var i = 0; i < Kns.parts.length; i++) {
		Sel.main[i] = Kns.parts[i].default ? [JSON.parse(JSON.stringify(Kns.parts[i].default))] : [];
	}
	Sel.now = 0;
	Sel.nowSelected = 0;
	Sel.block = 0;
	Sel.random = false;

	Kns.prerenderPalettes();

	$("body").on("click", "a[href*=#]", function (e) {
		e.preventDefault();
	});

	$("#sbm").on("click", function() {
		Kns.confirm("Сохранить окрас?", function() {
			//validate
			try {
				for (var i = 0; i < Kns.parts.length; i++) {
					var now = Sel.main[i];
					var info = Kns.parts[i];
					var max = Kns.partAvailable(false, i) ? (info.noCombine ? 1 : Kns.detailsMax) : 0;
					if (now.length > max) {
						Kns.error("Сохранение невозможно: слишком много элементов");
						return;
					}
					var obligatory = Kns.parts[i].obligatory && max > 0;
					if (now.length < 1 && obligatory) {
						Kns.error("Сохранение невозможно: не выбраны обязательные элементы");
						return;
					}
					var oldLayers = [];
					for (var layer = 0; layer < now.length; layer++) {
						if ((now[layer] === 0 || now[layer] === '' || now[layer] === '0')) {
							if (obligatory) {
								Kns.error("Сохранение невозможно: не выбраны обязательные элементы");
								return;
							}
							continue;
						}
						var parts = now[layer];
						var palette = info.palette | 0;
						var detail = {id: 0};
						if (info.info) {
							if (!parts.id) {
								Kns.error("Сохранение невозможно: некорректный код элемента");
								return;
							}
							detail = info.info.filter(function (el) {
								return el.id == parts.id;
							})[0];
							if (detail && Kns.partAvailable(false, i, detail.id)) {
								palette = detail.palette | 0;
							} else {
								Kns.error("Сохранение невозможно: неверный элемент");
								return;
							}
							if (oldLayers.filter(function (el) {
								return el == parts.id;
							}).length >= (info.opaque ? 1 : Kns.maxSimilarElements)) {
								Kns.error("Сохранение невозможно: повторяющийся элемент");
								return;
							}
							oldLayers.push(parts.id);
						}
						if (!Kns.palette[palette].colours.filter(function (el) {
							return el.id == parts.colour;
						})[0] || +parts[1] === 0 || !Kns.partAvailable(false, i, detail.id, parts.colour)) {
							Kns.error("Сохранение невозможно: неверный цвет");
							return;
						}
					}
				}
			} catch (e) {
				Kns.error("Ошибка валидации, сохранение невозможно");
				return;
			}
			$.post("kns_save", {code: Kns.code()}, function (data) {
				$("body").html(data);
			});
		});
	});

	$("body").on("click", "[class^=edit]", function() {
		Sel.now = parseInt($(this).attr('class').replace('edit', ''));
		$(".selected_block").each(function() {
			$(this).removeClass('selected_block')
		});
		$(this).addClass('selected_block');
		Kns.refresh(false, false, true, false, false, true);
	});

	$("#color").on("click", function (e) {
		var colour = $(e.target).attr("data-num");
		if (!colour && +colour !== 0) {
			return;
		}
		var id;
		colour = colour.split("/");
		if (colour.length > 1) {
			id = colour[0];
			colour = colour[1];
		} else {
			colour = colour[0];
		}

		var detail = (Kns.parts[Sel.now].info && Kns.parts[Sel.now].info[Sel.nowSelected]) ? Kns.parts[Sel.now].info[Sel.nowSelected].id : 0;

		if (!Kns.partAvailable(true, Sel.now, detail, colour)) {
			return;
		}

		var dataNum = 0;
		if (!Kns.parts[Sel.now].noCombine) {
			dataNum = $(".sel").attr("data-num");
		}
		Sel.main[Sel.now][dataNum].colour = colour;
		Sel.main[Sel.now][dataNum].id = id ? id : Sel.main[Sel.now][dataNum].id;

		Kns.cleanMain(Sel.now);
		Kns.refresh(false, true, false, false, true);
	});

	$("#random").on("click", function() {
		Kns.confirm("Сгенерировать случайный окрас? Текущий окрас будет потерян.", Kns.random);
	});

	$("#random2").on("click", function() {
		Kns.confirm("Сгенерировать очень случайный окрас? Текущий окрас будет потерян.", function() {
			Kns.random(1);
		});
	});

	$("#reset").on("click", function() {
		Kns.confirm("Сбросить окрас?", Kns.reset);
	});

	$("#error").on("click", Kns.hideError);

	$("#confirm_no").on("click", function() {
		$("#confirm").hide();
	});

	$(".field_palette").on('click', function() {
		$('#field').css('background-image', this.style.backgroundImage);
		$(".selected_field").each(function() {
			$(this).removeClass('selected_field')
		});
		$(this).addClass("selected_field");
	});

	Kns.copyCode = function() {
		var copyText = document.getElementById("code");
		copyText.select();

		var range = document.createRange();
		range.selectNodeContents(copyText);
		var s = window.getSelection();
		s.removeAllRanges();
		s.addRange(range);
		copyText.setSelectionRange(0, 999999);

		document.execCommand("copy");
		copyText.blur();
		alert("Код скопирован!");
	};

	Kns.circlePaletteClicked = function(evt) {
		Kns.circlePaletteUpdated(evt.offsetX, evt.offsetY, evt.target);
	}
	Kns.circlePaletteUpdated = function(x, y, obj) {
		x /= Kns.paletteScale;
		y /= Kns.paletteScale;


		var dataNum = 0;
		if (!Kns.parts[Sel.now].noCombine) {
			dataNum = $(".sel").attr("data-num");
		}
		var props = Sel.main[Sel.now][dataNum].colour.split(":");
		if (props.length !== 3) {
			props = [35, 60, 100];
		}

		var dx, dy;
		dx = x - (Kns.smolCircleR * 7 + Kns.circleR);
		dy = y - (Kns.smolCircleR + Kns.circleR);


		if (dx*dx + dy*dy <= Kns.circleR * Kns.circleR) {
			var radius = Math.sqrt(Math.max(dx*dx + dy*dy, 0));
			props[0] = radius / Kns.circleR * 100;
			var angle = Math.atan2(dy, dx) / Math.PI / 2;
			if (angle < 0 || angle > 1) {
				angle -= Math.floor(angle);
			}
			props[1] = angle * 100;
		}

		dx = x - (Kns.smolCircleR * 2);
		dy = y - (Kns.smolCircleR);
		if (dx >= 0 && dx <= Kns.smolCircleR && dy >= 0 && dy <= Kns.circleR * 2) {
			var brightness = dy / (Kns.circleR * 2);
			props[2] = (1 - brightness) * 100;
		}

		for (var i = 0; i < props.length; i++) {
			props[i] = Math.round(props[i]);
		}
		if (!props[0]) {
			props[1] = 0;
		}

		var id = $(obj).attr("data-detail");
		Sel.main[Sel.now][dataNum].colour = props.join(":");
		if (+id) {
			Sel.main[Sel.now][dataNum].id = id;
		}

		Kns.cleanMain(Sel.now);
		Kns.refresh(false, true, false, false, true);
	}

	Kns.start();

	window.onresize = Kns.drawPalette;
};


$(function() {
	//$.getJSON('./kns_files/kns_def.json', initAll);
	initAll();
});