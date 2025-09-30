<template>
    
  <section class="section-approach"> 
     <div class="line-h"></div>
    <div class="approach-header">
        <div class="header-text"><h1>Unser Ansatz.</h1></div>
        <div class="header-gradient"></div>
    </div>
  

    <div class="approach-items">
      <div class="item">Item 1</div>
      <div class="item">Item 2</div>
      <div class="item">Item 3</div>
      <div class="item">Item 4</div>
      <div class="item">Item 5</div>
    </div>

  </section>
</template>

<style scoped>

.section-approach{
  position: relative;
  overflow: visible; 
  padding-inline: 0;;      
}

.approach-header{
  position: sticky;
  top: 0;
  z-index: 0;
}
.header-text{
  padding-top:10vh;
  padding-left: 10vw;
  padding-bottom:2rem; 
  background: var(--background-color);   
  border-bottom: var(--line-width) solid var(--line-color); 
}
.header-gradient{
  height:10vh;
  background: linear-gradient(180deg, var(--background-color), transparent);
  border-radius: 2px;
  margin-bottom: 1rem;
}


/* Sorgt für genügend Scrollstrecke zwischen Header und Footer */
.approach-items{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding-block: 5rem;
    background: var(--background-color);
}

.item{
  width: 90vw;
  height: 30vh;
  border: 1px dashed #ccc;
  border-radius: 12px;
}

.line-h {
    position: absolute;
    top: 0;
    z-index: 1;
    left: 50%;
    height: 100%;
    width: var(--line-width);
    background:var(--line-color);
    transform: translateX(-50%);
    animation: drawLine 1.5s ease-out forwards;
    animation-delay: 2s;
}
</style>
