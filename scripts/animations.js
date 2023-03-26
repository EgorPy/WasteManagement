// backInUp animations
export function animateOfScrollBackInUp() {
    for (let i = 0; i < containersForBackInUpAnimatedElements.length; i++) {
        if (window.pageYOffset - 100 > i * window.innerHeight) {
            containersForBackInUpAnimatedElements[i].classList.remove("animationBackInUp")
            for (let j = 0; j < containersForBackInUpAnimatedElements[i].children.length; j++) {
                const animateItem = containersForBackInUpAnimatedElements[i].children[j]
                setTimeout(function() {
                    if (!animateItem.classList.contains("animate__animated")) {
                        animateItem.classList.add("animate__animated")
                        animateItem.classList.add("animate__backInUp")
                        animateItem.classList.remove("hide")
                    }
                }, Math.round(j * 100))
            }
        }
    }
}

// fadeIn animations
export function animateOfScrollFadeIn() {
    for (let i = 0; i < fadeInAnimateItems.length; i++) {
        if (window.pageYOffset - 100 > i * window.innerHeight) {
            const animateItem = fadeInAnimateItems[i]
            if (!animateItem.classList.contains("animate__animated")) {
                animateItem.classList.remove("animationFadeIn")
                animateItem.classList.add("animate__animated")
                animateItem.classList.add("animate__fadeIn")
            }
        }
    }
}
