"use strict"

import categories from '../scripts/categories.json' assert {type: 'json'};
import recycle_locations from '../scripts/recycle_locations_database.json' assert {type: 'json'};
import recycle_hints from '../scripts/recycle_hints.json' assert {type: 'json'};
import { animateOfScrollFadeIn } from "../scripts/animations.js"

// main code

// achievements list
// first_item
// 5th_item_organic
// 10th_item_organic
// 20th_item_organic
// 5th_item_plastic
// 10th_item_plastic
// 20th_item_plastic
// 5th_item_e-waste
// 10th_item_e-waste
// 20th_item_e-waste
// 5th_item_paper
// 10th_item_paper
// 20th_item_paper

// making site visible if it is loaded
const onLoad = document.querySelector(".on-load")
const loading = document.querySelector(".loading")

window.addEventListener("load", function() {
    onLoad.style.display = "block"
    loading.style.display = "none"

    const fadeInAnimateItems = document.querySelectorAll(".animationFadeIn")

    if (fadeInAnimateItems.length > 0) {
        window.addEventListener("scroll", animateOfScrollFadeIn)
    }

    let waste_input = document.getElementById("waste_input")
    waste_input.addEventListener("keypress", function(event) {
        if (event.key === 'Enter') {
            let recommendations = document.getElementById("recommendations")
            let recommendations_text = document.createElement("h3")
            let waste_category_text = document.createElement("h3")
            let nearby_recycling_text = document.createElement("h3")
            let category_text = document.createElement("div")
            let mark_recycled_button = document.createElement("button")
            let waste = waste_input.value

            recommendations.innerHTML = ""
            recommendations_text.innerHTML = "Recommendations"
            nearby_recycling_text.innerHTML = "Nearby recycling"
            mark_recycled_button.innerHTML = "Mark as recycled"

            category_text.classList.add("animate__animated", "animate__fadeIn", "part")
            recommendations_text.classList.add("animate__animated", "animate__fadeIn")
            waste_category_text.classList.add("animate__animated", "animate__fadeIn")
            nearby_recycling_text.classList.add("animate__animated", "animate__fadeIn")
            mark_recycled_button.classList.add("animate__animated", "animate__fadeIn", "button")
            
            let categories = getWasteCategories(waste)
            if (categories.length === 1) {
                waste_category_text.innerHTML = "Waste category"
                category_text.innerHTML = categories[0]
                recommendations.appendChild(waste_category_text)
                recommendations.appendChild(category_text)
            } else if (categories.length > 1) {
                waste_category_text.innerHTML = "Waste categories"
                category_text.innerHTML = categories
                recommendations.appendChild(waste_category_text)
                recommendations.appendChild(category_text)
            }
            
            if (categories.length >= 1) {
                recommendations.appendChild(recommendations_text)
            }
            categories.forEach(category => {
                let hint_text = document.createElement("div")

                hint_text.classList.add("animate__animated", "animate__fadeIn", "part")
                hint_text.innerHTML = recycle_hints[category]

                recommendations.appendChild(hint_text)
            });
            
            if (categories.length >= 1) {
                recommendations.appendChild(nearby_recycling_text)
            }
            categories.forEach(category => {
                let category_text = document.createElement("h4")
                category_text.classList.add("animate__animated", "animate__fadeIn")
                category_text.innerHTML = category
                recommendations.appendChild(category_text)
                let count = 0
                recycle_locations[category].forEach(element => {
                    if (count < 2) {
                        let recycle_location_text = document.createElement("div")
                        recycle_location_text.classList.add("animate__animated", "animate__fadeIn", "part")
                        recycle_location_text.innerHTML = `${element[0]}: <a class="tab" href="http://maps.google.com/?q=${element[1]}" target="_blank">location</a>`
                        recommendations.appendChild(recycle_location_text)
                        count++
                    }
                });
            });

            if (categories.length >= 1) {
                mark_recycled_button.addEventListener("click", function() {
                    let achievements = localStorage.getItem("achievements")
                    if (achievements === null) {
                        Swal.fire({
                            title: 'You got an achievement!',
                            text: 'This is your first item recycled!',
                            icon: "success",
                            padding: '3em',
                            color: 'green',
                            background: '#fff',
                            showConfirmButton: true,
                            confirmButtonColor: "green"
                        })
                        if (categories.length >= 1) {
                            localStorage.setItem("achievements", "first_item")
                        }
                    } else {
                        Swal.fire({
                            title: 'Congratulations!',
                            text: 'Our planet is cleaner now!',
                            icon: "success",
                            padding: '3em',
                            color: 'green',
                            background: '#fff',
                            showConfirmButton: true,
                            confirmButtonColor: "green"
                        })
                    }
                })
                recommendations.appendChild(mark_recycled_button)
            }
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
