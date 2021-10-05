
async function urlToFile(url, filename = 'test.png') {
    let response = await fetch(url);
    let data = await response.blob();
    let metadata = {
        type: 'image/jpeg'
    };

    let file = new File([data], filename, metadata);
    return file
}

function toObject(array){
    let obj = {}
    array.forEach(item => {
        obj[item.id] = item 
    })
    return obj
}

function toArray(array){
    return Object.values(array)
}


const parseLabelPrice = (string) => {
    const [label, price] = string.split('-')
    return { label, price: parseFloat(price)}
}




export {
    urlToFile,
    toObject,
    toArray,
    parseLabelPrice
}