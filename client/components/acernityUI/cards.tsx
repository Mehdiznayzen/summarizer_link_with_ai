"use client";


import { LayoutGrid } from "./LayoutGrid";
import image1 from '@/public/images/img1 (1).jpg'
import image2 from '@/public/images/img1 (2).jpg'
import image3 from '@/public/images/img2 (1).jpg'
import image4 from '@/public/images/img2 (2).jpg'


function LayoutGridDemo() {
  return (
    <div className="h-screen py-20 w-full">
      <LayoutGrid
        cards={cards} 
      />
    </div>
  );
}

export default LayoutGridDemo

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">L'avenir des Résumés de Liens avec l'IA</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        L'avenir des résumés de liens avec l'IA est prometteur, avec des améliorations continues en NLP et des
        applications potentielles dans divers domaines comme l'éducation.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Applications Pratiques des Résumés de Liens IA</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Les résumés de liens IA peuvent être intégrés dans des applications de lecture de nouvelles,
        des systèmes de gestion de connaissances d'entreprise et des assistants virtuels
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Comment Fonctionne un Résumeur de Liens IA ?</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Un résumeur de liens IA analyse le contenu du lien, identifie les idées principales et génère un résumé concis 
        en utilisant des techniques avancées de NLP et des modèles de machine learning.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Défis et Limites des Systèmes de Résumé de Liens IA</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Malgré les progrès significatifs, les systèmes de résumé de liens basés sur l'IA peuvent encore 
        rencontrer des difficultés avec les nuances du langage et le contexte, 
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail: image1
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:image2
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail: image3
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail: image4
  },
];
