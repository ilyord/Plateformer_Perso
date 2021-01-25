# On va travailler sur un Platformer






## 2021/01/04

Pour ce premier cours on attaque avec la partie la plus fastidieuse...désolé :grimacing:

- [Phaser](https://phaser.io/) **3** (j'insiste sur le 3) c'est quoi?
- Canvas & WEBGL c'est quoi?
- [Installation de Phaser](https://phaser.io/tutorials/getting-started-phaser3)
- Localhost c'est quoi?
- Installation d'un serveur web local [XAMPP](https://www.apachefriends.org/fr/index.html)
- hello world!
- Essayons de modifier le code pour voir comment ça réagit
- Regardons un peu [la doc du framework](https://photonstorm.github.io/phaser3-docs/)...
- Essayons quelques [exemples](https://phaser.io/examples)

## 2021/01/11

On rentre dans le vif du sujet, on attaque notre platfomer.

Dans ce repo vous avez une structure de projet qui fonctionne et que vous pouvez conserver et améliorerer bien entendu.
Le jeu est visible sur https://davidmarsprof.github.io/platformer. Vous noterez le petit pad qui permet de jouer sur mobile.
Ce pad n'est pas par défaut dans Phaser, c'est un petit bout de code que j'ai ajouté, on y reviendra (ou pas).

### Structure du projet

#### Les fichiers à la racine

- index.html

Le fichier qui contient votre jeu et un lien vers les ressources javascript nécessaires. 
Vous retournerez dans ce fichier chaque fois que vous voudrez ajouter une nouvelle classe (une scène, un monstre, un artefact...) à votre projet.

- main.css

Pas grand chose à dire ici car Phaser se charge de presque tout pour vous.

- main.js

C'est le fichier d'entrée de votre jeu. 
C'est ici que vous définirez **vos scènes et l'ordre dans lequel elles apparaissent**. 
Vous toucherez aussi assez souvent à la config qui vous permettra de **switcher entre le mode debug ou pas**.

#### Le répertoire `vendor`

Ce répertoire contient pour le moment uniquement le framework Phaser. Vous n'aurez pas à y toucher.

**Notes**:
*Dans la documentation, vous verrez souvent des termes comme `npm`, `yarn`, `package.json` ou `node_modules`. 
Tout ceci fait référence à ce que l'on appelle des gestionnaires de package ou de dépendances.
Si on voulait bien faire les choses, il faudrait les utiliser mais pour ne pas trop se prendre la tête dans ce cours, 
on zappe ces notions car elles ne vous apporteraient pas grand chose*

#### Le répertoire `assets`

C'est ici qu'on met les images, les sons, les vidéos et cie utilisés dans le jeu

#### Le répertoire `src`

On utilise le terme _src_ pour dire _sources_. C'est bien ici qu'on a le code source de notre jeu.

#### Le répertoire `src/scenes`

C'est ici que se trouvent les différentes scènes de votre jeu: Tableau00, Tableau01, Tableau02 etc...

#### Le répertoire `src/objects`

C'est ici qu'on met les classes des monstres, des pateformes, des décors etc... 


### Étude des tableaux 00 à 04

On va apprendre à :

- rajouter une scène (un tableau)
- jouer avec la gravité 
- positionner des éléments
- gérer nos premières collisions.
  




