#pragma strict

var MoveSpeed : float = 15;
var CurrentRotation : float = 0;


function Update () {

	// Gun Down
	if(Input.GetKey(KeyCode.Z)) {
		if(CurrentRotation > -5) {
			transform.Rotate(Vector3(MoveSpeed * Time.deltaTime, 0, 0));
			CurrentRotation -= MoveSpeed * Time.deltaTime;
		}
	}


	// Gun Up
	if(Input.GetKey(KeyCode.X)) {
		if(CurrentRotation < 25) {
			transform.Rotate(Vector3(-MoveSpeed * Time.deltaTime, 0, 0));
			CurrentRotation += MoveSpeed * Time.deltaTime;
		}
	}
}