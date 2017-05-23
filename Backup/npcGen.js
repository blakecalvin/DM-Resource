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
function rng(min, max)
{
    return Math.floor((Math.random() * max) + min);
}
function charGen(r, c, g, b)
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

    //calls function that randomly generates a name
    charName = nameGen();
    //if race has not been designated, call function that generates one randomly, otherwise use designated class
    if(r = "Any")
        race = raceGen();
    else
        race = r;
    //if class has not been designated, call function that generates one randomly, otherwise use designated class
    if(c = "Any")
        charClass = classGen();
    else
        charClass = c;
    //if gender has not been designated, call function that generates one randomly, otherwise use designated gender
    if(g = "Any")
        gender = genderGen();
    else
        gender = g;
    //if background has not been designated, call function that generates one randomly, otherwise use designated background
    if(b = "Any")
        bGround = backgroundGen();
    else
        bGround = b;
    //calls function that generates random characteristic
    characteristic = charGen();
    //calls function that generates random ideal
    ideal = idealGen(10)
    //calls function that generates random bond
    bond = bondGen();
    //calls function that generates random flaw
    flaw = flawGen();

    //creat the NPC object
    var nonPlayerCharacter = new NPC(charName, race, charClass, gender, bGround, characteristic, ideal, bond, flaw);
}
function nameGen()
{
    var charName;
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
        case 1: charName.concat("bar");
            break;
        case 2: charName.concat("ched");
            break;
        case 3: charName.concat("dell");
            break;
        case 4: charName.concat("far");
            break;
        case 5: charName.concat("gran");
            break;
        case 6: charName.concat("hal");
            break;
        case 7: charName.concat("jen");
            break;
        case 8: charName.concat("kel");
            break;
        case 9: charName.concat("lim");
            break;
        case 10: charName.concat("mor");
            break;
        case 11: charName.concat("net");
            break;
        case 12: charName.concat("penn");
            break;
        case 13: charName.concat("quil");
            break;
        case 14: charName.concat("rond");
            break;
        case 15: charName.concat("sark");
            break;
        case 16: charName.concat("shen");
            break;
        case 17: charName.concat("tur");
            break;
        case 18: charName.concat("vash");
            break;
        case 19: charName.concat("yor");
            break;
        case 20: charName.concat("zen");
            break;
        default:
            break;
    }
    d20 = rng(1, 20);
    switch(d20)
    {
        case 1:
            break;
        case 2: charName.concat("a");
            break;
        case 3: charName.concat("ac");
            break;
        case 4: charName.concat("ai");
            break;
        case 5: charName.concat("al");
            break;
        case 6: charName.concat("am");
            break;
        case 7: charName.concat("an");
            break;
        case 8: charName.concat("ar");
            break;
        case 9: charName.concat("ea");
            break;
        case 10: charName.concat("el");
            break;
        case 11: charName.concat("er");
            break;
        case 12: charName.concat("ess");
            break;
        case 13: charName.concat("ett");
            break;
        case 14: charName.concat("ic");
            break;
        case 15: charName.concat("id");
            break;
        case 16: charName.concat("il");
            break;
        case 17: charName.concat("in");
            break;
        case 18: charName.concat("is");
            break;
        case 19: charName.concat("or");
            break;
        case 20: charName.concat("us");
            break;
        default:
    }
    return charName();
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
        case 16: charBground = "Commonder";
            break;
        case 17: charBground = "Bounty Hunter";
            break;
        default: charBground = "Null";
    }
    return charBground();
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
function bondGen()
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

