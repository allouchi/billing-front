
//******************************************************************************************************************************//
//************************Fonction de vérification si une date entrée est au de^là de la date minimum***************************//
//******************************************************************************************************************************//
/*

function verif_date_mini(date_entree, date_mini){
	var date_entree_n = new Date(date_entree);
	var date_mini_n = new Date(date_mini);

	if (date_entree_n !== null) {
	// Transformation d'une date en jj/mm/aaaa en mm/jj/aaaa puis en date :Fri Sep 5 15:14:41 UTC+0200 2003)
		date_entree_jour = date_entree.substring(0,2);
 		date_entree_mois= date_entree.substring(3,5);
 		date_entree_annee = date_entree.substring(6,10);
 		nouvelle_date_entree = new Date(date_entree_annee, date_entree_mois-1, date_entree_jour);

		if (nouvelle_date_entree.getTime()<date_mini_n.getTime()) {
			return 0;
		}
		else {
		return 1;
		}
	} 
}*/

function JoursFeries (an){
    var JourAn = new Date(an, 0, 1);
    var FeteTravail = new Date(an, 4, 1);
    var Victoire1945 = new Date(an, 4, 8);
    var FeteNationale = new Date(an,6, 14);
    var Assomption = new Date(an, 7, 15);
    var Toussaint = new Date(an, 10, 1);
    var Armistice = new Date(an, 10, 11);
    var Noel = new Date(an, 11, 25);
    
  
    var G = an%19;
    var C = Math.floor(an/100);
    var H = (C - Math.floor(C/4) - Math.floor((8*C+13)/25) + 19*G + 15)%30;
    var I = H - Math.floor(H/28)*(1 - Math.floor(H/28)*Math.floor(29/(H + 1))*Math.floor((21 - G)/11));
    var J = (an*1 + Math.floor(an/4) + I + 2 - C + Math.floor(C/4))%7;
    var L = I - J;
    var MoisPaques = 3 + Math.floor((L + 40)/44);
    var JourPaques = L + 28 - 31*Math.floor(MoisPaques/4);
    var Paques = new Date(an, MoisPaques-1, JourPaques);
    //**var VendrediSaint = new Date(an, MoisPaques-1, JourPaques-2);**//
    var LundiPaques = new Date(an, MoisPaques-1, JourPaques+1);
    var Ascension = new Date(an, MoisPaques-1, JourPaques+39);
    var Pentecote = new Date(an, MoisPaques-1, JourPaques+49);
    var LundiPentecote = new Date(an, MoisPaques-1, JourPaques+50);
  
    //**SaintEtienne et Vendredi Saint sont des fêtes exclusivement**//
    //**alscacienne. On les ignore dans notre cas.**//
    return new Array(JourAn, Paques, LundiPaques, FeteTravail, Victoire1945, Ascension, Pentecote, LundiPentecote, FeteNationale, Assomption, Toussaint, Armistice, Noel);
  }

  /******************************************************************************************************************************//
//************************Calcul de la date minimum de portage (15 jours ouvrables après la date du jour)***********************//
//******************************************************************************************************************************//
function calc_date_mini(){

	var date_now = new Date();
	var date_now_annee = date_now.getFullYear();
	var date_now_mois = date_now.getMonth();
	var date_now_jour = date_now.getDate();

	//**init. des compteurs**//
	var cpt_i = 0;
	var cpt_j = 0;
	var cpt_k = 0;

	//**init. des tableaux récupérant les jours feries de l'annee en cours et de l'annee suivante.**//
	var tab_1=new Array;
	var tab_2=new Array;
	tab_1=JoursFeries(date_now.getFullYear());
	tab_2=JoursFeries(date_now.getFullYear()+1);

	for(cpt_i=0; cpt_j < 16 ; cpt_i++) {
		var date_eval = new Date(date_now_annee, date_now_mois, date_now_jour+cpt_i);
		var day_date_eval = date_eval.getDay();
		if((day_date_eval != 6) && (day_date_eval != 0)) {
			cpt_j++;
			for(cpt_k = 0; cpt_k <13; cpt_k++){
				if(date_eval.getMonth() == tab_1[cpt_k].getMonth() && date_eval.getFullYear() == tab_1[cpt_k].getFullYear() && date_eval.getDate() == tab_1[cpt_k].getDate()){
					cpt_j--;
					break;
				}
				if(date_eval.getMonth() == tab_2[cpt_k].getMonth() && date_eval.getFullYear() == tab_2[cpt_k].getFullYear() && date_eval.getDate() == tab_2[cpt_k].getDate()){
					cpt_j--;
					break;
				}
			}
		}
	}
	return date_eval;
}


const JoursOuvres = (): number=>{

    return 0;
}
export default JoursOuvres;


  