    const images = [
        "https://picsum.photos/id/1015/1920/1080",
        "https://picsum.photos/id/1016/1920/1080",
        "https://picsum.photos/id/1018/1920/1080",
        "https://picsum.photos/id/1021/1920/1080"
    ];

    let currentIndex = 0;
    const hero = document.getElementById("hero");

    // Set initial background
    hero.style.backgroundImage = `url(${images[currentIndex]})`;

    // Change background every 6 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        hero.style.backgroundImage = `url(${images[currentIndex]})`;
    }, 6000);