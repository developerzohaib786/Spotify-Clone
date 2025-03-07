// array songs= nasheeds
// function getSongs = getNasheeds

let currentFolder;
async function getNasheeds(folder){
     currentFolder=folder;
    // getting songs from the url="http://127.0.0.1:3000/songs/";
    let a= await fetch(`http://127.0.0.1:3000/${folder}`);
    let response=await a.text();
    let div=document.createElement("div");
    div.innerHTML=response;
    let as=div.getElementsByTagName("a");
    // creating array to store the nasheeds href 
     nasheeds=[];
    // for loop to push the hrefs in the nasheeds array 
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            nasheeds.push(element.href.split('/').pop())
        }
    }       
    // getting the nasheeds in the playlist section 
    let songUl=document.querySelector(".songList").getElementsByTagName("ul")[0];
    songUl.innerHTML="";
    for (const nasheed of nasheeds) {
        songUl.innerHTML=songUl.innerHTML + `<li>
                <img src="images/music.svg" alt="" width="30px" height="30px">
                <div class="info">
                  <div>${nasheed.replaceAll("%20" ," ")}</div>
                  <div>Zohaib Irshad</div>
                </div>
                <img src="images/pausebtn.svg" alt="">
              </li>`
    };


    // attaching event listener to list items (nasheeds) in the playlist
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(
e=>{
    e.addEventListener("click",element=>{
        // console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playNasheed(e.querySelector(".info").firstElementChild.innerHTML.trim());
        if (play.src="/images/pause.svg") {
            currentNasheed.play();
            play.src="/images/pausebtn.svg";
            
        }
    })
})
}

