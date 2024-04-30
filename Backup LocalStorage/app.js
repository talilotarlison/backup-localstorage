
var dados = document.querySelector("input");

// https://www.guj.com.br/t/resolvido-pegar-valor-input-type-file/193784
// https://warcontent.com/localstorage-javascript/

/*
https://github.com/dannyconnell/localbase
https://www.youtube.com/watch?v=KJnupY2HPCg

dados.addEventListener("change", (e)=>{
  console.log( e.target.value)
}) 

*/


dados.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const conteudo = reader.result;
    console.log(conteudo);
    localStorage.setItem('backup', conteudo);
  };

  reader.readAsText(file);
});


var backup = document.getElementById("btn");



backup.addEventListener('click', () => {
  //console.log('click')
  const dados = localStorage.getItem('backup'); // Su"meus_dados" pela sua chave
  if (dados) {
    // console.log(dados)
    exportarDados(JSON.stringify(dados));
  } else {
    alert('Sem dados para Backup!!')
  }
});

function exportarDados(dados) {
  if (confirm("Deseja salvar backup?")) {
    console.log(dados)
    var content = dados;
    var fileName = "backup.txt";
    var contentType = "text/plain";
    download(content, fileName, contentType);
  } else {
    alert("Backup cancelado!!")

  }
}

//const blob = new Blob([dados], { type: 'text/plain;charset=utf-8;' });
//console.log(blob.FileReader())
//const link = document.createElement('a');
//link.href = window.URL.createObjectURL(blob);
//link.download = 'dados_exportados.txt';
//link.click();
//window.URL.revokeObjectURL(link.href);


function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = window.URL.createObjectURL(file);
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(a.href);
}
