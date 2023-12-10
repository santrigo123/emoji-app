prediccion_1="";
prediccion_2="";
Webcam.set({
    width: 350,
    height: 350,
    img_format:'png',
    png_quality: 90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="foto" src="'+data_uri+'">';
    });
}
console.log("ml5 version",ml5.version);
clasificador=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/AF9yKiKRx/model.json',model_loaded);
function model_loaded(){
    console.log("modelo activado");
}
function check(){
    img=document.getElementById("foto");
    clasificador.classify(img, gotResult);
}
function speak(){
    var info=window.speechSynthesis;
    dato_1="la primera prediccion es: "+prediccion_1;
    dato_2="la segunda prediccion es: "+prediccion_2;
    var hablar=new SpeechSynthesisUtterance(dato_1+dato_2);
    info.speak(hablar);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediccion_1=results[0].label;
        prediccion_2=results[1].label;
        speak();
        if(results[0].label=="feliz"){
            document.getElementById("update_emoji").innerHTML='&#128522;';
        }
        if(results[0].label=="triste"){
            document.getElementById("update_emoji").innerHTML='&#128532;';
        }
        if(results[0].label=="enojo"){
            document.getElementById("update_emoji").innerHTML='&#128548;';
        }
        if(results[1].label=="feliz"){
            document.getElementById("update_emoji2").innerHTML='&#128522;';
        }
        if(results[1].label=="triste"){
            document.getElementById("update_emoji2").innerHTML='&#128532;';
        }
        if(results[1].label=="enojo"){
            document.getElementById("update_emoji2").innerHTML='&#128548;';
        }
    }
}