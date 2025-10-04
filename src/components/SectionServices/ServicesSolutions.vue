<script setup lang="ts">
import ResponsiveImage from '../Core/ResponsiveImage.vue';

</script>

<template>
    <section class="section flex-row">
        <div class="flex-item image-container">
            <div class="text-right">
                <ResponsiveImage name="services/Services-4"
                    alt="Roman Mitterlehner und Patrick Weiß spielen Schacht. Valentin & Enkel GmbH"
                    className="s-image-1 reveal left" v-inview sizes="25vw" />
            </div>
            <div>
                <ResponsiveImage name="services/Services-5" alt="Besprechung in der Industrie."
                    className="s-image-2 reveal left" v-inview sizes="10vw" />
            </div>
            <div class="text-center">
                <ResponsiveImage name="services/Services-3" alt="Besprechung in der Industrie. Valentin & Enkel"
                    className="s-image-3 reveal left" v-inview sizes="10vw" />
            </div>
        </div>
        <div class="flex-item text-container">
            <h2>Maßgeschneiderte Lösungen <br> für technische Industrien.</h2>
            <p>Unsere Lösungen entstehen im Betrieb selbst - realistisch, umsetzbar und so
                integriert, dass sie langfristig wirken, sich nahtlos in Abläufe einfügen und
                spürbare Verbesserungen schaffen.</p>
        </div>
        <div class="text-container-bottom no-mobile">
<p>Unser Ansatz verbindet Erfahrung, technisches Know-how und die
Haltung unseres Großvaters: bodenständig, lösungsorientiert und
menschenorientiert. Über 20 Jahre Industrieerfahrung, kontinuierliche
Weiterbildung und ein starkes Expert:innen-Netzwerk befähigen uns,
interdisziplinär zu arbeiten – von Unternehmensberatung über ITServices
bis zur Mechatronik.“</p>
        </div>
    </section>
</template>

<style scoped>
.image-container {
    padding-inline-end: 5vw;
}
.text-container h2{
     font-size: var(--h3-size); 
    line-height: calc(var(--h3-size)*1.1);
    margin-bottom: 2rem;
}

.text-container p{
    padding-right: 25%;

}
.text-container-bottom{
    padding-inline: 60% 5%;
    margin-bottom: 20vh;
}
.section{
    margin-top: 20vh;
}

.s-image-1 {
    width: 50%;
}

.s-image-2 {
    width: 30%;
    margin-inline-start: 15%;
    margin-block: 5rem;
}

.s-image-3 {
    width: 40%;
}
@media(max-width:1000px){
    .flex-row{
        flex-direction: column-reverse;
    }
   
}
</style>