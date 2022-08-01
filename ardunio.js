let port; 
let writer; 

document.querySelector('button').addEventListener('click', async () => {
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



	//send text to the serial device 
	const textEncoder = new TextEncoderStream();
	const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

	const writer = textEncoder.writable.getWriter();


	await writer.write(value);

	writer.close();
	await writableStreamClosed;


	// voice recoginiztion start 


	

  })

