const API_URL = "http://localhost:8000/api";

/**
 * @typedef {"p1" | "p2" | "din_gata"} Channel
 */


/**
 * Fetches from the server
 * 
 * @param {Channel} channel
 */
async function fetchChannel(channel) {

    const fetchUrl = `${API_URL}/channel/${channel}`;

    const response = await fetch(fetchUrl);

    const data = await response.json();

    return data;
}


(async () => {
    const channel = $("#page").text().trim();
    
    const body = await fetchChannel(channel);

    const { 
        success,
        data: {
            artist,
            title,
            url,
            image
        },
        message
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

        btn.removeAttr("href");

        btn.css("filter", "brightness(0.8)");

        btn.css("cursor", "not-allowed");

        btn.text(`Song Not Found`).append(imageElementInStr)
    }
})();