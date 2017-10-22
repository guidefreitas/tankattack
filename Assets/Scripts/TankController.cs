using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class TankController : NetworkBehaviour {

    [SyncVar]
    public int Life = 100;

    [SyncVar]
    public int Deaths = 0;
    public Transform Top;
    public Transform Cannon;
    public Transform CannonSpawnPoint;
    public GameObject BulletPrefab;

    public Camera PlayerCamera;
    public float ForwardSpeed = 40;
    public float BackwardSpeed = 20;
    public float RotationSpeed = 2;

    public float BulletSpeed = 300;

    Rigidbody tankRigidBody;

    void Start(){
        this.tankRigidBody = GetComponent<Rigidbody>();
        setMainCamera();
    }

    public override void OnStartLocalPlayer()
    {
        //setMainCamera();
    }
    void setMainCamera(){
        //Set Main Camera
        if(isLocalPlayer){
            var mainCamera = Camera.main;
            if(mainCamera != null){
                mainCamera.gameObject.SetActive(false);
            }
            this.PlayerCamera.gameObject.SetActive(true);
        }
    }

    public void TakeHit(int amount){
        this.Life -= amount;
    }
	void Update () {
        if(!isLocalPlayer)
            return;

        if (Input.GetKey(KeyCode.W)){
            this.tankRigidBody.AddRelativeForce(Vector3.forward * ForwardSpeed * Time.deltaTime, ForceMode.Force );
        }

        if(Input.GetKey(KeyCode.S)){
            this.tankRigidBody.AddRelativeForce(Vector3.back * BackwardSpeed * Time.deltaTime, ForceMode.Force);
        }

        if(Input.GetKey(KeyCode.A)){
            this.tankRigidBody.transform.Rotate(Vector3.down, RotationSpeed * Time.deltaTime);
        }

        if (Input.GetKey(KeyCode.D))
        {
            this.tankRigidBody.transform.Rotate(Vector3.up, RotationSpeed * Time.deltaTime);
        }

        if(Input.GetKeyDown(KeyCode.Space)){
            CmdFire();
        }
	}

    [Command]
    private void CmdFire(){
        var bullet = Instantiate(BulletPrefab, CannonSpawnPoint.position, CannonSpawnPoint.rotation);
        bullet.transform.parent = null;
        bullet.GetComponent<Rigidbody>().velocity = CannonSpawnPoint.transform.forward * BulletSpeed;        
        NetworkServer.Spawn(bullet);
        Destroy(bullet, 2.0f);
    }
}
