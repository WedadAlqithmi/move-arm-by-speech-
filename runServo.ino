
#include <Servo.h>

Servo servo1; /*the object of servo, this will run one servo */
Servo servo2;
Servo servo3;
Servo servo4;

double servo1_angle = 90;
double servo2_angle = 90;
double servo3_angle = 90;
double servo4_angle = 90;

     
void setup() {

   Serial.begin (9600) ; /*for bluetooth*/
   servo1.attach(3);
   servo2.attach(5);
   servo3.attach(6);
   servo4.attach(9);

   servo1.write(servo1_angle);
   servo2.write(servo2_angle);
   servo3.write(servo3_angle);
   servo4.write(servo4_angle);
   }
   
String voice ; /*defining variable to take voice commands*/

void loop() {

  if (Serial.available()){/* check if serial port is connected */ 
    voice = Serial.readStringUntil('@');/* take each text by the loop  */
    voice.trim();/*to delete any padding*/ 
    
    if (voice.length() == 0) { 
      return;
    }
    else if (voice.length() > 0) { /*if you receive any data...*/
    /*Serial.print(voice) ;*/
     if (voice == "right" || voice== "*يمين*") {
     serial.print ("arm is moving to the right side");
      
     servo1.write(servo1_angle -= 20);
     servo2.write(servo2_angle -= 20);
     servo3.write(servo3_angle -= 20);
     servo4.write(servo4_angle -= 20);
       /*for (int pos = 0; pos <= 90; pos += 1) { 
        servo3.write(pos);             
        delay(1000);                     
        }/*end for loop */
      
      }/*end of if voice = "right" */


      
     else if(voice == "left" || voice=="يسار") {
      serial.print ("arm is moving to the left side");
      servo1.write(servo1_angle += 20);
      servo2.write(servo2_angle += 20);
      servo3.write(servo3_angle += 20);
      servo4.write(servo4_angle += 20);
      
      /*for (int pos = 90; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
      servo3.write(pos);              // tell servo to go to position in variable 'pos'
      delay(15);                       // waits 15 ms for the servo to reach the position
      }/* end of for loop */
     }/*end of " else if" */
    
     /*reset the variable again*/
    
    }/* if voice is receiving */
  
  
  }/*end of if serial avalible*/
voice="" ; 
delay (50) ; /*reapet my orders*/
}
