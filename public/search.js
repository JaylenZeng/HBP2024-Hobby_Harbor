// Creating Hobby Profiles
const profileTemplate = document.querySelector("[data-profile-template]")
const profileContainer = document.querySelector("[data-container]")
const searchInput = document.getElementById("search");

var index = 0
let users = []
var redditLink = "https://www.reddit.com/"
var thumbnailLink = "./thumbnails/1 "

document.addEventListener("DOMContentLoaded", function () {
    searchInput.addEventListener("input", e => {
        const value = e.target.value
        users.forEach(user => {
            newValue = value.toLowerCase()
            tempName = user.name.toLowerCase()
            tempTag = user.tags.toLowerCase()
            const isVisible = tempName.includes(newValue) || tempTag.includes(newValue)
            user.element.classList.toggle("hide", !isVisible)
        })
    })
})

function findThumbnail(index) {
    temp = index % 462;
    temp = temp.toString();
    return "(" + temp + ").jpeg"
}

// Fetch SON file and convert it into an array
fetch("csvjson.json")
    .then(res => res.json())
    .then(data => {
        users = data.map(user => {
            const profile = profileTemplate.content.cloneNode(true).firstElementChild;
            const hobby = profile.querySelector("h5")
            const tags = profile.querySelector("p")
            const reddit = profile.querySelector("a")
            const picture = profile.querySelector("img")

            hobby.textContent = user.Name
            tags.textContent = user.Tags
            reddit.href = redditLink.concat(user.Subreddits)
            picture.src = thumbnailLink.concat(findThumbnail(index))

            index++;
            profileContainer.append(profile)
            console.log(profileContainer)
            return { name: user.Name, tags: user.Tags, reddit: user.Subreddits, element: profile }
        })
    })

console.log(1)

