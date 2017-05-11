/**
 *  Dungeon Master Resource
 *
 *  Description:
 *  Randomly generates a monster encounter based on specified filters.
 *  A text document of monsters is populated into an array list
 *  of monster objects.
 *  Then a subset of monsters is made based on the filters,
 *  then a monster is randomly selected from the subset.
 *
 *  CS 380
 *  Created: 5/3/17
 */

import java.applet.Applet;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

public class DMR extends Applet{
    //DMR variables and filters
    protected int numChar = 8;
    protected String name;
    protected String challenge;
    protected String size;
    protected String alignment;
    protected String type;
    protected ArrayList<String> environment = new ArrayList<>();
    protected String xp;
    protected String page;
    protected String image;
    protected ArrayList<Monster> allMonster = new ArrayList<>();
    protected ArrayList<Monster> selected = new ArrayList<>();
    protected double TMELmin;
    protected double TMELmax;
    protected double TPEL;

    //Selected filters
    protected int players;
    protected int level;

    protected String selDifficulty;
    protected String selSize;
    protected String selAlignment;
    protected String selType;
    protected String selEnvironment;

    protected ArrayList<String> CR = new ArrayList<>();

    //Generated monster
    protected Monster generated;

    //CR to PEL conversions
    protected ArrayList<Double> playerCon = new ArrayList<>();
    protected TreeMap<Double, Double> monsterCon = new TreeMap<>();


    public static void main(String[] args){
        new DMR().run();
    }

    public void run(){
        populate();
        selectedFilters(); //get selected filters and convert difficulty to CR
        genChallenge();
        filter(); //sort monsters by creating subset
        random(); //randomly pick from the subset
        System.out.println(selected);
    }

