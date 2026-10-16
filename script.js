// =====================================================================
//  COMPARAISON DES ALGORITHMES DE TRI
//  But : trier des tableaux de nombres avec plusieurs méthodes
//        et mesurer combien de temps chacune met (= "benchmark").
// =====================================================================


// ---------------------------------------------------------------------
// JEU DE DONNÉES FIXE
// Tableau de 180 nombres (entre -5000 et 9999) toujours le même,
// pour pouvoir comparer les algos sur exactement les mêmes valeurs.
// ---------------------------------------------------------------------
const DATA = [
  9980, -1539, -1749, 2213, 2880, -4829, 8434, 8494, -4340, -4511, 
  4994, -1820, 3604, 8562, 1922, 9543, 1483, 4379, 5692, 6291, 
  8010, 5341, 5698, 5700, 9757, 9980, 8609, -1186, 7938, 3153, 
  6249, 8967, 9848, -4049, -1164, 4040, -2052, -3995, 5786, -557, 
  -3906, 755, 6098, -1103, -576, 5136, 1403, -2114, 8888, -4616, 
  -4256, 6265, 8348, 9706, 8131, -4975, 3808, 2202, -1539, -2270, 
  9518, -4791, 5583, 4995, 5816, 2303, 3132, -4059, -3127, 6819, 
  -3865, 9069, -1879, 3741, -4391, 2224, 4147, 9421, 7493, -1660, 
  2755, -4700, 2678, 4198, -1975, 4538, -541, 6661, 8530, 8366, 
  -942, 0, -2811, 6728, 8519, -2818, -3399, -1, -4472, -4462, 
  1315, 3423, 773, 8957, -1072, 1768, 5034, 6471, 2448, 2633, 
  6875, -4818, -164, -1622, -4358, 6791, 4538, -59, -2793, -5000, 
  2763, 5276, 6408, 2255, 3341, 8800, 1462, -629, 8413, 7422, 
  -991, 7249, 8531, 9260, 7087, 4432, -1947, 9722, 1861, 9969, 
  5850, 7570, -4785, 6620, 7689, 1912, 4882, -2961, 1467, 9999, 
  2784, 4116, -3178, -1864, -3153, 1577, 9553, 789, 8310, 649, 
  5683, -4221, -4439, -3589, 4444, -3468, 7133, 8205, -4651, -2020, 
  4238, 3193, -2102, -131, 1105, 349, -3093, 9346, -3658, -2570
];


// ---------------------------------------------------------------------
// GÉNÉRER UN TABLEAU ALÉATOIRE
// Crée un tableau de "taille" nombres entiers au hasard entre -10000 et 9999.
// Math.random()      -> nombre à virgule entre 0 et 1
// * 20000 - 10000    -> on l'étire entre -10000 et 10000
// Math.floor(...)    -> on enlève la virgule (arrondi vers le bas)
// ---------------------------------------------------------------------
function genererTableauAleatoire(taille) {
  const tab = [];
  for (let i = 0; i < taille; i++) {
    tab.push(Math.floor(Math.random() * 20000) - 10000);
  }
  return tab;
}


// =====================================================================
//  LES ALGORITHMES DE TRI
//  Remarque : chacun commence par [...donnees] = faire une COPIE
//  du tableau, pour ne pas modifier le tableau d'origine.
// =====================================================================


// ---------------------------------------------------------------------
// TRI À BULLES (Bubble sort)  — lent : O(n²)
// Idée : on compare les voisins deux par deux et on les échange s'ils
// sont dans le mauvais ordre. À chaque tour, le plus grand "remonte"
// à la fin comme une bulle.
// ---------------------------------------------------------------------
function bubbleSort(donnees) {
  const values = [...donnees];                 // copie du tableau
  // "fin" = dernière case pas encore triée (la fin se trie au fur et à mesure)
  for (let fin = values.length - 1; fin > 0; fin--) {
    let swap = false;                          // a-t-on fait un échange pendant ce tour ?
    for (let i = 0; i < fin; i++) {
      if (values[i] > values[i + 1]) {         // voisins dans le mauvais ordre
        [values[i], values[i + 1]] = [values[i + 1], values[i]]; // on les échange
        swap = true;
      }
    }
    if (!swap) break;                          // aucun échange = déjà trié, on arrête
  }
  return values;
}


