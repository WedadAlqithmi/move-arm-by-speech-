var speechRecognition = window.webkitSpeechRecognition;

var recognition = new speechRecognition();

recognition.lang = "ar";

var textbox = $("#textbox");

var insturctions = $("#insturctions");
// empty
var content = "";
// if the recording start then recognise the audio to convert it
recognition.continuos = true;

recognition.onstart = function () {
  insturctions.text("voice recognition is on ");
};

// if there is no speech ant more the function will stop
recognition.onspeechend = function () {
  insturctions.text("No Activity ");
};

// if an error occured an error message should appear
recognition.onerror = function () {
  insturctions.text("try again");
};

//while recording the audio
recognition.onresult = function (event) {
  var current = event.resultIndex;

  var transcript = event.results[current][0].transcript;

  if (transcript == "يمين") {
    console.log(transcript);
    send("right");
  } else if (transcript == "يسار") {
    console.log(transcript);
    send("left");
  }
  content += transcript;

  textbox.val(content);
};

//main function
$("#start-btn").click(function (event) {
  if (content.length) {
    content += "";
  }
  recognition.start();
});

let port;

document.querySelector("#connect-usb").addEventListener("click", async () => {
  // ask the user to select the port
  port = await navigator.serial.requestPort();
  // baudRate is the sspeed of data transformation
  await port.open({ baudRate: 9600 });

  //the next 3 lines is the Read function

  const textDecoder = new TextDecoderStream();
  const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
  const reader = textDecoder.readable.getReader();

  // Listen to data coming from the serial device.
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      //if the function is done
      reader.releaseLock();
      break;
    }
    // get the value, which is string
    console.log(value);
  }
});

async function send(text) {
  const textEncoder = new TextEncoderStream();
  const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
  const writer = textEncoder.writable.getWriter();
  await writer.write(text);
  writer.close();
  await writableStreamClosed;
}
