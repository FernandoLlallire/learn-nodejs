window.onload = function (){
    fetch('video/api/list')
    .then(rawResponse => rawResponse.json())
    .then(response => {
        const ul = document.getElementById('list');
        response.forEach(element => {
            /*Creacion de elementos*/
            const li = document.createElement('li');
            const video = document.createElement('video');
            const div = document.createElement('div');
            const source = document.createElement('source');
            const h3 = document.createElement('h3');
            const buttonDelete = document.createElement('button');
            const buttonUpdate = document.createElement('button');
            /*Atributos */
            buttonUpdate.setAttribute('type','button');
            buttonUpdate.innerText='Update';
            buttonDelete.setAttribute('type','button');
            buttonDelete.innerText='Delete';
            h3.innerText = element.description;
            div.setAttribute('class','divVideo');
            video.setAttribute('width', '640');
            video.setAttribute('height','480');
            video.setAttribute('controls','controls');
            source.setAttribute('src', element.url);
            source.setAttribute('type', "video/mp4");
            video.appendChild(source);
            /*Conecciones*/
            div.appendChild(h3);
            div.appendChild(video);
            div.appendChild(buttonUpdate);
            div.appendChild(buttonDelete);
            li.appendChild(div);
            ul.appendChild(li);
            /*Eventos*/
            buttonDelete.addEventListener('click', () => {
                fetch(`video/api/delete/${element._id}`,{method:'delete'})
                .then(res=>res.json()).then(res=>console.log(res))
            });
            buttonUpdate.addEventListener('click', () => { 
                console.log(element);
            });
        });
    })
    document.getElementById('addVideo').addEventListener('click', (e) => {
        e.preventDefault();
        console.log(JSON.stringify({url:document.getElementById("urlVideo").value,description:document.getElementById("descriptionVideo").value}))
        fetch(`video/api/add`,{method:'post',body: JSON.stringify({url:document.getElementById("urlVideo").value,description:document.getElementById("descriptionVideo").value})})
        .then(res=>res.json()).then(res=>console.log(res))

    });
}
