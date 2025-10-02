<script setup lang="ts">
import ResponsiveImage from '../Core/ResponsiveImage.vue';

</script>

<template>

    <section>
        <div class="section-aboutus flex-row">
            <div class="image-container text-right flex-bottom">
                <div class="only-mobile">
                    <h1 class="mbe-1 w-100 text-left">Ihr Weg <br> zu uns.</h1>

                </div>

                <ResponsiveImage name="contact/Contact" alt="Webentwicklung-Service bei Valentin & Enkel"
                    className="image-contact reveal right" v-inview sizes="70vw" />
            </div>
            <div class="text-container flex-bottom">
                <div v-inview class="reveal right text-container-inner">
                    <h1 class="mbe-1 no-mobile">Ihr Weg <br> zu uns.</h1>
                    <div class="text">
                        <p>Linzerberg 5,<br>
                            4209 Engerwitzdorf <br> <br>
                            <a href="mailto: office@valentin-enkel.com">office@valentin-enkel.com</a> <br>
                            <br>
                            <a href="tel: +436644150837"> +43 664 41 50 837</a>
                        </p>
                        <a href="/contact" class="btn mbs-2">Kontakt</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="line-1"></div>

    </section>
</template>


<style scoped>
.line-1 {
    position: absolute;
    top: 0;
    z-index: 0;
    left: 50%;
    height: 100%;
    width: var(--line-width);
    background: var(--line-color);
    transform: translateX(-50%);

}


.section-aboutus {
    padding-block: 11rem;
}

.image-contact {
    aspect-ratio: 4/3;
    object-fit: cover;
    object-position: center right;
    width: 40vw;
    z-index: 2;
}

.image-container{
    width: 60%;
}
.text-container-inner {
    margin-inline-start: 7vw;
    margin-bottom: 5px;
}
.text-container {
   width:40%;   
}

.text-container .text {
    max-width: 25vw;
    margin-inline-start: 7vw;
}

@media(max-width: 1000px) {
    .image-contact {
        width: 100%;
    }

    .line-1 {
        left: 30vw;
    }

    .flex-row {
        flex-direction: column;
        align-items: center;
    }

    .text-container-inner {
        margin-inline-start: 32%;
        margin-top: 3rem;
    }
    .text-container, .image-container{
        width: 100%;
    }

    .text-container-inner .text {
        max-width: 90vw;
        margin-inline-start: 0;

    }

    .section-aboutus {
        padding-block: 5rem;
    }
}
</style>