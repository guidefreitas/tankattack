#pragma strict

var LeftTrack : MoveTracks;
var RightTrack : MoveTracks;
var LeftWheel : MoveWheel;
var RightWheel : MoveWheel;

var acceleration : float = 5;

var CurrentSpeed : float = 0;
var rotationSpeed : float = 30;
var maxSpeed : float = 25;

var spawnPoint : Transform;

var myAudio : AudioClip;
var EngineRun : int = 0;

 // Tank sounds
function PlayEngineAudio () {
if (EngineRun > 0 ) 
GetComponent.<AudioSource>().enabled = true;
else
GetComponent.<AudioSource>().enabled = false;

}

function Start() {

	// Tracks and Wheels  Controls
	RightTrack = GameObject.Find(gameObject.name + "/GusenitsaR").GetComponent(MoveTracks);
	LeftTrack = GameObject.Find(gameObject.name + "/GusenitsaL").GetComponent(MoveTracks);
	LeftWheel = GameObject.Find(gameObject.name + "/KolesaL").GetComponent(MoveWheel);
	RightWheel = GameObject.Find(gameObject.name + "/KolesaR").GetComponent(MoveWheel);
	
}

 // Main function
function Update () {

PlayEngineAudio ();

	
	if (Input.GetKey (KeyCode.W)) {
		// Speed Up
			if (CurrentSpeed <= maxSpeed) 
			CurrentSpeed += acceleration * Time.deltaTime;
			
			 

	} else if (Input.GetKey (KeyCode.S)) {
		// Speed Down
			if (CurrentSpeed >= -maxSpeed) 
			CurrentSpeed -= acceleration * Time.deltaTime;
			
		
	} else {
		// No key input. 
		if (CurrentSpeed > 0) 
			CurrentSpeed -= acceleration * Time.deltaTime;
		else if (CurrentSpeed < 0) 
			CurrentSpeed += acceleration * Time.deltaTime;

	}


	// Turn off speed and sound if CurrentSpeed is too small. 
	if (Mathf.Abs(CurrentSpeed) <= 0.05)
		CurrentSpeed = 0;
		EngineRun = 0;
	

	// Move Tank by CurrentSpeed
	transform.Translate(Vector3(0, 0, CurrentSpeed * Time.deltaTime));
	
	

	// Move Tracks by CurrentSpeed	 
	if (CurrentSpeed > 0) {
		// Move forward
		LeftTrack.speed = CurrentSpeed;
		LeftTrack.GearStatus = 1;
		LeftWheel.speed = CurrentSpeed;
		LeftWheel.GearStatus = 1;
		RightTrack.speed = CurrentSpeed;
		RightTrack.GearStatus = 1;
		RightWheel.speed = CurrentSpeed;
		RightWheel.GearStatus = 1;
		EngineRun = 1;
	}
	else if (CurrentSpeed < 0)	{
		// Move Backward
		LeftTrack.speed = -CurrentSpeed;
		LeftTrack.GearStatus = 2;
		LeftWheel.speed = -CurrentSpeed;
		LeftWheel.GearStatus = 2;
		RightTrack.speed = -CurrentSpeed;
		RightTrack.GearStatus = 2;
		RightWheel.speed = -CurrentSpeed;
		RightWheel.GearStatus = 2;
		EngineRun = 1;
	}
	else {
		// No Move
		LeftTrack.GearStatus = 0;
        LeftWheel.GearStatus = 0;		
		RightTrack.GearStatus = 0;
        RightWheel.GearStatus = 0;		
	}


	// Turn Tank
	if (Input.GetKey (KeyCode.A)) {
		if (Input.GetKey(KeyCode.S)) {
			// Turn right
			transform.Rotate(Vector3(0, rotationSpeed * Time.deltaTime, 0));
			
			LeftTrack.speed = rotationSpeed;
			LeftTrack.GearStatus = 1;
			LeftWheel.speed = rotationSpeed;
			LeftWheel.GearStatus = 1;
			RightTrack.speed = rotationSpeed;
			RightTrack.GearStatus = 2;
			RightWheel.speed = rotationSpeed;
			RightWheel.GearStatus = 2;
			
			
		} else {
			// Turn left
			transform.Rotate(Vector3(0, -rotationSpeed * Time.deltaTime, 0));
			
			LeftTrack.speed = rotationSpeed;
			LeftTrack.GearStatus = 2;
			LeftWheel.speed = rotationSpeed;
			LeftWheel.GearStatus = 2;
			RightTrack.speed = rotationSpeed;
			RightTrack.GearStatus = 1;
			RightWheel.speed = rotationSpeed;
			RightWheel.GearStatus = 1;
			EngineRun = 1;
		}
	}

	if (Input.GetKey (KeyCode.D)) {
		if (Input.GetKey(KeyCode.S)) {
			// Turn left
			transform.Rotate(Vector3(0, -rotationSpeed * Time.deltaTime, 0));
			LeftTrack.speed = rotationSpeed;
			LeftTrack.GearStatus = 2;
			LeftWheel.speed = rotationSpeed;
			LeftWheel.GearStatus = 2;
			RightTrack.speed = rotationSpeed;
			RightTrack.GearStatus = 1;
			RightWheel.speed = rotationSpeed;
			RightWheel.GearStatus = 1;
			

		} else {
			// Turn right
			transform.Rotate(Vector3(0, rotationSpeed * Time.deltaTime, 0));
			LeftTrack.speed = rotationSpeed;
			LeftTrack.GearStatus = 1;
			LeftWheel.speed = rotationSpeed;
			LeftWheel.GearStatus = 1;
			RightTrack.speed = rotationSpeed;
			RightTrack.GearStatus = 2;
			RightWheel.speed = rotationSpeed;
			RightWheel.GearStatus = 2;
			EngineRun = 1;
		}
	}
	
	
	

}