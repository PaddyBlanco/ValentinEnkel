<template>
    <div class="section-home">
        <div class="gradient-bg">
            <svg xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="goo">
                        <feTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='1' stitchTiles='stitch' />
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                            result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>
            <div class="gradients-container">
                <div class="g g1"></div>
                <div class="g g2"></div>
                <div class="g g3"></div>
                <div class="g g4"></div>
                <div class="g g5"></div>
                <div class="g interactive"></div>
            </div>
        </div>
        <div class="gradient-bg-noise"> </div>
    </div>
</template>


<style scoped>
.section-home {
    --color-bg2: #5f1900;
    --color-bg1: #002c29;
    --color1: #ffd1accc;
    --color2: #00747acc;
    --color3: #B64D0Ccc;
    --color4: #005c56cc;
    --color5: #ff3c00c8;
    --color-interactive: #00889dcc;
    --circle-size: 80%;
    --blending: hard-light;

    position:absolute;
    top:0;
    left:0;
    z-index: -2;
    width: 100%;
    height: 100vh;
}


.gradient-bg-noise {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100vh;
    opacity: 0.8;
    background-image: url(/src/assets/Images/Gradients/noise.webp);
}


@keyframes moveInCircle {
    0% {
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(180deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes moveVertical {
    0% {
        transform: translateY(-50%);
    }

    50% {
        transform: translateY(50%);
    }

    100% {
        transform: translateY(-50%);
    }
}

@keyframes moveHorizontal {
    0% {
        transform: translateX(-50%) translateY(-10%);
    }

    50% {
        transform: translateX(50%) translateY(10%);
    }

    100% {
        transform: translateX(-50%) translateY(-10%);
    }
}

.gradient-bg {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background: linear-gradient(40deg, var(--color-bg1), var(--color-bg2));
    top: 0;
    left: 0;
}

svg {
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
}


.gradients-container {
    filter: url(#goo) blur(40px);
    width: 100%;
    height: 100%;

}

.g{  
    position: absolute;
    width: var(--circle-size);
    height: var(--circle-size);
    mix-blend-mode: var(--blending);    
    opacity: 1;
}

.g1 {
    background: radial-gradient(circle at center, var(--color1) 0, rgba(255, 255, 255, 0) 50%) no-repeat;
    top: calc(50% - var(--circle-size) / 2);
    left: calc(50% - var(--circle-size) / 2);
    transform-origin: center center;
    animation: moveVertical 30s ease infinite;

}

.g2 {

    background: radial-gradient(circle at center, var(--color2) 0, rgba(0, 0, 0, 0) 50%) no-repeat;
    top: calc(50% - var(--circle-size) / 2);
    left: calc(50% - var(--circle-size) / 2);
    transform-origin: calc(50% - 400px);
    animation: moveInCircle 20s reverse infinite;

}

.g3 {

    background: radial-gradient(circle at center, var(--color3) 0, rgba(0, 0, 0, 0) 50%) no-repeat;
    top: calc(50% - var(--circle-size) / 2 + 200px);
    left: calc(50% - var(--circle-size) / 2 - 500px);
    transform-origin: calc(50% + 400px);
    animation: moveInCircle 40s linear infinite;
}

.g4 {
    background: radial-gradient(circle at center, var(--color4) 0, rgba(0, 0, 0, 0) 50%) no-repeat;
    top: calc(50% - var(--circle-size) / 2);
    left: calc(50% - var(--circle-size) / 2);
    transform-origin: calc(50% - 200px);
    animation: moveHorizontal 40s ease infinite;
    opacity: 0.7;
}

.g5 {
    background: radial-gradient(circle at center, var(--color5) 0, rgba(0, 0, 0, 0) 50%) no-repeat;
    width: calc(var(--circle-size) * 2);
    height: calc(var(--circle-size) * 2);
    top: calc(50% - var(--circle-size));
    left: calc(50% - var(--circle-size));
    transform-origin: calc(50% - 800px) calc(50% + 200px);
    animation: moveInCircle 20s ease infinite;
}

.interactive {
    background: radial-gradient(circle at center, var(--color-interactive) 0, rgba(0, 0, 0, 0) 50%) no-repeat;
    width: 100%;
    height: 100%;
    top: -50%;
    left: -50%;
    opacity: 0.7;
}
</style>

<script setup lang="ts">
document.addEventListener('DOMContentLoaded', () => {
    const interBubble = document.querySelector<HTMLDivElement>('.interactive')!;
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(() => {
            move();
        });
    }

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();
});
</script>