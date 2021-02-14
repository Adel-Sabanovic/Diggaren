const API_URL = "http://localhost:8000/api";


setInterval(updateContent, 40000);

setSelectorContent();

async function updateContent() {

    const selector = document.getElementById("radio");

    const channel = selector.value;

    await setContent(channel);
}

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
    }

    if (success) {
        
        errorTitle.style.display = "hide";

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

    channelName = channelName.replace(/_/g, " ");

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