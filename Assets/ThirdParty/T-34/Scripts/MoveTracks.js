#pragma strict

var CurrentPosition : int = 0;

var trackTextures : Texture[];

var speed : float = 10; 

var moveTick : float = 0.1;

var GearStatus : int = 0;


function Update () {

	
	switch (GearStatus) {
		case 0 : 
			// Neutral. do nothing
			break;
			
		case 1 : 
			// forward
			
			if (speed < 1)
				speed = 1;
				
			if (Time.time > moveTick) {
				CurrentPosition++;
				if (CurrentPosition >= trackTextures.Length)
				CurrentPosition = 0;
					
				GetComponent.<Renderer>().material.mainTexture = trackTextures[CurrentPosition]; 
				
				
				moveTick = Time.time + 4 / (speed * 1000 / (60 * 60) * 100);
			}
			
			break;
		
		case 2 : 
			// backward
			if (speed < 1)
				speed = 1;
			
			if (Time.time > moveTick) {
				CurrentPosition--;
				if (CurrentPosition < 0)
                CurrentPosition = trackTextures.Length - 1;
					
				GetComponent.<Renderer>().material.mainTexture = trackTextures[CurrentPosition]; 
				
				moveTick = Time.time + 4 / (speed * 1000 / (60 * 60) * 100);
			}
			
			break;
			
	}

}