// ---------------------------------------------------------------------
// TRI PAR SÉLECTION (Selection sort)  — lent : O(n²)
// Idée : on cherche le plus petit élément du reste du tableau
// et on le met à sa place, case par case (comme ranger des cartes
// en prenant toujours la plus petite).
// ---------------------------------------------------------------------
function selectionSort(donnees) {
  const values = [...donnees];
  for (let i = 0; i < values.length - 1; i++) {   // i = case qu'on veut remplir
    let indiceMin = i;                            // position du plus petit trouvé
    for (let j = i + 1; j < values.length; j++) { // on parcourt le reste
      if (values[j] < values[indiceMin]) {
        indiceMin = j;                            // nouveau plus petit
      }
    }
    if (indiceMin !== i) {                        // on place le minimum en case i
      [values[i], values[indiceMin]] = [values[indiceMin], values[i]];
    }
  }
  return values;
}


// ---------------------------------------------------------------------
// TRI PAR INSERTION (Insertion sort)  — O(n²), mais rapide si presque trié
// Idée : comme quand on trie ses cartes en main. On prend une carte
// et on décale les plus grandes vers la droite pour l'insérer au bon endroit.
// ---------------------------------------------------------------------
function insertionSort(donnees) {
  const values = [...donnees];
  for (let i = 1; i < values.length; i++) {
    const valeur = values[i];                 // la "carte" à placer
    let j = i - 1;                            // on regarde à sa gauche
    while (j >= 0 && values[j] > valeur) {    // tant que c'est plus grand...
      values[j + 1] = values[j];              // ...on décale d'une case à droite
      j--;
    }
    values[j + 1] = valeur;                   // on insère la carte au trou libéré
  }
  return values;
}


// ---------------------------------------------------------------------
// TRI FUSION (Merge sort)  — rapide : O(n log n)
// Idée "diviser pour régner" :
//   1. couper le tableau en deux moitiés
//   2. trier chaque moitié (la fonction s'appelle elle-même = RÉCURSIVITÉ)
//   3. fusionner les deux moitiés triées en une seule liste triée
// ---------------------------------------------------------------------
function mergeSort(donnees) {
  // Cas de base : 0 ou 1 élément = déjà trié, on arrête la récursivité
  if (donnees.length <= 1) {
    return [...donnees];
  }

  // 1. Couper en deux
  const milieu = Math.floor(donnees.length / 2);
  // 2. Trier chaque moitié (appel récursif)
  const gauche = mergeSort(donnees.slice(0, milieu));
  const droite = mergeSort(donnees.slice(milieu));

  // 3. Fusionner : on compare le 1er élément restant de chaque moitié
  //    et on prend le plus petit, jusqu'à vider une des deux moitiés
  const resultat = [];
  let i = 0;   // position dans "gauche"
  let j = 0;   // position dans "droite"
  while (i < gauche.length && j < droite.length) {
    if (gauche[i] <= droite[j]) {
      resultat.push(gauche[i]);
      i++;
    } else {
      resultat.push(droite[j]);
      j++;
    }
  }
  // On ajoute ce qui reste (une des deux moitiés est déjà vide)
  return resultat.concat(gauche.slice(i), droite.slice(j));
}


// ---------------------------------------------------------------------
// TRI RAPIDE (Quick sort)  — rapide en moyenne : O(n log n)
// Idée : on choisit un PIVOT (ici l'élément du milieu), puis on range
// les valeurs en 3 groupes : plus petites, égales, plus grandes.
// On trie ensuite les "petits" et les "grands" de la même façon (récursivité).
// ---------------------------------------------------------------------
function quickSort(donnees) {
  // Cas de base : 0 ou 1 élément = déjà trié
  if (donnees.length <= 1) {
    return [...donnees];
  }

  const pivot = donnees[Math.floor(donnees.length / 2)]; // valeur de référence
  const petits = [];   // < pivot
  const egaux = [];    // = pivot
  const grands = [];   // > pivot

  // On répartit chaque valeur dans le bon groupe
  for (const valeur of donnees) {
    if (valeur < pivot) {
      petits.push(valeur);
    } else if (valeur > pivot) {
      grands.push(valeur);
    } else {
      egaux.push(valeur);
    }
  }

  // On recolle : petits triés + égaux + grands triés
  // ("..." = étaler le contenu d'un tableau dans un autre)
  return [
    ...quickSort(petits),
    ...egaux,
    ...quickSort(grands)
  ];
}


