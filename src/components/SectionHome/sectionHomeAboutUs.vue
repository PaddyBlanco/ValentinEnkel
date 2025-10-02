<script setup lang="ts">
import ResponsiveImage from '../Core/ResponsiveImage.vue';

</script>

<template>

    <section>
        <div class="section-aboutus flex-row">
            <div class="flex-item text-right flex-bottom">
                    <ResponsiveImage name="aboutus/AboutUs-1" alt="Webentwicklung-Service bei Valentin & Enkel"
                        className="image-aboutus reveal right" v-inview sizes="100vw" />
            </div>
            <div class="flex-item flex-bottom">
                <div v-inview class="reveal right text-container">
                    <h1 class="mbe-1">Über uns.</h1>
                    <div class="text">
                        <p>Lorem ipsum dolor sit amet, consectetuer
                            adipiscing elit, sed diam nonummy nibh euismod
                            tincidunt ut laoreet dolore magna aliquam erat
                            volutpat. Ut wisi enim ad minim veniam, quis
                            nostrud exerci tation ullamcorper suscipit
                            lobortis nisl ut aliquip ex ea commodo
                            consequat.
                        </p>
                        <button class="btn mbs-2">Mehr</button>

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
        left: 50%;
        height: 0;
        width: var(--line-width);
        background:var(--line-color);
        transform: translateX(-50%);
        animation: drawLine 1.5s ease-out forwards;
        animation-delay: 2s;
    }



@keyframes drawLine {
    from {
        height: 0;
        /* Start mit 0 Höhe */
    }

    to {
        height: 100%;
        /* Von 30% bis 100% = 70% Länge */
    }
}

.section-aboutus {
    padding-block: 11rem;
}

.image-aboutus {
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: center right;
    width: 37vw;
    height: 37vw;
}


.text-container {
    margin-inline-start: 7vw;
    margin-bottom: 5px;

}

.text-container .text {
    max-width: 25vw;
    margin-inline-start: 7vw;
}

@media(max-width: 1000px) {
  .image-aboutus {
    width: 90vw;
    height: 90vw;
}
.line-1{
    left:30vw;
}
.flex-row {
    flex-direction: column;
    align-items: center;
}

.text-container {
    margin-inline-start: 0;
    margin-top: 3rem;
}
.text-container .text {
    max-width: 90vw;
    margin-inline-start: 0;

}
.section-aboutus {
    padding-block: 5rem;
}
}
</style>