<template>

  <section class="section-approach" id="approach-snap">
    <div class="overlay-header">
      <h1>Unser Ansatz.</h1>
      <div class="line-h"></div>
    </div>
    <div class="overlay-gradient-top"></div>
    <div class="overlay-gradient-bottom"></div>
    <div class="overlay-bottom"></div>


    <div class="approach-steps">
      <div v-for="step in steps" :key="step.nr" class="step">
        <div class=" step-text-container">
          <div class="flex-row">
            <div class="text-nr">{{ step.nr }}</div>
          <div class="flex-item flex-center text-title"> <h3> {{ step.title }}</h3> </div>
        </div>
          <div class="step-image-container-mobile">
            <ResponsiveImage name="aboutus/AboutUs-1" alt="Webentwicklung-Service bei Valentin & Enkel"
                        className="step-image" sizes="40vw" />
        </div>
          <div class="text-container">
            <p>{{ step.description }}</p>
          </div>
        </div>
        <div class="step-image-container">
            <ResponsiveImage name="aboutus/AboutUs-1" alt="Webentwicklung-Service bei Valentin & Enkel"
                        className="step-image" sizes="40vw" />
        </div>
      </div>

    </div>

  </section>
</template>
<script setup lang="ts">
import ResponsiveImage from '../Core/ResponsiveImage.vue';


const steps = [
  {
    nr: "1",
    title: "Erstgespräch & Kennenlernen",
    image: "/images/approach/approach-step1.jpg",
    imageAlt: "Erstgespräch mit Geschäftsführung",
    description: `In einem unverbindlichen Gespräch lernen Sie uns, unsere Arbeitsweise
und unser Leistungsspektrum kennen. Gleichzeitig möchten wir Ihr Unternehmen und Ihre
Herausforderungen verstehen – offen und auf Augenhöhe. Mit einer NDA schaffen wir
die Basis für eine vertrauensvolle Zusammenarbeit.`
  },
  {
    nr: "2",
    title: "Eintauchen ins Unternehmen",
    image: "/images/approach/approach-step2.jpg",
    imageAlt: "Workshop im Unternehmen",
    description: `Wir nehmen uns Zeit, Ihr Unternehmen ganzheitlich zu verstehen –
vor Ort, im Dialog mit den Menschen. So erhalten wir Einblicke in Organisation,
Zusammenarbeit, Prozesse und Wertschöpfung. Darauf aufbauend zeigen wir Potenziale
und Entwicklungsmöglichkeiten auf.`
  },
  {
    nr: "3",
    title: "Angebotslegung",
    image: "/images/approach/approach-step3.jpg",
    imageAlt: "Besprechung Angebot",
    description: `Auf Basis unserer Erkenntnisse entwickeln wir konkrete, realistische
und wirtschaftlich sinnvolle Umsetzungsvorschläge. Daraus entsteht ein individuelles
Angebot. Bis hierhin ist unser Service zu 100% kostenlos.`
  },
  {
    nr: "4",
    title: "Projektabwicklung",
    image: "/images/approach/approach-step4.jpg",
    imageAlt: "Projektumsetzung mit Team",
    description: `Wir entwickeln maßgeschneiderte Software-, Produkt- oder Prozesslösungen
im engen Austausch mit Ihren Schlüsselpersonen. Die Verantwortung bleibt bei uns –
wir bleiben Ihr zentraler Ansprechpartner und begleiten Sie bis zum Ergebnis.`
  },
  {
    nr: "",
    title: "Unser Ziel",
    image: "/images/approach/approach-goal.jpg",
    imageAlt: "Langfristige Zusammenarbeit",
    description: `Wir schaffen Strukturen und Technologien, die sich nahtlos in bestehende
Abläufe integrieren. Unser Anspruch: messbarer Mehrwert, nachhaltige Ergebnisse und
Lösungen, die Bestand haben.`
  }
];
</script>


<style scoped>

.approach-steps {
  margin-top: calc(-30dvh + 2rem);
  padding-block-end: 30dvh;
  background: var(--background-color);
}

.step {
  display: flex;
  flex-direction: row;
  margin-inline: 10%;
  min-height: 55vh;
  border-radius: 12px;

}

.step-text-container {
  flex: 1;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.step-image-container {
  align-items: center;
  justify-content: center;
  margin-block:auto;
}
.step-image{
  width: 15vw;
  aspect-ratio: 3/4;
  object-fit: cover;
}


.text-container{
  margin-left:10%;
}
.text-container p{
 max-width: 700px;
 text-align: left;
}

.text-nr {
  font-size: calc((var(--h2-size) * 2.1));
  padding-inline-end: 2rem;
   font-family: 'Cal Sans';
  color: var(--primary-color);
}

.text-title{
  max-width: 500px;
  justify-items: start;
}


.section-approach {
  position: relative;
  overflow: visible;
  padding-inline: 0;
}

.overlay-header {
  position: sticky;
  z-index: 1;
  top: 0;
  height: 20dvh;
  padding-top: 8dvh;
  padding-bottom: 2rem;
  padding-left: 8%;
  background-color: var(--background-color);
  border-bottom: var(--line-width) solid var(--line-color);
}

.overlay-gradient-top {
  position: sticky;
  top: 20dvh;
  height: 15dvh;
  background: linear-gradient(180deg, var(--background-color) 0%, transparent 100%);
}


.overlay-gradient-bottom {
  position: sticky;
  top: 70dvh;
  height: 15dvh;
  background: linear-gradient(0deg, var(--background-color) 50%, transparent 100%);

}

.overlay-bottom {
  position: sticky;
  top: 85dvh;
  bottom: 0;
  height: 15dvh;
  width: 100%;
  background-color: var(--background-color);
  border-top: var(--line-width) solid var(--line-color);

}

.line-h {
  position: absolute;
  top: 0;
  z-index: 2;
  left: 50%;
  height: 100%;
  width: var(--line-width);
  background: var(--line-color);
  transform: translateX(-50%);
  animation: drawLine 1.5s ease-out forwards;
  animation-delay: 2s;
}
.step-image-container-mobile{
  display: none;
}

@media (max-width: 1000px) {
  .line-h{
    left: 30%;
  }
  .overlay-header{
     height: 30dvh;
     padding-top:5rem;
  }
  .overlay-gradient-top{
      top: 30dvh;
  }
  .overlay-bottom{
      top: 90dvh;
      height: 10dvh;
  }
  .overlay-gradient-bottom{
      top: 80dvh;
  }
  .overlay-header h1{
     width: 70%;
  }
  .approach-steps{
    display: flex;
    flex-direction: column;
  }
  .step{
    flex-direction: column;
    min-width: 80vw;
    min-height: auto;
    padding-inline:1rem;
    padding-block-end:5rem;
    margin:0;
  }
  .step-text-container{
    width: 100%;
  }
  .text-container{
    margin-left:0;
    margin-top:1rem;
  }
  
.text-nr {
  font-size: calc(var(--h2-size)*2.2);
  padding-inline-end: 20px;
   font-family: 'Cal Sans';
  color: var(--primary-color);
}
.text-title h3{
  font-size: 25px;
}
.step-image-container{
  display: none;
}
.step-image-container-mobile{
  display: block;
  width: 100%;
}
.step-image{
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
}


}
</style>