    /**
     * Populate()
     * Description: Creates array list of monster objects from data in text file
     */
    public void populate(){

        try (Scanner s = new Scanner(new File("test.txt"))) {
            while (s.hasNextLine()) {
                String line = s.nextLine();
                Scanner s2 = new Scanner(line).useDelimiter("=");
                int count = 0; //counts number of filters read
                while (s2.hasNext() || count < numChar){
                    String filter = s2.next();

                    if(count == 0){ //name and image
                        name = filter;
                        image = name + ".jpeg";
                    }
                    if(count == 1){ //size
                        size = filter;
                    }
                    if(count == 2){ //type
                        type = filter;
                    }
                    if(count == 3){ //alignment
                        alignment = filter;
                    }
                    if(count == 4){ //Challenge Rating
                        challenge = filter;
                    }
                    if(count == 5){ //xp
                        xp = filter;
                    }
                    if(count == 6){ //page #
                        page = filter;
                    }
                    if(count == 7){ //environment (adds all to arrayList<String>)
                        Scanner s3 = new Scanner(filter).useDelimiter(",");
                        while(s3.hasNext()){
                            String env = s3.next();
                            environment.add(env);
                        }
                        s3.close();
                    }
                    count++;
                }
                allMonster.add(new Monster( name, challenge, size, alignment, type, environment, xp, page, image));
                environment.clear();
                s2.close();
            }
            s.close();
        }
        catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    /**
     * selectedFilters()
     * Description:
     */
    public void selectedFilters(){

        players = 4;
        level = 5;
        selDifficulty = "Hard";
        selSize = "Medium";
        selAlignment = "Any";
        selType = "Any";
        selEnvironment = "1";
    }

    /**
     * genChallenge()
     * Description: Generates possible CR's from player #, player level, and difficulty.
     */
    public void genChallenge(){

        //Player PEL (level, PEL)
        playerCon.add(1.0);
        playerCon.add(1.5);
        playerCon.add(2.5);
        playerCon.add(3.0);
        playerCon.add(5.0);
        playerCon.add(6.0);
        playerCon.add(7.0);
        playerCon.add(8.0);
        playerCon.add(9.0);
        playerCon.add(10.0);
        playerCon.add(11.0);
        playerCon.add(12.0);
        playerCon.add(13.0);
        playerCon.add(14.0);
        playerCon.add(16.0);
        playerCon.add(18.0);
        playerCon.add(20.0);
        playerCon.add(22.0);
        playerCon.add(24.0);
        playerCon.add(26.0);

        //Monster PEL (PEL, CR)
        monsterCon.put(.33,0.0);
        monsterCon.put(.66,1.0/8.0);
        monsterCon.put(1.0,1.0/4.0);
        monsterCon.put(1.5,1.0/2.0);
        monsterCon.put(2.0,1.0);
        monsterCon.put(4.0,2.0);
        monsterCon.put(6.0,3.0);
        monsterCon.put(8.0,4.0);
        monsterCon.put(11.0,5.0);
        monsterCon.put(13.0,6.0);
        monsterCon.put(15.0,7.0);
        monsterCon.put(18.0,8.0);
        monsterCon.put(21.0,9.0);
        monsterCon.put(24.0,10.0);
        monsterCon.put(28.0,11.0);
        monsterCon.put(32.0,12.0);
        monsterCon.put(36.0,13.0);
        monsterCon.put(40.0,14.0);
        monsterCon.put(44.0,15.0);
        monsterCon.put(48.0,16.0);
        monsterCon.put(52.0,17.0);
        monsterCon.put(56.0,18.0);
        monsterCon.put(60.0,19.0);
        monsterCon.put(64.0,20.0);
        monsterCon.put(76.0,21.0);
        monsterCon.put(88.0,22.0);
        monsterCon.put(104.0,23.0);
        monsterCon.put(120.0,24.0);
        monsterCon.put(136.0,25.0);
        monsterCon.put(152.0,26.0);
        monsterCon.put(168.0,27.0);
        monsterCon.put(184.0,28.0);
        monsterCon.put(200.0,29.0);
        monsterCon.put(216.0,30.0);

        TPEL = players*playerCon.get(level-1);

        if(selDifficulty.equals("Easy")){
            TMELmin = (.40)*TPEL;
            TMELmax = (.60)*TPEL;
        }
        else if(selDifficulty.equals("Medium")){
            TMELmin = (.60)*TPEL;
            TMELmax = (.80)*TPEL;
        }
        else if(selDifficulty.equals("Hard")){
            TMELmin = (.80)*TPEL;
            TMELmax = TPEL;
        }
        else if(selDifficulty.equals("Deadly")){
            TMELmin = TPEL;
            TMELmax = 216.0;
        }

        //make ArrayList<String> of possible CR values for monsters.
        for (Map.Entry<Double, Double> entry : monsterCon.entrySet()) {
            if(entry.getKey() >= (TMELmin) && entry.getKey() <= (TMELmax)){
                String CRrange = doubleToString(entry.getValue());
                CR.add(CRrange);
            }
        }
    }

    /**
     * filter()
     * Description: Filters monsters and creates new array of possible monsters
     */
    public void filter(){
        for(Monster x: allMonster){
            if(CR.contains(x.challenge)
                    && (x.size.equals(selSize) || selSize.equals("Any"))
                    && (x.alignment.equals(selAlignment) || selAlignment.equals("Any"))
                    && (x.type.equals(selType) || selType.equals("Any"))
                    && (x.environment.contains(selEnvironment) || selEnvironment.equals("Any"))){
                selected.add(x);
            }
        }
    }

    /**
     * random()
     * Description: randomly selects monsters from filtered monster list.
     */
    public void random(){
        if(!selected.isEmpty()){
            Random rand = new Random();
            int random = rand.nextInt(selected.size());
            generated = selected.get(random);
            System.out.println("Generated: " + generated.name);
        }
        else{
            throw new NoSuchElementException();
        }
    }

    /**
     * doubleToString()
     * Desription: converts double to String.
     * @param val
     * @return String value of val
     */
    public String doubleToString(double val){
        if(val == 0.0){
            return "0.0";
        }
        else if(val == 1.0/8.0){
            return "1/8";
        }
        else if(val == 1.0/4.0){
            return "1/4";
        }
        else if(val == 1.0/2.0){
            return "1/2";
        }
        else if(val == 1.0){
            return "1";
        }
        else if(val == 2.0){
            return "2";
        }
        else if(val == 3.0){
            return "3";
        }
        else if(val == 4.0){
            return "4";
        }
        else if(val == 5.0){
            return "5";
        }
        else if(val == 6.0){
            return "6";
        }
        else if(val == 7.0){
            return "7";
        }
        else if(val == 8.0){
            return "8";
        }
        else if(val == 9.0){
            return "9";
        }
        else if(val == 10.0){
            return "10";
        }
        else if(val == 11.0){
            return "11";
        }
        else if(val == 12.0){
            return "12";
        }
        else if(val == 13.0){
            return "13";
        }
        else if(val == 14.0){
            return "14";
        }
        else if(val == 15.0){
            return "15";
        }
        else if(val == 16.0){
            return "16";
        }
        else if(val == 17.0){
            return "17";
        }
        else if(val == 18.0){
            return "18";
        }
        else if(val == 19.0){
            return "19";
        }
        else if(val == 20.0){
            return "20";
        }
        else if(val == 21.0){
            return "21";
        }
        else if(val == 22.0){
            return "22";
        }
        else if(val == 23.0){
            return "23";
        }
        else if(val == 24.0){
            return "24";
        }
        else if(val == 25.0){
            return "25";
        }
        else if(val == 26.0){
            return "26";
        }
        else if(val == 27.0){
            return "27";
        }
        else if(val == 28.0){
            return "28";
        }
        else if(val == 29.0){
            return "29";
        }
        else if(val == 30.0){
            return "30";
        }
        return "";
    }

}
