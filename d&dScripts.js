<!--
	
//Variables used to

	var Generated = [];

	var defaultColor;
	var color;
	var tab = "&nbsp&nbsp&nbsp&nbsp&nbsp";
	var output = "";
	//Checks if the web browser is Internet explorer
	if(/*@cc_on!@*/false || !!document.documentMode)
	{
	 defaultColor = "-ms-linear-gradient(top, #604020 0%, #4d3319 80%)";
	 color = "-ms-linear-gradient(top, #d3d3d3 20%, #a6a6a6 80%)";
	}
	else
	{
	 defaultColor = "-webkit-linear-gradient(top, #604020 0%, #4d3319 80%)";
	 color = "-webkit-linear-gradient(top, #d3d3d3 20%, #a6a6a6 80%)";
	}
	function resizeSideBar(){
		var availableHeight = document.getElementById("docSpace").offsetHeight - document.getElementById("navTabs").offsetHeight - document.getElementById("docTitle").offsetHeight;
		document.getElementById("helpBar").style.height = availableHeight+"px"; 
		document.getElementById("encounterBar").style.height = availableHeight+"px";
		document.getElementById("lootBar").style.height = availableHeight+"px";
		document.getElementById("NPC_Bar").style.height = availableHeight+"px";
	}
	function openEncounterBar(){
		document.getElementById("main").innerHTML = document.getElementById("encounterCanvas").innerHTML;
		document.getElementById("encounterBar").style.visibility="visible";
		document.getElementById("lootBar").style.visibility = "hidden";
		document.getElementById("NPC_Bar").style.visibility = "hidden";
		document.getElementById("helpBar").style.visibility = "hidden";

		document.getElementById("encounterTab").style.background=color;
		document.getElementById("treasureTab").style.background=defaultColor;
		document.getElementById("npcTab").style.background=defaultColor;
		document.getElementById("homeTab").style.background=defaultColor;

		document.getElementById("encounterTab").style.color="black";
		document.getElementById("treasureTab").style.color="white";
		document.getElementById("npcTab").style.color="white";
		document.getElementById("homeTab").style.color="white";

		resizeSideBar()
	}
	
	function openLootBar(){
		document.getElementById("main").innerHTML = document.getElementById("treasureCanvas").innerHTML;
		document.getElementById("encounterBar").style.visibility="hidden";
		document.getElementById("lootBar").style.visibility = "visible";
		document.getElementById("NPC_Bar").style.visibility = "hidden";
		document.getElementById("helpBar").style.visibility = "hidden";

		document.getElementById("encounterTab").style.background=defaultColor;
		document.getElementById("treasureTab").style.background=color;
		document.getElementById("npcTab").style.background=defaultColor;
		document.getElementById("homeTab").style.background=defaultColor;

		document.getElementById("encounterTab").style.color="white";
		document.getElementById("treasureTab").style.color="black";
		document.getElementById("npcTab").style.color="white";
		document.getElementById("homeTab").style.color="white";

		resizeSideBar()
	}
	function open_NPC_Bar(){
		document.getElementById("main").innerHTML = document.getElementById("npcCanvas").innerHTML;
		document.getElementById("encounterBar").style.visibility="hidden";
		document.getElementById("lootBar").style.visibility = "hidden";
		document.getElementById("NPC_Bar").style.visibility = "visible";
		document.getElementById("helpBar").style.visibility = "hidden";

		document.getElementById("encounterTab").style.background=defaultColor;
		document.getElementById("treasureTab").style.background=defaultColor;
		document.getElementById("npcTab").style.background=color;
		document.getElementById("homeTab").style.background=defaultColor;

		document.getElementById("encounterTab").style.color="white";
		document.getElementById("treasureTab").style.color="white";
		document.getElementById("npcTab").style.color="black";
		document.getElementById("homeTab").style.color="white";

		resizeSideBar()
	}

	function open_HomePage(){
		document.getElementById("main").innerHTML = document.getElementById("mainOriginal").innerHTML;
		document.getElementById("encounterBar").style.visibility="hidden";
		document.getElementById("lootBar").style.visibility = "hidden";
		document.getElementById("NPC_Bar").style.visibility = "hidden";
		document.getElementById("helpBar").style.visibility = "visible";;

		document.getElementById("encounterTab").style.background=defaultColor;
		document.getElementById("treasureTab").style.background=defaultColor;
		document.getElementById("npcTab").style.background=defaultColor;
		document.getElementById("homeTab").style.background=color;

		document.getElementById("encounterTab").style.color="white";
		document.getElementById("treasureTab").style.color="white";
		document.getElementById("npcTab").style.color="white";
		document.getElementById("homeTab").style.color="black";

		resizeSideBar()
	}

		function get_EncounterValues() {
		var partySize = document.getElementById("partySize").value;
		var partyLevel = document.getElementById("partyLevel").value;
		var mDifficulty = document.getElementById("monsterDiff").value;
		var mAlignmentOne = document.getElementById("monsterAlignOne").value;
		var mAlignmentTwo = document.getElementById("monsterAlignTwo").value;
		var mSize = document.getElementById("monsterSize").value;
		var mType = document.getElementById("monsterType").value;
		var mEnvi = document.getElementById("monsterEnvi").value;
		document.getElementById("encounterCanvas").innerHTML = document.getElementById("main").innerHTML;
		
		console.log("Party Size: " + partySize);
		console.log("Party Level: " +partyLevel);
		console.log("Difficulty: " +mDifficulty);
		console.log("Align 1: " +mAlignmentOne);
		console.log("Align 2: " +mAlignmentTwo);
		console.log("Size: " +mSize);
		console.log("Type: " +mType);
		console.log("Environment: " +mEnvi);
		
		if(partyLevel>0 && partyLevel<21)
		{
			
			var players = partySize;
			var level = partyLevel;

			var align1 = mAlignmentOne;
			var align2 = mAlignmentTwo;

			var difficulty = mDifficulty;
			var alignment = convertAlignment(align1,align2);
			var size = mSize;
			var type = mType;
			var environment = mEnvi;

			const db = firebase.database();
			const Monsters = db.ref().child('Monsters');

			var CRrange = CalculateChallenge(difficulty,players,level);

			var generated;
			var genName;
			var genCR;
			var genXP;
			var genPage;
			var filtered = [];

			if (difficulty == "Any") {
				Monsters.once('value')
					.then(function (snapshot) {
						snapshot.forEach(function (childSnapshot) {
							filtered.push(childSnapshot.val());
						});
						console.log("by challenge: " + filtered.length);

						var filterSize = [];
						if(size !== "Any"){
							for(var i = 0; i < filtered.length; i++){
								if(filtered[i].Size == size){
									filterSize.push(filtered[i]);
								}
							}
						}
						else{
							filterSize = filtered;
						}
						console.log("by size: " + filterSize.length);

						var filterType = [];
						if(type != "Any"){
							for(var i = 0; i < filterSize.length; i++){
								if(filterSize[i].Type == type){
									filterType.push(filterSize[i]);
								}
							}
						}
						else{
							filterType = filterSize;
						}
						console.log("by type: " + filterType.length);

						console.log(alignment);
						var filterAlignment = [];
						if(alignment !== "Any" && alignment !== "Any evil" && alignment !== "Any good" && alignment !== "Any neutral"
							&& alignment !== "Lawful Any" && alignment !== "Chaotic Any" && alignment !== "Neutral Any"){
							console.log("in if");
							for(var i = 0; i < filterType.length; i++){
								if(filterType[i].Alignment == alignment){
									filterAlignment.push(filterType[i]);
								}
							}
						}
						else if(alignment == "Any evil" || alignment == "Any good" || alignment == "Any neutral"){
							var set;
							console.log("in else1");
							if(align2 == "Good"){
								set = ["CG","NG","LG","any good"];
							}
							else if(align2 == "Evil"){
								set = ["CE","NE","LE","Any evil"];
							}
							else if(align2 == "Neutral"){
								set = ["CN","Unaligned","LN","N"];
							}
							for(var i = 0; i < filterType.length; i++){
								if(filterType[i].Alignment == set[0] || filterType[i].Alignment == set[1] || filterType[i].Alignment == set[2] || filterType[i].Alignment == set[3]){
									filterAlignment.push(filterType[i]);
								}
							}
						}
						else if(alignment == "Lawful Any" || alignment == "Chaotic Any" || alignment == "Neutral Any") {
							var set;
							console.log("in else2");
							if (align1 == "Lawful") {
								set = ["LG", "LN", "LC"];
							}
							else if (align1 == "Chaotic") {
								set = ["CG", "CN", "CE"];
							}
							else if (align1 == "Neutral") {
								set = ["NG", "Unaligned", "NE"];
							}
							for (var i = 0; i < filterType.length; i++) {
								if (filterType[i].Alignment == set[0] || filterType[i].Alignment == set[1] || filterType[i].Alignment == set[2]) {
									filterAlignment.push(filterType[i]);
								}
							}
						}
						else{
							console.log("in else3");
							filterAlignment = filterType;
						}
						console.log("by alignment: " + filterAlignment.length);
						var filterEnvironment = [];
						if(environment != "Any" && filterAlignment.length > 1){
							for(var i = 0; i < filterAlignment.length; i++){
								var length = filterAlignment[i].Environment;
								for(var j = 0; j < length.length; j++){
									var temp = filterAlignment[i].Environment[j];
									if(temp == environment){
										filterEnvironment.push(filterAlignment[i]);
									}
								}
							}
						}
						else if(environment != "Any" && filterAlignment.length == 1){
							for(var i = 0; i < filterAlignment[0].Environment.length; i++){
								if(filterAlignment[0].Environment[i] == environment){
									filterEnvironment.push(filterAlignment[0]);
								}
							}
						}
						else{
							filterEnvironment = filterAlignment;
						}
						console.log("by Environment: "+filterEnvironment.length);

						if(filterEnvironment.length != 0){
							var random = Math.floor((Math.random()*(filterEnvironment.length)));
							generated = filterEnvironment[random];
							genName = generated.Name;
							genCR = generated.Challenge;
							genXP = generated.XP;
							genPage = generated.Page;
							console.log("generated: " + genName + ", " + generated.Alignment + ", " + generated.Size + ", " + generated.Type + ", {" + generated.Environment + "}");
                        	var output = '<tr><td>'+genName+'</td><td>'+genCR+'</td><td>'+genXP+'</td><td>'+genPage+'</td></tr>'
                        	Generated.unshift(output);
                        	if(Generated.length >= 10){
                            	Generated = Generated.slice(0,10);
                        	}
                        	var outputAll = '';
                        	for(var i = 0; i < Generated.length; i++){
                            	outputAll += Generated[i];
                        	}
                        	document.getElementById("main").innerHTML ='<h3 class = "outputHeader">Encounter Generated </h3>' +
                            	'<table>' +
                            	'<tr><th>Name:</th><th>CR:</th><th>XP:</th><th>Page #</th></tr>' +
                            	outputAll +
                            	'</table>';
                        	document.getElementById("encounterCanvas").innerHTML = document.getElementById("main").innerHTML;
							return generated;
						}
						else{
							alert('No such monster in database.');
						}
					});
			}
			else {
				Monsters.orderByChild('Challenge')
					.startAt(CRrange.min)
					.endAt(CRrange.max)
					.once('value')
					.then(function (snapshot) {
						snapshot.forEach(function (childSnapshot) {
							filtered.push(childSnapshot.val());
						});
						console.log("by challenge: " + filtered.length);

						var filterSize = [];
						if(size !== "Any"){
							for(var i = 0; i < filtered.length; i++){
								if(filtered[i].Size == size){
									filterSize.push(filtered[i]);
								}
							}
						}
						else{
							filterSize = filtered;
						}
						console.log("by size: " + filterSize.length);

						var filterType = [];
						if(type != "Any"){
							for(var i = 0; i < filterSize.length; i++){
								if(filterSize[i].Type == type){
									filterType.push(filterSize[i]);
								}
							}
						}
						else{
							filterType = filterSize;
						}
						console.log("by type: " + filterType.length);

						var filterAlignment = [];
						if(alignment !== "Any" && alignment !== "Any evil" && alignment !== "Any good" && alignment !== "Any neutral"
							&& alignment !== "Lawful Any" && alignment !== "Chaotic Any" && alignment !== "Neutral Any"){
							for(var i = 0; i < filterType.length; i++){
								if(filterType[i].Alignment == alignment){
									filterAlignment.push(filterType[i]);
								}
							}
						}
						else if(alignment == "Any evil" || alignment == "Any good" || alignment == "Any neutral"){
							var set;
							if(align2 == "Good"){
								set = ["CG","NG","LG","any good"];
							}
							else if(align2 == "Evil"){
								set = ["CE","NE","LE","Any evil"];
							}
							else if(align2 == "Neutral"){
								set = ["CN","Unaligned","LN","N"];
							}
							for(var i = 0; i < filterType.length; i++){
								if(filterType[i].Alignment == set[0] || filterType[i].Alignment == set[1] || filterType[i].Alignment == set[2] || filterType[i].Alignment == set[3]){
									filterAlignment.push(filterType[i]);
								}
							}
						}
						else if(alignment == "Lawful Any" || alignment == "Chaotic Any" || alignment == "Neutral Any") {
							var set;
							if (align1 == "Lawful") {
								set = ["LG", "LN", "LC"];
							}
							else if (align1 == "Chaotic") {
								set = ["CG", "CN", "CE"];
							}
							else if (align1 == "Neutral") {
								set = ["NG", "Unaligned", "NE"];
							}
							for (var i = 0; i < filterType.length; i++) {
								if (filterType[i].Alignment == set[0] || filterType[i].Alignment == set[1] || filterType[i].Alignment == set[2]) {
									filterAlignment.push(filterType[i]);
								}
							}
						}
						else{
							filterAlignment = filterType;
						}
						console.log("by alignment: " + filterAlignment.length);
						var filterEnvironment = [];
						if(environment != "Any" && filterAlignment.length > 1){
							for(var i = 0; i < filterAlignment.length; i++){
								var length = filterAlignment[i].Environment;
								for(var j = 0; j < length.length; j++){
									var temp = filterAlignment[i].Environment[j];
									if(temp == environment){
										filterEnvironment.push(filterAlignment[i]);
									}
								}
							}
						}
						else if(environment != "Any" && filterAlignment.length == 1){
							for(var i = 0; i < filterAlignment[0].Environment.length; i++){
								if(filterAlignment[0].Environment[i] == environment){
									filterEnvironment.push(filterAlignment[0]);
								}
							}
						}
						else{
							filterEnvironment = filterAlignment;
						}
						console.log("by Environment: "+filterEnvironment.length);

						if(filterEnvironment.length != 0){
							var random = Math.floor((Math.random()*(filterEnvironment.length)));
							generated = filterEnvironment[random];
							genName = generated.Name;
							genCR = generated.Challenge;
							genXP = generated.XP;
							genPage = generated.Page;
							console.log("generated: " + genName + ", " + generated.Alignment + ", " + generated.Size + ", " + generated.Type + ", {" + generated.Environment + "}");
							var output = '<tr><td>'+genName+'</td><td>'+genCR+'</td><td>'+genXP+'</td><td>'+genPage+'</td></tr>'
                        	Generated.unshift(output);
                        	if(Generated.length >= 10){
                            	Generated = Generated.slice(0,10);
                        	}
                        	var outputAll = '';
                        	for(var i = 0; i < Generated.length; i++){
                            	outputAll += Generated[i];
                        	}
                        	document.getElementById("main").innerHTML ='<h3 class = "outputHeader">Encounter Generated </h3>' +
                            	'<table>' +
                            	'<tr><th>Name:</th><th>CR:</th><th>XP:</th><th>Page #</th></tr>' +
                            	outputAll +
                            	'</table>';
                        	document.getElementById("encounterCanvas").innerHTML = document.getElementById("main").innerHTML;
							return generated;
						}
						else{
							alert('No such monster in database.');
						}
					});
			}
		}
		else
			alert('Please enter a value in the range [1,20] for party level.');
		resizeSideBar();
	}

    function CalculateChallenge(difficulty,players,level){
        var TMELmin;
        var TMELmax;
        var PEL = [
            1.0,
            1.5,
            2.5,
            3.0,
            5.0,
            6.0,
            7.0,
            8.0,
            9.0,
            10.0,
            11.0,
            12.0,
            13.0,
            14.0,
            16.0,
            18.0,
            20.0,
            22.0,
            24.0,
            26.0
        ];
        var TPEL = players*PEL[level-1];
        console.log("TPEL:"+TPEL);
        if(difficulty == "Any"){
            TMELmin = 0.0;
            TMELmax = 216.0;
        }
        if(difficulty == "Easy"){
            TMELmin = (.40)*TPEL;
            TMELmax = (.60)*TPEL;
        }
        else if(difficulty == "Medium"){
            TMELmin = (.60)*TPEL;
            TMELmax = (.80)*TPEL;
        }
        else if(difficulty == "Difficult"){
            TMELmin = (.80)*TPEL;
            TMELmax = TPEL;
        }
        else if(difficulty == "Deadly"){
            TMELmin = TPEL;
            TMELmax = 216.0;
        }
        var MEL = [
            {PEL: .33, CR: 0},
            {PEL: .66, CR: .125},
            {PEL: 1.0, CR: .25},
            {PEL: 1.5, CR: .5},
            {PEL: 2.0, CR: 1},
            {PEL: 4.0, CR: 2},
            {PEL: 6.0, CR: 3},
            {PEL: 8.0, CR: 4},
            {PEL: 11.0, CR: 5},
            {PEL: 13.0, CR: 6},
            {PEL: 15.0, CR: 7},
            {PEL: 18.0, CR: 8},
            {PEL: 21.0, CR: 9},
            {PEL: 24.0, CR: 10},
            {PEL: 28.0, CR: 11},
            {PEL: 32.0, CR: 12},
            {PEL: 36.0, CR: 13},
            {PEL: 40.0, CR: 14},
            {PEL: 44.0, CR: 15},
            {PEL: 48.0, CR: 16},
            {PEL: 52.0, CR: 17},
            {PEL: 56.0, CR: 18},
            {PEL: 60.0, CR: 19},
            {PEL: 64.0, CR: 20},
            {PEL: 76.0, CR: 21},
            {PEL: 88.0, CR: 22},
            {PEL: 104.0, CR: 23},
            {PEL: 120.0, CR: 24},
            {PEL: 136.0, CR: 25},
            {PEL: 152.0, CR: 26},
            {PEL: 168.0, CR: 27},
            {PEL: 184.0, CR: 28},
            {PEL: 200.0, CR: 29},
            {PEL: 216.0, CR: 30}
        ];
        var count = 0;
        var range ={
            min: 30,
            max: 0
        };
        for(var i = 0; i < MEL.length; i++){
            if(MEL[i].PEL >= TMELmin && MEL[i].PEL <= TMELmax){
                if(MEL[i].CR < range.min){
                    range.min = MEL[i].CR;
                }
                if(MEL[i].CR > range.max){
                    range.max = MEL[i].CR;
                }
                count++;
            }
        }
        console.log("min CR:"+range.min);
        console.log("max CR:"+range.max);
        return range;
    }

    function convertAlignment(align1, align2){
        var part1;
        var part2;
        var alignment;
        if (align1 == "Any"){
            part1 = "Any";
        }
        else if (align1 == "Neutral"){
            part1 = "N";
        }
        else if (align1 == "Chaotic"){
            part1 = "C";
        }
        else if (align1 == "Lawful"){
            part1 = "L";
        }

        if (align2 == "Any"){
            part2 = "Any"
        }
        else if (align2 == "Neutral"){
            part2 = "N";
        }
        else if (align2 == "Evil"){
            part2 = "E";
        }
        else if (align2 == "Good"){
            part2 = "G";
        }

        if(part1 == "Any" && part2 == "Any"){
            alignment = "Any";
        }
        else if(part1 != "Any" && part2 == "Any"){
            alignment = align1 + " Any";
        }
        else if(part1 == "N" && part2 == "N"){
            alignment = "Unaligned";
        }
        else if(part1 == "Any" && part2 != "Any"){
            alignment = part1+" "+align2.toLowerCase();
        }
        else{
            alignment = part1 + part2;
        }
        console.log("ConvertAlignment: " + align1 + " + " + align2 + " = " + alignment);
        return alignment;
    }
	function clear_EncounterValues(){
		document.getElementById("partySize").value = "";
		document.getElementById("partyLevel").value = "";
		document.getElementById("monsterDiff").selectedIndex  = "0";
		document.getElementById("monsterAlignOne").selectedIndex  = "0";
		document.getElementById("monsterAlignTwo").selectedIndex  = "0";
		document.getElementById("monsterSize").selectedIndex  = "0";
		document.getElementById("monsterType").selectedIndex  = "0";
		document.getElementById("monsterEnvi").selectedIndex  = "0";
	} 


	function get_TreasureCR() {
		var cr_treasure = document.getElementById("challenge_rating").value;
		
		resizeSideBar();
		console.log(cr_treasure);
		if(cr_treasure > 0 && cr_treasure <= 4)
			lootGen1();
		else if(cr_treasure > 4 && cr_treasure <= 10)
			lootGen2();
		else if(cr_treasure > 10 && cr_treasure <= 16)
			lootGen3();
		else if(cr_treasure > 16 && cr_treasure <= 30)
			lootGen4();
		else
			alert('Please enter a value in the range [1,30].');

		console.log(cr_treasure);
	}
	function Treasure(cp, sp, ep, gp, pp, gems, art, mi)
	{
		//Treasure properties, first five are coin values, copper, silver, electrum, gold, and platinum
		//Last three properties are the gems, art objects, and magic items in the hoarde
		this.cpVal = cp;
		this.spVal = sp;
		this.epVal = ep;
		this.gpVal = gp;
		this.ppVal = pp;
		this.gemList = gems;
		this.artList = art;
		this.magicItems = mi;
	}
	//function for generating random numbers
	function rng(min, max)
	{
		return Math.floor((Math.random() * max) + min);
	}
	function printLootObject(itemsArray, tab){
		var htmlOutput = "";
		var i=0, x, count, item;
		while(i < itemsArray.length){
			count = 1;
			item = itemsArray[i];
			x = i+1;

			while(x < itemsArray.length && (x=itemsArray.indexOf(item,x))!=-1){
				count+=1;
				itemsArray.splice(x,1);
			}
			itemsArray[i] = new Array(itemsArray[i],count);
			++i;
		}
		
		i=0;
		while(i < itemsArray.length){	
			htmlOutput += tab + itemsArray[i][1] + " " +itemsArray[i][0] + " <br> ";
			i++;
		}
		
		return htmlOutput;
	}

	//generation of loot on the first loot table
	function lootGen1()
	{
    //create variables, first stores a random value between 1 and 100
    //the next three store the coinage value for cp, sp and gp to be returned
    //the next stores the number of gems or objects
    //the next two store the gems and art that are rolled respectively
    //the next two store the number and names of the magic items respectively
    var d100 = rng(1, 100);
    var cpVal = rng(600, 3600);
    var spVal = rng(300, 1800);
    var gpVal = rng(20, 120);
    var artGemNum = 0;
    var gemList = [];
    var artList = [];
    var numMI = 0;
    var mIList = [];
    //the following if statements decide the tables rolled on and the number of times rolled based on the d100 value
    if(d100 > 6 && d100 < 17)
    {
        artGemNum = rng(2, 12);
        for(var i = 0; i <= artGemNum; i++)
        {
            gemList[i] = gem1();
        }
    }
    //17-26
    else if(d100 >= 17 && d100 < 27)
    {
        artGemNum = rng(2, 8);
        for(var i = 0; i <= artGemNum; i++)
        {
            artList[i] = art1();
        }
    }
    //27-36
    else if(d100 >= 27 && d100 < 37)
    {
        artGemNum = rng(2, 12);
        for(var i = 0; i <= artGemNum; i++)
        {
            gemList[i] = gem2();
        }
    }
    //37-44
    else if(d100 >= 37 && d100 < 45)
    {
        artGemNum = rng(2, 12);
        numMI = rng(1, 6);
        for(var i = 0; i <= artGemNum; i++)
        {
            gemList[i] = gem1();
        }
        for(var i = 0; i <= numMI; i++)
        {
            mIList[i] = magicItemA();
        }
    }
    //45-52
    else if(d100 >= 45 && d100 < 53)
    {
        artGemNum = rng(2, 8);
        numMI = rng(1, 6);
        for(var i = 0; i <= artGemNum; i++)
        {
            artList[i] = art1();
        }
        for(var i = 0; i <= numMI; i++)
        {
            mIList[i] = magicItemA();
        }
    }
    //53-60
    else if(d100 >= 53 && d100 < 61)
    {
        artGemNum = rng(2, 12);
        numMI = rng(1, 6);
        for(var i = 0; i <= artGemNum; i++)
        {
            gemList[i] = gem2();
        }
        for(var i = 0; i <= numMI; i++)
        {
            mIList[i] = magicItemA();
        }
    }
    //61-65
    else if(d100 >= 61 && d100 < 66)
    {
        artGemNum = rng(2, 12);
        numMI = rng(1, 4);
        for(var i = 0; i <= artGemNum; i++)
        {
            gemList[i] = gem1();
        }
        for(var i = 0; i <= numMI; i++)
        {
            mIList[i] = magicItemB();
        }
    }
    //66-70
    else if(d100 >= 66 && d100 < 71)
    {
        artGemNum = rng(2, 8);
        numMI = rng(1, 4);
        for(var i = 0; i <= artGemNum; i++)
        {
            artList[i] = art1();
        }
        for(var i = 0; i <= numMI; i++)
        {
            mIList[i] = magicItemB();
        }
    }
    //71-75
    else if(d100 >= 71 && d100 < 76)
    {
        artGemNum = rng(2, 12);
        numMI = rng(1, 4);
        for(var i = 0; i <= artGemNum; i++)
        {
            gemList[i] = gem2();
        }
        for(var i = 0; i <= numMI; i++)
        {
            mIList[i] = magicItemB();
        }
    }
    //76-78, 2d6 10gp gems, 1d4 Magic Items C
    else if(d100 >= 76 && d100 < 79)
    {
        artGemNum = rng(2, 12);
        numMI = rng(1, 4);
        for(var i = 0; i <= artGemNum; i++)
        {
            gemList[i] = gem1();
        }
        for(var i = 0; i <= numMI; i++)
        {
            mIList[i] = magicItemC();
        }
    }
    //79-80, 2d4 25gp art, 1d4 Magic Items C
    else if(d100 >= 79 && d100 < 81)
    {
        artGemNum = rng(2, 8);
        numMI = rng(1, 4);
        for(var i = 0; i <= artGemNum; i++)
        {
            artList[i] = art1();
        }
        for(var i = 0; i <= numMI; i++)
        {
            mIList[i] = magicItemC();
        }
    }
    //81-85, 2d6 50gp gems, 1d4 Magic Items C
    else if(d100 >= 81 && d100 < 86)
    {
        artGemNum = rng(2, 12);
        numMI = rng(1, 4);
        for(var i = 0; i <= artGemNum; i++)
        {
            gemList[i] = gem2();
        }
        for(var i = numMI; i <= numMI; i++)
        {
            mIList[i] = magicItemC();
        }
    }
    //86-92, 2d4 25gp art, 1d4 Magic Items F
    else if(d100 >= 86 && d100 < 93)
    {
        artGemNum = rng(2, 12);
        numMI = rng(1, 4);
        for(var i = 0; i <= artGemNum; i++)
        {
            artList[i] = art1();
        }
        for(var i = 0; i <= numMI; i++)
        {
            mIList[i] = magicItemF();
        }
    }
    //93-97, 2d6 50gp gems, 1d4 Magic Items F
    else if(d100 >= 93 && d100 < 98)
    {
        artGemNum = rng(2, 12);
        numMI = rng(1, 4);
        for(var i = 0; i <= artGemNum; i++)
        {
            gemList[i] = gem2();
        }
        for(var i = 0; i <= numMI; i++)
        {
            mIList[i] = magicItemF();
        }
    }
    //98-99, 2d4 25gp art, 1 Magic Item G
    else if(d100 >= 98 && d100 < 100)
    {
        artGemNum = rng(2, 12);
        numMI = rng(1, 4);
        for(var i = 0; i <= artGemNum; i++)
        {
            artList[i] = art1();
        }
        mIList[0] = magicItemG();
    }
    //100, 2d6 50gp gems, 1 Magic Item G
    else if(d100 == 100)
    {
        artGemNum = rng(2, 12);
        numMI = rng(1, 4);
        for(var i = 0; i <= artGemNum; i++)
        {
            gemList[i] = gem2();
        }
        mIList[0] = magicItemG();
    }
    var Loot = new Treasure(cpVal, spVal, 0, gpVal, 0, gemList, artList, mIList);
	
	var cCoins = tab + Loot.cpVal + " copper coins <br>";
	var sCoins = tab + Loot.spVal + " silver coins<br>";
	var gCoins = tab + Loot.gpVal + " gold coins <br>";
	var artPart = printLootObject(Loot.artList, tab);
	var gemPart = printLootObject(Loot.gemList, tab);
	var mItemsPart = printLootObject(mIList, tab);
	
	output ='<table class = "treasureTable"><tr><th>Coins</th></tr>' +
				'<tr><td>' + cCoins+ sCoins + gCoins + '</td></tr>' +
				'<tr><th>Gems</th></tr>' +
				'<tr><td>' + gemPart + '</td></tr>'+
				'<tr><th>Art Items</th></tr>'+ 
				'<tr><td>'+ artPart + '</td></tr>' +
				'<tr><th>Magic Items</tr></tr>' + 
				'<tr><td>' + mItemsPart + '</tr></td>' +
				'</table' ;
	
	document.getElementById("main").innerHTML = '<h3 class = "outputHeader">Treasure Generated </h3><p class = "genOutput">' + output + '</p>';
	document.getElementById("treasureCanvas").innerHTML = document.getElementById("main").innerHTML;
	
	resizeSideBar();
	}
	function lootGen2()
	{
		var d100 = rng(1, 100);
		var cpVal = rng(200, 1200);
		var spVal = rng(2000, 12000);
		var gpVal = rng(600, 3600);
		var ppVal = rng(30, 180);
		var artGemNum = 0;
		var gemList = [];
		var artList = [];
		var numMI = 0;
		var mIList = [];

		if(d100 >= 5 && d100 < 11)
		{
			artGemNum = rng(2, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art1();
			}
		}
		else if(d100 >= 11 && d100 < 17)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem2();
			}
		}
		else if(d100 >= 17 && d100 < 23)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem3();
			}
		}
		else if(d100 >= 23 && d100 < 29)
		{
			artGemNum = rng(2, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art2();
			}
		}
		else if(d100 >= 29 && d100 < 33)
		{
			artGemNum = rng(2, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art1();
			}
			numMI = rng(1 , 6);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemA();
			}
		}
		else if(d100 >= 33 && d100 < 37)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem2();
			}
			numMI = rng(1 , 6);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemA();
			}
		}
		else if(d100 >= 37 && d100 < 41)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem3();
			}
			numMI = rng(1 , 6);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemA();
			}
		}
		else if(d100 >= 41 && d100 < 45)
		{
			artGemNum = rng(2, 8);
			for (var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art2();
			}
			numMI = rng(1 , 6);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemA();
			}
		}
		else if(d100 >= 45 && d100 < 50)
		{
			artGemNum = rng(2, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art1();
			}
			numMI = rng(1 , 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemB();
			}
		}
		else if(d100 >= 50 && d100 < 55)
		{
			artGemNum = rng(3, 18);
			for (var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem2();
			}
			numMI = rng(1 , 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemB();
			}
		}
		else if(d100 >= 55 && d100 < 60)
		{
			artGemNum = rng(3, 18);
			for (var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem3();
			}
			numMI = rng(1 , 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemB();
			}
		}
		else if(d100 >= 60 && d100 < 64)
		{
			artGemNum = rng(2, 8);
			for (var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art2();
			}
			numMI = rng(1 , 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemB();
			}
		}
		else if(d100 >= 64 && d100 < 67)
		{
			artGemNum = rng(2, 8);
			for (var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art1();
			}
			numMI = rng(1 , 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemC();
			}
		}
		else if(d100 >= 67 && d100 < 70)
		{
			artGemNum = rng(3, 18);
			for (var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem2();
			}
			numMI = rng(1 , 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemC();
			}
		}
		else if(d100 >= 70 && d100 < 73)
		{
			artGemNum = rng(3, 18);
			for (var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem3();
			}
			numMI = rng(1 , 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemC();
			}
		}
		else if(d100 >= 73 && d100 < 75)
		{
			artGemNum = rng(2, 8);
			for (var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art2();
			}
			numMI = rng(1 , 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemC();
			}
		}
		else if(d100 >= 75 && d100 < 77)
		{
			artGemNum = rng(2, 8);
			for (var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art1();
			}
			mIList[0] = magicItemD();
		}
		else if(d100 >= 77 && d100 < 79)
		{
			artGemNum = rng(3, 18);
			for (var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem2();
			}
			mIList[0] = magicItemD();
		}
		else if(d100 == 79)
		{
			artGemNum = rng(3, 18);
			for (var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem3();
			}
			mIList[0] = magicItemD();
		}
		else if(d100 == 80)
		{
			artGemNum = rng(2, 8);
			for (var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art2();
			}
			mIList[0] = magicItemD();
		}
		else if(d100 >= 81 && d100 < 85)
		{
			artGemNum = rng(2, 8);
			for (var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art1();
			}
			numMI = rng(1 , 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemF();
			}
		}
		else if(d100 >= 85 && d100 < 89)
		{
			artGemNum = rng(3, 18);
			for (var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem2();
			}
			numMI = rng(1 , 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemF();
			}
		}
		else if(d100 >= 89 && d100 < 92)
		{
			artGemNum = rng(3, 18);
			for (var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem3();
			}
			numMI = rng(1 , 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemF();
			}
		}
		else if(d100 >= 92 && d100 < 95)
		{
			artGemNum = rng(2, 8);
			for (var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art2();
			}
			numMI = rng(1 , 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemF();
			}
		}
		else if(d100 >= 95 && d100 < 97)
		{
			artGemNum = rng(3, 18);
			for (var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem3();
			}
			numMI = rng(1 , 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemG();
			}
		}
		else if(d100 >= 97 && d100 < 99)
		{
			artGemNum = rng(2, 8);
			for (var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art2();
			}
			numMI = rng(1 , 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemG();
			}
		}
		else if(d100 == 99)
		{
			artGemNum = rng(3, 18);
			for (var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem3();
			}
			mIList[0] = magicItemH();
		}
		else
		{
			artGemNum = rng(2, 8);
			for (var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art2();
			}
			mIList[0] = magicItemH();
		}

		var Loot = new Treasure(cpVal, spVal, 0, gpVal, ppVal, gemList, artList, mIList);
		
		
		var cCoins = tab + Loot.cpVal + " copper coins <br>";
		var sCoins = tab + Loot.spVal + " silver coins<br>";
		var gCoins = tab + Loot.gpVal + " gold coins <br>";
		var pCoins = tab + Loot.ppVal + " platinum coins <br>";
		var artPart = printLootObject(Loot.artList, tab);
		var gemPart = printLootObject(Loot.gemList, tab);
		var mItemsPart = printLootObject(mIList, tab);
		
		output ='<table class = "treasureTable"><tr><th>Coins</th></tr>' +
				'<tr><td>' + cCoins+ sCoins + gCoins  + pCoins + '</td></tr>' +
				'<tr><th>Gems</th></tr>' +
				'<tr><td>' + gemPart + '</td></tr>'+
				'<tr><th>Art Items</th></tr>'+ 
				'<tr><td>'+ artPart + '</td></tr>' +
				'<tr><th>Magic Items</tr></tr>' + 
				'<tr><td>' + mItemsPart + '</tr></td>' +
				'</table' ;
		
		document.getElementById("main").innerHTML = '<h3 class = outputHeader">Treasure Generated </h3><p class = "genOutput">' + output + '</p>';
		document.getElementById("treasureCanvas").innerHTML = document.getElementById("main").innerHTML;
		
		resizeSideBar();
	}
	function lootGen3()
	{
		var d100 = rng(1, 100);
		var gpVal = rng(4000, 24000);
		var ppVal = rng(500, 3000);
		var artGemNum = 0;
		var gemList = [];
		var artList = [];
		var numMI = 0;
		var mIList = [];
		//1 - 3
		// 4 - 6, 2d4 art2
		if(d100 >= 4 && d100 < 7)
		{
			artGemNum = rng(2, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art2();
			}
		}
		//7 - 9, 2d4 art3
		else if(d100 >= 7 && d100 < 10)
		{
			artGemNum = rng(2, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art3();
			}
		}
		//10 - 12, 3d6 gem4
		else if(d100 >= 10 && d100 < 13)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem4();
			}
		}
		//13 - 15, 3d6 gem5
		else if(d100 >= 13 && d100 < 16)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem5();
			}
		}
		//16 - 19, 2d4 art2, 1d4 MIA and 1d6 MIB
		else if(d100 >= 16 && d100 < 20)
		{
			artGemNum = rng(2, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art2();
			}
			numMI = rng(1, 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemA();
			}
			numMI = rng(1, 6);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemB();
			}
		}
		//20 - 23, 2d4 art3, 1d4 MIA and 1d6 MIB
		else if(d100 >= 20 && d100 < 24)
		{
			artGemNum = rng(2, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art3();
			}
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemA();
			}
			numMI = rng(1, 6);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemB();
			}
		}
		//24 - 26, 3d6 gem4, 1d4 MIA and 1d6 MIB
		else if(d100 >= 24 && d100 < 27)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem4();
			}
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemA();
			}
			numMI = rng(1, 6);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemB();
			}
		}
		//27 - 29, 3d6 gem5, 1d4 MIA and 1d6 MIB
		else if(d100 >= 27 && d100 < 30)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem5();
			}
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemA();
			}
			numMI = rng(1, 6);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemB();
			}
		}
		//30 - 35, 2d4 art2, 1d6 MIC
		else if(d100 >= 30 && d100 < 36)
		{
			artGemNum = rng(2, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art2();
			}
			numMI = rng(1, 6);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemC();
			}
		}
		//36 - 40, 2d4 art3, 1d6 MIC
		else if(d100 >= 36 && d100 < 41)
		{
			artGemNum = rng(2, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art3();
			}
			numMI = rng(1, 6);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemC();
			}
		}
		//41 - 45, 3d6 gem4, 1d6 MIC
		else if(d100 >= 41 && d100 < 46)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem4();
			}
			numMI = rng(1, 6);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemC();
			}
		}
		//46 - 50, 3d6 gem5, 1d6 MIC
		else if(d100 >= 46 && d100 < 51)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem5();
			}
			numMI = rng(1, 6);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemC();
			}
		}
		//51 - 54, 2d4 art2, 1d4 MID
		else if(d100 >= 51 && d100 < 55)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art2();
			}
			numMI = rng(1, 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemD();
			}
		}
		//55 - 58, 2d4 art3, 1d4 MID
		else if(d100 >= 55 && d100 < 59)
		{
			artGemNum = rng(2, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art3();
			}
			numMI = rng(1, 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemD();
			}
		}
		//59 - 62, 3d6 gem4, 1d4 MID
		else if(d100 >= 59 && d100 < 63)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem4();
			}
			numMI = rng(1, 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemD();
			}
		}
		//63 - 66, 3d6 gem5, 1d4 MID
		else if(d100 >= 63 && d100 < 67)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem5();
			}
			numMI = rng(1, 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemD();
			}
		}
		//67 - 68, 2d4 art2, 1 MIE
		else if(d100 >= 67 && d100 < 69)
		{
			artGemNum = rng(2, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art2();
			}
			mIList[0] = magicItemE();
		}
		//69 - 70, 2d4 art3, 1 MIE
		else if(d100 >= 69 && d100 < 71)
		{
			artGemNum = rng(2, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art3();
			}
			mIList[0] = magicItemE();
		}
		//71 - 72, 3d6 gem4, 1 MIE
		else if(d100 >= 71 && d100 < 73)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem4();
			}
			mIList[0] = magicItemE();
		}
		//73 - 74, 3d6 gem5, 1 MIE
		else if(d100 >= 73 && d100 < 75)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem5();
			}
			mIList[0] = magicItemE();
		}
		//75 - 76, 2d4 art2, 1 MIF and 1d4 MIG
		else if(d100 >= 75 && d100 < 77)
		{
			artGemNum = rng(2, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art2();
			}
			mIList[0] = magicItemF();
			numMI = rng(1, 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemG();
			}
		}
		//77 - 78, 2d4 art3, 1 MIF and 1d4 MIG
		else if(d100 >= 77 && d100 < 79)
		{
			artGemNum = rng(2, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art3();
			}
			mIList[0] = magicItemF();
			numMI = rng(1, 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemG();
			}
		}
		//79 - 80, 3d6 gem4, 1 MIF and 1d4 MIG
		else if(d100 >= 79 && d100 < 81)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem4();
			}
			mIList[0] = magicItemF();
			numMI = rng(1, 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemG();
			}
		}
		//81 - 82, 3d6 gem5, 1 MIF and 1d4 MIG
		else if(d100 >= 81 && d100 < 83)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem5();
			}
			mIList[0] = magicItemF();
			numMI = rng(1, 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemG();
			}
		}
		//83 - 85, 2d4 art2, 1d4 MIH
		else if(d100 >= 83 && d100 < 86)
		{
			artGemNum = rng(2, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art2();
			}
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemH();
			}
		}
		//86 - 88, 2d4 art3, 1d4 MIH
		else if(d100 >= 86 && d100 < 89)
		{
			artGemNum = rng(2, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art3();
			}
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemH();
			}
		}
		//89 - 90, 3d6 gem4, 1d4 MIH
		else if(d100 >= 89 && d100 < 91)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem4();
			}
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemH();
			}
		}
		//91 - 92, 3d6 gem5, 1d4 MIH
		else if(d100 >= 91 && d100 < 93)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem5();
			}
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemH();
			}
		}
		//93 - 94, 2d4 art2, 1 MII
		else if(d100 >= 93 && d100 < 95)
		{
			artGemNum = rng(2, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art2();
			}
			mIList[0] = magicItemI();
		}
		//95 - 96, 2d4 art3, 1 MII
		else if(d100 >= 95 && d100 < 97)
		{
			artGemNum = rng(2, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art3();
			}
			mIList[0] = magicItemI();
		}
		//97 - 98, 3d6 gem4, 1 MII
		else if(d100 >= 97 && d100 < 99)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem4();
			}
			mIList[0] = magicItemI();
		}
		//99 - 00, 3d6 gem5, 1 MII
		else
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem5();
			}
			mIList[0] = magicItemI();
		}
		var loot = new Treasure(0, 0, 0, gpVal, ppVal, gemList, artList, mIList);
		
		var gCoins = tab +loot.gpVal+ " gold coins <br>";
		var pCoins = tab +loot.ppVal+ " platinum coins <br>";
		var artPart = printLootObject(loot.artList, tab);
		var gemPart = printLootObject(loot.gemList, tab);
		var mItemsPart = printLootObject(mIList, tab);
		
		output ='<table class = "treasureTable"><tr><th>Coins</th></tr>' +
				'<tr><td>' + gCoins  + pCoins + '</td></tr>' +
				'<tr><th>Gems</th></tr>' +
				'<tr><td>' + gemPart + '</td></tr>'+
				'<tr><th>Art Items</th></tr>'+ 
				'<tr><td>'+ artPart + '</td></tr>' +
				'<tr><th>Magic Items</tr></tr>' + 
				'<tr><td>' + mItemsPart + '</tr></td>' +
				'</table' ;
		
		document.getElementById("main").innerHTML = '<h3 class = "outputHeader">Treasure Generated </h3><p class = "genOutput">' + output + '</p>';
		document.getElementById("treasureCanvas").innerHTML = document.getElementById("main").innerHTML;
		
		resizeSideBar();
	}
	function lootGen4()
	{
		var d100 = rng(1, 100);
		var gpVal = rng(12000, 72000);
		var ppVal = rng(8000, 48000);
		var artGemNum = 0;
		var gemList = [];
		var artList = [];
		var numMI = 0;
		var mIList = [];

		//1 - 2
		//3 - 5, 3d6 gem5, 1d8 MIC
		if(d100 >= 3 && d100 < 6)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem5();
			}
			numMI = rng(1, 8);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemC();
			}
		}
		//6 - 8, 1d10 art4, 1d8 MIC
		else if(d100 >= 6 && d100 < 9)
		{
			artGemNum = rng(1, 10);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art4();
			}
			numMI = rng(1, 8);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemC();
			}
		}
		//9 - 11, 1d4 art5, 1d8 MIC
		else if(d100 >= 9 && d100 < 12)
		{
			artGemNum = rng(1, 4);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art5();
			}
			numMI = rng(1, 8);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemC();
			}
		}
		//12 - 14, 1d8 gem6, 1d8 MIC
		else if(d100 >= 12 && d100 < 15)
		{
			artGemNum = rng(1, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem6();
			}
			numMI = rng(1, 8);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemC();
			}
		}
		//15 - 22, 3d6 gem5, 1d6 MID
		else if(d100 >= 15 && d100 < 23)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem5();
			}
			numMI = rng(1, 6);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemD();
			}
		}
		//23 - 30, 1d10 art4, 1d6 MID
		else if(d100 >= 23 && d100 < 31)
		{
			artGemNum = rng(1, 10);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art4();
			}
			numMI = rng(1, 6);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemD();
			}
		}
		//31 - 38, 1d4 art5, 1d6 MId
		else if(d100 >= 31 && d100 < 39)
		{
			artGemNum = rng(1, 4);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art5();
			}
			numMI = rng(1, 6);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemD();
			}
		}
		//39 - 46, 1d8 gem6, 1d6 MID
		else if(d100 >= 40 && d100 < 47)
		{
			artGemNum = rng(1, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem4();
			}
			numMI = rng(1, 6);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemD();
			}
		}
		//47 - 52, 3d6 gem5, 1d6 MIE
		else if(d100 >= 47 && d100 < 53)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem5();
			}
			numMI = rng(1, 6);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemE();
			}
		}
		//53 - 58, 1d10 art4, 1d6 MIE
		else if(d100 >= 53 && d100 < 59)
		{
			artGemNum = rng(1, 10);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art4();
			}
			numMI = rng(1, 6);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemE();
			}
		}
		//59 - 63, 1d4 art5, 1d6 MIE
		else if(d100 >= 59 && d100 < 64)
		{
			artGemNum = rng(1, 4);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art5();
			}
			numMI = rng(1, 6);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemE();
			}
		}
		// 64 - 68, 1d8 gem6, 1d6 MIE
		else if(d100 >= 64 && d100 < 69)
		{
			artGemNum = rng(1, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem6();
			}
			numMI = rng(1, 6);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemE();
			}
		}
		//69, 3d6 gem5, 1d4 MIG
		else if(d100 == 69)
		{
			artGemNum = rng(1, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem5();
			}
			numMI = rng(1, 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemG();
			}
		}
		//70, 1d10 art4, 1d4 MIG
		else if(d100 == 70)
		{
			artGemNum = rng(1, 10);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art4();
			}
			numMI = rng(1, 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemG();
			}
		}
		//71, 1d4 art5, 1d4 MIG
		else if(d100 == 71)
		{
			artGemNum = rng(1, 4);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art5();
			}
			numMI = rng(1, 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemG();
			}
		}
		//72, 1d8 gem6, 1d4 MIG
		else if(d100 == 72)
		{
			artGemNum = rng(1, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem6();
			}
			numMI = rng(1, 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemG();
			}
		}
		//73 - 74, 3d6 gem5, 1d4 MIH
		else if(d100 >= 73 && d100 < 75)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem5();
			}
			numMI = rng(1, 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemH();
			}
		}
		//75 - 76, 1d10 art4, 1d4 MIH
		else if(d100 >= 75 && d100 < 77)
		{
			artGemNum = rng(1, 10);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art4();
			}
			numMI = rng(1, 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemH();
			}
		}
		//77 - 78, 1d4 art5, 1d4 MIH
		else if(d100 >= 77 && d100 < 79)
		{
			artGemNum = rng(1, 4);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art5();
			}
			numMI = rng(1, 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemH();
			}
		}
		//79 - 80, 1d8 gem6, 1d4 MIH
		else if(d100 >= 79 && d100 < 81)
		{
			artGemNum = rng(1, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem6();
			}
			numMI = rng(1, 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemH();
			}
		}
		//81 - 85, 3d6 gem5, 1d4 MII
		else if(d100 >= 81 && d100 < 86)
		{
			artGemNum = rng(3, 18);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem5();
			}
			numMI = rng(1, 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemI();
			}
		}
		//86 - 90, 1d10 art4, 1d4 MII
		else if(d100 >= 86 && d100 < 91)
		{
			artGemNum = rng(1, 10);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art4();
			}
			numMI = rng(1, 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemI();
			}
		}
		//91 - 95, 1d4 art5, 1d4 MII
		else if(d100 >= 91 && d100 < 96)
		{
			artGemNum = rng(1, 4);
			for(var i = 0; i <= artGemNum; i++)
			{
				artList[i] = art5();
			}
			numMI = rng(1, 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemI();
			}
		}
		//96 - 00, 1d8 gem6, 1d4 MII
		else
		{
			artGemNum = rng(1, 8);
			for(var i = 0; i <= artGemNum; i++)
			{
				gemList[i] = gem6();
			}
			numMI = rng(1, 4);
			for(var i = 0; i <= numMI; i++)
			{
				mIList[i] = magicItemI();
			}
		}
		var Loot = new Treasure(0, 0, 0, gpVal,ppVal, gemList, artList, mIList)
		
		var gCoins = tab + Loot.gpVal+ " gold coins <br>";
		var pCoins = tab + Loot.ppVal+ " platinum coins <br>";
		var artPart = printLootObject(Loot.artList, tab);
		var gemPart = printLootObject(Loot.gemList, tab);
		var mItemsPart = printLootObject(mIList, tab);
		
		output ='<table class = "treasureTable"><tr><th>Coins</th></tr>' +
				'<tr><td>' + gCoins  + pCoins + '</td></tr>' +
				'<tr><th>Gems</th></tr>' +
				'<tr><td>' + gemPart + '</td></tr>'+
				'<tr><th>Art Items</th></tr>'+ 
				'<tr><td>'+ artPart + '</td></tr>' +
				'<tr><th>Magic Items</tr></tr>' + 
				'<tr><td>' + mItemsPart + '</tr></td>' +
				'</table' ;
		
		document.getElementById("main").innerHTML = '<h3 class = "outputHeader">Treasure Generated </h3><p class = "genOutput">' + output + "</p>";
		document.getElementById("treasureCanvas").innerHTML = document.getElementById("main").innerHTML;
		console.log(document.getElementById("main").innerHTML);
		resizeSideBar();
	}
	function gem1()
	{
		var val = rng(1, 12);
		switch(val)
		{
			case 1: return "Azurite";
			case 2: return "Banded Agate";
			case 3: return "Blue Quartz";
			case 4: return "Eye Agate";
			case 5: return "Hematite";
			case 6: return "Lapis Lazuli";
			case 7: return "Malachite";
			case 8: return "Moss Agate";
			case 9: return "Obsidian";
			case 10: return "Rhodochrosite";
			case 11: return "Tiger Eye";
			case 12: return "Turquoise";
			default: return "null";
		}
	}
	function gem2()
	{
		var val = rng(1, 12);
		switch(val)
		{
			case 1: return "Bloodstone";
			case 2: return "Carnelian";
			case 3: return "Chalcedony";
			case 4: return "Chrysoprase";
			case 5: return "Citrine";
			case 6: return "Jasper";
			case 7: return "Moonstone";
			case 8: return "Onyx";
			case 9: return "Quartz";
			case 10: return "Sardonyx";
			case 11: return "Star Rose Quartz";
			case 12: return "Zircon";
			default: return "null";
		}
	}
	function gem3()
	{
		var val = rng(1, 10);
		switch(val)
		{
			case 1: return "Amber";
			case 2: return "Amethyst";
			case 3: return "Chrysoberyl";
			case 4: return "Coral";
			case 5: return "Garnet";
			case 6: return "Jade";
			case 7: return "Jet";
			case 8: return "Pearl";
			case 9: return "Spinel";
			case 10: return "Tournmaline";
			default: return "null";
		}
	}
	function gem4()
	{
		var val = rng(1, 6);
		switch(val)
		{
			case 1: return "Alexandrite";
			case 2: return "Aquamarine";
			case 3: return "Black Pearl";
			case 4: return "Blue Spinel";
			case 5: return "Peridot";
			case 6: return "Topaz";
			default: return "null";
		}
	}
	function gem5()
	{
		var val = rng(1, 8);
		switch(val)
		{
			case 1: return "Black Opal";
			case 2: return "Blue Sapphire";
			case 3: return "Emerald";
			case 4: return "Fire Opal";
			case 5: return "Opal";
			case 6: return "Star Ruby";
			case 7: return "Star Sapphire";
			case 8: return "Yellow Sapphire";
			default: return "null";
		}
	}
	function gem6()
	{
		var val = rng(1, 4);
		switch(val)
		{
			case 1: return "Black Sapphire";
			case 2: return "Diamond";
			case 3: return "Jacvarh";
			case 4: return "Ruby";
			default: return "null";
		}
	}
	function art1()
	{
		var val = rng(1, 10);
		switch(val)
		{
			case 1: return "Silver Ewer";
			case 2: return "Carved Bone Statuette";
			case 3: return "Small Gold Bracelet";
			case 4: return "Cloth-of-Gold Vestments";
			case 5: return "Black Velvet Mast Stitched with Silver Thread";
			case 6: return "Copper Chalice with Silver Filigree";
			case 7: return "Pair of Engraved Bone Dice";
			case 8: return "Small Mirror set in a Pavared Wooden Frame";
			case 9: return "Embroided Silk Hankerchief";
			case 10: return "Gold Locket with a Pavared Portrait Inside";
			default: return "null";
		}
	}
	function art2()
	{
		var val = rng(1, 10);
		switch(val)
		{
			case 1: return "Gold Ring set with Bloodstones";
			case 2: return "Carved Ivory Statuette";
			case 3: return "Large Gold Bracelet";
			case 4: return "Silver Necklace with a Gemstone Pendant";
			case 5: return "Bronze Crown";
			case 6: return "Silk Robe with Gold Embroidery";
			case 7: return "Large Well-Made Tapestry";
			case 8: return "Brass Mug with Jade Inlay";
			case 9: return "Box of Turquoise Animal Figurines";
			case 10: return "Gold Bird Cage with Electrum Filigree";
			default: return "null";
		}
	}
	function art3()
	{
		var val = rng(1, 10);
		switch(val)
		{
			case 1: return "Silver Chalice set with Moonstones";
			case 2: return "Silver-plated steel Longsword with Jet set in hilt";
			case 3: return "Carved Harp of Exotic Wood with Ivory Inlay and Zircon Gems";
			case 4: return "Small Gold Idol";
			case 5: return "Gold Dragon Comb Set with Red Garnets as Eyes";
			case 6: return "Bottle Stopper Cork Embossed with Gold Leaf and Set with Amethysts";
			case 7: return "Ceremonial Electrum Dagger with a Black Pearl in the Pommel";
			case 8: return "Silver and Gold Brooch";
			case 9: return "Obsidian Statuette with Gold Fittings and Inlay";
			case 10: return "Pavared Gold War Mask";
			default: return "null";
		}
	}
	function art4()
	{
		var val = rng(1, 10);
		switch(val)
		{
			case 1: return "Fine Gold Chain set with a Fire Opal";
			case 2: return "Old Masterpiece pavaring";
			case 3: return "Embroided Silk and Velvet mantle set with Numverous Moonstones";
			case 4: return "Platinum Bracelet set with Jewel Chips";
			case 5: return "Embroided Glove set with Jewel Chips";
			case 6: return "Jeweled Anklet";
			case 7: return "Gold Music Box";
			case 8: return "Gold Circlet set with Four Aquamarines";
			case 9: return "Eye Patch with a Mock Eye set in Blue Sapphire and Moonstone";
			case 10: return "A Necklace String of Small Pink Pearls";
			default: return "null";
		}
	}
	function art5()
	{
		var val = rng(1, 8);
		switch(val)
		{
			case 1: return "Jeweled Gold Crown";
			case 2: return "Jeweled Platinum Ring";
			case 3: return "Small Gold Statuette set with Rubies";
			case 4: return "Gold Cup Set with Emeralds";
			case 5: return "Gold Jewelery Box with Platinum Filigree";
			case 6: return "Pavared Gold Childs Sarcophagus";
			case 7: return "Jade Game Board with Solid Gold Playing Pieces";
			case 8: return "Bejeweled Ivory Drinking Horn with Gold Filigree";
			default: return "null";
		}
	}
	function magicItemA()
	{
		var d100 = rng(1,100);
		if(d100 < 51)
			return "Potion of Healing";
		else if(d100 >= 51 && d100 < 61)
			return "Spell Scroll (cantrip)";
		else if(d100 <= 61 && d100 < 71)
			return "Potion of Climbing";
		else if(d100 <= 71 && d100 < 91)
			return "Spell Scroll (1st Level)";
		else if(d100 <= 91 && d100 < 95)
			return "Spell Scroll (2nd Level)";
		else if(d100 <= 95 && d100 < 99)
			return "Potion of Greater Healing";
		else if(d100 == 99)
			return "Bag of Holding";
		else
			return "Driftglobe";
	}
	function magicItemB()
	{
		var d100 = rng(1,100);
		if(d100 < 16)
			return "Potion of Greater Healing";
		else if(d100 >= 16 && d100 < 23)
			return "Potion of Fire Breath";
		else if(d100 >= 23 && d100 < 30)
			return "Potion of Resistance";
		else if(d100 >= 30 && d100 < 35)
			return "Ammunition, +1";
		else if(d100 >= 35 && d100 < 40)
			return "Potion of Animal Friendship";
		else if(d100 >= 40 && d100 < 45)
			return "Potion of Hill Giant Strength";
		else if(d100 >= 45 && d100 < 50)
			return "Potion of Growth";
		else if(d100 >= 50 && d100 < 55)
			return "Potion of Water Breathing";
		else if(d100 >= 55 && d100 < 60)
			return "Spell Scroll (2nd Level)";
		else if(d100 >= 60 && d100 < 65)
			return "Spell Scroll (3rd Level)";
		else if(d100 >= 65 && d100 < 68)
			return "Bag of Holding";
		else if(d100 >= 68 && d100 < 71)
			return "Keoghtom's Ovarment";
		else if(d100 >= 71 && d100 < 74)
			return "Oil of Slipperiness";
		else if(d100 >= 74 && d100 < 76)
			return "Dust of Disappearance";
		else if(d100 >= 76 && d100 < 78)
			return "Dust of Dryness";
		else if(d100 >= 78 && d100 < 80)
			return "Dust of Sneexing and Choking";
		else if(d100 >= 80 && d100 < 82)
			return "Elemental Gem";
		else if(d100 >= 82 && d100 < 84)
			return "Philter of Love";
		else if(d100 == 84)
			return "Alchemy Jug";
		else if(d100 == 85)
			return "Cap of Water Breathing";
		else if(d100 == 86)
			return "Cloak of the Manta Ray";
		else if(d100 == 87)
			return "Driftglobe";
		else if(d100 == 88)
			return "Goggles of the Night";
		else if(d100 == 89)
			return "Helm of Comprehend Languages";
		else if(d100 == 90)
			return "Immovable Rod";
		else if(d100 == 91)
			return "Lantern of Revealing";
		else if(d100 == 92)
			return "Mariners Armor";
		else if(d100 == 93)
			return "Mithral Armor";
		else if(d100 == 94)
			return "Potion of Poison";
		else if(d100 == 95)
			return "Ring of Swimming";
		else if(d100 == 96)
			return "Robe of Useful Items";
		else if(d100 == 97)
			return "Rope of Climbing";
		else if(d100 == 98)
			return "Saddle of the Cavalier";
		else if(d100 == 99)
			return "Wand of Magic Detection";
		else
			return "Wand of Secrets";
	}
	function magicItemC()
	{
		var d100 = rng(1,100);
		if(d100 < 16)
			return "Potion of Superior Healing";
		else if(d100 >= 16 && d100 < 23)
			return "Spell Scroll(4th Level)";
		else if(d100 >= 23 && d100 < 28)
			return "Ammunition, +2";
		else if(d100 >= 28 && d100 < 33)
			return "Potion of Clairvoyance";
		else if(d100 >= 33 && d100 < 38)
			return "Potion of Diminution";
		else if(d100 >= 38 && d100 < 43)
			return "Potion of Gaseous Form";
		else if(d100 >= 43 && d100 < 48)
			return "Potion of Frost Giant Strength";
		else if(d100 >= 48 && d100 < 53)
			return "Potion of Stone Giant Strength";
		else if(d100 >= 53 && d100 < 58)
			return "Potion of Heroism";
		else if(d100 >= 58 && d100 < 63)
			return "Potion of Invulnerability";
		else if(d100 >= 63 && d100 < 68)
			return "Potion of Mind Reading";
		else if(d100 >= 68 && d100 < 73)
			return "Spell Scroll (5th Level)";
		else if(d100 >= 73 && d100 < 76)
			return "Elixer of Health";
		else if(d100 >= 76 && d100 < 79)
			return "Oil of Etherealness";
		else if(d100 >= 79 && d100 < 82)
			return "Potion of Fire Giant Strength";
		else if(d100 >= 82 && d100 < 85)
			return "Quaal's Feather Token";
		else if(d100 >= 85 && d100 < 88)
			return "Scroll of Protection";
		else if(d100 >= 88 && d100 < 90)
			return "Bag of Beans";
		else if(d100 >= 90 && d100 < 92)
			return "bead of Force";
		else if(d100 == 92)
			return "Chime of Opening";
		else if(d100 == 93)
			return "Decanter of Endless Water";
		else if(d100 == 94)
			return "Eyes of Minute Seeing";
		else if(d100 == 95)
			return "Folding Boat";
		else if(d100 == 96)
			return "Heward's Handy Haversack";
		else if(d100 == 97)
			return "Horseshoes of Speed";
		else if(d100 == 98)
			return "Necklace of Fireballs";
		else if(d100 == 99)
			return "Periapt of Health";
		else
			return "Sending Stones";
	}
	function magicItemD()
	{
		var d100 = rng(1,100);
		if(d100 < 21)
			return "Potion of Supreme Healing";
		else if(d100 >= 21 && d100 < 31)
			return "Potion of Invisibility";
		else if(d100 >= 31 && d100 < 41)
			return "Potion of Speed";
		else if(d100 >= 41 && d100 < 51)
			return "Spell Scroll (6th Level)";
		else if(d100 >= 51 && d100 < 58)
			return "Spell Scroll (7th Level)";
		else if(d100 >= 58 && d100 < 63)
			return "Ammunition. +3";
		else if(d100 >= 63 && d100 < 68)
			return "Oil of Sharpness";
		else if(d100 >= 68 && d100 < 73)
			return "Potion of Flying";
		else if(d100 >= 73 && d100 < 78)
			return "Potion of Cloud Giant Strength";
		else if(d100 >= 78 && d100 < 83)
			return "Potion of Longevity";
		else if(d100 >= 83 && d100 < 88)
			return "Potion of Vitality";
		else if(d100 >= 88 && d100 < 93)
			return "Spell Scroll (8th Level)";
		else if(d100 >= 93 && d100 < 96)
			return "Horseshoes of a Zephyr";
		else if(d100 >= 96 && d100 < 99)
			return "Nolzur's Marvelous Pigments";
		else if(d100 == 99)
			return "Bag of Devouring";
		else
			return "Portable Hole";
	}
	function magicItemE()
	{
		var d100 = rng(1,100);
		if(d100 < 31)
			return "Spell Scroll (8th Level)";
		else if(d100 >= 31 && d100 < 56)
			return "Potion of Storm Giant Strength";
		else if(d100 >= 56 && d100 < 71)
			return "Potion of Supreme Healing";
		else if(d100 >= 71 && d100 < 86)
			return "Spell Scroll (9th Level)";
		else if(d100 >= 86 && d100 < 94)
			return "Universal Solvent";
		else if(d100 >= 94 && d100 < 99)
			return "Arrow of Slaying";
		else
			return "Sovereign Glue";
	}
	function magicItemF()
	{
		var d100 = rng(1, 100);
		if(d100 < 16)
			return "Weapon, +1";
		else if(d100 >= 16 && d100 < 19)
			return "Shield, +1";
		else if(d100 >= 19 && d100 < 22)
			return "Sentinel Shield";
		else if(d100 >= 22 && d100 < 24)
			return "Amulet of Proof Against Detection and Location";
		else if(d100 >= 24 && d100 < 26)
			return "Boots of Elvenkind";
		else if(d100 >= 26 && d100 < 28)
			return "Boots of Striding and Springing";
		else if(d100 >= 28 && d100 < 30)
			return "Bracers of Archery";
		else if(d100 >= 30 && d100 < 32)
			return "Brooch of Shielding";
		else if(d100 >= 32 && d100 < 34)
			return "Broom of Flying";
		else if(d100 >= 34 && d100 < 36)
			return "Cloak of Elvenkind";
		else if(d100 >= 36 && d100 < 38)
			return "Cloak of Protection";
		else if(d100 >= 38 && d100 < 40)
			return "Gauntlets of Ogre Power";
		else if(d100 >= 40 && d100 < 42)
			return "Hat of Disguise";
		else if(d100 >= 42 && d100 < 44)
			return "Javelin of Lightning";
		else if(d100 >= 44 && d100 < 46)
			return "Pearl of Power";
		else if(d100 >= 46 && d100 < 48)
			return "Rod of the Pact Keeper +1";
		else if(d100 >= 48 && d100 < 50)
			return "Slippers of Spider Climbing";
		else if(d100 >= 50 && d100 < 52)
			return "Staff of the Adder";
		else if(d100 >= 52 && d100 < 54)
			return "Staff of the Python";
		else if(d100 >= 54 && d100 < 56)
			return "Sword of Vengeance";
		else if(d100 >= 56 && d100 < 58)
			return "Trident of Fish Command";
		else if(d100 >= 58 && d100 < 60)
			return "Wand of Magic Missiles";
		else if(d100 >= 60 && d100 < 62)
			return "Wand of the War Mage, +1";
		else if(d100 >= 62 && d100 < 64)
			return "Wand of Web";
		else if(d100 >= 64 && d100 < 66)
			return "Weapon of Warning";
		else if(d100 == 66)
			return "Adamantine Armor (Chain Mail)";
		else if(d100 == 67)
			return "Adamantine Armor (Chain Shirt)";
		else if(d100 == 68)
			return "Adamantine Armor (Scale Mail)";
		else if(d100 == 69)
			return "Bag of Tricks (Gray)";
		else if(d100 == 70)
			return "Bag of Tricks (Rust)";
		else if(d100 == 71)
			return "Bag of Tricks (Tan)";
		else if(d100 == 72)
			return "Boots of the Wvarerlands";
		else if(d100 == 73)
			return "Circlet of Blasting";
		else if(d100 == 74)
			return "Deck of Illusions";
		else if(d100 == 75)
			return "Eversmoking Bottle";
		else if(d100 == 76)
			return "Eyes of Charming";
		else if(d100 == 77)
			return "Eyes of the Eagle";
		else if(d100 == 78)
			return "Figurine of Wondrous Power (Silver Raven)";
		else if(d100 == 79)
			return "Gem of Brightness";
		else if(d100 == 80)
			return "Gloves of Missile Snaring";
		else if(d100 == 81)
			return "Gloves of Swimming and Climbing";
		else if(d100 == 82)
			return "Gloves of Thievery";
		else if(d100 == 83)
			return "Headband of varellect";
		else if(d100 == 84)
			return "Helm of Telepathy";
		else if(d100 == 85)
			return "Instrument of the Bards (Doss Lute)";
		else if(d100 == 86)
			return "Instrument of the Bards (Fochlucan Bandore)";
		else if(d100 == 87)
			return "Instrument of the Bards (Mac-Fuimidh Cittern)";
		else if(d100 == 88)
			return "Medallion of thoughts";
		else if(d100 == 89)
			return "Necklace of Adaptation";
		else if(d100 == 90)
			return "Periapt of Wound Closure";
		else if(d100 == 91)
			return "Pipes of Haunting";
		else if(d100 == 92)
			return "Pipes of the Sewers";
		else if(d100 == 93)
			return "Ring of Jumping";
		else if(d100 == 94)
			return "Ring of Mind Shielding";
		else if(d100 == 95)
			return "Ring of Warmth";
		else if(d100 == 96)
			return "Ring of Water Walking";
		else if(d100 == 97)
			return "Quiver of Ehlonna";
		else if(d100 == 98)
			return "Stone of Good Luck";
		else if(d100 == 99)
			return "Wind Fan";
		else
			return "Winged Boots";
	}
	function magicItemG()
	{
		var d8;
		var d100 = rng(1, 100);
		if(d100 < 12)
			return "Weapon, +2";
		else if(d100 >= 12 && d100 < 15)
		{
			d8 = rng(1,8);
			switch (d8)
			{
				case 1: return "Figurine of Wondrous Power (Bronze Griffon)";
				case 2: return "Figurine of Wondrous Power (Ebony Fly)";
				case 3: return "Figurine of Wondrous Power (Golden Lions)";
				case 4: return "Figurine of Wondrous Power (Ivory Goats)";
				case 5: return "Figurine of Wondrous Power (Marble Elephant)";
				case 6:;
				case 7: return "Figurine of Wondrous Power (Onyx Dog)";
				case 8: return "Figurine of Wondrous Power (Serpentine Owl)";
				default: return "null";
			}
		}
		else if(d100 == 15)
			return "Adamantine Armor (Breastplate)";
		else if(d100 == 16)
			return "Adamantine Armor (Splvar)";
		else if(d100 == 17)
			return "Amulet of Health";
		else if(d100 == 18)
			return "Armor of Vulnerability";
		else if(d100 == 19)
			return "Arrow-Catching Shield";
		else if(d100 == 20)
			return "Belt of Dwarvenkind";
		else if(d100 == 21)
			return "Belt of Hill Giant Strength";
		else if(d100 == 22)
			return "Berserker Axe";
		else if(d100 == 23)
			return "Boots of Levitation";
		else if(d100 == 24)
			return "Boots of Speed";
		else if(d100 == 25)
			return "Bowl of Commanding Water Elementals";
		else if(d100 == 26)
			return "Bracers of Defense";
		else if(d100 == 27)
			return "Brazier of Commanding Fire Elementals";
		else if(d100 == 28)
			return "Cape of the Mounteback";
		else if(d100 == 29)
			return "Censer of Controlling Air Elementals";
		else if(d100 == 30)
			return "Armor, +1 Chain Mail";
		else if(d100 == 31)
			return "Armor of Resistance (Chain Mail)";
		else if(d100 == 32)
			return "Armor, +1 chain shirt";
		else if(d100 == 33)
			return "Armor of Resistance (Chain Shirt)";
		else if(d100 == 34)
			return "Cloak of Displacement";
		else if(d100 == 35)
			return "Cloak of the Bat";
		else if(d100 == 36)
			return "Cube of Force";
		else if(d100 == 37)
			return "Daern's Instant Fortress";
		else if(d100 == 38)
			return "Dagger of Venom";
		else if(d100 == 39)
			return "Dimensional Shackles";
		else if(d100 == 40)
			return "Dragon Slayer";
		else if(d100 == 41)
			return "Elven Chain";
		else if(d100 == 42)
			return "Flame Tongue";
		else if(d100 == 43)
			return "Gem of Seeing";
		else if(d100 == 44)
			return "Giant Slayer";
		else if(d100 == 45)
			return "Glamoured Studded Leather";
		else if(d100 == 46)
			return "Helmn of Teleportation";
		else if(d100 == 47)
			return "Horn of Blasting";
		else if(d100 == 48)
			return "Horn of Valhalla";
		else if(d100 == 49)
			return "Instrument of the Bards (Canaith Mandolin)";
		else if(d100 == 50)
			return "Instrument of the Bards (Cli Lyre)";
		else if(d100 == 51)
			return "Ioun Stone (Awareness)";
		else if(d100 == 52)
			return "Ioun Stone (Protection)";
		else if(d100 == 53)
			return "Ioun Stone (Reserve)";
		else if(d100 == 54)
			return "Ioun Stone (Sustenance)";
		else if(d100 == 55)
			return "Iron Bands of Bilarro";
		else if(d100 == 56)
			return "Armor, +1 Leather";
		else if(d100 == 57)
			return "Armor of Resistance (Leather)";
		else if(d100 == 58)
			return "Mace of Disruption";
		else if(d100 == 59)
			return "Mace of Smiting";
		else if(d100 == 60)
			return "Mace of Terror";
		else if(d100 == 61)
			return "Mantle of Spell Resistance";
		else if(d100 == 62)
			return "Necklace of Prayer Beads";
		else if(d100 == 63)
			return "Periapt of Proof Against Poison";
		else if(d100 == 64)
			return "Ring of Animal Influence";
		else if(d100 == 65)
			return "Ring of Evasion";
		else if(d100 == 66)
			return "Ring of Feather Falling";
		else if(d100 == 67)
			return "Ring of Free Action";
		else if(d100 == 68)
			return "Ring of Protection";
		else if(d100 == 69)
			return "Ring of Resistance";
		else if(d100 == 70)
			return "Ring od Spell Storing";
		else if(d100 == 71)
			return "Ring of the Ram";
		else if(d100 == 72)
			return "Ring of X-ray Vision";
		else if(d100 == 73)
			return "Robe of Eyes";
		else if(d100 == 74)
			return "Rod of Rulership";
		else if(d100 == 75)
			return "Rod of the Pact Keeper, +2";
		else if(d100 == 76)
			return "Rope of Entanglement";
		else if(d100 == 77)
			return "Armor, +1 Scale Mail";
		else if(d100 == 78)
			return "Armor of Resistance";
		else if(d100 == 79)
			return "Shield, +2";
		else if(d100 == 80)
			return "Shield of Missile Attraction";
		else if(d100 == 81)
			return "Staff of Charming";
		else if(d100 == 82)
			return "Staff of Healing";
		else if(d100 == 83)
			return "Staff of Swarming Insects";
		else if(d100 == 84)
			return "Staff of the Woodlands";
		else if(d100 == 85)
			return "Staff of Withering";
		else if(d100 == 86)
			return "Stone of Controlling Earth Elementals";
		else if(d100 == 87)
			return "Sun Blade";
		else if(d100 == 88)
			return "Sword of Life Stealing";
		else if(d100 == 89)
			return "Sword of Wounding";
		else if(d100 == 90)
			return "Tentacle Rod";
		else if(d100 == 91)
			return "Vicious Weapon";
		else if(d100 == 92)
			return "Wand of Binding";
		else if(d100 == 93)
			return "Wand of Enemy Detection";
		else if(d100 == 94)
			return "Wand of Fear";
		else if(d100 == 95)
			return "Wand of Fireballs";
		else if(d100 == 96)
			return "Wand of Lightning Bolts";
		else if(d100 == 97)
			return "Wand of Paralysis";
		else if(d100 == 98)
			return "Wand of the War Mage, +2";
		else if(d100 == 99)
			return "Wand of Wonder";
		else
			return "Wings of Flying";
	}
	function magicItemH()
	{
		var d100 = rng(1,100);
		var coin;
		if(d100 < 11)
			return "Weapon, +3";
		else if(d100 >= 11 && d100 < 13)
			return "Amulet of the Planes";
		else if(d100 >= 13 && d100 < 15)
			return "Carpet of Flying";
		else if(d100 >= 15 && d100 < 17)
			return "Crystal Ball";
		else if(d100 >= 17 && d100 < 19)
			return "Ring of Regeneration";
		else if(d100 >= 19 && d100 < 21)
			return "Ring of Shooting Stars";
		else if(d100 >= 21 && d100 < 23)
			return "Ring of Telekinesis";
		else if(d100 >= 23 && d100 < 25)
			return "Robe of Scintillating Colors";
		else if(d100 >= 25 && d100 < 27)
			return "Robe of Stars";
		else if(d100 >= 27 && d100 < 29)
			return "Robe of Absorbtion";
		else if(d100 >= 29 && d100 < 31)
			return "Rod of Alertness";
		else if(d100 >= 31 && d100 < 33)
			return "Rod of Security";
		else if(d100 >= 33 && d100 < 35)
			return "Rod of the Pact Keeper, +3";
		else if(d100 >= 35 && d100 < 37)
			return "Scimitar of Speed";
		else if(d100 >= 37 && d100 < 39)
			return "Shield, +3";
		else if(d100 >= 39 && d100 < 41)
			return "Staff of Fire";
		else if(d100 >= 41 && d100 < 43)
			return "Staff of Frost";
		else if(d100 >= 43 && d100 < 45)
			return "Staff of Power";
		else if(d100 >= 45 && d100 < 47)
			return "Staff of Striking";
		else if(d100 >= 47 && d100 < 49)
			return "Staff of Thunder and Lightning";
		else if(d100 >= 49 && d100 < 51)
			return "Sword of Sharpnes";
		else if(d100 >= 51 && d100 < 53)
			return "Wand of Polymorph";
		else if(d100 >= 53 && d100 < 55)
			return "Wand of the War Mage, +3";
		else if(d100 == 55)
			return "Adamantine Armor (Half Plate)";
		else if(d100 == 56)
			return "Adamantine Armor (Plate)";
		else if(d100 == 57)
			return "Animated Shield";
		else if(d100 == 58)
			return "Belt of Fire Giant Strength";
		else if(d100 == 59)
		{
			coin = rng(1, 2);
			switch (coin)
			{
				case 1:
					return "Belt of Frost Giant Strength";
				case 2:
					return "Belt of Stone Giant Strength";
				default:
					return "null";
			}
		}
		else if(d100 == 60)
			return "Armor, +1 Breastplate";
		else if(d100 == 61)
			return "Armor of Resistance (Breastplate)";
		else if(d100 == 62)
			return "Candle of Invocation";
		else if(d100 == 63)
			return "Armor, +2 Chain Mail";
		else if(d100 == 64)
			return "Armor, +2 Chain shirt";
		else if(d100 == 65)
			return "Cloak of Arachnida";
		else if(d100 == 66)
			return "Dancing Sword";
		else if(d100 == 67)
			return "Demon Armor";
		else if(d100 == 68)
			return "Dragon Scale Mail";
		else if(d100 == 69)
			return "Dwarven Plate";
		else if(d100 == 70)
			return "Dwarven Thrower";
		else if(d100 == 71)
			return "Efreeti Bottle";
		else if(d100 == 72)
			return "Figurine of Wondrous Power (Obsidian Steed)";
		else if(d100 == 73)
			return "Frost Band";
		else if(d100 == 74)
			return "Helm of Brilliance";
		else if(d100 == 75)
			return "Horn of Valhalla (Bronze)";
		else if(d100 == 76)
			return "Instrument of the Bards(Anstruth Harp)";
		else if(d100 == 77)
			return "Ioun Stone (Absorbtion)";
		else if(d100 == 78)
			return "Ioun Stone (Agility)";
		else if(d100 == 79)
			return "Ioun Stone (Fortitude)";
		else if(d100 == 80)
			return "Ioun Stone (Insight)";
		else if(d100 == 81)
			return "Ioun Stone (Intellect)";
		else if(d100 == 82)
			return "Ioun Stone (Leadership)";
		else if(d100 == 83)
			return "Ioun Stone (Strength)";
		else if(d100 == 84)
			return "Armor, +2 Leather";
		else if(d100 == 85)
			return "Manual of Bodily Health";
		else if(d100 == 86)
			return "Manual of Gainful Excercise";
		else if(d100 == 87)
			return "Manual of Golems";
		else if(d100 == 88)
			return "Manual of Quickness of Action";
		else if(d100 == 89)
			return "Mirror of Life Trapping";
		else if(d100 == 90)
			return "Nine Lives Stealer";
		else if(d100 == 91)
			return "Oathbow";
		else if(d100 == 92)
			return "Armor, +2 Scale Mail";
		else if(d100 == 93)
			return "Spellguard Shield";
		else if(d100 == 94)
			return "Armor, +1 Splint";
		else if(d100 == 95)
			return "Armor of Resistance (Splint)";
		else if(d100 == 96)
			return "Armor, +1 Studded Leather";
		else if(d100 == 97)
			return "Armor of Resistance (Studded Leather)";
		else if(d100 == 98)
			return "Tome of Clear Thought";
		else if(d100 == 99)
			return "Tome of Leadership and Influence";
		else
			return "Tome of Understanding";
	}
	function magicItemI()
	{
    var d100 = rng(1,100);
    var d12;
    if(d100 < 6)
        return "Defender";
    else if(d100 >= 6 && d100 < 11)
        return "Hammer of Thunderbolts";
    else if(d100 >= 11 && d100 < 16)
        return "Luck Blade";
    else if(d100 >= 16 && d100 < 21)
        return "Sword of Answering";
    else if(d100 >= 21 && d100 < 24)
        return "Holy Avenger";
    else if(d100 >= 24 && d100 < 27)
        return "Ring of Djinni Summoning";
    else if(d100 >= 27 && d100 < 30)
        return "Ring of Invisibility";
    else if(d100 >= 31 && d100 < 33)
        return "Ring of Spell Turning";
    else if(d100 >= 33 && d100 < 36)
        return "Rod of Lordly Might";
    else if(d100 >= 36 && d100 < 39)
        return "Staff of the Magi";
    else if(d100 >= 39 && d100 < 42)
        return "Vorpal Sword";
    else if(d100 >= 42 && d100 < 44)
        return "Belt of Cloud Giant Strength";
    else if(d100 >= 44 && d100 < 46)
        return "Armor, +2 Breastplate";
    else if(d100 >= 46 && d100 < 48)
        return "Armor, +3 Chain Mail";
    else if(d100 >= 48 && d100 < 50)
        return "Armor, +3 Chain Shirt";
    else if(d100 >= 50 && d100 < 52)
        return "Cloak of Invisibility";
    else if(d100 >= 52 && d100 < 54)
        return "Crystal Ball (Legendary Version)";
    else if(d100 >= 54 && d100 < 56)
        return "Armor, +1 Half Plate";
    else if(d100 >= 56 && d100 < 58)
        return "Iron Flask";
    else if(d100 >= 58 && d100 < 60)
        return "Armor, +3 Leather";
    else if(d100 >= 60 && d100 < 62)
        return "Armor, +1 Plate";
    else if(d100 >= 62 && d100 < 64)
        return "Robe of the Archmagi";
    else if(d100 >= 64 && d100 < 66)
        return "Rod of Resurrection";
    else if(d100 >= 66 && d100 < 68)
        return "Armor, +1 Scale Mail";
    else if(d100 >= 68 && d100 < 70)
        return "Scarab of Protection";
    else if(d100 >= 70 && d100 < 72)
        return "Armor, +2 Splint";
    else if(d100 >= 72 && d100 < 74)
        return "Armor, +2 Studded Leather";
    else if(d100 >= 74 && d100 < 76)
        return "Well of Many Worlds";
    else if(d100 == 76)
    {
        d12 = rng(1, 12);
        switch (d12)
        {
            case 1:;
            case 2: return "Armor, +2 Half Plate";
            case 3:;
            case 4: return "Armor, +2 Plate";
            case 5:;
            case 6: return "Armor, +3 Studded Leather";
            case 7:;
            case 8: return "Armor, +3 Breastplate";
            case 9:;
            case 10: return "Armor, +3 Splint";
            case 11: return "Armor, +3 Half Plate";
            case 12: return "Armor, +3 Plate";
            default: return "null";
        }
    }
    else if(d100 == 77)
        return "Apparatus of Kwalish";
    else if(d100 == 78)
        return "Armor of Invulnerability";
    else if(d100 == 79)
        return "Belt of Storm Ginat Strength";
    else if(d100 == 80)
        return "Cubic Gate";
    else if(d100 == 81)
        return "Deck of Many Things";
    else if(d100 == 82)
        return "Efreeti Chain";
    else if(d100 == 83)
        return "Armor of Resistance (Half Plate)";
    else if(d100 == 84)
        return "Horn of Valhalla (Iron)";
    else if(d100 == 85)
        return "Instrument of the Bards (Ollamh Harp)";
    else if(d100 == 86)
        return "Ioun Stone (Greater Absorption)";
    else if(d100 == 87)
        return "Ioun Stone (Mastery)";
    else if(d100 == 88)
        return "Ioun Stone (Regeneration)";
    else if(d100 == 89)
        return "Plate Armor of Etherealness";
    else if(d100 == 90)
        return "Plate Armor of Resistance";
    else if(d100 == 91)
        return "Ring of Air Elemental Command";
    else if(d100 == 92)
        return "Ring of Earth Elemental Command";
    else if(d100 == 93)
        return "Ring of Fire Elemental Command";
    else if(d100 == 94)
        return "Ring of Three Wishes";
    else if(d100 == 95)
        return "Ring of Water Elemental Command";
    else if(d100 == 96)
        return "Sphere of Annihilation";
    else if(d100 == 97)
        return "Talisman of Pure Good";
    else if(d100 == 98)
        return "Talisman of the Sphere";
    else if(d100 == 99)
        return "Talisman of Ultimate Evil";
    else
        return "Tome of the Stilled Tongue";
}

	function get_NPCValues() {
		var npcRace = document.getElementById("npc_Race").value;
		var npcClass = document.getElementById("npc_Class").value;
		var npcBackground = document.getElementById("npc_Background").value;
		var npcGender = document.getElementById("npc_Gender").value;
		
		resizeSideBar()
		document.getElementById("npcCanvas").innerHTML = document.getElementById("main").innerHTML;
		console.log(npcRace);
		console.log(npcClass);
		console.log(npcBackground);
		console.log(npcGender);
		
		charGenerator(npcRace, npcClass, npcGender, npcBackground);
	}

	function clear_NPCValues(){
		document.getElementById("npc_Race").selectedIndex  = "0";
		document.getElementById("npc_Class").selectedIndex  = "0";
		document.getElementById("npc_Background").selectedIndex  = "0";
		document.getElementById("npc_Gender").selectedIndex  = "0";
	}

	//NPCGenerating Functions
	function NPC(n, r, c, g, b, p, i, bd, f)
	{
		this.name = n;
		this.race = r;
		this.characterClass = c;
		this.gender = g;
		this.background = b;
		this.characteristic = p;
		this.ideal = i;
		this.bond = bd;
		this.flaw = f;
	}
	
	function charGenerator(r, c, g, b)
	{
		var charName;
		var race;
		var charClass;
		var gender;
		var bGround;
		var characteristic;
		var ideal;
		var bond;
		var flaw;
		console.log("This is the charGen function");
		//calls function that randomly generates a name
		charName = nameGen();
		//if race has not been designated, call function that generates one randomly, otherwise use designated class
		if(r == "Any")
			race = raceGen();
		else
			race = r;
		//if class has not been designated, call function that generates one randomly, otherwise use designated class
		if(c == "Any")
			charClass = classGen();
		else
			charClass = c;
		//if gender has not been designated, call function that generates one randomly, otherwise use designated gender
		if(g == "Any")
			gender = genderGen();
		else
			gender = g;
		//if background has not been designated, call function that generates one randomly, otherwise use designated background
		if(b == "Any")
			bGround = backgroundGen();
		else
			bGround = b;
		//calls function that generates random characteristic
		characteristic = charGen();
		//calls function that generates random ideal
		ideal = idealGen();
		//calls function that generates random bond
		bond = bondGen(10);
		//calls function that generates random flaw
		flaw = flawGen();

		//creat the NPC object
		var nonPlayerCharacter = new NPC(charName, race, charClass, gender, bGround, characteristic, ideal, bond, flaw);
		
		output ='<p class = "genOutput"><table class = "npcTable">' +
				'<tr><th>Attribute</th><th>Value</th></tr>' +
				'<tr><th>Name</th>' + '<td>' + firstToUpperCase(nonPlayerCharacter.name) +  '</td>'+ '</tr>'+ 
				'<tr><th>Race</th>' + '<td>' + nonPlayerCharacter.race +  '</td>'+ '</tr>'+
				'<tr><th>Class</th>' + '<td>' + nonPlayerCharacter.characterClass +  '</td>'+ '</tr>'+
				'<tr><th>Gender</th>' + '<td>' + nonPlayerCharacter.gender +  '</td>'+ '</tr>'+
				'<tr><th>Background</th>' + '<td>' + nonPlayerCharacter.background +  '</td>'+ '</tr>'+
				'<tr><th>Characteristics</th>' + '<td>' + nonPlayerCharacter.characteristic +  '</td>'+ '</tr>'+ 
				'<tr><th>Ideals</th>' + '<td>' + nonPlayerCharacter.ideal +  '</td>'+ '</tr>'+ 
				'<tr><th>Bonds</th>' + '<td>' + nonPlayerCharacter.bond +  '</td>'+ '</tr>'+
				'<tr><th>Flaws</th>' + '<td>' + nonPlayerCharacter.flaw +  '</td>'+ '</tr>'+
				'</table></p>';
		
		document.getElementById("main").innerHTML = '<h3 class = "outputHeader">Non Player Character Generated </h3><p class = "genOutput">' + output + '</p>';
		document.getElementById("npcCanvas").innerHTML = document.getElementById("main").innerHTML;
		console.log(output);
		
		console.log(nonPlayerCharacter.name);
		console.log(nonPlayerCharacter.race);
		console.log(nonPlayerCharacter.characterClass);
		console.log(nonPlayerCharacter.gender);
		console.log(nonPlayerCharacter.background);
		console.log(nonPlayerCharacter.characteristic);
		console.log(nonPlayerCharacter.ideal);
		console.log(nonPlayerCharacter.bond);
		console.log(nonPlayerCharacter.flaw);
	}
	function nameGen()
	{
		var charName = "";
		var d20;
		d20 = rng(1,20);
		switch(d20)
		{
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4:
				break;
			case 5: charName = "a";
				break;
			case 6: charName = "be";
				break;
			case 7: charName = "de";
				break;
			case 8: charName = "el";
				break;
			case 9: charName = "fa";
				break;
			case 10: charName = "jo";
				break;
			case 11: charName = "ki";
				break;
			case 12: charName = "la";
				break;
			case 13: charName = "ma";
				break;
			case 14: charName = "na";
				break;
			case 15: charName = "o";
				break;
			case 16: charName = "pa"
				break;
			case 17: charName = "re";
				break;
			case 18: charName = "si";
				break;
			case 19: charName = "ta";
				break;
			case 20: charName = "va";
				break;
			default:
				break;
		}
		d20 = rng(1, 20);
		switch(d20)
		{
			case 1: charName += "bar";
				break;
			case 2: charName+="ched";
				break;
			case 3: charName+="dell";
				break;
			case 4: charName+="far";
				break;
			case 5: charName+="gran";
				break;
			case 6: charName+="hal";
				break;
			case 7: charName+="jen";
				break;
			case 8: charName+="kel";
				break;
			case 9: charName+="lim";
				break;
			case 10: charName+="mor";
				break;
			case 11: charName+="net";
				break;
			case 12: charName+="penn";
				break;
			case 13: charName+="quil";
				break;
			case 14: charName+="rond";
				break;
			case 15: charName+="sark";
				break;
			case 16: charName+="shen";
				break;
			case 17: charName+="tur";
				break;
			case 18: charName+="vash";
				break;
			case 19: charName+="yor";
				break;
			case 20: charName+="zen";
				break;
			default:
				break;
		}
		d20 = rng(1, 20);
		switch(d20)
		{
			case 1:
				break;
			case 2: charName+="a";
				break;
			case 3: charName+="ac";
				break;
			case 4: charName+="ai";
				break;
			case 5: charName+="al";
				break;
			case 6: charName+="am";
				break;
			case 7: charName+="an";
				break;
			case 8: charName+="ar";
				break;
			case 9: charName+="ea";
				break;
			case 10: charName+="el";
				break;
			case 11: charName+="er";
				break;
			case 12: charName+="ess";
				break;
			case 13: charName+="ett";
				break;
			case 14: charName+="ic";
				break;
			case 15: charName+="id";
				break;
			case 16: charName+="il";
				break;
			case 17: charName+="in";
				break;
			case 18: charName+="is";
				break;
			case 19: charName+="or";
				break;
			case 20: charName+="us";
				break;
			default:
		}
		return charName;
	}
	function raceGen()
	{
		var d9 = rng(1, 9);
		var charRace;
		switch(d9)
		{
			case 1: charRace = "Human";
				break;
			case 2: charRace = "Elf";
				break;
			case 3: charRace = "Dwarf";
				break;
			case 4: charRace = "Halfling";
				break;
			case 5: charRace = "Half-Elf";
				break;
			case 6: charRace = "Half-Orc";
				break;
			case 7: charRace = "Gnome";
				break;
			case 8: charRace = "Tiefling";
				break;
			case 9: charRace = "Dragonborn";
				break;
			default: charRace = "Null";
		}
		return charRace;
	}
	function classGen()
	{
		var d9 = rng(1, 12);
		var charClass
		switch(d9)
		{
			case 1: charClass = "Barbarian";
				break;
			case 2: charClass = "Bard";
				break;
			case 3: charClass = "Cleric";
				break;
			case 4: charClass = "Druid";
				break;
			case 5: charClass = "Fighter";
				break;
			case 6: charClass = "Monk";
				break;
			case 7: charClass = "Paladin";
				break;
			case 8: charClass = "Ranger";
				break;
			case 9: charClass = "Rogue";
				break;
			case 10: charClass = "Sorcerer";
				break;
			case 11: charClass = "Warlock";
				break;
			case 12: charClass = "Wizard";
				break;
			default: charClass = "Null";
		}
		return charClass;
	}
	function genderGen()
	{
		var coin = rng(1,2);
		var charGender;
		switch(coin)
		{
			case 1: charGender = "Female";
				break;
			case 2: charGender = "Male";
				break;
			default: charGender = "Null";
		}
		return charGender;
	}
	function backgroundGen()
	{
		var d17 = rng(1, 17)
		var charBground;
		switch(d17)
		{
			case 1: charBground = "Acolyte";
				break;
			case 2: charBground = "Charlatan";
				break;
			case 3: charBground = "Criminal";
				break;
			case 4: charBground = "Entertainer";
				break;
			case 5: charBground = "Folk Hero";
				break;
			case 6: charBground = "Guild Artisan";
				break;
			case 7: charBground = "Hermit";
				break;
			case 8: charBground = "Noble";
				break;
			case 9: charBground = "Outlander";
				break;
			case 10: charBground = "Sage";
				break;
			case 11: charBground = "Sailor";
				break;
			case 12: charBground = "Soldier";
				break;
			case 13: charBground = "Urchin";
				break;
			case 14: charBground = "Far traveler";
				break;
			case 15: charBground = "Artisan";
				break;
			case 16: charBground = "Commoner";
				break;
			case 17: charBground = "Bounty Hunter";
				break;
			default: charBground = "Null";
		}
		return charBground;
	}
	function charGen()
	{
		var d20 = rng(1, 20);
		var characteristic;
		switch(d20)
		{
			case 1: characteristic = "Absentminded";
				break;
			case 2: characteristic = "Arrogant";
				break;
			case 3: characteristic = "Boorish";
				break;
			case 4: characteristic = "Chews something";
				break;
			case 5: characteristic = "Clumsy";
				break;
			case 6: characteristic = "Curious";
				break;
			case 7: characteristic = "Dim-witted";
				break;
			case 8: characteristic = "Fiddles and fidgets nervously";
				break;
			case 9: characteristic = "Frequently uses the wrong word";
				break;
			case 10: characteristic = "Friendly";
				break;
			case 11: characteristic = "Irritable";
				break;
			case 12: characteristic = "Prone to predictions of certain doom";
				break;
			case 13: characteristic = "Pronounced scar";
				break;
			case 14: characteristic = "Slurs words, lisps or stutters";
				break;
			case 15: characteristic = "Speaks loudly or whispers";
				break;
			case 16: characteristic = "Squints";
				break;
			case 17: characteristic = "Stares into distance";
				break;
			case 18: characteristic = "Suspicious";
				break;
			case 19: characteristic = "Uses colorful oaths and exclamations";
				break;
			case 20: characteristic = "Uses flowery speech or long words";
				break;
			default: characteristic = "Null";
		}
		return characteristic;
	}
	function idealGen()
	{
		var d20 = rng(1, 20);
		var ideal;
		switch(d20)
		{
			case 1: ideal = "Aspiration (Any)";
				break;
			case 2: ideal = "Charity (Good)";
				break;
			case 3: ideal = "Community (Lawful)";
				break;
			case 4: ideal = "Creativity (Chaotic)";
				break;
			case 5: ideal = "Discovery (Any)";
				break;
			case 6: ideal = "Fairness (Lawful)";
				break;
			case 7: ideal = "Freedom (Chaotic)";
				break;
			case 8: ideal = "Glory (Any)";
				break;
			case 9: ideal = "Greater Good (Good)";
				break;
			case 10: ideal = "Greed (Evil)";
				break;
			case 11: ideal = "Honor (Lawful)";
				break;
			case 12: ideal = "Independence (Chaotic)";
				break;
			case 13: ideal = "Knowledge (Neutral)";
				break;
			case 14: ideal = "Life (Good)";
				break;
			case 15: ideal = "Live and let live (Neutral)";
				break;
			case 16: ideal = "Might (Evil)";
				break;
			case 17: ideal = "Nation (Any)";
				break;
			case 18: ideal = "People (Neutral)";
				break;
			case 19: ideal = "Power (Evil)";
				break;
			case 20: ideal = "Redemption (Any)";
				break;
			default: ideal = "Null";
		}
		return ideal;
	}
	function bondGen(num)
	{
		var d10 = rng(1, num);
		var bond;
		switch(d10)
		{
			case 1: bond = "Personal goal or achievement";
				break;
			case 2: bond = "Family members";
				break;
			case 3: bond = "Colleagues or compatriots";
				break;
			case 4: bond = "Benefactor, patron, or employer";
				break;
			case 5: bond = "Romantic interest";
				break;
			case 6: bond = "Special place";
				break;
			case 7: bond = "Keepsake";
				break;
			case 8: bond = "Valuable possession";
				break;
			case 9: bond = "Revenge";
				break;
			case 10: bond = bondGen(9);
			bond.concat(", " + bondGen(9));
				break;
			default: bond = "Null";
		}
		return bond;
	}
	function flawGen()
	{
		var d12 = rng(1, 12);
		var flaw;
		switch(d12)
		{
			case 1: flaw = "Forbidden love or romantic susceptibility";
				break;
			case 2: flaw = "Decadence";
				break;
			case 3: flaw = "Arrogance";
				break;
			case 4: flaw = "Envy of another person's possessions or station";
				break;
			case 5: flaw = "Overpowering greed";
				break;
			case 6: flaw = "Prone to rage";
				break;
			case 7: flaw = "Powerful enemy";
				break;
			case 8: flaw = "Specific phobia";
				break;
			case 9: flaw = "Shameful or scandalous history";
				break;
			case 10: flaw = "Secret crime or misdeed";
				break;
			case 11: flaw = "Possession of forbidden lore";
				break;
			case 12: flaw = "Foolhardy bravery";
				break;
			default: flaw = "Null";
		}
		return flaw;
	}
	function firstToUpperCase(string) 
	{
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

-->