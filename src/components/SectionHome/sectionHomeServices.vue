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
    
    <div class="line"></div>

 
</section>
</template> 

<style scoped>

.section-services{
    position: relative;
    color: white;
    padding-block: 20rem;
    padding-left: 22%;
}

.line{
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

h1{
   
}

.text-container{
    max-width: 30vw;
     margin-left: 5%;
}
.text-container p{
    margin-bottom: 2rem;
}
</style>
