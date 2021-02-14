const API_URL = "http://localhost:8000/api";

setSelectorContent();

async function setSelectorContent() {

    const response = await fetch(`${API_URL}/all-channels`);

    const { data: channels } = await response.json();

    const selector = document.getElementById("radio");

    selector.addEventListener("change", onSelectorChange);

    for (const channel of channels) {

        const option = document.createElement("option");

        option.innerHTML = channel;

        option.setAttribute("value", channel);

        selector.appendChild(option)
    }

    await setContent(channels[0]);
}

async function onSelectorChange(event) {
    console.log(event);
    const channelName = event.target.value;
    
    await setContent(channelName);
}

async function setContent(channelName) {
    
    const response = await fetch(`${API_URL}/channel/${channelName}`);
    
    const { 
        success,
        message,
        data,
    } = await response.json();;

    const errorTitle = document.getElementById("errortitle");

    if (!success) {
        
        errorTitle.innerHTML = message;

        errorTitle.style.display = "block";

        setTemplate({
            title: "",
            artist: "",
            imageUrl: "album.png",
            songUrl:"",
            channelName
        });
    }

    if (success) {
        
        errorTitle.style.display = "none";

        const {
            title,
            artist,
            url,
            image
        } = data;

        setTemplate({
            title,
            artist,
            songUrl: url,
            imageUrl: image,
            channelName
        });
    }
}

function setTemplate({ 
    title,
    artist,
    songUrl,
    imageUrl,
    channelName
}) {

    const artistElement = document.getElementById("artist");

    const titleElement = document.getElementById("title");

    const channelNameElement = document.getElementById("channelname");

    const imageElement = document.getElementById("image");

    const btnElement = document.getElementById("btn");

    artistElement.innerHTML = artist;

    titleElement.innerHTML = title;

    channelNameElement.innerHTML = channelName;

    imageElement.setAttribute("src", imageUrl);

    btnElement.setAttribute("href", songUrl);
}