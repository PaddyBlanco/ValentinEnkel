<script setup lang="ts">
import ResponsiveImage from './Core/ResponsiveImage.vue';

</script>

<template>
    <ResponsiveImage name="gradients/gradient-3" alt="Gradient für Valentin & Enkel Footer"
    className="footer-gradient" sizes="100vw" />
    <footer class="footer">
            <div class="footer-column logo-container">
                <img src="/src/assets/Svgs/Logo/Schriftzug-Bauer-v3.svg" alt="Valentin & enkel Logo mit Bauer" />
            </div>

            <div class="footer-column footer-text no-mobile">
                Wir sind ein technologieorientiertes Beratungsund  
                Entwicklungsunternehmen für Firmen mit technischem  
                Kern und entwickeln Lösungen gemeinsam mit den 
                Mitarbeiterinnen und Mitarbeitern vor Ort.
            </div>
            <div class="footer-column"> Linzerberg 5,<br>
                4209 Engerwitzdorf <br> <br>
                <a href="mailto: office@valentin-enkel.com">office@valentin-enkel.com</a> <br>
                <a href="tel: +436644150837"> +43 664 41 50 837</a>
            </div>
            <nav class="footer-column">
                <div> <a href="/Impressum">Impressum</a> </div>
                <div> <a href="/Datenschutz">Datenschutzerklärung</a></div>
                <div> <a href="/AGBs">AGBs</a></div>
            </nav>
    </footer>
</template>

<style scoped>
.footer-gradient {
    height: 7rem;
    object-fit: cover;
    width: 100%;
    object-position: center center;
}

.footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-block:10rem;
    font-size: calc(var(--font-size)*0.9);
}

.footer-column{
    width:22%;
    padding-inline-start: 5rem;
    word-wrap: break-word;
}
.footer-text{
    padding-inline: 0 3rem;
}

.logo-container{
     padding-inline: 7%;
}
nav div{
    margin-bottom: 1rem;
}

@media(max-width:1000px){
    .footer{
        margin-block: 2rem;
    } 
     .footer-column{
        width: 50%;
        padding-inline: 1rem;
    }
    .logo-container{
        width: 100%;
        margin-block-end:2rem;
    }
    .logo-container img{
        width: 40%;
    }
  
}
</style>