// function to display cards
async function displayAlbums() {
    console.log("displaying albums")
    let a = await fetch(`/songs/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardcontainer = document.querySelector(".cardcontainer")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index]; 
        if (e.href.includes("/songs") && !e.href.includes(".htaccess")) {
            let folder = e.href.split("/").slice(-2)[0]
            // Get the metadata of the folder
            let a = await fetch(`/songs/${folder}/info.json`)
            let response = await a.json(); 
            cardcontainer.innerHTML = cardcontainer.innerHTML + ` <div data-folder="${folder}" class="card">
            <div class="play">
               <svg class="playbtn" height="64px" width="64px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-51.2 -51.2 614.40 614.40" xml:space="preserve" fill="#084308"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle style="fill:<svg viewBox=" 0="" 32="" 32"="" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32"><path d="M16 0C7.164 0 0 7.164 0 16s7.164 16 16 16 16-7.164 16-16S24.836 0 16 0zm-6 24V8l16.008 8L10 24z" fill="#4a90e2" class="fill-4e4e50"></path>;" cx="256" cy="256" r="245.801"&gt;</circle> <polygon style="fill:#3f91ee;" points="195.825,391.629 376.351,256 195.825,120.371 "></polygon> <g> <path style="fill:#3f91ee;" d="M256,512c-68.381,0-132.667-26.628-181.019-74.98C26.628,388.667,0,324.38,0,256 S26.628,123.333,74.981,74.98C123.333,26.628,187.619,0,256,0s132.667,26.628,181.019,74.98C485.372,123.333,512,187.62,512,256 s-26.628,132.667-74.981,181.02C388.667,485.372,324.381,512,256,512z M256,20.398C126.089,20.398,20.398,126.089,20.398,256 S126.089,491.602,256,491.602S491.602,385.911,491.602,256S385.911,20.398,256,20.398z"></path> <path style="fill:#3f91ee;" d="M195.824,401.828c-1.553,0-3.115-0.355-4.557-1.075c-3.458-1.727-5.641-5.26-5.641-9.124V120.371 c0-3.864,2.185-7.397,5.641-9.124c3.458-1.726,7.593-1.351,10.685,0.97l180.526,135.629c2.564,1.927,4.073,4.948,4.073,8.154 s-1.508,6.228-4.073,8.154L201.951,399.783C200.15,401.137,197.994,401.828,195.824,401.828z M206.024,140.791v230.418L359.371,256 L206.024,140.791z"></path> <path style="fill:#3f91ee;" d="M256,473.243c-5.632,0-10.199-4.566-10.199-10.199c0-5.633,4.567-10.199,10.199-10.199 c52.815,0,102.404-20.633,139.633-58.1c3.973-3.996,10.429-4.015,14.425-0.045c3.995,3.971,4.016,10.428,0.046,14.424 C369.016,450.471,314.287,473.243,256,473.243z"></path> <path style="fill:#3f91ee;" d="M430.396,377.825c-1.886,0-3.793-0.522-5.498-1.617c-4.741-3.041-6.118-9.351-3.076-14.092 c1.514-2.36,2.998-4.788,4.411-7.216c2.834-4.867,9.077-6.516,13.945-3.684c4.868,2.833,6.518,9.077,3.684,13.945 c-1.56,2.681-3.201,5.363-4.873,7.97C437.043,376.168,433.754,377.825,430.396,377.825z"></path> </g> </g></svg>              
            </div>

            <img src="/songs/${folder}/cover.jpg" alt="">
            <h2>${response.title}</h2>
            <p>${response.description}</p>
        </div>`
        }
    }

    // Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => { 
        e.addEventListener("click", async item => {
            console.log("Fetching Songs")
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)  
            playMusic(songs[0])

        })
    })
}
// variable to be used in playNasheed function and working of this variable is to play the current nasheed/naat
let currentNasheed=new Audio;
// function to play the nasheed in the playlist
const playNasheed=(naat, pause=false)=>{
    currentNasheed.src=`${currentFolder}/` + naat;
    currentNasheed.play();
    if(!pause){
        currentNasheed.play();
        play.src="/images/pause.svg";
        play.width=30;
        play.width=30;
    }
    
            document.querySelector(".songinfo").innerHTML=decodeURI(naat);
            document.querySelector(".songtime").innerHTML="00:00 / 00:00";
}

//  seconds to minutes:seconds convertor function 
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60); 
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
let nasheeds;
async function main() {

    // creating variable to store getNasheeds() function
     await getNasheeds("songs/Nasheeds");
    playNasheed(nasheeds[0], true)

    // displaying albums dynamically
    await displayAlbums();  
    
    // attaching click event listener to the play button 
    play.addEventListener("click", ()=>{
        if (currentNasheed.paused) {
            currentNasheed.play();
            play.src="/images/pausebtn.svg";
            
        } else {
            currentNasheed.pause();
            play.src="/images/pause.svg";
            play.width=30;
            play.width=30;
        }
    })
    // attaching event listener to the for the timeupate
    currentNasheed.addEventListener("timeupdate",()=>{
        // console.log(currentNasheed.currentTime, currentNasheed.duration)
        document.querySelector(".songtime").innerHTML=`${formatTime(currentNasheed.currentTime)} / ${formatTime(currentNasheed.duration)}`;
        document.querySelector(".circle").style.left=(currentNasheed.currentTime/currentNasheed.duration)*100 + "%";
    })
    // attaching event listener to the seekbar
    document.querySelector(".seekbar").addEventListener("click",(e)=>{
        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left=percent + "%";
        currentNasheed.currentTime=((currentNasheed.duration)*percent)/100;
        console.log(e);
    })
    // attaching event listener to hamburger 
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left='0';
    })
    // attaching event listener to close
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left='-100%';
    })
    // attaching event listener to the next button in audioplayer
    next.addEventListener("click",()=>{
        let index=nasheeds.indexOf(currentNasheed.src.split("/").slice(-1)[0]);
        if((index+1)<((nasheeds.length))){
            playNasheed(nasheeds[index+1]);
        }else{
            playNasheed(nasheeds[0]);
        }
    })
    // attaching event listener to the previous button in audioplayer
    previous.addEventListener("click",()=>{
        let index=nasheeds.indexOf(currentNasheed.src.split("/").slice(-1)[0]);
        if((index-1)>0){
            playNasheed(nasheeds[index-1]);
        }else{
            playNasheed(nasheeds[(nasheeds.length)-1]);
        }
    })

    // attaching event listener to range input
    document.querySelector(".volume").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
        console.log(e.target.value);
        currentNasheed.volume=e.target.value/100;
    })
    Array.from(document.getElementsByClassName("card")).forEach(e=>{
        e.addEventListener("click",async item=>{
            nasheeds=await getNasheeds(`songs/${item.currentTarget.dataset.folder}`);
        })
    })
}
              
main();
