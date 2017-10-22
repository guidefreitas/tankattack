using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using System.Linq;
using System;
using System.Text;
using UnityEngine.UI;

public enum GameState{
	RUNNING = 0,
	FINISHED = 1
}
public class GameController : NetworkBehaviour {

	[SyncVar]
	public GameState GameState;

	public GameObject PanelFinished;
	public GameObject PanelRunning;

	public int MaxDeaths = 3;
	NetworkStartPosition[] SpawnPoints;
	void Start () {
		this.GameState = GameState.RUNNING;
		SpawnPoints = GameObject.FindObjectsOfType<NetworkStartPosition>();
	}
	
	public void RestartGame(){
		var players = GameObject.FindObjectsOfType<TankController>();
		foreach(var tank in players){
			tank.Life = 100;
			tank.Deaths = 0;
			var randomSpawnPoint = SpawnPoints[UnityEngine.Random.Range(0, SpawnPoints.Length)];
			tank.gameObject.transform.position = randomSpawnPoint.transform.position;
		}
		this.GameState = GameState.RUNNING;
	}

	void VerifyPlayersLife(){
		var players = GameObject.FindObjectsOfType<TankController>();
		
		foreach(var tank in players){
			if(tank.Life <= 0){
				tank.Deaths += 1;
				tank.Life = 100;
				var randomSpawnPoint = SpawnPoints[UnityEngine.Random.Range(0, SpawnPoints.Length)];
				tank.gameObject.transform.position = randomSpawnPoint.transform.position;
			}

			if(tank.Deaths >= MaxDeaths){
				this.GameState = GameState.FINISHED;
			}
		}
	}
	void Update () {
		if(isServer){
			VerifyPlayersLife();
		}

		if(this.GameState == GameState.RUNNING){
			if(this.PanelRunning != null){
				this.PanelRunning.SetActive(true);
			}

			if(this.PanelFinished != null){
				this.PanelFinished.SetActive(false);
			}

			var lifeLabel = this.PanelRunning.GetComponentInChildren<Text>();
			var players = GameObject.FindObjectsOfType<TankController>();
			foreach(var player in players){
				if(player.isLocalPlayer){
					StringBuilder label = new StringBuilder();
					label.AppendLine("Health: " + player.Life.ToString());
					label.AppendLine("Lifes: " + (this.MaxDeaths - player.Deaths));
					lifeLabel.text = label.ToString();
				}
			}			
		}else if(this.GameState == GameState.FINISHED){
			if(this.PanelRunning != null){
				this.PanelRunning.SetActive(false);
			}

			if(this.PanelFinished != null){
				this.PanelFinished.SetActive(true);
			}
		}
	}
}
