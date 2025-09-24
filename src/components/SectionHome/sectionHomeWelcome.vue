<template>
    <CompAnimatedGradient/>
    <section class="welcome-section">
        <div class="welcome-text">
        <TextRotator :words="['Lösungen', 'Gestaltung', 'Fortschritt', 'Innovation', 'Ideen']"
                :interval="1800"
                :duration="420"
                easing="ease"
                :pauseOnHover="true"
                />
            <h2>von innen heraus.</h2>
        </div>
        <div class="pawn">
           <img src="/src/assets/Svgs/Logo/logo-pawn.svg" alt="Bauer" />
        </div>
        <div class="line-text monospace">scroll</div>
        <div class="line"> </div>
    </section>
</template> 

<script setup lang="ts">
import CompAnimatedGradient from './compAnimatedGradient.vue';
import TextRotator from './TextRotator.vue';

</script>

<style scoped>

.line{
    position:absolute;
    top:75vh;
    left:50%;
    height: 0;
    width:1px;
    background: white;  
    transform: translateX(-50%);
    
    animation: drawLine 2s ease-out forwards;
    animation-delay: 2s;
}

@keyframes drawLine {
  from {
    height: 0;                /* Start mit 0 Höhe */
  }
  to {
    height: 25vh;              /* Von 30% bis 100% = 70% Länge */
  }
}

.line-text{
    position:absolute;
    top: 77vh;
    left: calc(50% + 15px);
    color: white;
    transform:translateX(-50%) rotate(90deg);
    opacity: 0;
    animation: fadeIn 1s ease-out forwards;
    animation-delay: 1s;
}
@keyframes fadeIn {
  from {
    opacity: 0;                /* Start mit 0 Höhe */
  }
  to {
    opacity: 1;              /* Von 30% bis 100% = 70% Länge */
  }
}

.welcome-section{
    
    height: 100vh;
}
.pawn{
    position: absolute;
    bottom: 30px;
    right: 37px;
}
.pawn img{
    width: 50px;
    height: auto;
}


.welcome-text{
    position: absolute;
    top: 45%;
    left: 50%;
    width: 50%;
    color: white;
    z-index: 1;
}
@media(max-width: 768px){
    .welcome-text{
        top: 40%;
        left: 10%;
        width:90%;
    }
}
 
</style>
