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

/* As the drum-pad id is not known when I need to append the audio element, I can cannot append the audio element to the drum-pad element and then append this one to the drumpad-set element. 
==> I have to append the drum-pad element first and then I will append the audio element. */
const generatePads = () => {
   for (var i=0; i<soundsBank.length; i++) {
     // Create the element node
     var newPad = document.createElement('div');
     // Set the innertext
  newPad.textContent=soundsBank[i].keyTrigger;
     // Set the attributes
     newPad.id=soundsBank[i].id;
     newPad.setAttribute("class", "drum-pad");
     newPad.setAttribute("keyCode", soundsBank[i].keyCode);
     newPad.setAttribute("keyTrigger", soundsBank[i].keyTrigger)
     newPad.setAttribute("role", "button")
     // Append the newPAd element to the drumpad-set element.
     document.getElementById('drumpad-set').appendChild(newPad)
        
     // Create the audio element node
    var newAudio = document.createElement('audio');
     // set the attributes to the audio element
     newAudio.id= soundsBank[i].keyTrigger;
     newAudio.setAttribute("class", "clip");
     newAudio.setAttribute("src", soundsBank[i].url);
     
     // Append the newAudio element to the newPad
     document.getElementById('drumpad-set').lastChild.appendChild(newAudio); 
   }
}


const updateDisplay = (text, time) => { document.getElementById('display').textContent=text.replace(/-/g, ' ');
       setTimeout(() => clearDisplay(), time);
}


const clearDisplay = () => {
    document.getElementById('display').textContent = String.fromCharCode(160)
}



  /* handle Keydown */
const handleKeydown = () => {
    document.addEventListener('keydown', function (e) {
   for (var i= 0; i<soundsBank.length; i++) {
     if (e.keyCode == soundsBank[i].keyCode) {
       // style
         const element = document.getElementById(soundsBank[i].id);
       element.classList.add('active');
       setTimeout(() => element.classList.remove('active'), 800);
       
       // audio
       var audioId = soundsBank[i].keyTrigger;
       var title = soundsBank[i].id;
       const sound = document.getElementById(audioId);
       sound.play();
       sound.currentTime=0;
       
       // display
      updateDisplay(title, 1300); 
     }
   }
 });
}


/* handle cLick */
const handleClick = () => {
  document.addEventListener('click', function (e) {
    
    for(var i=0; i<soundsBank.length; i++) {
      /*only the id can be caught (all the other attributes are undefined...)*/
      if(e.target.id === soundsBank[i].id ) {

        const element = document.getElementById(soundsBank[i].id);
        element.classList.add('active');
        setTimeout(() => element.classList.remove('active'), 800);

        // audio
        var audioId = soundsBank[i].keyTrigger;
        var title = soundsBank[i].id;
        const sound = document.getElementById(audioId);
        sound.play();
        sound.currentTime=0;

        // display
        updateDisplay(title, 1300);
      }
    }
 });
}
 


/* Handle volume */
const handleVolume = () => {
 const volumeSlider = document.getElementById('volume'); 
 
 volumeSlider.addEventListener("mousemove", (e) => {
   //display
   var volumeValue = Math.round(e.target.value*100);
   
   updateDisplay("Volume : " + volumeValue, 800);
   
   // set all the sounds volume
   const clips = [].slice.call(document.getElementsByClassName('clip'));
    clips.forEach(sound => {
        sound.volume = e.target.value;
    });
  });
}

window.addEventListener("load",()=> {
  generatePads();
  handleKeydown();
  handleClick(); 
  handleVolume();
});