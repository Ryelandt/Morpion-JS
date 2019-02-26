
 
 
// evenement controle affiche desactive et appel fonction
function btClick(event) {
  
  var tabBtn = [
    [document.getElementById("bt0"), document.getElementById("bt1"), document.getElementById("bt2")],
    [document.getElementById("bt3"), document.getElementById("bt4"), document.getElementById("bt5")],
    [document.getElementById("bt6"), document.getElementById("bt7"), document.getElementById("bt8")]
  ];
 
  var ident =event.target.id;
  // verifie le texte que contient la case 
  var content = event.target.textContent;    
  //si la case est occupée 
  
  if (content!="") {              
      alert(" pas vide");
  }
  // si non rajoute le charactère "X" et désactive le boutton
  else {                 
     var targetBtn= document.getElementById(ident);
     targetBtn.innerHTML='x';
     targetBtn.disabled=true ;
     
     displayEnd(tabBtn);
     iaPlay(tabBtn);
  } 

  
  
}
// verif si un joueur a gagner (=> renvoie le gagnant)
function isGameWin(tabBtn) {

 
  var listeBouton = document.getElementsByClassName("btn");
  var joueur ="x";
  var comput = "o";
  var win = "c";
 

   for (let i = 0 ; i < 3; i++) {
      //verification lignes horizontales 
      //verification lignes verticales 
     
      if(tabBtn[i][0].innerHTML+tabBtn[i][1].innerHTML+tabBtn[i][2].innerHTML=="xxx") {
        win=joueur;
        //location.reload(); 
      }
      else if (tabBtn[0][i].innerHTML+tabBtn[1][i].innerHTML+tabBtn[2][i].innerHTML=="xxx") {
        win=joueur;
        //location.reload();
      }
      else if(tabBtn[i][0].innerHTML+tabBtn[i][1].innerHTML+tabBtn[i][2].innerHTML =="ooo") {
        win=comput;      
      } 
      else if (tabBtn[0][i].innerHTML+tabBtn[1][i].innerHTML+tabBtn[2][i].innerHTML=="ooo") {
        win=comput; 
      }
   } 
   //verification lignes diagonales
  if (tabBtn[0][0].innerHTML+tabBtn[1][1].innerHTML+tabBtn[2][2].innerHTML=="xxx"||tabBtn[0][2].innerHTML+tabBtn[1][1].innerHTML+tabBtn[2][0].innerHTML=="xxx") {
    win=joueur; 
  }
  else if (tabBtn[0][0].innerHTML+tabBtn[1][1].innerHTML+tabBtn[2][2].innerHTML=="ooo"||tabBtn[0][2].innerHTML+tabBtn[1][1].innerHTML+tabBtn[2][0].innerHTML=="ooo") {
    win=comput;    
  }
   return win;
}

