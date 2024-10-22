//import { maxCases, showImage } from "./memory.js";

function getDatas(key){
    return JSON.parse(localStorage.getItem(key)) || [];

}


function setData(key,data){
    const oldData = getDatas(key);

    oldData.push(data);

    localStorage.setItem(key,JSON.stringify(oldData));

return oldData;
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

export {getDatas,setData,/*checkImageExists,checkAllImages*/};