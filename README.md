# Magasin
 Simulation de trafic dans un magasin

# Mise en place
Double cliquer sur le fichier index.html pour avoir la visualisation de la fenêtre


# Classes
* La classe Shop contient les informations relatives au magasin

* La classe Counter contient les informations relatives à une caisse

* La classe Customer contient les informations relatives à un client


# Journal de bord
## 05.10.2020
> J’ai choisis d’utiliser la librairie P5.js (https://p5js.org/) pour l’environnement graphique de l’application.
J’ai commencé par établir sur papier les différents éléments qui constituaient l’application.
J’ai ensuite écrit mes classes de base.
Pour terminer, j’ai affiché mes différents objets.
 
## 06.10.2020
> J’ai réalisé le déplacement de mes clients à l’aide des vecteurs mis à disposition par P5.js ainsi que la gestion de collision avec les bords. 
## 07.10.2020
> J’ai résolus quelque bug de collisions avec les bords.
J’ai commencé le déplacement des clients en direction des caisses ouvertes.
 
## 08.10.2020
> J’ai continué le déplacement des clients mais je n’ai pas réussis à comprendre le système d’orientation des vecteurs mis en place par P5.js (https://p5js.org/reference/#/p5.Vector) cependant j’ai réalisé sur mon tableau personnel une mise en situations qui fonctionne (il me semble ne pas avoir fait d’erreurs) à l’aide des notions acquises en physique sur les vecteurs. 
## 10.10.2020
> J’ai rajouté de fonctionnalités (couleur qui change pour les caisses ouvertes et fermées) ainsi que de méthodes. 
## 13.10.2020
> J’ai continué le déplacement des clients j’ai donc fouillés sur internet des exemples de cas concrets, mais je n’en ai pas trouvé. J’ai donc essayé de faire avec ce que j’ai compris. J’ai rajouté une flèche qui montre dans quelle direction le client se déplace pour m’aider à visualiser comment résoudre ces problèmes de vecteurs. 
## 14.10.2020
> J’ai refactorisé les éléments nécessaires et j’ai laissé tomber le déplacement des clients. J’ai commencé à travailler sur l’ouverture des caisses 
## 21.10.2020
> Ajout des textes visibles tel que le temps écoulé depuis le début, combien de temps reste le client, etc.. 
## 22.10.2020
> J’ai commencé à réaliser le système de file pour une caisse.  
## 23.10.2020
> J’ai continué le développement du système de file mais j’ai des problèmes de disparitions de clients aux mauvais moment et vu que c’est du JS je ne sais pas comment m’assurer qu’il soit bien supprimé et qu’aucune fonctions ne puissent y accéder. 
## 24.10.2020
> J’ai continué le développement du système de file. 
## 25.10.2020
> J’ai commencé le système d’ouverture et fermeture des caisses.

## 26.10.2020
> j’ai continué le système de caisses mais j’ai trop de problèmes et je me rends compte que c’était une mauvaise idée de se lancer dans une librairie javascript que je connais seulement un tout petit peu. J’aurais dû faire ce projet en C#, je pense que j’aurais peut-être mieux structurer mes objets ainsi que mon code dans son ensemble car le système de callback javascript, j’ai eu un grand nombre de problèmes à résoudre. Puis le dernier problème est celui des vecteurs, car j’ai passé 1 semaines à environ 1 à 2h par jours à tenter de résoudre les problèmes de vecteurs de P5.js
En modifiant mon code aujourd'hui j'ai créé un problème que je n'ai pas sû fixé, mais il s'agit de la suppresion de la liste, qui fonctionnait en début de matinée quand vous êtes venus m'aider. Donc cela ne mérite vraiment pas 4 même pour l'effort. 
