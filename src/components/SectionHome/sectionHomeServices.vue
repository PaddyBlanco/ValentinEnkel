<template>
<section class="section-services">
    <h1>Was wir anbieten.</h1>
    <div class="text-container">
<p>Wir sind ein technologieorientiertes Beratungs- und Entwicklungsunternehmen für
Firmen mit technischem Kern – insbesondere im Maschinen- und Fahrzeugbau sowie in
der industriellen Serienfertigung – und entwickeln Lösungen gemeinsam mit den
Mitarbeiterinnen und Mitarbeitern vor Ort.</p> 
  <button class="btn">Services</button>
    </div>
 
        <img class="s-image-1" src="/src/assets/Images/Pictures/Services-1.webp" alt="valentin enkel geschäftsführer lachen"></img>
        <img class="s-image-2" src="/src/assets/Images/Pictures/Services-2.webp" alt="valentin enkel geschäftsführer lachen"></img>
        <!-- <img class="s-image-3" src="/src/assets/Images/Pictures/Services-3.webp" alt="valentin enkel geschäftsführer lachen"></img> -->
    
    
    <div class="line-1"></div>
    <div class="line-2"></div>

 
</section>
</template> 

<style scoped>


.s-image-1{
  position: absolute;
  right:10%;
  top:250px;
  width: 11%;
}
.s-image-2{
  position: absolute;
  right:20%;
  top:250px;
  width: 11%;
}
.s-image-3{
  position: absolute;
  right:10%;
  bottom:250px;
  width: 11%;
}
.section-services{
    position: relative;
    color: white;
    padding-block: 12rem;
    padding-left: 10%;
    border-bottom: 1px solid white;
}
.text-container{
    max-width: 45%;
    margin-left: 10%;
}
.text-container p{
    margin-block: 2rem;
}
.line-1{
    position:absolute;
    top:0;
    left:50%;
    height: 0;
    width:1px;
    background: white;  
    transform: translateX(-50%);
    animation: drawLine 4s ease-out forwards;
    animation-delay: 4s;
}


@keyframes drawLine {
  from {
    height: 0;                /* Start mit 0 Höhe */
  }
  to {
    height: 100%;              /* Von 30% bis 100% = 70% Länge */
  }
}




</style>
