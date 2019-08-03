var Kns = {};

$(function() {
	////константы
	var numBase = 0;
	var numTailBase = 15;
	var numTailElement = 6;
	var numManeBase = 16;
	var numManeElement = 20;
	var numTuftBase = 18;
	var numTuftElement = 21;
	var numEarBase = 17;
	var numEarLeft = 7;
	var numEarRight = 8;
	var numEarLay = 2;
	var numEarTufts = 10;
	var numEarTuftsNormal = "1";
	var numLeftEye = 1;
	var numRightEye = 19;
	var numRightHindPaw = 14;
	var paletteNormalBases = 0;
	var isBaseSpecial = function(base) { return !(Kns.palette[paletteNormalBases].filter(function(el) { return base == el.id; })[0])};
	var paletteNormalEyes = 1;
	var isEyesSpecial = function(eye) { return !(Kns.palette[paletteNormalEyes].filter(function(el) { return eye == el.id; })[0])};
	var detailsMax = 8;
	var vipLevel = 0;
	Kns.detailVariant = 1;
	Kns.blocks  = [["Основа", [0, 22, 23, 16], 15, 18, 17], ["Шея и морда", [1, 19, 7, 8, 10, 20, 21], 5, 11], ["Туловище", 4, 9, 12], ["Лапы и хвост", 6, 2, 3, 13, 14]];
	Kns.actions = [0, 1];
	Kns.parts    = [
		/* 0 */ {name: "Основной цвет", // base
			noCombine: true,
			default: 1,
			palette: 2,
			noVariations: true,
			special: true,
			obligatory: true,
			opaque: true},
		/* 1 */ {name: "Глаза", // elements/eyes
			default: 12,
			palette: 3,
			noVariations: true,
			previewImg: "_",
			maxLayers: 2,
			special: true,
			obligatory: true,
			opaque: false},
		/* 2 */ {name: "Левая лапа", // elements/forepaw_left
			info: [{id: "1", name: "Брызги"}, {id: "2", name: "Пятнышки"}, {id: "3", name: "Леопардовые пятнышки"}, {id: "4", name: "Тонкие полосы"}, {id: "5", name: "Полосы"}, {id: "6", name: "Разорванные полосы"}, {id: "7", name: "Пламенные полосы"}, {id: "8", name: "Мрамор"}, {id: "9", name: "Пальцы"}, {id: "10", name: "Носок"}, {id: "11", name: "Гольф"}, {id: "12", name: "Чулок"}, {id: "13", name: "Лапа"}, {id: "14", name: "Низ"}, {id: "15", name: "Низ с носком"}, {id: "16", name: "Слабый налёт"}, {id: "17", name: "Сильный налёт"}]},
		/* 3 */ {name: "Правая лапа", // elements/forepaw_right
			info: [{id: "1", name: "Брызги"}, {id: "2", name: "Пятнышки"}, {id: "3", name: "Леопардовые пятнышки"}, {id: "4", name: "Тонкие полосы"}, {id: "5", name: "Полосы"}, {id: "6", name: "Разорванные полосы"}, {id: "7", name: "Пламенные полосы"}, {id: "8", name: "Мрамор"}, {id: "9", name: "Пальцы"}, {id: "10", name: "Носок"}, {id: "11", name: "Гольф"}, {id: "12", name: "Чулок"}, {id: "13", name: "Лапа"}, {id: "14", name: "Низ"}, {id: "15", name: "Низ с носком"}, {id: "16", name: "Слабый налёт"}, {id: "17", name: "Сильный налёт"}]},
		/* 4 */ {name: "Туловище", // elements/body
			info: [{id: "1", name: "Брызги"}, {id: "42", name: "Брызги на плечах"}, {id: "2", name: "Пятнышки"}, {id: "3", name: "Пятна"}, {id: "4", name: "Большое пятно №1"}, {id: "5", name: "Большое пятно №2"}, {id: "6", name: "Большое пятно №3"}, {id: "7", name: "Большое пятно №4"}, {id: "8", name: "Большое пятно №5"}, {id: "9", name: "Большое пятно №6"}, {id: "10", name: "Большое пятно №7"}, {id: "11", name: "Большое пятно №8"}, {id: "12", name: "Леопардовые пятнышки"}, {id: "13", name: "Полоски"}, {id: "14", name: "Полосы"}, {id: "15", name: "Тонкие полосы"}, {id: "16", name: "Пламенные полосы"}, {id: "17", name: "Разорванные полосы"}, {id: "18", name: "Полосы с ремнём"}, {id: "19", name: "Мрамор"}, {id: "20", name: "Мраморные отметины "}, {id: "21", name: "Мраморные полосы"}, {id: "22", name: "Облачный мрамор"}, {id: "23", name: "Облачные отметины"}, {id: "24", name: "Узкий ремень"}, {id: "25", name: "Ремень"}, {id: "26", name: "Ремень на плечах"}, {id: "27", name: "Ремень на крестце"}, {id: "28", name: "Пятна на плечах"}, {id: "29", name: "Пятно на плече"}, {id: "30", name: "Отметина на лопатках"}, {id: "31", name: "Отметина на боку"}, {id: "32", name: "Отметина на бедре"}, {id: "33", name: "Отметина на крестце"}, {id: "34", name: "Клякса"}, {id: "35", name: "Слабый налёт"}, {id: "36", name: "Налёт"}, {id: "37", name: "Сильный налёт"}, {id: "38", name: "Слабая затушёвка"}, {id: "39", name: "Затушёвка"}, {id: "40", name: "Чепрак"}, {id: "41", name: "Чепрак с прорезями"}]},
		/* 5 */ {name: "Морда", // elements/head
			info: [{id: "1", name: "Полосочки"}, {id: "2", name: "Полосы"}, {id: "3", name: "Извилистые полосы"}, {id: "4", name: "Полосы от щёк"}, {id: "5", name: "Разорванные полосы от щёк"}, {id: "6", name: "Полосы вокруг бровей"}, {id: "7", name: "Полосы до глаз"}, {id: "8", name: "Пламенные полосы"}, {id: "9", name: "Полосы на лбу"}, {id: "10", name: "Разорванные полосы на лбу"}, {id: "11", name: "Полосы на носу"}, {id: "12", name: "Мрамор"}, {id: "13", name: "Ремень"}, {id: "14", name: "Узкий ремень"}, {id: "15", name: "Половина ремня"}, {id: "16", name: "Половина узкого ремня"}, {id: "17", name: "Брызги"}, {id: "18", name: "Брызги на носу"}, {id: "19", name: "Пятнышки"}, {id: "20", name: "Пятнышки под глазами"}, {id: "21", name: "Пятна"}, {id: "22", name: "Леопардовые пятнышки"}, {id: "23", name: "Маленькая маска"}, {id: "24", name: "Маска"}, {id: "25", name: "Маска без глаз"}, {id: "26", name: "Маска с глазами"}, {id: "27", name: "Бородка"}, {id: "28", name: "Бородка с щеками"}, {id: "29", name: "Подбородок"}, {id: "30", name: "Подбородок с щеками"}, {id: "31", name: "Брови"}, {id: "32", name: "Рысьи брови"}, {id: "33", name: "Вибриссы"}, {id: "34", name: "Отметина под носом"}, {id: "35", name: "Внешняя сторона губ"}, {id: "36", name: "Губы"}, {id: "37", name: "Щипец"}, {id: "38", name: "Пятно меж глаз"}, {id: "39", name: "Переносица"}, {id: "40", name: "Клякса на нос"}, {id: "41", name: "Отметины на скулах"}, {id: "42", name: "Щёки полностью"}, {id: "43", name: "Макушка"}, {id: "44", name: "Шапка"}, {id: "45", name: "Подпалины на лбу"}, {id: "46", name: "Отметина справа морды"}, {id: "47", name: "Отметина на глазу"}, {id: "48", name: "Слеза"}, {id: "49", name: "Пятно на лбу"}, {id: "50", name: "Отметины над глазами №1"}, {id: "51", name: "Отметины над глазами №2"}, {id: "52", name: "Отметины под глазами №1"}, {id: "53", name: "Отметины под глазами №2"}, {id: "54", name: "Отметина в половину носа"}, {id: "55", name: "Отметина на нос"}, {id: "56", name: "Левая половина морды №1"}, {id: "57", name: "Левая половина морды №2"}, {id: "58", name: "Левая половина морды №3"}, {id: "59", name: "Левая половина морды №4"}, {id: "60", name: "Правая половина морды №1"}, {id: "61", name: "Правая половина морды №2"}, {id: "62", name: "Правая половина морды №3"}, {id: "63", name: "Правая половина морды №4"}, {id: "64", name: "Большое пятно №1"}, {id: "65", name: "Большое пятно №2"}, {id: "66", name: "Большое пятно №3"}, {id: "67", name: "Большое пятно №4"}, {id: "68", name: "Большое пятно №5"}, {id: "69", name: "Слабый налёт"}, {id: "70", name: "Налёт"}, {id: "71", name: "Слабая затушёвка"}, {id: "72", name: "Затушёвка"}]},
		/* 6 */ {name: "Хвост", // elements/tail
			info: [{id: "1", name: "Кольцо"}, {id: "2", name: "Кольца"}, {id: "3", name: "Кончик"}, {id: "4", name: "Кончик с пятнами"}, {id: "5", name: "Кисточка"}, {id: "6", name: "Начало хвоста"}, {id: "7", name: "Половина хвоста"}, {id: "8", name: "Низ"}, {id: "9", name: "Низ с кончиком"}, {id: "10", name: "Брызги"}, {id: "11", name: "Пятнышки"}, {id: "12", name: "Пятна"}, {id: "13", name: "Большие пятна"}, {id: "14", name: "Полоски"}, {id: "15", name: "Полосы"}, {id: "16", name: "Пламенные полосы"}, {id: "17", name: "Мрамор"}, {id: "18", name: "Ремень"}, {id: "19", name: "Ремень с кончиком"}, {id: "20", name: "Узкий ремень"}, {id: "21", name: "Налёт"}, {id: "22", name: "Затушёвка"}]},
		/* 7 */ {name: "Левое ухо", // elements/ear_left
			info: [{id: "1", name: "Кончик"}, {id: "2", name: "Кайма"}, {id: "3", name: "Полностью"}, {id: "4", name: "Шерсть внутри", palette: 5}]},
		/* 8 */ {name: "Правое ухо", // elements/ear_right
			info: [{id: "1", name: "Кончик"}, {id: "2", name: "Кайма"}, {id: "3", name: "Полностью"}, {id: "4", name: "Шерсть внутри", palette: 5}]},
		/* 9 */ {name: "Грудь", // elements/breast
			info: [{id: "1", name: "Пятнышки"}, {id: "2", name: "Пятна"}, {id: "3", name: "Мрамор"}, {id: "4", name: "Маленький медальон"}, {id: "5", name: "Средний медальон"}, {id: "6", name: "Медальон"}, {id: "7", name: "Подпалины"}, {id: "8", name: "Область под шеей"}, {id: "9", name: "Полностью"}, {id: "10", name: "Грудь с горлом"}]},
		/* 10 */ {name: "Кисточки", // elements/tuft
			info: [{id: "1", name: "Кисточки"}, {id: "2", name: "Маленькие кисточки"}],
			opaque: true},
		/* 11 */ {name: "Шея", // elements/neck
			info: [{id: "1", name: "Пятнышки"}, {id: "2", name: "Пятна"}, {id: "3", name: "Отметины"}, {id: "4", name: "Леопардовые пятнышки"}, {id: "5", name: "Большое пятно №1"}, {id: "6", name: "Большое пятно №2"}, {id: "7", name: "Полоски"}, {id: "8", name: "Полосы"}, {id: "9", name: "Пламенные полосы"}, {id: "10", name: "Разорванные полосы"}, {id: "11", name: "Мрамор"}, {id: "12", name: "Мраморные полосы"}, {id: "13", name: "Полосатый мрамор"}, {id: "14", name: "Ремень"}, {id: "15", name: "Узкий ремень"}, {id: "16", name: "Полностью"}, {id: "17", name: "Слабый налёт"}, {id: "18", name: "Налёт"}, {id: "19", name: "Затушёвка"}]},
		/* 12 */ {name: "Живот", // elements/belly
			info: [{id: "1", name: "Пятна"}, {id: "2", name: "Полосы"}, {id: "3", name: "Неполный живот"}, {id: "4", name: "Полностью"}]},
		/* 13 */ {name: "Задняя левая лапа", // elements/hindpaw_left
			info: [{id: "1", name: "Брызги"}, {id: "2", name: "Пятнышки"}, {id: "3", name: "Пятна"}, {id: "4", name: "Большие пятна"}, {id: "5", name: "Леопардовые пятнышки"}, {id: "6", name: "Полосочки"}, {id: "7", name: "Полоски"}, {id: "8", name: "Полосы"}, {id: "9", name: "Разорванные полосы"}, {id: "10", name: "Тонкие полосы"}, {id: "11", name: "Пламенные полосы"}, {id: "12", name: "Извилистые полосы"}, {id: "13", name: "Мрамор"}, {id: "14", name: "Мраморные отметины"}, {id: "15", name: "Пальцы"}, {id: "16", name: "Носок"}, {id: "17", name: "Стопа"}, {id: "18", name: "Гольф"}, {id: "19", name: "Чулок"}, {id: "20", name: "Низ"}, {id: "21", name: "Внешняя сторона лапы"}, {id: "22", name: "Лапа"}, {id: "23", name: "Слабый налёт"}, {id: "24", name: "Налёт"}, {id: "25", name: "Сильный налёт"}, {id: "26", name: "Затушёвка"}]},
		/* 14 */ {name: "Задняя правая лапа", // elements/hindpaw_right
			info: [{id: "1", name: "Брызги"}, {id: "2", name: "Пятнышки"}, {id: "3", name: "Пятна"}, {id: "4", name: "Большие пятна"}, {id: "5", name: "Леопардовые пятнышки"}, {id: "6", name: "Полосочки"}, {id: "7", name: "Полоски"}, {id: "8", name: "Полосы"}, {id: "9", name: "Разорванные полосы"}, {id: "10", name: "Тонкие полосы"}, {id: "11", name: "Пламенные полосы"}, {id: "12", name: "Извилистые полосы"}, {id: "13", name: "Мрамор"}, {id: "14", name: "Мраморные отметины"}, {id: "15", name: "Пальцы"}, {id: "16", name: "Носок"}, {id: "17", name: "Стопа"}, {id: "18", name: "Гольф"}, {id: "19", name: "Чулок"}, {id: "20", name: "Низ"}, {id: "21", name: "Внешняя сторона лапы"}, {id: "22", name: "Лапа"}, {id: "23", name: "Слабый налёт"}, {id: "24", name: "Налёт"}, {id: "25", name: "Сильный налёт"}, {id: "26", name: "Затушёвка"}]},
		/* 15 */ {name: "Хвост", // base_tail
			noCombine: true,
			type: true,
			default: "1/1",
			info: [{id: "1", name: "Куцый"}, {id: "2", name: "Тонкий"}, {id: "3", name: "Умеренный"}, {id: "4", name: "Пушистый"}, {id: "5", name: "Пышный"}],
			obligatory: true,
			opaque: true},
		/* 16 */ {name: "Грива", // base_mane
			noCombine: true,
			type: true,
			info: [{id: "1", name: "Умеренная"}, {id: "2", name: "Пушистая"}, {id: "3", name: "Пышная"}],
			opaque: true},
		/* 17 */ {name: "Уши", // base_ears
			noCombine: true,
			type: true,
			default: "1/1",
			info: [{id: "1", name: "Торчком"}, {id: "2", name: "Висячие"}, {id: "3", name: "Длинные"}, {id: "4", name: "Кручёные"}],
			obligatory: true,
			opaque: true},
		/* 18 */ {name: "Шерсть", // base_hair
			noCombine: true,
			type: true,
			info: [{id: "1", name: "На щёках №1"}, {id: "2", name: "На щёках №2"}, {id: "3", name: "На щёках №3"}],
			opaque: true},
		/* 19 */ {name: "Правый глаз", // elements/eye_right
			palette: 3,
			noVariations: true,
			previewImg: "_",
			maxLayers: 2,
			special: true,
			opaque: false},
		/* 20 */ {name: "Грива", // elements/mane
			info: [{id: "1", name: "Брызги"}, {id: "2", name: "Пятнышки"}, {id: "3", name: "Пятна"}, {id: "4", name: "Полосы"}, {id: "5", name: "Пламенные полосы"}, {id: "6", name: "Мрамор"}, {id: "7", name: "Ремень"}, {id: "8", name: "Узкий ремень"}, {id: "11", name: "Низ"}, {id: "9", name: "Налёт"}, {id: "10", name: "Затушёвка"}]},
		/* 21 */ {name: "Шерсть", // elements/hair
			info: [{id: "1", name: "Левая"}, {id: "2", name: "Правая"}, {id: "3", name: "Брызги слева"}, {id: "4", name: "Брызги справа"}, {id: "5", name: "Пятна слева"}, {id: "6", name: "Пятна справа"}, {id: "7", name: "Полосы слева"}, {id: "8", name: "Полосы справа"}]},
		/* 22 */ {name: "Усы", // elements/whisker
			noCombine: true,
			default: "2/1",
			palette: 4,
			info: [{id: "1", name: "Прямые короткие"}, {id: "2", name: "Прямые"}, {id: "3", name: "Прямые длинные"}, {id: "4", name: "Кудрявые"}],
			obligatory: true,
			opaque: true},
		/* 23 */ {name: "Нос", // elements/nose
			palette: 5,
			info: [{id: "1", name: "Полностью"}, {id: "2", name: "Половина"}, {id: "3", name: "Кайма", palette: 6}]}
	];
	Kns.backupInfo = JSON.parse(JSON.stringify(Kns.parts));
	Kns.palette = [
		/* ОСНОВНОЙ ЦВЕТ -- ЭЛЕМЕНТЫ И БАЗЫ*/
		/* 0 */ [{id: "0", name: "", image: "+0"},{id: "1", name: "Кремовый", colour: "#f5e5ce"},{id: "2", name: "Белоснежный", colour: "#ffffff"},{id: "3", name: "Белый", colour: "#e6e6e6"},{id: "4", name: "Серебристый", colour: "#d1d1d1"},{id: "5", name: "Серый", colour: "#9e9e9e"},{id: "6", name: "Дымчатый", colour: "#5c5c5c"},{id: "7", name: "Чёрный", colour: "#242424"},{id: "8", name: "Угольно-чёрный", colour: "#141414"},{id: "9", name: "Иссиня-чёрный", colour: "#1d212c"},{id: "10", name: "Чернобурый", colour: "#2b1d1c"},{id: "11", name: "Бурый", colour: "#3d1c0b"},{id: "12", name: "Шоколадный", colour: "#6b3c28"},{id: "13", name: "Фавн", colour: "#9a715f"},{id: "14", name: "Медный", colour: "#bd6d32"},{id: "15", name: "Огненный", colour: "#cb4402"},{id: "16", name: "Красный", colour: "#e15c0f"},{id: "17", name: "Рыжий", colour: "#ed9b2d"},{id: "18", name: "Золотистый", colour: "#e5bd7f"},{id: "19", name: "Палевый", colour: "#d7ae98"},{id: "20", name: "Лиловый", colour: "#b19798"},{id: "21", name: "Голубой", colour: "#a6b4b7"},{id: "22", name: "Серо-голубой", colour: "#697a8a"},{id: "23", name: "Дымчато-голубой", colour: "#465165"},{id: "24", name: "Черничный", colour: "#323d51"}],
		/* ГЛАЗА */
		/* 1 */ [{id: "0", name: '', colour: ""},{id: "1", name: "Медный", colour: "#9C7941"},{id: "2", name: "Карий", colour: "#362121"},{id: "3", name: "Чёрно-красный", colour: "#612322"},{id: "4", name: "Оранжевый", colour: "#D6700B"},{id: "5", name: "Янтарный", colour: "#FCB10D"},{id: "6", name: "Жёлтый", colour: "#FCDF00"},{id: "7", name: "Оливковый", colour: "#B3B059"},{id: "8", name: "Лайм", colour: "#A8AB0C"},{id: "9", name: "Зелёный", colour: "#2FA12D"},{id: "10", name: "Салатовый", colour: "#7DC210"},{id: "11", name: "Бирюзовый", colour: "#0ECC90"},{id: "12", name: "Голубой", colour: "#87C3D4"},{id: "13", name: "Васильковый", colour: "#148CCC"},{id: "14", name: "Синий", colour: "#192580"},{id: "15", name: "Серый", colour: "#7D8996"}],
		/* УНИКАЛЬНЫЕ ОКРАСЫ */
		/* 2 */ [{id: "0", name: '', colour: ""},{id: "1", name: "Кремовый", colour: "#f5e5ce"},{id: "2", name: "Белоснежный", colour: "#ffffff"},{id: "3", name: "Белый", colour: "#e6e6e6"},{id: "4", name: "Серебристый", colour: "#d1d1d1"},{id: "5", name: "Серый", colour: "#9e9e9e"},{id: "6", name: "Дымчатый", colour: "#5c5c5c"},{id: "7", name: "Чёрный", colour: "#242424"},{id: "8", name: "Угольно-чёрный", colour: "#141414"},{id: "9", name: "Иссиня-чёрный", colour: "#1d212c"},{id: "10", name: "Чернобурый", colour: "#2b1d1c"},{id: "11", name: "Бурый", colour: "#3d1c0b"},{id: "12", name: "Шоколадный", colour: "#6b3c28"},{id: "13", name: "Фавн", colour: "#9a715f"},{id: "14", name: "Медный", colour: "#bd6d32"},{id: "15", name: "Огненный", colour: "#cb4402"},{id: "16", name: "Красный", colour: "#e15c0f"},{id: "17", name: "Рыжий", colour: "#ed9b2d"},{id: "18", name: "Золотистый", colour: "#e5bd7f"},{id: "19", name: "Палевый", colour: "#d7ae98"},{id: "20", name: "Лиловый", colour: "#b19798"},{id: "21", name: "Голубой", colour: "#a6b4b7"},{id: "22", name: "Серо-голубой", colour: "#697a8a"},{id: "23", name: "Дымчато-голубой", colour: "#465165"},{id: "24", name: "Черничный", colour: "#323d51"},{id: "25", name: "\r\nУникальный окрас", image: "+1"},{id: "26", name: "Уникальный окрас", image: "+2"},{id: "27", name: "Уникальный окрас", image: "+3"},{id: "28", name: "Уникальный окрас", image: "+4"},{id: "29", name: "Уникальный окрас", image: "+5"},{id: "30", name: "Уникальный окрас", image: "+6"},{id: "31", name: "Уникальный окрас", image: "+7"},{id: "32", name: "Уникальный окрас", image: "+8"},{id: "33", name: "Уникальный окрас", image: "+9"},{id: "34", name: "Уникальный окрас", image: "+10"},{id: "35", name: "Уникальный окрас", image: "+11"},{id: "36", name: "Уникальный окрас", image: "+12"},{id: "37", name: "Уникальный окрас", image: "+13"},{id: "38", name: "Уникальный окрас", image: "+14"},{id: "39", name: "Уникальный окрас", image: "+15"},{id: "40", name: "Уникальный окрас", image: "+16"},{id: "41", name: "Уникальный окрас", image: "+17"},{id: "42", name: "Уникальный окрас", image: "+18"},{id: "43", name: "Уникальный окрас", image: "+19"},{id: "44", name: "Уникальный окрас", image: "+20"},{id: "45", name: "Уникальный окрас", image: "+21"},{id: "46", name: "Уникальный окрас", image: "+22"}],
		/* ФИОЛЕТОВЫЕ ГЛАЗА */
		/* 3 */ [{id: "0", name: '', colour: ""},{id: "1", name: "Медный", colour: "#9C7941"},{id: "2", name: "Карий", colour: "#362121"},{id: "3", name: "Чёрно-красный", colour: "#612322"},{id: "4", name: "Оранжевый", colour: "#D6700B"},{id: "5", name: "Янтарный", colour: "#FCB10D"},{id: "6", name: "Жёлтый", colour: "#FCDF00"},{id: "7", name: "Оливковый", colour: "#B3B059"},{id: "8", name: "Лайм", colour: "#A8AB0C"},{id: "9", name: "Зелёный", colour: "#2FA12D"},{id: "10", name: "Салатовый", colour: "#7DC210"},{id: "11", name: "Бирюзовый", colour: "#0ECC90"},{id: "12", name: "Голубой", colour: "#87C3D4"},{id: "13", name: "Васильковый", colour: "#148CCC"},{id: "14", name: "Синий", colour: "#192580"},{id: "15", name: "Серый", colour: "#7D8996"}, {id: "16", name: "Фиолетовый", colour: "#734563"}],
		/* УСЫ */
		/* 4 */ [{id: "0", name: '', colour: ""}, {id: "1", name: "Светлые", colour: "#ffffff"}, {id: "2", name: "Тёмные", colour: "#5c5c5c"}, {id: "3", name: "Чёрные", colour: "#242424"}],
		/* НОС И ШЕРСТЬ ВНУТРИ УШЕЙ */
		/* 5 */ [{id: "0", name: '', colour: ""}, {id: "1", name: "Кремовый", colour: "#f5e5ce"}, {id: "2", name: "Белый", colour: "#ffffff"}, {id: "3", name: "Серый", colour: "#9e9e9e"}, {id: "4", name: "Чёрный", colour: "#242424"}, {id: "5", name: "Бурый", colour: "#3d1c0b"}, {id: "6", name: "Шоколадный", colour: "#6b3c28"}, {id: "7", name: "Фавн", colour: "#9a715f"}, {id: "8", name: "Медный", colour: "#bd6d32"}, {id: "9", name: "Красный", colour: "#e15c0f"}, {id: "10", name: "Розовый", colour: "#cc8370"}, {id: "11", name: "Лиловый", colour: "#b19798"}, {id: "12", name: "Дымчато-голубой", colour: "#465165"}],
		/* ЭЛЕМЕНТ КАЙМА НОСА */
		/* 6 */ [{id: "0", name: '', colour: ""}, {id: "1", name: "Чёрный", colour: "#242424"}],
	];
	Kns.error_tm = 0;
	Kns.warning = 3; // убрать, когда будут действия
	
	Kns.start = function() {
		Kns.vip();
		Kns.drawBlocks();
		Kns.refresh(true);
	};

	Kns.code = function() {
		var code = [];
		for (var i = 0; i < Kns.parts.length; i++) {
			var now = Sel.main[i];
			if (now instanceof Array) {
				now = now.join("-") || "0";
			}
			if (Kns.parts[i].type) {
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
			html += "<td>" + Func.showCat(Kns.code(), 4.5, 0, Kns.actions[i], {"costume": 0, "dirt": 0, "wound": 0, "drown": 0, "poisoning": 0, "disease": 0}) + "</td>";
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
					if (Kns.partAvailable(false, n)){
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

	Kns.drawDetail = function(newSelect) {
		var html = "";
		delete Sel.nowSelected;
		var dataNum = 0;
		if (!newSelect) {
			dataNum = $(".sel").attr("data-num") || dataNum;
		}
		var info = [];
		var selectedList = [];
		if (Kns.parts[Sel.now].info) {
			if (Sel.main[Sel.now].length > 0) {
				for (var l = 0; l < Sel.main[Sel.now].length; l++) {
					selectedList[l] = Sel.main[Sel.now][l].split("/")[0];
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
				var data = {};
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
				max = detailsMax;
			}
			max = Kns.parts[Sel.now].maxLayers || max;
			if (selectedList.length < max && selectedList.length < info.length) {
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
						name = info.filter(function(el) { return el.data.id == selectedList[i]; })[0];
						name = name ? name.data.name : '';
						style += ' style="border-width: 1px; border-style: solid;' + Kns.getPreviewStyle(selectedList[i] || 0) + '"';
						html += '<tr><td class="tdarrow"></td><td class="tdarrow">' + moveup + '<br>' + movedown + '</td>';
						html += '<td><div' + style + ' onclick="Kns.clickedDetail(this);" data-num="' + i + '" data-value="' + (selectedList[i] || 0) + '" id="select' + i + '" title="' + name + '"/></td>';
						break;
					case 0:
					default:
						html += '<tr><td class="tdarrow">' + moveup + '</td><td class="tdarrow">' + movedown + '</td>';
						html += '<td><select style="width:100px;"' + style + ' onchange="Kns.selectedDetail(this);" onclick="Kns.clickedDetail(this);" data-num="' + i + '" id="select' + i + '">';
						if (!Kns.parts[Sel.now].noVariations) {
							for (var j = 0; j < info.length; j++) {
								var id = info[j].data.id;
								if (selectedList.indexOf(id) !== -1 && selectedList[i] != id) {
									continue;
								}
								name = info[j].data.name;
								var selected = selectedList[i] == id ? ' selected' : '';
								html += '<option value="' + info[j].num + '"' + selected + '>' + name + '</option>';
							}
						} else {
							html += '<option value="' + (+selectedList[i] + 1) + '">' + (+selectedList[i] + 1) + '</option>';
						}
						html += "</select></td>";
						break;
				}
				html += '<td class="td_x">';
				if (!Kns.parts[Sel.now].obligatory || selectedList.length > 1) {
					html += '<a class="a_none" onclick="Kns.removeDetail(' + i + ');">✖</a>';
				}
				html += '</td></tr>';
			}
			if (canAdd) {
				html += '<tr><td class="tdarrow"></td><td class="td_plus" colspan="2"><a onclick="Kns.addDetail();" class="a_none">+</a></td></tr>';
			}
			html += "</table></td>";
			if (!Kns.parts[Sel.now].noVariations) {
				switch (Kns.detailVariant) {
					case 1:
						if (dataNum >= 0 && dataNum < selectedList.length) {
							html += '<td><div class="detailslist""><table style="margin: auto;" class="tabledetail"><tr>';
							var line = 0;
							for (j = 0; j < info.length; j++) {
								id = info[j].data.id;
								if (selectedList.indexOf(id) !== -1 && id != selectedList[dataNum]) {
									continue;
								}
								name = info[j].data.name;
								html += '<td><div data-num="' + dataNum + '" data-value="' + info[j].num + '" style="border-width: 1px; border-style: solid;' + Kns.getPreviewStyle(id) + '" onclick="Kns.selectedDetail(this)" title="' + name + '"/></td>';
								line++;
								if (line >= 3) {
									line = 0;
									html += '</tr><tr>';
								}
							}
							html += '</tr></table></div></td>';
						}
						break;
					case 0:
						break;
				}
			}
			html += '</tr></<table>';
		} else {
			Sel.nowSelected = 0;
		}
		$("#detail").html(html);
		$("[title]").tipTip();
	};

	Kns.getPreviewStyle = function(part) {
		var id = Kns.parts[Sel.now].previewImg || "0";
		if (part !== undefined && !Kns.parts[Sel.now].noVariations) {
			id = part + "/" + id;
		}
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
		return Func.getUrlStyle(0, Func.folders.animationCode[Sel.now], id) + 'background-size: 100%;';
	};

	Kns.refresh = function(allnew, detailnotnew, noblocks, newselect, nodetail, nocats, nopalette) {
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
		var imgWithOpacity = Sel.main[Sel.now][dataNum].split('|');
		var data = imgWithOpacity[0].split('/');
		data[0] = Kns.parts[Sel.now].info[Sel.nowSelected].id;
		var palette = Kns.parts[Sel.now].info[Sel.nowSelected].palette || Kns.parts[Sel.now].palette || 0;
		if (Kns.palette[palette].filter(function(el) { return el.id == data[1]; }).length < 1) {
			for (var c = 0; c < Kns.palette[palette].length; c++) {
				if (+Kns.palette[palette][c].id === 0) {
					continue;
				}
				if (!Kns.partAvailable(false, Sel.now, data[0], Kns.palette[palette][c].id)) {
					continue;
				}
				data[1] = Kns.palette[palette][c].id;
				break;
			}
		}
		imgWithOpacity[0] = data.join('/');
		Sel.main[Sel.now][dataNum] = imgWithOpacity.join('|');
		Kns.cleanMain(Sel.now);
		Kns.refresh(false, true, false, false, true);
		var selected = $('.sel');
		selected.css('background-image', menu.style.backgroundImage);
		var name = Kns.parts[Sel.now].info[Sel.nowSelected].name;
		selected.attr('title', name);
		$("[title]").tipTip();
	};

	Kns.selectedOpacity = function(opacity)
	{
		var dataNum = Kns.parts[Sel.now].noCombine ? 0 : $(".sel").attr("data-num");
		if (dataNum === undefined) {
			return;
		}
		if (Sel.main[Sel.now] === 0 || Sel.main[Sel.now] === '') {
			return;
		}
		if (Sel.main[Sel.now].length <= dataNum) {
			return;
		}
		var imgWithOpacity = (Sel.main[Sel.now][dataNum]+'').split('|');
		var opacityPresent = imgWithOpacity[1]
		opacityPresent = opacityPresent ? Func.getOpacityFromCode(opacityPresent) * 100 : 100;
		if (opacityPresent == opacity) {
			return;
		}
		if (opacity >= 100) {
			imgWithOpacity = [imgWithOpacity[0]];
		} else {
			opacity = Func.getOpacityForCode(opacity);
			imgWithOpacity[1] = opacity;
		}
		Sel.main[Sel.now][dataNum] = imgWithOpacity.join("|");
		Kns.refresh(false, false, true, true, true, false, true);
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
		if (Kns.parts[Sel.now].noCombine) {
			Kns.error("Невозможно добавить элемент.");
			return;
		}
		var info = Kns.parts[Sel.now].info;
		if (!Kns.parts[Sel.now].noVariations) {
			var selectedList = [];
			for (var i = 0; i < Sel.main[Sel.now].length; i++) {
				var type = (Sel.main[Sel.now][i] + '').split('/')[0];
				if (type) {
					selectedList.push(type);
				}
			}
			var data = 0;
			for (var j = 0; j < info.length; j++) {
				if (selectedList.indexOf(info[j].id) !== -1) {
					continue;
				}
				if (!Kns.partAvailable(false, Sel.now, info[j].id)) {
					continue;
				}
				var palette = info[j].palette || Kns.parts[Sel.now].palette || 0;
				for (var c = 0; c < Kns.palette[palette].length; c++) {
					if (+Kns.palette[palette][c].id === 0) {
						continue;
					}
					if (!Kns.partAvailable(false, Sel.now, info[j].id, Kns.palette[palette][c].id)) {
						continue;
					}
					data = info[j].id + '/' + Kns.palette[palette][c].id;
					break;
				}
				break;
			}
		} else {
			palette = Kns.parts[Sel.now].palette || 0;
			for ( c = 0; c < Kns.palette[palette].length; c++) {
				if (+Kns.palette[palette][c].id === 0) {
					continue;
				}
				if (!Kns.partAvailable(false, Sel.now, 0, Kns.palette[palette][c].id)) {
					continue;
				}
				data = Kns.palette[palette][c].id;
				break;
			}
		}
		if (data) {
			if (Sel.now == numRightHindPaw && Kns.warning > 0) { // убрать, когда будут действия
				Kns.error("Некоторые элементы на задней правой лапе будут видны только на действиях.");
				Kns.warning--;
			}
			Sel.main[Sel.now].push(data);
			Kns.drawDetail(false);
			$('#select' + (Sel.main[Sel.now].length - 1)).click();
			Kns.refresh(false, true);
		}
	};

	Kns.removeDetail = function(index) {
		if (Sel.main[Sel.now].length <= index) {
			return;
		}
		Sel.main[Sel.now][index] = 0;
		Kns.cleanMain(Sel.now);
		Kns.refresh(false, true, false, false, true);
	};

	Kns.drawPalette = function() {
		var html = '<table style="border: 0 solid black;"><tr>';
		var p;
		try {p = Kns.parts[Sel.now].info[Sel.nowSelected].palette;} catch(e) {}
		p = p || Kns.parts[Sel.now].palette || 0;
		p = Sel.nowSelected === undefined ? -1 : p;
		var dataNum = Kns.parts[Sel.now].noCombine ? 0 : $(".sel").attr("data-num");
		if (dataNum === undefined) {
			p = -1;
		}
		var colour = ((Sel.main[Sel.now][dataNum] + '' || '').split('|')[0] || '').split('/');
		if (colour.length >= 2) {
			colour = +colour[1];
		} else {
			colour = +colour[0] || 0;
		}
		var width = 0;
		var maxWidth = $('#main').width() - 32;
		var detailId = (Kns.parts[Sel.now].info && Kns.parts[Sel.now].info[Sel.nowSelected]) ? Kns.parts[Sel.now].info[Sel.nowSelected].id : 0;
		for (var i = 0; Kns.palette[p] && i < Kns.palette[p].length; i++) {
			if (Kns.palette[p][i].name === '') {
				continue;
			}
			if (!Kns.partAvailable(false, Sel.now, detailId, Kns.palette[p][i].id)) {
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
			html += '<td><div style="background: ' + bg + ' center no-repeat; border-width: 1px; border-style: solid;" title="' + name + '" data-num="' + Kns.palette[p][i].id + '"' + (Kns.palette[p][i].id == colour ? ' class="selected_colour"' : '') + '> </div></td>';
			width += 32;
		}
		html += '</tr></table>';
		if (!Kns.parts[Sel.now].opaque && Kns.palette[p]) {
			var opacity = (Sel.main[Sel.now][dataNum] + '' || '').split('|')[1] || 10;
			opacity = Func.getOpacityFromCode(opacity) * 100;
			var minOpacity = Func.getOpacityFromCode(0) * 100;
			var stepOpacity = (100 - minOpacity) / Func.getOpacityForCode(100);
			html += "<br><label>Непрозрачность: <input type='range' max='100' min='" + minOpacity + "' step='" + stepOpacity + "' value='" + opacity + "' onchange='Kns.selectedOpacity(this.value);' oninput='Kns.selectedOpacity(this.value);' id='opacity_range'></label>";
		}
		$("#color").html(html);
		$("[title]").tipTip();
	};

	Kns.cleanMain = function(el) {
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
				var partdetail = (Sel.main[i][j] + '').split('/');
				var partcolour = '';
				if (partdetail.length > 1) {
					partcolour = partdetail[1];
					partdetail = partdetail[0];
				} else {
					partcolour = partdetail[0];
					partdetail = 0;
				}
				if (!Kns.partAvailable(false, i, partdetail, partcolour)) {
					Sel.main[i][j] = 0;
					continue;
				}
				if (!(Sel.main[i][j] > 0 || (Sel.main[i][j] != "" && Sel.main[i][j] != "0"))) {
					continue;
				}
				newArr.push(Sel.main[i][j]);
			}
			if (el == i) {
				isNew = Sel.main[i].length != newArr.length;
			}
			Sel.main[i] = newArr;
			if (!Sel.main[i].length && Kns.parts[i].default) {
				Sel.main[i] = [Kns.parts[i].default];
			}
		}
		if (isNew) {
			Kns.drawDetail(false);
		}
	};
	Kns.reset = function() {
		Sel.main = [];
		for (var i = 0; i < Kns.parts.length; i++) {
			Sel.main[i] = Kns.parts[i].default ? [Kns.parts[i].default] : [];
		}
		Kns.refresh(true);
	};
	Kns.random = function(coeff) {
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
				for (var dataNum = 0; dataNum < ((Kns.parts[i].noCombine) ? 1 : (Kns.parts[i].maxLayers || detailsMax)); dataNum++) {
					if (Math.random() >= coeff && !Kns.parts[i].obligatory) {
						continue;
					}
					var result = [];
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
						result.push(parts[part].id);
						pastParts.push(parts[part].id);
						palette = parts[part].palette || palette;
						detail = parts[part].id;
					}
					var colours = [];
					for (var c = 0; c < Kns.palette[palette].length; c++) {
						if (+Kns.palette[palette][c].id === 0 || +Kns.palette[palette][c].name === 0) {
							continue;
						}
						if (!Kns.partAvailable(false, i, detail, Kns.palette[palette][c].id)) {
							continue;
						}
						colours.push(Kns.palette[palette][c].id);
					}
					var colourNum = Math.floor(Math.random() * colours.length);
					result.push(colours[colourNum]);
					result = result.join("/");
					if (!Kns.parts[i].opaque) {
						var maxOpacity = Func.getOpacityForCode(100);
						var opacity = Math.floor(Math.random() * (maxOpacity + 1));
						if (opacity < maxOpacity) {
							result += "|" + opacity;
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
		if (vipLevel < 1 && block == numRightEye) { //правые глаза не разрешены в любом случае, если vip < 1
			if (showError) {
				Kns.error("Невозможно выбирать правые глаза.");
			}
			return false;
		}
		if (isBaseSpecial(Sel.main[numBase][0])) {
			if (!Kns.parts[block].special) {
				if (showError) {
					Kns.error("На особых окрасах нельзя выбирать какие-либо элементы.");
				}
				return false;
			}
		}

		switch (block) {
			case numManeElement:
				if (!Sel.main[numManeBase][0]) {
					if (showError) {
						Kns.error("Выберите сперва гриву-основу.");
					}
					return false;
				}
				break;
			case numTuftElement:
				if (!Sel.main[numTuftBase][0]) {
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
			case numEarTufts:
				var numEar = Sel.main[numEarBase][0].split('/')[0];
				if (numEar == numEarLay) {
					if (detail == numEarTuftsNormal) {
						if (showError) {
							Kns.error("Вислоухим не доступны кисточки.");
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
			case numLeftEye:
			case numRightEye:
				if (isEyesSpecial(colour)) {
					if (vipLevel < 3) {
						if (showError) {
							Kns.error("Вам не доступны фиолетовые глаза.");
						}
						return false;
					}
				}
				break;
			case numBase:
				if (isBaseSpecial(colour)) {
					if (vipLevel < 2) {
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

	Kns.vip = function(temp) {
		vipLevel = +$("#main").data("vip");
		if (temp !== undefined) {
			vipLevel = +temp;
			Kns.parts = JSON.parse(JSON.stringify(Kns.backupInfo));
		}
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
		for (var num = 0; num < Kns.parts.length; num++) {
			if (num >= blocks.length) {
				if (Kns.parts[num] && Kns.parts[num].default) {
					Sel.main[num] = [Kns.parts[num].default];
				} else {
					Sel.main[num] = [];
				}
				if (isBaseSpecial(Sel.main[numBase][0]) && !Kns.parts[num].special) {
					Sel.main[num] = [];
				}
				continue;
			}
			blocks[num] = (blocks[num]+'').split("-");

			Sel.main[num] = [];
			for (var inter = 0; inter < blocks[num].length; inter++) {
				var part = blocks[num][inter];
				if (Kns.parts[num].opaque) {
					part = (part + '').split('|')[0] || 0;
				}
				if (+part !== 0) {
					Sel.main[num].push(part);
				}
			}
		}
		Kns.refresh(true);
	};

	Kns.moveLine = function(up, line) {
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
	for (var i = 0; i < Kns.parts.length; i++) {
		Sel.main[i] = Kns.parts[i].default ? [Kns.parts[i].default] : [];
	}
	Sel.now = 0;
	Sel.nowSelected = 0;
	Sel.block = 0;
	Sel.random = false;
	
	$("body").on("click", "a[href*=#]", function(e) {
		e.preventDefault();
	});
	
	$("#sbm").on("click", function() {
		Kns.confirm("Сохранить окрас?", function() {
			//validate
			try {
				for (var i = 0; i < Kns.parts.length; i++) {
					if (!(Sel.main[i] instanceof Array)) {
						Sel.main[i] = (Sel.main[i] + '').split('-');
					}
					var now = Sel.main[i];
					var info = Kns.parts[i];
					var max = Kns.partAvailable(false, i) ? (info.noCombine ? 1 : detailsMax) : 0;
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
						var parts = (now[layer] + '').split('/');
						if (parts.length != (info.noVariations ? 1 : 2)) {
							Kns.error("Сохранение невозможно: некорректный код элемента");
							return;
						}
						var palette = info.palette | 0;
						var detail = 0;
						if (info.info) {
							detail = info.info.filter(function(el) { return el.id == parts[0]; })[0];
							if (detail && Kns.partAvailable(false, i, detail)) {
								palette = detail.palette | 0;
							} else {
								Kns.error("Сохранение невозможно: неверный элемент");
								return;
							}
							if (oldLayers.indexOf(parts[0]) !== -1) {
								Kns.error("Сохранение невозможно: повторяющийся элемент");
								return;
							}
							oldLayers.push(parts[0]);
						}
						if (info.noVariations) {
							parts[1] = parts[0];
						}
						if (!Kns.palette[palette].filter(function(el) { return el.id == parts[1]; })[0] || +parts[1] === 0 || !Kns.partAvailable(false, i, detail, parts[1])) {
							Kns.error("Сохранение невозможно: неверный цвет");
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
				var cat = $("#cat");
				cat.html(Func.showCat(cat.text())).show();
			});
		});
	});
	
	$("body").on("click", "[class^=edit]", function() {
		Sel.now = parseInt($(this).attr('class').replace('edit', ''));
		$(".selected_block").each(function () { $(this).removeClass('selected_block')});
		$(this).addClass('selected_block');
		Kns.refresh(false, false, true, false, false, true);
	});
	
	$("#color").on("click", function(e) {
		var colour = $(e.target).attr("data-num");
		if (!colour && +colour !== 0) {
			return;
		}

		var detail = (Kns.parts[Sel.now].info && Kns.parts[Sel.now].info[Sel.nowSelected]) ? Kns.parts[Sel.now].info[Sel.nowSelected].id : 0;

		if (!Kns.partAvailable(true, Sel.now, detail, colour)) {
			return;
		}

		var dataNum = 0;
		if (!Kns.parts[Sel.now].noCombine) {
			dataNum = $(".sel").attr("data-num");
		}
		if (!Kns.parts[Sel.now].noVariations) {
			colour = (colour ? Kns.parts[Sel.now].info[Sel.nowSelected].id + "/" + colour : 0);
		}
		if (!(Sel.main[Sel.now] instanceof Array)) {
			Sel.main[Sel.now] = [Sel.main[Sel.now]];
		}
		var opacity = $("#opacity_range");
		if (opacity) {
			opacity = $("#opacity_range").val();
			if (opacity < 100) {
				opacity = Func.getOpacityForCode(opacity);
				colour += "|" + opacity;
			}
		}
		Sel.main[Sel.now][dataNum] = colour;

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
		$(".selected_field").each(function () { $(this).removeClass('selected_field')});
		$(this).addClass("selected_field");
	});
	
	Kns.start();
});