// =====================================================================
//  BOGO SORT (pour rire) — l'algo le plus nul possible
//  Idée : mélanger au hasard jusqu'à ce que ce soit trié par chance.
//  Utilisable seulement sur de tout petits tableaux (3 éléments ici).
// =====================================================================

// Vérifie si un tableau est trié : chaque élément doit être <= au suivant
function estTrie(tableau) {
  for (let i = 1; i < tableau.length; i++) {
    if (tableau[i - 1] > tableau[i]) {
      return false;          // deux voisins dans le mauvais ordre -> pas trié
    }
  }
  return true;
}

// Mélange le tableau au hasard (algorithme de Fisher-Yates)
// Attention : modifie le tableau directement (pas de copie)
function melanger(tableau) {
  for (let i = tableau.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // case au hasard entre 0 et i
    [tableau[i], tableau[j]] = [tableau[j], tableau[i]]; // échange
  }
}

// Mélange en boucle jusqu'à ce que ce soit trié
// "limite" = nombre max d'essais pour éviter une boucle infinie
function bogoSort(tableau, limite = 100000) {
  const a = [...tableau];
  let tentatives = 0;
  while (!estTrie(a) && tentatives < limite) {
    melanger(a);
    tentatives++;
  }
  if (!estTrie(a)) {
    throw new Error("Trop de tentatives !"); // on abandonne avec une erreur
  }
  return a;
}


// =====================================================================
//  MESURE DU TEMPS (BENCHMARK)
// =====================================================================

// Lance un algo sur une copie des données et affiche le temps mis.
// performance.now() = heure actuelle en millisecondes (très précis)
// temps = fin - début
function benchmark(nom, algorithme, donnees) {
  const copie = [...donnees];
  const debut = performance.now();          // top départ du chrono
  const resultat = algorithme(copie);       // on exécute le tri
  const fin = performance.now();            // stop du chrono
  // padEnd(20) = ajoute des espaces pour aligner les noms en colonne
  // toFixed(4) = garder 4 chiffres après la virgule
  console.log(`${nom.padEnd(20, ' ')} : ${(fin - debut).toFixed(4)} ms`);
  return resultat;
}


// =====================================================================
//  PROGRAMME PRINCIPAL
// =====================================================================

// Tailles de tableaux à tester (pour voir comment le temps augmente)
const taillesTest = [3, 100, 1000, 10000];

// "Dictionnaire" nom -> fonction, pour pouvoir boucler sur tous les algos
const algorithmes = {
  "Bubble sort": bubbleSort,
  "Selection sort": selectionSort,
  "Insertion sort": insertionSort,
  "Merge sort": mergeSort,
  "Quick sort": quickSort
};

// Pour chaque taille : on génère UN tableau aléatoire,
// puis on le fait trier par chaque algo (sur une copie à chaque fois,
// pour que tous trient exactement les mêmes données)
taillesTest.forEach(taille => {
  console.log(`Test avec un tableau de : ${taille} éléments`);
  const donneesOriginales = genererTableauAleatoire(taille);

  // Object.entries(...) donne des paires [nom, fonction]
  for (const [nom, fonctionTri] of Object.entries(algorithmes)) {
    const copieDonnees = [...donneesOriginales];
    const debut = performance.now();
    fonctionTri(copieDonnees);
    const fin = performance.now();
    console.log(`- ${nom.padEnd(20, ' ')} : ${(fin - debut).toFixed(4)} ms`);
  }

  // Bogo sort seulement pour 3 éléments (sinon ça prendrait une éternité)
  if (taille === 3) {
    const copieBogo = [...donneesOriginales];
    const debutBogo = performance.now();
    bogoSort(copieBogo);
    const finBogo = performance.now();
    console.log(`- ${"Bogo sort".padEnd(20, ' ')} : ${(finBogo - debutBogo).toFixed(4)} ms`);
  }
});

// Même test, mais sur le tableau fixe DATA (180 valeurs)
console.log(`\nBenchmarks sur le grand dataset DATA :`);
benchmark("Bubble sort", bubbleSort, DATA);
benchmark("Selection sort", selectionSort, DATA);
benchmark("Insertion sort", insertionSort, DATA);
benchmark("Merge sort", mergeSort, DATA);
benchmark("Quick sort", quickSort, DATA);