const API_URL = "http://localhost:8000/api";

/**
 * @typedef {"p1" | "p2" | "din_gata"} Channel
 */


/**
 * Fetches from the server
 * 
 * @param {Channel} channel
 */
async function fetchCurrentPlayingSong(channel) {

    const fetchUrl = `${API_URL}/channel/${channel}`;

    const response = await fetch(fetchUrl);

    const json = await response.json();

    return json;
}

async function fetchAllChannells() {

    const fetchUrl = `${API_URL}/all-channels`;

    const response = await fetch(fetchUrl);

    const json = await response.json();

    return json;
}


(async () => {
    const channel = $("#page").text().trim();
    
    const body = await fetchCurrentPlayingSong(channel);

    const { 
        success,
        data: {
            artist,
            title,
            url,
            image
        },
        message,
        httpStatusCode: {
            status
        }
    } = body

    console.log(message);

    $("#artist").text(artist);
    
    $("#title").text(title);

    const btn = $("#btn");

    const imageElementInStr = `
        <div class="logo-btn-container">
            <img class="logo-btn" src="spotify.svg">
        </div>
    `
    .trim();

    if (success) {
    
        $("#image").attr("src", image);
    
        btn.attr("href", url);

        btn.text(`Add To Spotify`).append(imageElementInStr)
    }
    else {

        if (status === "Gateway Time-out") {
            btn.removeAttr("href");

            btn.css("filter", "brightness(0.8)");
    
            btn.css("cursor", "not-allowed");
    
            btn.text(`Server is busy right now`).append(imageElementInStr);
        }
        else {
            btn.removeAttr("href");

            btn.css("filter", "brightness(0.8)");
    
            btn.css("cursor", "not-allowed");
    
            btn.text(`Song Not Found`).append(imageElementInStr)
        }
    }
})();