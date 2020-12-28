var music_object;

var navigation_visible = false;

var mobile_display = false;

var active_release;

if (screen.width<768){
	mobile_display =true;
}


var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
	var myObj = JSON.parse(this.responseText);
	music_object = myObj;
	var releases = myObj.releases;
	var base_path = "assets/audio/"
	for (x in releases){
		var release = releases[x];
		var release_path = base_path + release.path + "/";

		console.log(releases[x]);
		var release_id = "release-" + (parseInt(x)+1).toString();
		var release_el = document.getElementById(release_id);
		var player_el = release_el.getElementsByClassName("back")[0];
		//insert heading with album name
		player_el.innerHTML = release.name + " - " +  release.year +  "<br><br>";
		
		var tracks = release.tracks;

		for (t in tracks){
			var track = tracks[t];
			var track_path = release_path + track.filename;
			
			//release:track
			var indeces = x.toString() + ":" + t.toString();
			
			//insert track link
			var track_link = document.createElement('div');
			track_link.setAttribute("class", "button")
			track_link.setAttribute("track_path", track_path);
			track_link.setAttribute("id", indeces);
			//pass onclick function the element object
			track_link.setAttribute("onClick","playTrack(this)");
			var track_text = document.createElement('div');
			track_text.innerHTML = track.title;
			track_link.appendChild(track_text);
			player_el.appendChild(track_link);
			////player_el.appendChild(player);
		}
	}
  }
};
xmlhttp.open("GET", "music.json", true);
xmlhttp.send();

function playTrack(el){

	if (!navigation_visible){
		navigation_visible=true;
		var navigation = document.getElementById("track-navigation");
		navigation.style.visibility='visible';
	}
	var releases = music_object.releases;

	var track_info = el.getAttribute('id').split(":");

	release_index = parseInt(track_info[0])
	track_index = parseInt(track_info[1])	
	
	var release = releases[release_index];
	console.log(release);
	var track = release.tracks[track_index];

	//update player current Song and Album
	var song_name = track.title;
	
	var album_name = release.name;
	
	var player_track = document.getElementById('player-track');
	var player_release = document.getElementById('player-release');
	
	player_track.innerHTML = "Song: " + song_name;
	player_release.innerHTML = "Album: " + album_name;

	//update other player attributes including prev and next
		//embed track info into song and album
	player_track.setAttribute("index",track_index);
	player_release.setAttribute("index",release_index);
		//embed release length into album
	player_release.setAttribute("length", release.tracks.length)
	
	//generate file path
	
	var track_path = el.getAttribute('track_path');
	var audio = document.getElementById("audio");
	audio.setAttribute("src",track_path);
	
	//play
	audio.play();
}

function nextTrack(){
	//determine and call playTrack()
		//get information on current track/release
	var player_release = document.getElementById('player-release');
	var player_track = document.getElementById('player-track');
	var release_length = parseInt(player_release.getAttribute('length'));
	var release_index = parseInt(player_release.getAttribute('index'))
	var track_index = 	parseInt(player_track.getAttribute('index'))
	var num_releases = music_object.releases.length;
	
		//determine information of next track
	next_track_index = 0;
	next_release_index = 0;
	if(track_index + 1 < release_length){
		next_track_index = track_index +1;
		next_release_index = release_index;
	}else if(release_index+1 < num_releases){
		next_release_index = release_index + 1;
	}
	
	next_indeces = next_release_index.toString() + ":" + next_track_index.toString();
	console.log(next_indeces);
	next_el = document.getElementById(next_indeces);
	playTrack(next_el);	
	
}

function prevTrack(){
	//determine and call playTrack()
	var player_release = document.getElementById('player-release');
	var player_track = document.getElementById('player-track');
	var release_index = parseInt(player_release.getAttribute('index'))
	var track_index = 	parseInt(player_track.getAttribute('index'))
	var num_releases = music_object.releases.length;
	
	
	var prev_track_index;
	var prev_release_index = num_releases - 1;
	if(track_index ==0){
		if (release_index > 0){
			prev_release_index = release_index -1;
		}
		var release_length = music_object.releases[prev_release_index].tracks.length;
		console.log("PRI " + prev_release_index);
		console.log(release_length)
		prev_track_index = release_length-1;
	}else{
		prev_track_index = track_index-1;
		prev_release_index = release_index;
	}
	
	prev_indeces = prev_release_index.toString() + ":" + prev_track_index.toString();
	console.log(prev_indeces);
	prev_el = document.getElementById(prev_indeces);
	playTrack(prev_el);
}

function pauseAnim(){
	var releases = document.getElementsByClassName("release");
	
	for (r in releases){
		var release = releases[r];
		release.style.animationPlayState='paused';
	}
}

function playAnim(){
	var releases = document.getElementsByClassName("release");
	
	for (r in releases){
		var release = releases[r];
		release.style.animationPlayState='running';
	}
}

function clicked(el){
	if(mobile_display){
		children = el.children;
		children[0].style.transform = "rotateY(180deg)";

		//switch active element so only one may be rotated at any moment
		if(active_release != null){
			inactive_el = document.getElementById(active_release);
			inactive_el.children[0].style.transform = "rotateY(0deg);";
			inactive_el.children[0].setAttribute('style', "transform:rotateY(0deg);");
			console.log(inactive_el.children[0].style.transform);
		}
		//update active element
		active_release = el.id;
	}
}