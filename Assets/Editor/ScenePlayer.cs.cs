using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using UnityEditor.SceneManagement;

public class ScenePlayer : MonoBehaviour {

	[MenuItem("Edit/Play-Stop, But From Prelaunch Scene %0")]
 	public static void PlayFromPrelaunchScene()
     {
      	if ( EditorApplication.isPlaying == true )
        {
         	EditorApplication.isPlaying = false;
         	return;
        }
     
		EditorSceneManager.SaveCurrentModifiedScenesIfUserWantsTo();
		EditorSceneManager.OpenScene("Assets/Scenes/Menu.unity");
		EditorApplication.isPlaying = true;
     }
}
