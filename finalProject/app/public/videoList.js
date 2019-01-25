if(!localStorage.getItem('userToken')||localStorage.getItem('userToken')==='undefined'){
    if(localStorage.getItem('userToken')==='undefined') localStorage.removeItem('userToken');
    window.location='/'
}

window.onload = function (){
   
    fetch('video/list',{
    headers: {
        method:'get',
        'Authorization': obtainBearerValue(),
        'Content-Type': 'application/json'
    }})
    .then(rawResponse => rawResponse.json())
    .then(response => {
        fetch('user/userData',{
            headers: {
            'Authorization': obtainBearerValue(),
            }
        })
        .then(userData => userData.json())
        .then(userDataJson => {
            const userDataDiv = document.getElementById('userData');
            userDataDiv.innerHTML= `<h5>Nombre : ${userDataJson.data.name}<br>Mail : ${userDataJson.data.userName}</h5>`;
        })
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
                fetch('video/delete',{
                    method:'DELETE',
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

                fetch('video/update',{
                    method:'PATCH',
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
        fetch('video/add',{
            method:'PUT',
            headers: {
            'Authorization': obtainBearerValue(),
            'Content-Type': 'application/json'
            },
          body: JSON.stringify({url:document.getElementById("urlVideo").value,description:document.getElementById("descriptionVideo").value})
        })
        .then(response=>response.json())
        .then(reponses=> window.location='/list')

    });

    document.getElementById('deleteUser').addEventListener('click', (e) => {
        e.preventDefault();
        fetch('user/userData',{
            headers: {
            'Authorization': obtainBearerValue(),
            }
        })
        .then(userData => userData.json())
        .then(userDataJson => {
            fetch('user/delete',{
                method:'DELETE',
                headers: {
                'Authorization': obtainBearerValue(),
                'Content-Type': 'application/json'
                },
              body: JSON.stringify({_id:userDataJson.data._id})
            })
            .then(response=>response.json())
            .then(reponses=> {
                localStorage.removeItem('userToken');
                window.location='/'
            })
         } )
    });

    document.getElementById('updateUser').addEventListener('click', (e) => {
        e.preventDefault();
        fetch('user/userData',{
            headers: {
            'Authorization': obtainBearerValue(),
            }
        })
        .then(userData => userData.json())
        .then(userDataJson => {
            fetch('user/update',{
                method:'PATCH',
                headers: {
                'Authorization': obtainBearerValue(),
                'Content-Type': 'application/json'
                },
              body: JSON.stringify({_id:userDataJson.data._id,name:document.getElementById("user").value,userName:document.getElementById("userName").value})
            })
            .then(response=>response.json())
            .then(dataNueva => {
                localStorage.setItem('userToken', dataNueva.jwt);
                window.location='/list';
            })
        })
        

    });
    document.getElementById('logOut').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('userToken');
        window.location='/';
    })
}
const obtainBearerValue = () => 'Bearer ' + localStorage.getItem('userToken')
