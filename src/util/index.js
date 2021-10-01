
async function urlToFile(url, filename = 'test.png') {
    let response = await fetch(url);
    let data = await response.blob();
    let metadata = {
        type: 'image/jpeg'
    };

    let file = new File([data], filename, metadata);

    return file
}



export {
    urlToFile
}