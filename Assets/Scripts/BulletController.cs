using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
public class BulletController : NetworkBehaviour {

    public GameObject ExplosionPrefab;

    public void Explode(){
        var explosion = Instantiate(ExplosionPrefab, this.transform.position, Quaternion.identity);
        explosion.transform.parent = null;
        NetworkServer.Spawn(explosion);
        Destroy(explosion.gameObject, 3.0f);
    }
    [ClientRpc]
    public void RpcExplode(){
        Explode();
    }
    public void OnCollisionEnter(Collision collision)
    {
        if(!isServer)
            return;

        Debug.Log("Collision: " + collision.gameObject.tag);
        if(collision.gameObject.tag == "Player"){
            //RpcExplode();
            Explode();
            TankController tankController = collision.gameObject.GetComponent<TankController>();
            tankController.TakeHit(10);
        }
        Destroy(this.gameObject);
    }
}
