var Kns = {};

$(function() {
	////константы
	var normalBases = 24;
	var numBase = 0;
	var numTailBase = 15;
	var numTailElement = 4;
	var numManeBase = 16;
	var numManeElement = 20;
	var numTuftBase = 18;
	var numTuftElement = 21;
	var numEarBase = 17;
	var numEarLeft = 7;
	var numEarRight = 8;
	var numEarLay = 2;
	var numEarTufts = 10;
	var numLeftEye = 1;
	var numRightEye = 19;
	var numRightHindPaw = 14;
	var numSpecialEdits = [numBase, numLeftEye, numRightEye];
	var numObligatory = [numBase, numTailBase, numEarBase, numLeftEye];
	Kns.detailVariant = 1;
	Kns.result  = [0, 1, 5, 6, 3, 2, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
	Kns.blocks  = [["Основа", [0, 16], 15, 18, 17], ["Шея и морда", [1, 19, 7, 8, 10, 20, 21], 2, 11], ["Туловище", 3, 9, 12], ["Лапы и хвост", 4, 5, 6, 13, 14]];
	Kns.actions = [0, 1];
	Kns.info    = [
		/* 0 */ {name: "Основной цвет", // base
			noCombine: true,
			default: 1,
			palette: 1,
			noVariations: true},
		/* 1 */ {name: "Глаза", // elements/eyes
			noCombine: true,
			default: 12,
			palette: 2,
			noVariations: true},
		/* 2 */ {name: "Морда", // elements/head
			info: {"1": "Полосочки", "2": "Полосы", "3": "Извилистые полосы", "4": "Полосы от щёк", "5": "Разорванные полосы от щёк", "6": "Полосы вокруг бровей", "7": "Полосы до глаз", "8": "Пламенные полосы", "9": "Полосы на лбу", "10": "Разорванные полосы на лбу", "11": "Полосы на носу", "12": "Мрамор", "13": "Ремень", "14": "Узкий ремень", "15": "Половина ремня", "16": "Половина узкого ремня", "17": "Брызги", "18": "Брызги на носу", "19": "Пятнышки", "20": "Пятнышки под глазами", "21": "Пятна", "22": "Леопардовые пятнышки", "23": "Маленькая маска", "24": "Маска", "25": "Маска без глаз", "26": "Маска с глазами", "27": "Бородка", "28": "Бородка с щеками", "29": "Подбородок", "30": "Подбородок с щеками", "31": "Брови", "32": "Рысьи брови", "33": "Вибриссы", "34": "Отметина под носом", "35": "Внешняя сторона губ", "36": "Губы", "37": "Щипец", "38": "Пятно меж глаз", "39": "Переносица", "40": "Клякса на нос", "41": "Отметины на скулах", "42": "Щёки полностью", "43": "Макушка", "44": "Шапка", "45": "Подпалины на лбу", "46": "Отметина справа морды", "47": "Отметина на глазу", "48": "Слеза", "49": "Пятно на лбу", "50": "Отметины над глазами №1", "51": "Отметины над глазами №2", "52": "Отметины под глазами №1", "53": "Отметины под глазами №2", "54": "Отметина в половину носа", "55": "Отметина на нос", "56": "Левая половина морды №1", "57": "Левая половина морды №2", "58": "Левая половина морды №3", "59": "Левая половина морды №4", "60": "Правая половина морды №1", "61": "Правая половина морды №2", "62": "Правая половина морды №3", "63": "Правая половина морды №4", "64": "Большое пятно №1", "65": "Большое пятно №2", "66": "Большое пятно №3", "67": "Большое пятно №4", "68": "Большое пятно №5", "69": "Слабый налёт", "70": "Налёт", "71": "Слабая затушёвка", "72": "Затушёвка"}},
		/* 3 */ {name: "Туловище", // elements/body
			info: {"1": "Брызги", "2": "Пятнышки", "3": "Пятна", "4": "Большое пятно №1", "5": "Большое пятно №2", "6": "Большое пятно №3", "7": "Большое пятно №4", "8": "Большое пятно №5", "9": "Большое пятно №6", "10": "Большое пятно №7", "11": "Большое пятно №8", "12": "Леопардовые пятнышки", "13": "Полоски", "14": "Полосы", "15": "Тонкие полосы", "16": "Пламенные полосы", "17": "Разорванные полосы", "18": "Полосы с ремнём", "19": "Мрамор", "20": "Мраморные отметины ", "21": "Мраморные полосы", "22": "Облачный мрамор", "23": "Облачные отметины", "24": "Узкий ремень", "25": "Ремень", "26": "Ремень на плечах", "27": "Ремень на крестце", "28": "Пятна на плечах", "29": "Пятно на плече", "30": "Отметина на лопатках", "31": "Отметина на боку", "32": "Отметина на бедре", "33": "Отметина на крестце", "34": "Клякса", "35": "Слабый налёт", "36": "Налёт", "37": "Сильный налёт", "38": "Слабая затушёвка", "39": "Затушёвка", "40": "Чепрак", "41": "Чепрак с прорезями"}},
		/* 4 */ {name: "Хвост", // elements/tail
			info: {"1": "Кольцо", "2": "Кольца", "3": "Кончик", "4": "Кончик с пятнами", "5": "Кисточка", "6": "Начало хвоста", "7": "Половина хвоста", "8": "Низ", "9": "Низ с кончиком", "10": "Брызги", "11": "Пятнышки", "12": "Пятна", "13": "Большие пятна", "14": "Полоски", "15": "Полосы", "16": "Пламенные полосы", "17": "Мрамор", "18": "Ремень", "19": "Ремень с кончиком", "20": "Узкий ремень", "21": "Налёт", "22": "Затушёвка"}},
		/* 5 */ {name: "Левая лапа", // elements/forepaw_left
			info: {"1": "Брызги", "2": "Пятнышки", "3": "Леопардовые пятнышки", "4": "Тонкие полосы", "5": "Полосы", "6": "Разорванные полосы", "7": "Пламенные полосы", "8": "Мрамор", "9": "Пальцы", "10": "Носок", "11": "Гольф", "12": "Чулок", "13": "Лапа", "14": "Низ", "15": "Низ с носком", "16": "Слабый налёт", "17": "Сильный налёт"}},
		/* 6 */ {name: "Правая лапа", // elements/forepaw_right
			info: {"1": "Брызги", "2": "Пятнышки", "3": "Леопардовые пятнышки", "4": "Тонкие полосы", "5": "Полосы", "6": "Разорванные полосы", "7": "Пламенные полосы", "8": "Мрамор", "9": "Пальцы", "10": "Носок", "11": "Гольф", "12": "Чулок", "13": "Лапа", "14": "Низ", "15": "Низ с носком", "16": "Слабый налёт", "17": "Сильный налёт"}},
		/* 7 */ {name: "Левое ухо", // elements/ear_left
			info: {"1": "Кончик уха", "2": "Кайма", "3": "Полностью"}},
		/* 8 */ {name: "Правое ухо", // elements/ear_right
			info: {"1": "Кончик уха", "2": "Кайма", "3": "Полностью"}},
		/* 9 */ {name: "Грудь", // elements/breast
			info: {"1": "Пятнышки", "2": "Пятна", "3": "Мрамор", "4": "Маленький медальон", "5": "Средний медальон", "6": "Медальон", "7": "Подпалины", "8": "Область под шеей", "9": "Полностью", "10": "Грудь с горлом"}},
		/* 10 */ {name: "Кисточки", // elements/tuft
			info: {"1": "Кисточки", "2": "Маленькие кисточки"}},
		/* 11 */ {name: "Шея", // elements/neck
			info: {"1": "Пятнышки", "2": "Пятна", "3": "Отметины", "4": "Леопардовые пятнышки", "5": "Большое пятно №1", "6": "Большое пятно №2", "7": "Полоски", "8": "Полосы", "9": "Пламенные полосы", "10": "Разорванные полосы", "11": "Мрамор", "12": "Мраморные полосы", "13": "Полосатый мрамор", "14": "Ремень", "15": "Узкий ремень", "16": "Полностью", "17": "Слабый налёт", "18": "Налёт", "19": "Затушёвка"}},
		/* 12 */ {name: "Живот", // elements/belly
			info: {"1": "Пятна", "2": "Полосы", "3": "Неполный живот", "4": "Полностью"}},
		/* 13 */ {name: "Задняя левая лапа", // elements/hindpaw_left
			info: {"1": "Брызги", "2": "Пятнышки", "3": "Пятна", "4": "Большие пятна", "5": "Леопардовые пятнышки", "6": "Полосочки", "7": "Полоски", "8": "Полосы", "9": "Разорванные полосы", "10": "Тонкие полосы", "11": "Пламенные полосы", "12": "Извилистые полосы", "13": "Мрамор", "14": "Мраморные отметины", "15": "Пальцы", "16": "Носок", "17": "Стопа", "18": "Гольф", "19": "Чулок", "20": "Низ", "21": "Внешняя сторона лапы", "22": "Лапа", "23": "Слабый налёт", "24": "Налёт", "25": "Сильный налёт", "26": "Затушёвка"}},
		/* 14 */ {name: "Задняя правая лапа", // elements/hindpaw_right
			info: {"1": "Брызги", "2": "Пятнышки", "3": "Пятна", "4": "Большие пятна", "5": "Леопардовые пятнышки", "6": "Полосочки", "7": "Полоски", "8": "Полосы", "9": "Разорванные полосы", "10": "Тонкие полосы", "11": "Пламенные полосы", "12": "Извилистые полосы", "13": "Мрамор", "14": "Мраморные отметины", "15": "Пальцы", "16": "Носок", "17": "Стопа", "18": "Гольф", "19": "Чулок", "20": "Низ", "21": "Внешняя сторона лапы", "22": "Лапа", "23": "Слабый налёт", "24": "Налёт", "25": "Сильный налёт", "26": "Затушёвка"}},
		/* 15 */ {name: "Хвост", // base_tail
			noCombine: true,
			type: true,
			default: "1/1",
			palette: 1,
			info: {1: "Куцый", 2: "Тонкий", 3: "Умеренный", 4: "Пушистый", 5: "Пышный"}},
		/* 16 */ {name: "Грива", // base_mane
			noCombine: true,
			type: true,
			info: {1: "Умеренная", 2: "Пышная"}},
		/* 17 */ {name: "Уши", // base_ears
			noCombine: true,
			type: true,
			default: "1/1",
			palette: 1,
			info: {1: "Торчком", 2: "Висячие", 3: "Длинные"}},
		/* 18 */ {name: "Шерсть", // base_hair
			noCombine: true,
			type: true,
			info: {1: "На щёках №1", 2: "На щёках №2", 3: "На щёках №3"}},
		/* 19 */ {name: "Правый глаз", // elements/eye_right
			noCombine: true,
			palette: 2,
			noVariations: true},
		/* 20 */ {name: "Грива", // elements/mane
			info: {"1": "Брызги", "2": "Пятнышки", "3": "Пятна", "4": "Полосы", "5": "Пламенные полосы", "6": "Мрамор", "7": "Ремень", "8": "Узкий ремень", "9": "Налёт", "10": "Затушёвка"}},
		/* 21 */ {name: "Шерсть", // elements/hair
			info: {"1": "Левая", "2": "Правая"}}
	];
	Kns.backupInfo = JSON.parse(JSON.stringify(Kns.info));
	Kns.palette = [
		/* ОСНОВНОЙ ЦВЕТ -- ЭЛЕМЕНТЫ */
		/* 0 */ {"0": {name: "Не выделяется", image: "+0"},"1": {name: "Кремовый", colour: "#f5e5ce"},"2": {name: "Белоснежный", colour: "#ffffff"},"3": {name: "Белый", colour: "#e6e6e6"},"4": {name: "Серебристый", colour: "#d1d1d1"},"5": {name: "Серый", colour: "#9e9e9e"},"6": {name: "Дымчатый", colour: "#5c5c5c"},"7": {name: "Чёрный", colour: "#242424"},"8": {name: "Угольно-чёрный", colour: "#141414"},"9": {name: "Иссиня-чёрный", colour: "#1d212c"},"10": {name: "Чернобурый", colour: "#2b1d1c"},"11": {name: "Бурый", colour: "#3d1c0b"},"12": {name: "Шоколадный", colour: "#6b3c28"},"13": {name: "Фавн", colour: "#9a715f"},"14": {name: "Медный", colour: "#bd6d32"},"15": {name: "Огненный", colour: "#cb4402"},"16": {name: "Красный", colour: "#e15c0f"},"17": {name: "Рыжий", colour: "#ed9b2d"},"18": {name: "Золотистый", colour: "#e5bd7f"},"19": {name: "Палевый", colour: "#d7ae98"},"20": {name: "Лиловый", colour: "#b19798"},"21": {name: "Голубой", colour: "#a6b4b7"},"22": {name: "Серо-голубой", colour: "#697a8a"},"23": {name: "Дымчато-голубой", colour: "#465165"},"24": {name: "Черничный", colour: "#323d51"}},
		/* ОСНОВНОЙ ЦВЕТ -- БАЗЫ */
		/* 1 */ {'0': {name: '', colour: ""},"1": {name: "Кремовый", colour: "#f5e5ce"},"2": {name: "Белоснежный", colour: "#ffffff"},"3": {name: "Белый", colour: "#e6e6e6"},"4": {name: "Серебристый", colour: "#d1d1d1"},"5": {name: "Серый", colour: "#9e9e9e"},"6": {name: "Дымчатый", colour: "#5c5c5c"},"7": {name: "Чёрный", colour: "#242424"},"8": {name: "Угольно-чёрный", colour: "#141414"},"9": {name: "Иссиня-чёрный", colour: "#1d212c"},"10": {name: "Чернобурый", colour: "#2b1d1c"},"11": {name: "Бурый", colour: "#3d1c0b"},"12": {name: "Шоколадный", colour: "#6b3c28"},"13": {name: "Фавн", colour: "#9a715f"},"14": {name: "Медный", colour: "#bd6d32"},"15": {name: "Огненный", colour: "#cb4402"},"16": {name: "Красный", colour: "#e15c0f"},"17": {name: "Рыжий", colour: "#ed9b2d"},"18": {name: "Золотистый", colour: "#e5bd7f"},"19": {name: "Палевый", colour: "#d7ae98"},"20": {name: "Лиловый", colour: "#b19798"},"21": {name: "Голубой", colour: "#a6b4b7"},"22": {name: "Серо-голубой", colour: "#697a8a"},"23": {name: "Дымчато-голубой", colour: "#465165"},"24": {name: "Черничный", colour: "#323d51"}},
		/* ГЛАЗА */
		/* 2 */ {'0': {name: '', colour: ""},"1": {name: "Медный", colour: "#9C7941"},"2": {name: "Карий", colour: "#362121"},"3": {name: "Чёрно-красный", colour: "#612322"},"4": {name: "Оранжевый", colour: "#D6700B"},"5": {name: "Янтарный", colour: "#FCB10D"},"6": {name: "Жёлтый", colour: "#FCDF00"},"7": {name: "Оливковый", colour: "#B3B059"},"8": {name: "Лайм", colour: "#A8AB0C"},"9": {name: "Зелёный", colour: "#2FA12D"},"10": {name: "Салатовый", colour: "#7DC210"},"11": {name: "Бирюзовый", colour: "#0ECC90"},"12": {name: "Голубой", colour: "#87C3D4"},"13": {name: "Васильковый", colour: "#148CCC"},"14": {name: "Синий", colour: "#192580"},"15": {name: "Серый", colour: "#7D8996"}},
		/* УНИКАЛЬНЫЕ ОКРАСЫ */
		/* 11(3) */ {'0': {name: '', colour: ""},"1": {name: "Кремовый", colour: "#f5e5ce"},"2": {name: "Белоснежный", colour: "#ffffff"},"3": {name: "Белый", colour: "#e6e6e6"},"4": {name: "Серебристый", colour: "#d1d1d1"},"5": {name: "Серый", colour: "#9e9e9e"},"6": {name: "Дымчатый", colour: "#5c5c5c"},"7": {name: "Чёрный", colour: "#242424"},"8": {name: "Угольно-чёрный", colour: "#141414"},"9": {name: "Иссиня-чёрный", colour: "#1d212c"},"10": {name: "Чернобурый", colour: "#2b1d1c"},"11": {name: "Бурый", colour: "#3d1c0b"},"12": {name: "Шоколадный", colour: "#6b3c28"},"13": {name: "Фавн", colour: "#9a715f"},"14": {name: "Медный", colour: "#bd6d32"},"15": {name: "Огненный", colour: "#cb4402"},"16": {name: "Красный", colour: "#e15c0f"},"17": {name: "Рыжий", colour: "#ed9b2d"},"18": {name: "Золотистый", colour: "#e5bd7f"},"19": {name: "Палевый", colour: "#d7ae98"},"20": {name: "Лиловый", colour: "#b19798"},"21": {name: "Голубой", colour: "#a6b4b7"},"22": {name: "Серо-голубой", colour: "#697a8a"},"23": {name: "Дымчато-голубой", colour: "#465165"},"24": {name: "Черничный", colour: "#323d51"},"25": {name: "\r\nУникальный окрас", image: "+1"},"26": {name: "Уникальный окрас", image: "+2"},"27": {name: "Уникальный окрас", image: "+3"},"28": {name: "Уникальный окрас", image: "+4"},"29": {name: "Уникальный окрас", image: "+5"},"30": {name: "Уникальный окрас", image: "+6"},"31": {name: "Уникальный окрас", image: "+7"},"32": {name: "Уникальный окрас", image: "+8"},"33": {name: "Уникальный окрас", image: "+9"},"34": {name: "Уникальный окрас", image: "+10"},"35": {name: "Уникальный окрас", image: "+11"},"36": {name: "Уникальный окрас", image: "+12"},"37": {name: "Уникальный окрас", image: "+13"},"38": {name: "Уникальный окрас", image: "+14"},"39": {name: "Уникальный окрас", image: "+15"},"40": {name: "Уникальный окрас", image: "+16"},"41": {name: "Уникальный окрас", image: "+17"},"42": {name: "Уникальный окрас", image: "+18"},"43": {name: "Уникальный окрас", image: "+19"},"44": {name: "Уникальный окрас", image: "+20"},"45": {name: "Уникальный окрас", image: "+21"},"46": {name: "Уникальный окрас", image: "+22"}},
		/* ФИОЛЕТОВЫЕ ГЛАЗА */
		/* 12(4) */ {'0': {name: '', colour: ""},"1": {name: "Медный", colour: "#9C7941"},"2": {name: "Карий", colour: "#362121"},"3": {name: "Чёрно-красный", colour: "#612322"},"4": {name: "Оранжевый", colour: "#D6700B"},"5": {name: "Янтарный", colour: "#FCB10D"},"6": {name: "Жёлтый", colour: "#FCDF00"},"7": {name: "Оливковый", colour: "#B3B059"},"8": {name: "Лайм", colour: "#A8AB0C"},"9": {name: "Зелёный", colour: "#2FA12D"},"10": {name: "Салатовый", colour: "#7DC210"},"11": {name: "Бирюзовый", colour: "#0ECC90"},"12": {name: "Голубой", colour: "#87C3D4"},"13": {name: "Васильковый", colour: "#148CCC"},"14": {name: "Синий", colour: "#192580"},"15": {name: "Серый", colour: "#7D8996"}, "16": {name: "Фиолетовый", colour: "#734563"}},
	];
	Kns.error_tm = 0;
	Kns.warning = 3; // убрать, когда будут действия
	Kns.unresult = function(id) {
		for (var i = 0; i < Kns.result.length; i++) {
			if (Kns.result[i] == id) {
				return i;
			}
		}
		return 0;
	};
	
	Kns.start = function() {
		Kns.vip();
		Kns.drawBlocks();
		Kns.refresh(true);
	};
	Kns.code = function() {
		var code = [];
		for (var i = 0; i < Kns.result.length; i++) {
			var now = Sel.main[Kns.result[i]];
			if (now instanceof Array) {
				now = now.join("-") || "0";
			}
			if (Kns.info[i].type) {
				now = (now || "0").replace("-", "/");
			}
			code.push(now);
		}
		code = code.join(" ");
		return code;
	};
	Kns.drawCat = function() {
		var html = "";
		for (var i = 0; i < Kns.actions.length; i++) {
			html += "<td>" + Func.showCat(Kns.code(), 4.5, 0, Kns.actions[i]) + "</td>";
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
					if (!Kns.info[n].name) {
						continue;
					}
					table += '<tr id="part' + n + '"><td><a href="#" class="edit' + n + '">' + Kns.info[n].name + '</a></td></tr>'
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
			if (block === 0 || block == 1) {
				for (var i = 1; i < Kns.blocks[block].length; i++) {
					var all_n = Kns.blocks[block][i];
					if (!(all_n instanceof Array)) {
						all_n = [all_n];
					}
					for (var j = 0; j < all_n.length; j++) {
						var n = all_n[j];
						var hide = Sel.main[numBase] > normalBases && !numSpecialEdits.includes(n);
						hide |= !Sel.main[numManeBase][0] && n == numManeElement;
						hide |= !Sel.main[numTuftBase][0] && n == numTuftElement;
						try {
							hide |= Sel.main[numEarBase][0].split('/')[0] == numEarLay && n == numEarTufts;
						} catch (e) {}
						if (hide) {
							$("#part" + n).hide();
						} else {
							$("#part" + n).show();
						}
					}
				}
			} else {
				if (Sel.main[numBase][0] > normalBases) {
					$("#block" + block).hide();
				} else {
					$("#block" + block).show();
				}
			}
		}
	};

	Kns.drawDetail = function(newSelect) {
		var html = "";
		delete Sel.nowSelected;
		var dataNum = 0;
		if (!newSelect) {
			dataNum = $(".sel").attr("data-num") || dataNum;
		}
		var info = Kns.info[Sel.now].info;
		if (info) {
			var selectedList = [];
			var canAdd = false;
			if (Sel.main[Sel.now].length > 0) {
				for (var l = 0; l < Sel.main[Sel.now].length; l++) {
					selectedList[l] = Sel.main[Sel.now][l].split("/")[0];
				}
			}
			if (dataNum >= selectedList.length) {
				dataNum = selectedList.length - 1;
			}
			Sel.nowSelected = selectedList[dataNum];
			var max = 1;
			if (!Kns.info[Sel.now].noCombine && !Kns.info[Sel.now].noVariations) {
				max = 5;
			}
			var elems = 0;
			for (var id in info) {
				elems++;
			}
			if (selectedList.length < max && selectedList.length < elems) {
				canAdd = true;
			}
			html += '<table><tr><td><table class="tabledetail">';
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
						name = info[(selectedList[i] || 0)];
						if (typeof name === "object") {
							name = name.name;
						}
						style += ' style="border-width: 1px; border-style: solid;' + Kns.getPreviewStyle(selectedList[i] || 0) + '"';
						html += '<tr><td style="width: 0;"></td><td style="width: 10px; height: 32px;">' + moveup + '<br>' + movedown + '</td>';
						html += '<td><div' + style + ' onclick="Kns.clickedDetail(this);" data-num="' + i + '" data-value="' + (selectedList[i] || 0) + '" id="select' + i + '" title="' + name + '"/></td></tr>';
						break;
					default:
						html += '<tr><td style="width:10px;">' + moveup + '</td><td style="width:10px;">' + movedown + '</td>';
						html += '<td><select style="width:100px;"' + style + ' onchange="Kns.selectedDetail(this);" onclick="Kns.clickedDetail(this);" data-num="' + i + '" id="select' + i + '">';
						for (id in info) {
							if (!info.hasOwnProperty(id)) {
								continue;
							}
							if (selectedList.includes(id) && selectedList[i] != id) {
								continue;
							}
							name = info[id];
							if (typeof name === "object") {
								name = name.name;
							}
							var selected = selectedList[i] == id ? ' selected' : '';
							html += '<option value="' + id + '"' + selected + '>' + name + '</option>';
						}
						html += "</select></td></tr>";
						break;
				}
			}
			if (canAdd) {
				html += '<tr><td></td><td></td><td><a onclick="Kns.addDetail();" class="a_none">+</a></td></tr>';
			}
			html += "</table></td>";
			switch (Kns.detailVariant) {
				case 1:
					if (dataNum >= 0 && dataNum < selectedList.length) {
						html += '<td><div style="margin-left: 5px; solid; box-sizing: border-box; border: 0; width: 130px; height: 300px; overflow: auto;"><table style="border-width: 2; margin: auto;" class="tabledetail"><tr>';
						var line = 0;
						for (id in info) {
							if (!info.hasOwnProperty(id)) {
								continue;
							}
							if (selectedList.includes(id) && id != selectedList[dataNum]) {
								continue;
							}
							name = info[id];
							if (typeof name === "object") {
								name = name.name;
							}
							html += '<td><div data-num="' + dataNum + '" data-value="' + id + '" style="border-width: 1px; border-style: solid;' + Kns.getPreviewStyle(id) + '" onclick="Kns.selectedDetail(this)" title="' + name + '"/></td>';
							line++;
							if (line >= 3) {
								line = 0;
								html += '</tr><tr>';
							}
						}
						html += '</tr></table></div></td>';
					}
			}
			html += '</tr></<table>';
		} else {
			Sel.nowSelected = "1";
		}
		$("#detail").html(html);
		$("[title]").tipTip();
	};

	Kns.getPreviewStyle = function(part) {
		var id = part + "/0";
		var parent;
		switch (Sel.now) {
			case numTuftElement:
				parent = numTuftBase;
				break;
			case numEarTufts:
			case numEarLeft:
			case numEarRight:
				parent = numEarBase;
				break;
			case numManeElement:
				parent = numManeBase;
				break;
			case numTailElement:
				parent = numTailBase;
				break;
		}
		if (parent) {
			parent = Sel.main[parent][0];
			parent = (parent+'').split('/')[0];
			if (parent) {
				id = parent + '/' + id;
			}
		}
		return Func.getUrlStyle(0, Func.folders.animationCode[Kns.unresult(Sel.now)], id) + 'background-size: 100%;';
	};

	Kns.refresh = function(allnew, detailnotnew, noblocks, newselect, nodetail, nocats) {
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
		Kns.drawPalette();
		if (allnew) {
			$(".edit0").click();
		}
	};

	Kns.selectedDetail = function(menu) {
		Sel.nowSelected = menu.value || menu.getAttribute('data-value') || '1';
		var dataNum = menu.getAttribute("data-num");
		if (Sel.main[Sel.now] === 0 || Sel.main[Sel.now] === '') {
			return;
		}
		if (!(Sel.main[Sel.now] instanceof Array)) {
			Sel.main[Sel.now] = Sel.main[Sel.now].split('-');
		}
		if (Sel.main[Sel.now].length <= dataNum) {
			return;
		}
		var data = Sel.main[Sel.now][dataNum].split('/');
		data[0] = Sel.nowSelected;
		Sel.main[Sel.now][dataNum] = data.join('/');
		Kns.refresh(false, true, false, false, true);
		$('.sel').css('background-image', menu.style.backgroundImage);
	};

	Kns.clickedDetail = function(menu) {
		if (menu.classList.contains('sel')) {
			return;
		}
		$(".sel").each(function () { $(this).removeClass('sel')});
		menu.className += 'sel';
		Sel.nowSelected = menu.value || menu.getAttribute("data-value");
		Kns.refresh(false, true, false, false, Kns.detailVariant != 1);
	};

	Kns.addDetail = function() {
		var info = Kns.info[Sel.now].info;
		if (!info) {
			Kns.error("Невозможно добавить элемент.");
			return;
		}
		var selectedList = [];
		for (var i = 0; i < Sel.main[Sel.now].length; i++) {
			var type = (Sel.main[Sel.now][i]+'').split('/')[0];
			if (type) {
				selectedList.push(type);
			}
		}
		var data = 0;
		for (var part in info) {
			if (!info.hasOwnProperty(part)) {
				continue;
			}
			if (selectedList.includes(part)) {
				continue;
			}
			var palette = info[palette] || 0;
			for (var colour in Kns.palette[palette]) {
				if (+colour === 0) {
					continue;
				}
				data = part + '/' + colour;
				break;
			}
			break;
		}
		if (data) {
			Sel.main[Sel.now].push(data);
			Kns.drawDetail(false);
			$('#select' + (Sel.main[Sel.now].length - 1)).click();
			Kns.refresh(false, true, true, false);
		}
	};

	Kns.drawPalette = function() {
		var html = '<table style="border: 0 solid black; box-sizing: border-box;"><tr>';
		var p;
		try {p = Kns.info[Sel.now].info[Sel.nowSelected].palette;} catch(e) {}
		try {p = p || Kns.info[Sel.now].info["+" + Sel.nowSelected].palette;} catch(e) {}
		p = p || Kns.info[Sel.now].palette || 0;
		p = Sel.nowSelected === undefined ? -1 : p;
		var dataNum = Kns.info[Sel.now].info ? $(".sel").attr("data-num") : 0;
		if (dataNum === undefined) {
			p = -1;
		}
		var colour = (Sel.main[Sel.now][dataNum] + '' || '').split('/');
		if (colour.length >= 2) {
			colour = +colour[1];
		} else {
			colour = +colour[0] || 0;
		}
		var width = 0;
		var maxWidth = $('#main').width() - 32;
		for (var i in Kns.palette[p]) {
			if (!Kns.palette[p].hasOwnProperty(i)) {
				continue;
			}
			if (Kns.palette[p][i].name === '') {
				continue;
			}
			var bg = (Kns.palette[p][i].colour ? Kns.palette[p][i].colour : "url(cats/palette/" + +Kns.palette[p][i].image + ".png)");
			var name = Kns.palette[p][i].name;
			if (name.trim() != name) {
				name = name.trim();
				html += '</tr><tr>';
				width = 0;
			} else if (width >= maxWidth) {
				html += '</tr><tr>';
				width = 0;
			}
			html += '<td><div style="background: ' + bg + ' center no-repeat; border-width: 1px; box-sizing: border-box; border-style: solid" title="' + name + '" data-num="' + i + '"' + (i == colour ? ' class="selected_colour"' : '') + '> </div></td>';
			width += 32;
		}
		html += '</tr></table>';
		$("#color").html(html);
		$("[title]").tipTip();
	};

	Kns.cleanMain = function(el) {
		if (!(Sel.main[el] instanceof Array)) {
			return;
		}
		var newArr = [];
		for (var i = 0; i < Sel.main[el].length; i++) {
			var val = Sel.main[el][i];
			if (val > 0 || (val != "" && val != "0")) {
				newArr.push(val);
			}
		}
		Sel.main[el] = newArr;
	};
	Kns.reset = function() {
		Sel.main = [];
		for (var i = 0; i < Kns.info.length; i++) {
			Sel.main[i] = Kns.info[i].default ? [Kns.info[i].default] : [];
		}
		Kns.refresh(true);
	};
	Kns.random = function(coeff = 0.5) {
		Sel.random = true;
		Kns.reset();
		for (var i = 0; i < Kns.info.length; i++) {
			Sel.main[i] = [];
			var pastParts = [];
			if (i == 19) {
				pastParts = [];
			}
			if (!Kns.info[i] || !Kns.info[i].name) {
				continue;
			}
			for (var dataNum = 0; dataNum < ((Kns.info[i].noVariations || Kns.info[i].noCombine) ? 1 : 5); dataNum++) {
				if (Math.random() >= coeff && !numObligatory.includes(i) || Sel.main[numBase][0] > normalBases && !numSpecialEdits.includes(i)) {
					continue;
				}
				var result = [];
				var palette = Kns.info[i].palette || 0;
				if (Kns.info[i].info) {
					var parts = [];
					for (var onepart in Kns.info[i].info) {
						if (!Kns.info[i].info.hasOwnProperty(onepart)) {
							continue;
						}
						if (pastParts.includes(onepart)) {
							continue;
						}
						parts.push(onepart);
					}
					if (parts.length < 1) {
						break;
					}
					var part = Math.floor(Math.random() * parts.length);
					result.push(parts[part]);
					pastParts.push(parts[part]);
					palette = Kns.info[i].info[result[0]].palette || palette;
				}
				var colours = [];
				for (var colour in Kns.palette[palette]) {
					if (!Kns.palette[palette].hasOwnProperty(colour)) {
						continue;
					}
					if (+colour === 0 || +Kns.palette[palette][colour].name === 0) {
						continue;
					}
					colours.push(colour);
				}
				var colourNum = Math.floor(Math.random() * colours.length);
				result.push(colours[colourNum]);
				Sel.main[i].push(result.join("/"));
			}
		}
		Kns.refresh(true);
		Sel.random = false;
	};
	Kns.vip = function(temp) {
		var vipLevel = +$("#main").data("vip");
		if (temp) {
			vipLevel = +temp;
			Kns.info = JSON.parse(JSON.stringify(Kns.backupInfo));
		}
		if (vipLevel < 1) {
			Kns.info[numRightEye] = {};
			return;
		}
		Kns.info[numLeftEye].name = "Левый глаз";
		if (vipLevel < 2) {
			return;
		}
		Kns.info[numBase].palette = 3;
		if (vipLevel < 3) {
			return;
		}
		Kns.info[numLeftEye].palette = 4;
		Kns.info[numRightEye].palette = 4;
	};
	Kns.error = function(text) {
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
	Kns.confirm = function(text, func) {
		$("#confirm_text").html(text);
		var confirm = $("#confirm");
		confirm.show();
		var yes = $("#confirm_yes");
		yes.off();
		yes.on("click", function() {
			confirm.hide();
			func();
		});
	};

	Kns.parseCode = function(input) {
		var code = input.value;
		var blocks = code.split(" ");
		for (var i = 0; i < Kns.result.length; i++) {
			var num = Kns.result[i];
			if (i >= blocks.length) {
				if (Kns.info[num] && Kns.info[num].default) {
					Sel.main[num] = [Kns.info[num].default];
				} else {
					Sel.main[num] = [];
				}
				if (Sel.main[numBase] > normalBases && !numSpecialEdits.includes(num)) {
					Sel.main[num] = [];
				}
				continue;
			}
			blocks[i] = (blocks[i]+'').split("-");

			Sel.main[num] = [];
			for (var inter = 0; inter < blocks[i].length; inter++) {
				var part = blocks[i][inter];
				if (+part !== 0) {
					Sel.main[num].push(part);
				}
			}
		}
		Kns.refresh(true);
	};

	Kns.moveLine = function(up, line) {
		if (Kns.info[Sel.now].noCombine || Kns.info[Sel.now].noVariations) {
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
		Sel.main[Sel.now][dataNumNew] = [Sel.main[Sel.now][dataNum], Sel.main[Sel.now][dataNum]=Sel.main[Sel.now][dataNumNew]][0];
		var selected = $(".sel");
		if (+selected.attr("data-num") == dataNumNew) {
			dataNumNew = [dataNum, dataNum = dataNumNew][0];
		}
		if (+selected.attr("data-num") == dataNum) {
			selected.removeClass('sel');
			$('#select' + dataNumNew).addClass('sel');
		}
		Kns.refresh(false, true, true);
	};
	
	var Sel = {};
	Sel.main = [];
	for (var i = 0; i < Kns.info.length; i++) {
		Sel.main[i] = Kns.info[i].default ? [Kns.info[i].default] : [];
	}
	Sel.now = 0;
	Sel.nowSelected = 1;
	Sel.block = 0;
	Sel.random = false;
	
	$("body").on("click", "a[href*=#]", function(e) {
		e.preventDefault();
	});
	
	$("#sbm").on("click", function() {
		Kns.confirm("Сохранить окрас?", function() {
			//validate
			try {
				for (var i = 0; i < Kns.result.length; i++) {
					if (!(Sel.main[Kns.result[i]] instanceof Array)) {
						Sel.main[Kns.result[i]] = (Sel.main[Kns.result[i]] + '').split('-');
					}
					var now = Sel.main[Kns.result[i]];
					var info = Kns.info[Kns.result[i]];
					if (now.length > (info.noVariations || info.noCombine ? 1 : 5)) {
						Kns.error("Ошибочная строка, сохранение невозможно: слишком много элементов");
						return;
					}
					var obligatory = numObligatory.includes(Kns.result[i]) && (Sel.main[numBase][0] <= normalBases || Sel.main[numBase][0] > normalBases && numSpecialEdits.includes(Kns.result[i]));
					if (now.length < 1 && obligatory) {
						Kns.error("Ошибочная строка, сохранение невозможно: не выбраны обязательные элементы");
						return;
					}
					var oldLayers = [];
					for (var layer = 0; layer < now.length; layer++) {
						if ((now[layer] === 0 || now[layer] === '' || now[layer] === '0')) {
							if (obligatory) {
								Kns.error("Ошибочная строка, сохранение невозможно: не выбраны обязательные элементы");
								return;
							}
							continue;
						}
						var parts = (now[layer] + '').split('/');
						if (parts.length != (info.noVariations ? 1 : 2)) {
							Kns.error("Ошибочная строка, сохранение невозможно: некорректный код элемента");
							return;
						}
						var palette = 0;
						if (info.noVariations || !info.info) {
							palette = info.palette | 0;
						} else {
							var detail = info.info[parts[0]];
							if (detail) {
								palette = detail.palette | 0;
							} else {
								Kns.error("Ошибочная строка, сохранение невозможно: неверный цвет");
								return;
							}
							if (oldLayers.includes(parts[0])) {
								Kns.error("Ошибочная строка, сохранение невозможно: повторяющийся элемент");
								return;
							}
							oldLayers.push(parts[0]);
						}
						if (info.noVariations) {
							parts[1] = parts[0];
						}
						if (!Kns.palette[palette][parts[1]] || +parts[1] === 0) {
							Kns.error("Ошибочная строка, сохранение невозможно: неверный цвет");
							return;
						}
					}
				}
			} catch (e) {
				Kns.error("Ошибка валидации, сохранение невозможно");
				return;
			}
			$.post("kns_save", {code: Kns.code()}, function(data) {
				$("body").html(data);
				$("#cat").html(Func.showCat($("#cat").text())).show();
			});
		});
	});
	
	$("body").on("click", "[class^=edit]", function() {
		var cl = parseInt($(this).attr('class').replace('edit', ''));
		Sel.now = cl;
		$(".selected_block").each(function () { $(this).removeClass('selected_block')});
		$(this).addClass('selected_block');
		Kns.refresh(false, false, true, false, false, true);
	});
	
	$("#color").on("click", function(e) {
		var num = +$(e.target).attr("data-num");
		if (!num && num !== 0) {
			return;
		}

		if (Sel.now == numEarTufts && Sel.main[numEarBase][0] == 2 && num !== 0) {
			Kns.error("Нельзя выбирать кисточки при висячих ушах.");
			return;
		}
		if (Sel.now == numEarBase && Sel.nowSelected == 2 && Sel.main[numEarTufts].length > 0) {
			Sel.main[numEarTufts] = [];
		}
		if (Sel.now == numBase && num > normalBases) {
			for (var i = 0; i < Kns.info.length; i++) {
				if (numSpecialEdits.includes(i)) {
					continue;
				}
				Sel.main[i] = [];
			}
		}
		if (Sel.now == numBase && Sel.main[numBase][0] > normalBases && num <= normalBases) {
			Sel.main[numTailBase] = [Kns.info[numTailBase].default];
			Sel.main[numEarBase] = [Kns.info[numEarBase].default];
		}
		if (Sel.main[numBase][0] > normalBases && !numSpecialEdits.includes(Sel.now) && num > 0) {
			Kns.error("На особых окрасах нельзя выбирать какие-либо элементы.");
			return;
		}
		if (!Sel.main[numManeBase][0] && Sel.now == numManeElement && num > 0) {
			Kns.error("Выберите сперва гриву-основу.");
			return;
		}
		if (Sel.now == numManeBase && +num === 0) {
			Sel.main[numManeElement] = [];
		}
		if (!Sel.main[numTuftBase][0] && Sel.now == numTuftElement && num > 0) {
			Kns.error("Выберите сперва шерсть-основу.");
			return;
		}
		if (Sel.now == numTuftBase && +num === 0) {
			Sel.main[numTuftElement] = [];
		}
		if (Sel.now == numRightHindPaw && num > 0 && Kns.warning > 0) { // убрать, когда будут действия
			Kns.error("Некоторые элементы на задней правой лапе будут видны только на действиях.");
			Kns.warning--;
		}

		var dataNum = 0;
		if (Sel.now > 1 && !Kns.info[Sel.now].noCombine) {
			dataNum = $(".sel").attr("data-num");
		}
		if (!Kns.info[Sel.now].noVariations) {
			num = (num ? Sel.nowSelected + "/" + num : 0);
		}
		if (!(Sel.main[Sel.now] instanceof Array)) {
			Sel.main[Sel.now] = [Sel.main[Sel.now]];
		}
		Sel.main[Sel.now][dataNum] = num;
		Kns.cleanMain(Sel.now);
		Kns.refresh(false, true);
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
		$(".selected_field").each(function () { $(this).removeClass('selected_field')});
		$(this).addClass("selected_field");
	});
	
	Kns.start();
});
