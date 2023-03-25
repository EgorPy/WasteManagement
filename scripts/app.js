"use strict"

import categories from '../scripts/categories.json' assert {type: 'json'};
import recycle_locations from '../scripts/recycle_locations_database.json' assert {type: 'json'};
import recycle_hints from '../scripts/recycle_hints.json' assert {type: 'json'};

// main code

// making site visible if it is loaded
const onLoad = document.querySelector(".on-load")
const loading = document.querySelector(".loading")

window.addEventListener("load", function() {
    onLoad.style.display = "block"
    loading.style.display = "none"

    let waste_input = document.getElementById("waste_input")
    waste_input.addEventListener("keypress", function(event) {
        if (event.key === 'Enter') {
            let recommendations = document.getElementById("recommendations")
            let category_text = document.createElement("div")
            let waste = waste_input.value

            recommendations.innerHTML = ""

            category_text.classList.add("animate__animated", "animate__fadeIn", "part")
            
            let categories = getWasteCategories(waste)
            
            console.log(categories)
            if (categories.length === 1) {
                category_text.innerHTML = "Waste category: " + categories[0]
                recommendations.appendChild(category_text)
            } else if (categories.length > 1) {
                category_text.innerHTML = "Waste categories: " + categories
                recommendations.appendChild(category_text)
            }

            categories.forEach(category => {
                let hint_text = document.createElement("div")
                hint_text.classList.add("animate__animated", "animate__fadeIn", "part")
                hint_text.innerHTML = recycle_hints[category]

                recommendations.appendChild(hint_text)
            });
        }
    })
})

function getWasteCategories(waste) {
    let waste_categories = []
    for (const category in categories) {
        for (const i in categories[category]) {
            let item = categories[category][i]
            try {
                if (item === waste && !"asdiuh".includes(waste)) {
                    if (waste_categories.filter(x => x == category).length < 1) {
                        waste_categories.push(category)
                    }
                }
            } catch (TypeError) {}
        }
    }
    return waste_categories
}

// backInUp animations
const containersForBackInUpAnimatedElements = document.querySelectorAll(".animationBackInUp")

if (containersForBackInUpAnimatedElements.length > 0) {
    window.addEventListener("scroll", animateOfScrollBackInUp)

    function animateOfScrollBackInUp() {
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
}

// fadeIn animations
const fadeInAnimateItems = document.querySelectorAll(".animationFadeIn")

if (fadeInAnimateItems.length > 0) {
    window.addEventListener("scroll", animateOfScrollFadeIn)

    function animateOfScrollFadeIn() {
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
}
