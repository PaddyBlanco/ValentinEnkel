<template>

  <section class="section section-approach" id="approach-snap">
    <div class="overlay-header">
      <h1>Unser Ansatz.</h1>
      <div class="line-h"></div>
    </div>
    <div class="overlay-gradient-top"></div>
    <!-- <div class="overlay-navigation dots">
      <a  v-for="s in steps" :key="s.nr" :href="'#'+s.nr" :ref="s.nr" :class="true?'inview':''">
      <div class="dot">
      </div>
    </a>
    </div> -->
    <div class="overlay-gradient-bottom"></div>
    <div class="overlay-bottom flex-row">
     <div class="flex-item text-right mbs-1 mie-1"><router-link to="/Services" class="btn overlay-button">Services</router-link></div> 
      <div class="line-h"></div>
      <div class="monospace mie-2 mbs-1 flex-item text-right">Für Lösungen, die wirken</div>
    </div>


    <div class="approach-steps">
      <div v-for="step in steps" :key="step.nr" class="step">
        <div class=" step-text-container">
          <div class="flex-row">
            <div class="text-nr">{{ step.nr }}</div>
            <div class="flex-item flex-center text-title">
              <h2> {{ step.title }}</h2>
            </div>
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
    description: `In einem unverbindlichen Gespräch lernen wir Ihr Unternehmen
und Ihre Ausgangssituation kennen. Offen, auf Augenhöhe und mit
Geheimhaltungsvereinbarung schaffen wir die Basis für eine
vertrauensvolle Zusammenarbeit.`
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
  margin-block: auto;
}

.step-image {
  width: 15vw;
  aspect-ratio: 3/4;
  object-fit: cover;
}


.text-container {
  margin-left: 10%;
}

.text-container p {
  max-width: 700px;
  text-align: left;
}

.text-nr {
  font-size: calc((var(--h2-size) * 2.1));
  padding-inline-end: 2rem;
  font-family: 'Cal Sans';
  color: var(--primary-color);
}

.text-title {
  max-width: 500px;
  justify-items: start;
}
.text-title h2{
    font-size: var(--h3-size); 
    line-height: calc(var(--h3-size)*1.1);
}


.section-approach {
  position: relative;
  overflow: visible;
  padding-inline: 0;
}

.overlay-header {
  position: sticky;
  z-index: 2;
  top: 0;
  height: 25dvh;
  padding-top: 12dvh;
  padding-inline:calc((100dvw - 1800px) / 2 + 100px);


  background-color: var(--background-color);
  border-bottom: var(--line-width) solid var(--line-color);
}

.overlay-gradient-top {
  position: sticky;
  top: 25vh;
  height: 15vh;
  background: linear-gradient(180deg, var(--background-color) 0%, transparent 100%);
}

/* .overlay-navigation{
  position: sticky;
  z-index: 2;
  top: 25vh;
  left: 95%;
  height: 15vh;
  width:5%;
}
.dots{
  display: flex;
  gap: 3dvh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.dot{
  height: 10px;
  width: 10px;
  background-color: var(--color);
  border-radius: 5px;
  border: 1px solid red;
} */


.overlay-gradient-bottom {
  position: sticky;
  top: 75dvh;
  height: 15dvh;
  background: linear-gradient(0deg, var(--background-color) 50%, transparent 100%);
}


.overlay-bottom {
  position: sticky;
  z-index: 1;
  top: 90dvh;
  bottom: 0;
  height: 10dvh;
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

.step-image-container-mobile {
  display: none;
}

@media (max-width: 1000px) {
  .line-h {
    left: 30%;
  }

  .overlay-header {
    height: 27vh;
    padding-top: 5rem;
    padding-inline-start: 20px;

  }

  .overlay-gradient-top {
    top: 27vh;
  }

  .overlay-bottom {
    top: 90dvh;
    height: 10dvh;
  }

  .overlay-gradient-bottom {
    top: 80dvh;
  }

  .overlay-header h1 {
    width: 70%;
  }

  .approach-steps {
    display: flex;
    flex-direction: column;
  }

  .step {
    flex-direction: column;
    min-width: 80vw;
    min-height: auto;
    padding-inline: 1rem;
    padding-block-end: 5rem;
    margin: 0;
  }

  .step-text-container {
    width: 100%;
  }

  .text-container {
    margin-left: 0;
    margin-top: 1rem;
  }

  .text-nr {
    font-size: calc(var(--h2-size)*2.2);
    padding-inline-end: 20px;
    font-family: 'Cal Sans';
    color: var(--primary-color);
  }

  .text-title h3 {
    font-size: 25px;
  }

  .step-image-container {
    display: none;
  }

  .step-image-container-mobile {
    display: block;
    width: 100%;
  }

  .step-image {
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
  }


}
</style>
