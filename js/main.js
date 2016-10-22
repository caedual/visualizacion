var imageData;
var imageDataResultado;
var canvasoriginal;
var contextoriginal;
var contextresultado;
var canvasresultado;
var dataurl; //variable donde guardaremos el contenido
var canvashistograma;
var contexthistograma;
var imageObj = new Image(); //crea un nuevo objeto de iamgen 

window.onload = function(){
    document.getElementById('download').disabled = true;
}

function cargaimagen ()
{
  document.getElementById('download').disabled = true;
  canvasoriginal = document.getElementById("canvasoriginal"); //obtenemos el canvas del DOM 
  context = canvasoriginal.getContext("2d"); //accedemos al contexto del canvas anteriormente obtenido
  canvasresultado = document.getElementById("canvasresultado");
  context2 = canvasresultado.getContext("2d");
  archivoimagen = document.getElementById("uploadimage").files[0],
    url = window.URL || window.webkitURL,  //guardamos el objeto que nos da windows.url
    src = url.createObjectURL(archivoimagen); //guardamos el URL del parametro(archivo)
  imageObj.src = src; //establecemos la ruta de la imagen
  imageObj.onload = function() //al cargar el objeto image
  {
    context.drawImage(imageObj,0,0,500,320); 
    url.revokeObjectURL(src); // libera el objeto URL antes creado en (src)
    imageData = context.getImageData(0, 0, canvasoriginal.width, canvasoriginal.height); //obtenemos los datos de los pixeles
    imageDataResultado = context2.getImageData(0, 0, canvasresultado.width, canvasresultado.height);
    context2.clearRect(0,0,canvasresultado.width,canvasresultado.height); //borramos los pixeles
    $('#oculto').hide();
  }
}


function guardar(){
  dataurl = canvasresultado.toDataURL("image/jpeg",1.0); //guardamos el canvas con los parametros son el formato que deseamos guardar y la calidad de 0.0 a 1.0
  dataurl = dataurl.replace("image/jpeg",'image/octet-stream'); //para descargar, sustituimos el formato por octet
  document.location.href = dataurl; //para forzar al navegador  a descargarlo.
}

function cambiaimagen(url){
  imageObj.src=url;
  context2.clearRect(0,0,canvasresultado.width,canvasresultado.height);
}

function negativo(){
  for (x=0; x<canvasresultado.width; x++){
    for (y=0; y<canvasresultado.height; y++){
        var r=getRed(imageData,x,y);
        var g=getGreen(imageData,x,y);
        var b=getBlue(imageData,x,y)
        var red_invertido=255-r;//crear
        var green_invertido=255-g;
        var blue_invertido=255-b;
        SetPixel(imageDataResultado, x, y, red_invertido,green_invertido, blue_invertido, 255);
    }
  }
  context2.putImageData(imageDataResultado, 0, 0);//visualiza la imagen nuevamente
  document.getElementById('download').disabled = false;
  mensajito();
}

function rojizo(){
  for (x=0; x<canvasresultado.width; x++){
    for (y=0; y<canvasresultado.height; y++){
                var r=  getRed(imageData,x,y);
                var g=  getGreen(imageData,x,y);
                var b=  getBlue(imageData,x,y);
                SetPixel(imageDataResultado, x, y, r,0,0, 255);
       }
  }
  context2.putImageData(imageDataResultado, 0, 0);//visualiza la imagen nuevamente
  document.getElementById('download').disabled = false;
  mensajito();
}

function grises(){
  for (x=0; x<canvasresultado.width; x++){
    for (y=0; y<canvasresultado.height; y++){
        var r=getRed(imageData,x,y);
        var g=getGreen(imageData,x,y);
        var b=getBlue(imageData,x,y);
        var promedio=r+g+b/3;
        var r=promedio;
        var g=promedio;
        var b=promedio;
        SetPixel(imageDataResultado, x, y, r,g, b, 255);
    }
  }
  context2.putImageData(imageDataResultado,0,0);
  document.getElementById('download').disabled = false;
  mensajito();
}

function sepia(){
  for (x=0;x<canvasresultado.width;x++)
  {
    for (y=0;y<canvasresultado.height;y++){
      var r = GetPixel(imageData,x,y,0);
      var g = GetPixel(imageData,x,y,1);
      var b = GetPixel(imageData,x,y,2);
      var rn = (r * 0.393)+(g * 0.769)+(b * 0.189);
      var gn = (r * 0.349)+(g * 0.686)+(b * 0.168);
      var bn = (r * 0.272)+(g * 0.534)+(b * 0.131);
      SetPixel(imageDataResultado,x,y,rn,gn,bn,255);
    }
  }
  context2.putImageData(imageDataResultado,0,0);
  document.getElementById('download').disabled = false;
  mensajito();
}

function SetPixel(imageData,x,y,r,g,b,a){
  index = (x+y*imageData.width)*4;
  imageData.data[index+0] = r;
  imageData.data[index+1] = g;
  imageData.data[index+2] = b;
  imageData.data[index+3] = a;
}

function GetPixel(imageData,x,y,canal){
  index = (x+y*imageData.width)*4;
  return imageData.data[index+canal];
}

function getRed(imageData,x,y){
   index = (x + y * imageData.width) * 4;
   return  imageData.data[index+0];
}

function getGreen(imageData,x,y){
   index = (x + y * imageData.width) * 4;
   return imageData.data[index+1];
}

function getBlue(imageData,x,y){
   index = (x + y * imageData.width) * 4;
   return imageData.data[index+2];
}

function mensajito(){
  $('#oculto').show();
    setTimeout(function() {
        $("#oculto").fadeOut(1000);
    },1000);
}