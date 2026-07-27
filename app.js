/* ===================================
   DÉCLIC VISION - JAVASCRIPT
   Se former aujourd'hui, impacter demain
=================================== */


document.addEventListener("DOMContentLoaded", function(){



/* ===============================
   ANNÉE AUTOMATIQUE FOOTER
================================ */


const footerText = document.querySelector("footer p");

if(footerText){

    const annee = new Date().getFullYear();

    footerText.innerHTML =
    "© " + annee + " DÉCLIC VISION - Tous droits réservés";

}




/* ===============================
   NAVIGATION FLUIDE
================================ */


const liens = document.querySelectorAll("nav a");


liens.forEach(function(lien){

    lien.addEventListener("click", function(e){

        const destination =
        document.querySelector(
        this.getAttribute("href")
        );


        if(destination){

            e.preventDefault();

            destination.scrollIntoView({

                behavior:"smooth"

            });

        }

    });


});





/* ===============================
   ANIMATION DES CARTES
================================ */


const elements =
document.querySelectorAll(
".card, .testimonial, .gallery img"
);



const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.style.opacity="1";

entry.target.style.transform=
"translateY(0)";


}


});


},

{

threshold:0.2

}

);



elements.forEach(element=>{


element.style.opacity="0";

element.style.transform=
"translateY(40px)";

element.style.transition=
"0.8s";


observer.observe(element);


});






/* ===============================
   FORMULAIRE D'INSCRIPTION
================================ */


const formulaire =
document.querySelector("form");


if(formulaire){


formulaire.addEventListener(
"submit",
function(e){


e.preventDefault();



const nom =
document.querySelector(
'input[type="text"]'
).value;



const telephone =
document.querySelector(
'input[type="tel"]'
).value;



const service =
document.querySelector(
"select"
).value;



const message =
document.querySelector(
"textarea"
).value;





if(nom==="" || telephone===""){


alert(
"Veuillez renseigner votre nom et votre numéro."
);


return;

}





/*
Remplacez les X par votre vrai numéro WhatsApp
Exemple Burkina Faso :
22670000000
*/


const numeroWhatsApp =
"226XXXXXXXX";




const texte =

"Bonjour DÉCLIC VISION,%0A%0A" +

"Je souhaite m'inscrire.%0A%0A" +

"Nom : " + nom + "%0A" +

"Téléphone : " + telephone + "%0A" +

"Service choisi : " + service + "%0A" +

"Message : " + message;





const lien =

"https://wa.me/" +

numeroWhatsApp +

"?text=" +

texte;





window.open(
lien,
"_blank"
);



});


}





/* ===============================
   MESSAGE D'ACCUEIL
================================ */


console.log(

"Bienvenue sur DÉCLIC VISION 🚀"

);



});                    
