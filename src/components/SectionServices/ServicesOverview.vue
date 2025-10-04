<template>
    <section class="section-services">
        <ResponsiveImage name="gradients/gradient-1" alt="Valentin & Enkel Gradient" className="gradient-background"
            sizes="100vw"></ResponsiveImage>
            <div class="overlay-black"></div>
        <div class="section">
            <h1 v-inview class="reveal top no-mobile">Unser Leistungsspektrum.</h1>
            <h1 v-inview class="reveal top only-mobile">Unser Leistungs-spektrum.</h1>
            <div class="flex-row gap-3">
                <div v-inview class="flex-item reveal bottom">
                    <h2 class="flex-item " >Hauptleistungen.</h2>
                    <ul class="chevron-list">
                        <li>Technologische Unternehmensberatung</li>
                        <li>Individuelle Softwareentwicklung &amp; Digitalisierung</li>
                        <li>Prozessoptimierung &amp; Lean Management</li>
                        <li>QMS-Einführung und ISO&nbsp;9001 Zertifizierungsvorbereitung</li>
                        <li>Wissensmanagementsysteme</li>
                        <li>Innovationsmanagement &amp; Innovationsworkshops</li>
                        <li>Engineering, Konstruktion &amp; Produktentwicklung im Maschinenbau/Mechatronik</li>
                        <li>Prototypenentwicklung</li>
                        <li>Externe Projektleitung &amp; Technische Umsetzung</li>
                    </ul>
                </div>
                <div v-inview class="flex-item reveal bottom">
                    <h2>Nebenleistungen.</h2>
                    <ul class="chevron-list">
                        <li>Grundlagen der IT- und Arbeitssicherheit</li>
                        <li>Datenschutzgrundverordnungs-Basics (DSGVO)</li>
                        <li>Patent- & Markenstrategie (inkl. Patentrecherche,</li>
                        <li>Förderberatung, Schnittstelle zum Patentanwalt)</li>
                        <li>KI-Lösungen (einführend oder ergänzend zur</li>
                        <li>Digitalisierung)</li>
                    </ul>
                </div>
                 <div v-inview class="flex-item reveal bottom">
                    <h2>Weitere Leistungen.</h2>
                   <p>Alle Leistungen im Überblick finden Sie in unserem Portfolio.</p>
                   <button class="btn mbs-2">Portfolio Download</button>
                </div>
            </div>
        </div>
    </section>

</template>

<script setup lang="ts">
import ResponsiveImage from '../Core/ResponsiveImage.vue';

</script>

<style scoped>
.section-services {
    position: relative;
}
.section{
    padding-block: 4rem;
}
.section h1{
    margin-block-end: 4rem;
    word-wrap: break-word;
    width: 100%;
}

.flex-item h2{
    font-size: var(--h4-size);
   line-height: calc(var(--h4-size)*1.1);
   margin-bottom: 1rem;
}

.gradient-background {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
}
.overlay-black{
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-color: #00000075;
}

.chevron-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.chevron-list li {
  position: relative;
  padding-left: 1.25rem;
  line-height: 1.5;
}

.chevron-list li::before {
  content: ">";
  position: absolute;
  left: 0;
  top: 0;
  width: 1rem;
}
</style>