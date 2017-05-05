/**
 * Monster Class
 *
 * Description:
 *
 * CS 380
 * 5/3/17
 */

import java.util.ArrayList;

public class Monster {
    protected String name;
    protected String challenge;
    protected String size;
    protected String alignment;
    protected String type;
    protected ArrayList<String> environment = new ArrayList<>();
    protected String xp;
    protected String page;
    protected String image;

    public Monster(String name, String challenge, String size, String alignment, String type, ArrayList<String> environment, String xp, String page, String image) {
        this.name = name;
        this.challenge = challenge;
        this.size = size;
        this.alignment = alignment;
        this.type = type;
        this.environment.addAll(environment);
        this.xp = xp;
        this.page = page;
        this.image = image;
    }

    public String toString(){
        return "["+name+","+challenge+","+size+","+alignment+","+type+","+environment+","+xp+","+page+","+image+"]";
    }
}
