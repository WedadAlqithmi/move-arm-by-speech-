# move-arm-by-speech-

for this task we need to move arm by the  voice commands

to accomplish this task 

you need to do the following: 
- arduino code to turn on the servo motor 
- web page to convert audio into text and then send that text to the serial monitor 


to know more keep up with me


## Robot wire connection 
for the robot wire connection you can check this repository https://github.com/WedadAlqithmi/TurnOnTheServoMotorWithRobotArm

## arduino code 

- include the servo library
- create 4 objects of the Servo class
- insert an intial angle value for the servos

```

#include <Servo.h>

Servo servo1; /*the object of servo, this will run one servo */
Servo servo2;
Servo servo3;
Servo servo4;

double servo1_angle = 90;
double servo2_angle = 90;
double servo3_angle = 90;
double servo4_angle = 90;

```
#### for the setup() function 
- connect the serial 
- connect the servo signal wire to the ports in the UNO Arduino 
- wite the servo angle to make all the arms angles in 90 degree 

```  
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
 ```
- declare a varaible to set the text from the serial into it , I decalred voice as a string 
- now make a loop function 
- in the loop function check if the serial is connectes or not
- take the string from the serial to the 'voice' variable I already declared above 
- now make an if-statement to check if there is a voice or not 
- if there is a voice, then check the word 
- if the word was "left" or "يسار" then move the arm by the degree 
- else if the word was "right" or "يمين" then move the arm by the degree
 
 
 ```  
String voice ; /*defining variable to take voice commands*/

void loop() {

  if (Serial.available()){/* check if serial port is connected */ 
    voice = Serial.readStringUntil('@');/* take each text by the loop  */
    voice.trim();/*to delete any padding*/ 
    
    if (voice.length() == 0) { 
      return;
    }
    else if (voice.length() > 0) { /*if you receive any data...*/
    Serial.println (voice) ;
     if (voice == "right" || voice== "يمين") {
     servo1.write(servo1_angle -= 40);
     servo2.write(servo2_angle -= 40);
     servo3.write(servo3_angle -= 40);
     servo4.write(servo4_angle -= 40);
      }/*end of if voice = "right" */


      
     else if(voice == "left" || voice=="يسار") {
      servo1.write(servo1_angle += 40);
       servo2.write(servo2_angle += 40);
      servo3.write(servo3_angle += 40);
      servo4.write(servo4_angle += 40);
      
     }/*end of " else if" */
   
    
    }/* if voice is receiving */
  
  
  }/*end of if serial avalible*/
voice="" ; 
delay (50) ; /*reapet my orders*/
}
```


### web page 

build a web page with two buttons 
the first button will start the voice recognition 
you can see more about this function in this link 
https://github.com/WedadAlqithmi/convert_audio_into_text



the second button is responsable of connecting the serial port 
you can know more about web serial API in this link 
https://web.dev/serial/

and check the files above to see the code 


At the end this is the result 

- serial port connection 
![Screenshot (698)](https://user-images.githubusercontent.com/108210044/182203759-1fc919fa-24c3-4d0f-b7c7-f6409ab51284.png)


