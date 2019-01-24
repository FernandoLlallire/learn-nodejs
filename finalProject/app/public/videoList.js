window.onload = function (){
    //console.log(document.cookie.split(';').forEach(e=>console.log(e.split('=')[0].trim())))
    fetch('video/api/list',{
    headers: {
        method:'get',
        'Authorization': obtainBearerValue(),
        'Content-Type': 'application/json'
    }})
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
            const divUpdate = document.createElement('div');
            const formUpdate = document.createElement('form');
            const newUrl = document.createElement('input');
            const newDescription = document.createElement('input');
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
            newUrl.setAttribute('placeholder', 'Nueva Url');
            newUrl.setAttribute('class', 'newUrl');
            newDescription.setAttribute('class', 'newDescription');
            //newUrl.id = 'newUrl'; por q no puedo repetir id
            //newDescription.id = 'newDescription';
            newDescription.setAttribute('placeholder', 'Nueva descripcion');
            divUpdate.setAttribute('class','divUpdate');
            /*Conecciones*/
            formUpdate.appendChild(newDescription);
            formUpdate.appendChild(newUrl);
            formUpdate.appendChild(buttonUpdate);
            divUpdate.appendChild(formUpdate);
            div.appendChild(h3);
            div.appendChild(video);
            div.appendChild(divUpdate);
            div.appendChild(buttonDelete);
            li.appendChild(div);
            ul.appendChild(li);
            /*Eventos*/
            buttonDelete.addEventListener('click', () => {
                fetch('video/api/delete',{
                    method:'delete',
                    headers: {
                        'Authorization': obtainBearerValue(),
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({_id:element._id})
                })
                .then(res=>res.json())
                .then(res=> window.location='/list')
            });
            buttonUpdate.addEventListener('click', (event) => {
                fetch('video/api/update',{
                    method:'patch',
                    headers: {
                        'Authorization': obtainBearerValue(),
                        'Content-Type': 'application/json'
                        },
                    body: JSON.stringify({//event.target.parentElement.querySelector('.newDescription').value
                        newUrl: event.target.parentElement.querySelector('.newUrl').value,
                        newDescription: event.target.parentElement.querySelector('.newDescription').value,
                        url: element.url,
                        description: element.description
                    })
                })
                .then(response=>response.json())
                .then(reponse=> window.location='/list')
            });
        });
    })
    document.getElementById('addVideo').addEventListener('click', (e) => {
        e.preventDefault();
        fetch('video/api/add',{
            method:'put',
            headers: {
            'Authorization': obtainBearerValue(),
            'Content-Type': 'application/json'
            },
          body: JSON.stringify({url:document.getElementById("urlVideo").value,description:document.getElementById("descriptionVideo").value})
        })
        .then(response=>response.json())
        .then(reponse=> window.location='/list')

    });
}
const obtainBearerValue = () => {
    const cookieNode = document.cookie.split(';');
    let bearerValue;
    //console.log(cookieNode)
    cookieNode.forEach(element => {
        //console.log(element.split('=')[0].trim()==='logInUser')
        if(element.split('=')[0].trim()==='logInUser'){
            bearerValue = 'Bearer ' + element.split('=')[1];
        }
    })
    return bearerValue;
}