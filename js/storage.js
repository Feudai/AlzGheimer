
function getDatas(key){
    return JSON.parse(localStorage.getItem(key)) || [];

}


function setData(key,data,newUserEntry){
    let oldData = getDatas(key);

    if(newUserEntry){
oldData[0].grille = data;
    }

   else if(data !=null)
    oldData.push(data);

    localStorage.setItem(key,JSON.stringify(oldData));

return oldData;
}

function removeData(key){
    const dataToErase = getDatas(key);
    localStorage.setItem(key, JSON.stringify(''));
    return dataToErase;
}

// function checkImageExists(imagePath) {
//   return new Promise((resolve) => {
//     //atente de résultat si l'image est présente
//     const img = new Image();

//     img.onload = function () {
//       //réussite de loading
//       resolve(true);
//     };

//     img.onerror = function () {
//       //echec loading
//       resolve(false);
//     };

//     img.src = imagePath;
//   });
// }

// const checkAllImages = async (path) => {
//   for (let a = 1; a < maxCases; a++) {
//     let src = path + a + ".jpg";
//     try {
//       const isReal = await checkImageExists(src);
//       if(!isReal){showImage(src);
//        break};
//     } catch (err) {
//       console.error(`${a}.jpg :`, err);
//     }
//   }
// };

export {getDatas,setData,removeData};