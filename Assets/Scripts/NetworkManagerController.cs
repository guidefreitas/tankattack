using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Networking.Types;
using UnityEngine.Networking.Match;

public class NetworkManagerController : MonoBehaviour {

	NetworkManager netManager;
	NetworkMatch netMatch;
	void Start () {
		netManager = GetComponent<NetworkManager>();
		netMatch = gameObject.AddComponent<NetworkMatch>();
		
	}
	
	void CreateSession(){
		
	}
	// Update is called once per frame
	void Update () {
		
	}
}
