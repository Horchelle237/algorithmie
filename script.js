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

function genererTableauAleatoire(taille) {
  const tab = [];
  for (let i = 0; i < taille; i++) {
    tab.push(Math.floor(Math.random() * 20000) - 10000);
  }
  return tab;
}

function bubbleSort(donnees) {
  const values = [...donnees];
  for (let fin = values.length - 1; fin > 0; fin--) {
    let swap = false;
    for (let i = 0; i < fin; i++) {
      if (values[i] > values[i + 1]) {
        [values[i], values[i + 1]] = [values[i + 1], values[i]];
        swap = true;
      }
    }
    if (!swap) break;
  }
  return values;
}

function selectionSort(donnees) {
  const values = [...donnees];
  for (let i = 0; i < values.length - 1; i++) {
    let indiceMin = i;
    for (let j = i + 1; j < values.length; j++) {
      if (values[j] < values[indiceMin]) {
        indiceMin = j;
      }
    }
    if (indiceMin !== i) {
      [values[i], values[indiceMin]] = [values[indiceMin], values[i]];
    }
  }
  return values;
}

function insertionSort(donnees) {
  const values = [...donnees];
  for (let i = 1; i < values.length; i++) {
    const valeur = values[i];
    let j = i - 1;
    while (j >= 0 && values[j] > valeur) {
      values[j + 1] = values[j];
      j--;
    }
    values[j + 1] = valeur;
  }
  return values;
}

function mergeSort(donnees) {
  if (donnees.length <= 1) {
    return [...donnees];
  }
  const milieu = Math.floor(donnees.length / 2);
  const gauche = mergeSort(donnees.slice(0, milieu));
  const droite = mergeSort(donnees.slice(milieu));
  
  const resultat = [];
  let i = 0;
  let j = 0;
  while (i < gauche.length && j < droite.length) {
    if (gauche[i] <= droite[j]) {
      resultat.push(gauche[i]);
      i++;
    } else {
      resultat.push(droite[j]);
      j++;
    }
  }
  return resultat.concat(gauche.slice(i), droite.slice(j));
}

function quickSort(donnees) {
  if (donnees.length <= 1) {
    return [...donnees];
  }
  const pivot = donnees[Math.floor(donnees.length / 2)];
  const petits = [];
  const egaux = [];
  const grands = [];
  for (const valeur of donnees) {
    if (valeur < pivot) {
      petits.push(valeur);
    } else if (valeur > pivot) {
      grands.push(valeur);
    } else {
      egaux.push(valeur);
    }
  }
  return [
    ...quickSort(petits),
    ...egaux,
    ...quickSort(grands)
  ];
}

function estTrie(tableau) {
  for (let i = 1; i < tableau.length; i++) {
    if (tableau[i - 1] > tableau[i]) {
      return false;
    }
  }
  return true;
}

function melanger(tableau) {
  for (let i = tableau.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tableau[i], tableau[j]] = [tableau[j], tableau[i]];
  }
}

function bogoSort(tableau, limite = 100000) {
  const a = [...tableau];
  let tentatives = 0;
  while (!estTrie(a) && tentatives < limite) {
    melanger(a);
    tentatives++;
  }
  if (!estTrie(a)) {
    throw new Error("Trop de tentatives !");
  }
  return a;
}

function benchmark(nom, algorithme, donnees) {
  const copie = [...donnees];
  const debut = performance.now();
  const resultat = algorithme(copie);
  const fin = performance.now();
  console.log(`${nom.padEnd(20, ' ')} : ${(fin - debut).toFixed(4)} ms`);
  return resultat;
}

const taillesTest = [3, 100, 1000, 10000];

const algorithmes = {
  "Bubble sort": bubbleSort,
  "Selection sort": selectionSort,
  "Insertion sort": insertionSort,
  "Merge sort": mergeSort,
  "Quick sort": quickSort
};

taillesTest.forEach(taille => {
  console.log(`Test avec un tableau de : ${taille} éléments`);
  const donneesOriginales = genererTableauAleatoire(taille);
  for (const [nom, fonctionTri] of Object.entries(algorithmes)) {
    const copieDonnees = [...donneesOriginales];
    const debut = performance.now();
    fonctionTri(copieDonnees);
    const fin = performance.now();
    console.log(`- ${nom.padEnd(20, ' ')} : ${(fin - debut).toFixed(4)} ms`);
  }
  if (taille === 3) {
    const copieBogo = [...donneesOriginales];
    const debutBogo = performance.now();
    bogoSort(copieBogo);
    const finBogo = performance.now();
    console.log(`- ${"Bogo sort".padEnd(20, ' ')} : ${(finBogo - debutBogo).toFixed(4)} ms`);
  }
});

console.log(`\nBenchmarks sur le grand dataset DATA :`);
benchmark("Bubble sort", bubbleSort, DATA);

benchmark("Selection sort", selectionSort, DATA);
benchmark("Insertion sort", insertionSort, DATA);
benchmark("Merge sort", mergeSort, DATA);
benchmark("Quick sort", quickSort, DATA);