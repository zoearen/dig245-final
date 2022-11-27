import org.jsoup.*;
import org.jsoup.nodes.*;
import org.jsoup.select.*;

public class Getdata {
  public Getdata() {
    try {
         String url = "http://stackoverflow.com/questions/20597755/get-text-from-url";
         Document doc = Jsoup.connect(url).get();
         Elements element = doc.select("p");

         for (Element t : element) {
           System.out.println(t.text());
         }

       } catch (Exception ex) {
         System.err.println(ex);

    }
}

public static void main(String[] args) {
  new Getdata();

}
 } 
