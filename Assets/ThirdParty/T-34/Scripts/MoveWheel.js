#pragma strict

var CurrentPosition : int = 0;

var wheelTextures : Texture[];

var speed : float = 10; //  km/h

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
				if (CurrentPosition >= wheelTextures.Length)
				CurrentPosition = 0;
					
				GetComponent.<Renderer>().material.mainTexture = wheelTextures[CurrentPosition]; 
				
				
				moveTick = Time.time + 4 / (speed * 500 / (60 * 60) * 100);
			}
			
			break;
		
		case 2 : 
			// backward
			if (speed < 1)
				speed = 1;
			
			if (Time.time > moveTick) {
				CurrentPosition--;
				if (CurrentPosition < 0)
                CurrentPosition = wheelTextures.Length - 1;
					
				GetComponent.<Renderer>().material.mainTexture = wheelTextures[CurrentPosition]; 
				
				moveTick = Time.time + 4 / (speed * 500 / (60 * 60) * 100);
			}
			
			break;
			
	}

}