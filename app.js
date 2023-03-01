import { userss ,  posts} from "./bds.js"



// Selectores

const formHtml = document.getElementById('form')
const selector = document.getElementById('selectUsers');
const publis = document.getElementById('resulP')


const usernameI = document.getElementById('u-Name');
const nameI = document.getElementById('name');
const emailI = document.getElementById('email');
const webpageI = document.getElementById('wp');
const ageI = document.getElementById('age');



class Users {
    constructor() {
        this.aux = userss;
    }
    agregar(nuevo) {
        this.aux= [...this.aux, nuevo];
    }
    buscar(iduser) {
        return this.aux.find((usuario) => iduser == usuario.id);
    }
    listar() {
        return this.aux;
    }
}



class Publicaciones {
    constructor() {
        this.publicar = posts;
    }
    agregar(nueva) {
        this.publicar = [...this.publicar, nueva];
        // this.publicar.push(nueva);
    }


    obtenerPorUsuario(userId) {
        this.publicar = posts;
        return this.publicar.filter(
            (posts) => userId ==  posts.userId
        );
    }

    search(userId) {
        return this.publicar.filter((posts) => posts.userId == userId)
    }

    obtenerPorId(id) {

        console.log(this.publicar)
        return this.publicar.find(
            (publicacion) => publicacion.id === id
        );
    }
}

// class Publicaciones {
//     constructor() {
//       this.publicar = posts;
//     }
  
//     obtenerPorUsuario(userId) {
//       return this.publicar.filter((posts) => userId === posts.userId);
//     }
  
//     search(userId) {
//       return this.publicar.filter((posts) => userId === posts.userId);
//     }
//   }


const usu = new Users();
const publi = new Publicaciones();


class Inter {


    rellenaInputs(iduser) {

        let us = usu.buscar(iduser)
        // console.log(us());
        if(us) {
            // console.log("entroooooo")
            nameI.value = us.name;
            usernameI.value = us.username;
            emailI.value = us.email;
            webpageI.value =  us.website;
            // age.value = us.age;
        }


    }



    mostrarUSelector() {
        this.cleaner(selector)

        console.log(selector)
        let users = usu.listar();

        users.forEach(user => {
            console.log("entro")
            selector.innerHTML += `<option value="${user.id}">${user.username}</option>`
        })
    }

    publicaciones(userId) {
        console.log("holeee")
        this.cleaner(publis)
        let publiUs = publi.obtenerPorUsuario(userId)
        console.log(publiUs)
        
        publiUs.forEach(posts => {
            publis.innerHTML += `<div> Titulo ${posts.title}
                ${posts.body}
                </div>
            `
        })
    }

    // publicaciones(userId) {
    //     console.log("holaaa");
    //     const publis = document.getElementById("publis");
    //     let publiUs = publi.filter((post) => post.userId === userId);
    //     console.log(publiUs);
      
    //     publis.innerHTML = "";
      
    //     publiUs.forEach((post) => {
    //       publis.innerHTML += `
    //         <div>
    //           <h2>${post.title}</h2>
    //           <p>${post.body}</p>
    //         </div>
    //       `;
    //     });
    //   }
      
}


const grafico = new Inter;
// grafico.publicaciones()
grafico.mostrarUSelector()

let id;

class Form {

    submit(e) {
        console.log(e)
        e.preventDefault();

        if(!id) {
            usu.listar().forEach( user => {
                id = user.id
            })
        }

        id++

        const username =  usernameI.value
        const name = nameI.value
        const email = emailI.value
        const website = webpageI.value
        const age = ageI.value

        const data = {
            id,
            username,
            name,
            email,
            website,
            age
        }

        usu.agregar(data)
        console.log(data)
        console.log(usu.listar())
        grafico.listar()

    }
}

const form = new Form;

function changes() {
    formHtml.addEventListener('submit', function(e) {
        form.submit(e)
        grafico.mostrarUSelector()
    } )

    selector.addEventListener('change', function(e) {
        grafico.rellenaInputs(e.target.value)
        console.log("Hola owen")
        grafico.publicaciones(e.target.value)
    })

}



changes()







