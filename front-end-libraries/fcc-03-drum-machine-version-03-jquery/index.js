const projectName = "drum-machine";

const soundsBank = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
 {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
   {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

const generatePads = () => {
   for (var i=0; i<soundsBank.length; i++) {
     // Create the element node
     var $newPad = $('<div></div>');
	  let targeted = soundsBank[i];
     // Set the innertext
  	  $newPad.text(targeted.keyTrigger);
     // Set the attributes
     $newPad.attr('id',targeted.id);
     $newPad.addClass("drum-pad");
     $newPad.attr("keyCode", targeted.keyCode);
     $newPad.attr("keyTrigger", targeted.keyTrigger);
		$newPad.attr("role", "button");
     // Append the newPAd element to the drumpad-set element.
     $newPad.appendTo('#drumpad-set');
        
     // Create the audio element node
    	var $newAudio = $('<audio />');
     // set the attributes to the audio element
     $newAudio.attr("id", targeted.keyTrigger);
     $newAudio.addClass("clip");
     $newAudio.attr("src", targeted.url);
     
     // Append the newAudio element to the newPad
     $newAudio.appendTo('.drum-pad:last'); 
   }
}

const clearDisplay = () => {
$('#display').text(String.fromCharCode(160));
}

const updateDisplay = (text) => {
$('#display').text(text.replace(/-/g, ' '));
	setTimeout(() => clearDisplay(), 1300)
}


const handleKeydown = () => {
  document.addEventListener('keydown', (e) => { 
   for (var i= 0; i<soundsBank.length; i++) {
     if (e.keyCode == soundsBank[i].keyCode) {
		  let targeted = soundsBank[i];
       // style
       const element = document.getElementById(soundsBank[i].id);
       element.classList.add('active');
       setTimeout(() => element.classList.remove('active'), 800);
       
       // audio
       var audioId = targeted.keyTrigger;
       const sound = document.getElementById(audioId);
       sound.play();
       sound.currentTime=0;
       
       // display
		 updateDisplay(targeted.id);
     }
   }
 });
}

const handleClick = () => {
  $('.drum-pad').on('click', (e) => {
	  
	 for(var i=0; i<soundsBank.length; i++) {
      /*only the id can be caught (all the other attributes are undefined...)*/
      if(e.target.id === soundsBank[i].id ) {
		  let targeted = soundsBank[i];
			var element = document.getElementById(targeted.id);
			element.classList.add("active");
			setTimeout(() => element.classList.remove('active'), 800);
        // audio
        var audioId = targeted.keyTrigger;
        const sound = document.getElementById(audioId);
        sound.play();
        sound.currentTime=0;

        // display
        updateDisplay(targeted.id);
      }
    }
 });
}


const handleVolume = () => {
	 $('#volume').on("mousemove", (e) => {
		//display
		var volumeValue = Math.round(e.target.value*100);
		updateDisplay("Volume : " + volumeValue)
		// set all the sounds volume
		const clips = [].slice.call($('.clip'));
		 clips.forEach(sound => {
			  sound.volume = e.target.value;
		 });
	  });
}    



$('document').ready(function(){
	// call the functions
	generatePads();
	handleClick();
	handleKeydown();
	handleVolume();
});