// verif si cases vide ou grille complete (=> renvoie true)   
function isGameOver(tabBtn) {

    var cpt = 0;
    var complet = false;

    for (let j = 0; j < tabBtn.length; j++) {  //verif si le tableau est complet ou reste des cases dispo
        for (let i = 0; i < tabBtn[j].length; i++) {
            if(tabBtn[j][i].innerHTML!=""){
              cpt++;
            }       
        }
    }
    if (cpt==9) {
      complet = true;   
    }
  return complet;    
}
// renvoie si continue , draw ,'x' ou 'o'   appel isGameWin() + appel isGameOver()
function gameStateCheck(tabBtn) {
  var showText = "-";
  var showM = document.getElementById('matchD');
  var stateElt = "";
  var over = isGameOver(tabBtn);
  var win = isGameWin(tabBtn);

      if(over==false) {
        //reste des cases vides
        stateElt= win;
      }
      else  {
         //complet
        if(win=='c') {
          showText='MATCH DRAW';
          stateElt='d';

        }
        else {
          stateElt= win;
        }
        
      }
      showM.textContent = showText;
      return stateElt;

}
// affiche 'd' , 'x' , 'o'                  appel gameStateCheck()
function displayEnd(tabBtn) {
  var showText = "-";
  var showX = document.getElementById('you');
  
  var showI = document.getElementById('IA');
  
  var gameState = gameStateCheck(tabBtn);
   
 
  switch (gameState) {
  
    case 'd':
      if (confirm("Match Draw =>Rejouer ?")) {
        location.reload();
      };
      break;
    case 'x':
      showText='YOU WIN';
      showX.textContent = showText;
      if (confirm("win Rejouer ?")) {
        location.reload();
      };
      break;
    case 'o':
      showText='YOU LOSE';
      showI.textContent = showText;
      if (confirm("lose Rejouer ?")) {
        location.reload();
      };
      
      break;
  
   
  }
  
  
  
}
// verifie si la case au centre est vide
function isCenterFree() {
  
var centerCase = document.getElementById("bt4");
var state ;
  //si la case centrale est vide met un "o"
  if(centerCase.innerHTML=="" ) {
      centerCase.innerHTML = "o";
      state = true;
      
  }
  else {
      state = false;
  }
  return state;
}
// random servant à  la fonction isRandomPlay()
function randomBox(low,high) {
  var random = Math.floor((Math.random() * high)+ low);
  return random;
}
// retourne une case vide au hazard et complète avec 'o'    appel randomBox()
function iaRandomPlay(tabBtn) { //ok
  
  var tabEltFree = [];
  // verifie les cases vide et les push dans taEltFree
  for (let j = 0; j < tabBtn.length; j++) {
    for (let k = 0; k < tabBtn[j].length; k++) {
      var element = tabBtn[j][k].innerHTML;
      var idElt = tabBtn[j][k].id
      if(element=="") {
        tabEltFree.push(idElt);
      }
    }  
  }
  var resultRandom =randomBox(0,tabEltFree.length-1);
  var caseRandomOfComp = document.getElementById(tabEltFree[resultRandom]);
  caseRandomOfComp.innerHTML = 'o';
  console.log(tabEltFree);
  

  return resultRandom;
}
//ok  recherche deux "o" pour jouer intelligent
function iaPlayToWin(tabBtn) { 
 var winPlay = false;
 
  // verifie les cases avec 2 'o' 
  for (let i = 0,j=0;  i < tabBtn.length; i++ ,j++) {

    //horizontalement
      var element0_O = tabBtn[i][0];
      var element1_O = tabBtn[i][1];
      var element2_O = tabBtn[i][2];
    //verticalement  
      var element3_O = tabBtn[0][i];
      var element4_O = tabBtn[1][i];
      var element5_O = tabBtn[2][i];
    
     if(element0_O.innerHTML+element1_O.innerHTML+element2_O.innerHTML=='oo') {

        tabBtn[i].forEach(element => {
            
            if(element.innerHTML==''){
              element.innerHTML='o' ;
              winPlay = true;
            }
        });

     }
     else if(element3_O.innerHTML+element4_O.innerHTML+element5_O.innerHTML=='oo') {
       
         if(element3_O.innerHTML=='') {
           element3_O.innerHTML ='o';
           winPlay = true;
         }
         else if(element4_O.innerHTML=='') {
          element4_O.innerHTML ='o';
          winPlay = true;
         }
         else if(element5_O.innerHTML=='') {
          element5_O.innerHTML ='o';
          winPlay = true;
         }
     }
    
  }
  //diagonales  
  var element6_O = tabBtn[0][0];
  var element7_O = tabBtn[1][1];
  var element8_O = tabBtn[2][2];
  var element9_O = tabBtn[0][2];
  var element10_O = tabBtn[2][0];

  if(element6_O.innerHTML+element7_O.innerHTML+element8_O.innerHTML=='oo' ) {

      if(element6_O.innerHTML=='') {
        element6_O.innerHTML ='o';
        winPlay = true;
      }
      
      else if(element8_O.innerHTML=='') {
      element8_O.innerHTML ='o';
      winPlay = true;
      }
      else if(element7_O.innerHTML=='') {
      element7_O.innerHTML ='o';
      winPlay = true;
      
      }
    
  }
  else if(element9_O.innerHTML+element7_O.innerHTML +element10_O.innerHTML=='oo') {
    if(element9_O.innerHTML=='') {
      element9_O.innerHTML ='o';
      winPlay = true;
    }
    else if(element10_O.innerHTML=='') {
      element10_O.innerHTML ='o';
      winPlay = true;
    }
    else if(element7_O.innerHTML=='') {
      element7_O.innerHTML ='o';
      winPlay = true;
      
      }
  }
  return winPlay;
}
//ok recherche deux "x" pour contrer
function iaPlayToDefend(tabBtn) { 
  var state = false
   // verifie les cases avec 2 'o' 
   for (let i = 0,j=0;  i < tabBtn.length; i++ ,j++) {

    //horizontalement
      var element0_O = tabBtn[i][0];
      var element1_O = tabBtn[i][1];
      var element2_O = tabBtn[i][2];
    //verticalement  
      var element3_O = tabBtn[0][i];
      var element4_O = tabBtn[1][i];
      var element5_O = tabBtn[2][i];
    //diagonales  
      var element6_O = tabBtn[0][0];
      var element7_O = tabBtn[1][1];
      var element8_O = tabBtn[2][2];
      var element9_O = tabBtn[0][2];
      var element10_O = tabBtn[2][0];

     if(element0_O.innerHTML+element1_O.innerHTML+element2_O.innerHTML=='xx') {

       tabBtn[i].forEach(element => {
           
           if(element.innerHTML==''){
             element.innerHTML='o' ;
             state=true;
           }
       });

     }
     else if(element3_O.innerHTML+element4_O.innerHTML+element5_O.innerHTML=='xx') {
       
         if(element3_O.innerHTML=='') {
           element3_O.innerHTML ='o';
           state=true;
         }
         else if(element4_O.innerHTML=='') {
          element4_O.innerHTML ='o';
          state=true;
         }
         else if(element5_O.innerHTML=='') {
          element5_O.innerHTML ='o';
          state=true;
         }
         else {
           state=false;
         }
     }
     else if(element6_O.innerHTML+element7_O.innerHTML+element8_O.innerHTML=='xx' ) {

         if(element6_O.innerHTML=='') {
            element6_O.innerHTML ='o';
            state=true;
         }
         else if(element7_O.innerHTML=='') {
          element7_O.innerHTML ='o';
          state=true;
         }
         else if(element8_O.innerHTML=='') {
          element8_O.innerHTML ='o';
          state=true;
         }
         else {
          state=false;
        }
       
     }
     else if(element9_O.innerHTML+element7_O.innerHTML +element10_O.innerHTML=='xx') {

        if(element9_O.innerHTML=='') {
          element9_O.innerHTML ='o';
          state=true;
        }
        else if(element10_O.innerHTML=='') {
          element10_O.innerHTML ='o';
          state=true;
        }
        else if(element7_O.innerHTML=='') {
          element7_O.innerHTML ='o';
          state=true;
         }
        else {
          state=false;
        }
     }
     
  }
return state
  
}
// appel fonctions IA 
function iaPlay(tabBtn) {   
  
  
 
  var defend=iaPlayToDefend; 
  var center = isCenterFree;
  if(iaPlayToWin(tabBtn)==false) {

     if(defend(tabBtn)==false) {

      if (center()==false){

       iaRandomPlay(tabBtn);
        
      }
    }
  }
  
   displayEnd(tabBtn);
  
 
  
  

 
  

} 
