#pragma strict

var RotationSpeed : float = 30;

function Update () {

	// Turn Right
	if (Input.GetKey (KeyCode.E)) 
		transform.Rotate(Vector3(0, 0, RotationSpeed * Time.deltaTime));

	// Turn Left
	if (Input.GetKey (KeyCode.Q)) 
		transform.Rotate(Vector3(0, 0, -RotationSpeed * Time.deltaTime));
		
}