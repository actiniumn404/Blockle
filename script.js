/*
MIT License

Copyright (c) 2022 Andrew Chen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
let d = new Date()
let pipe = /\|\|([^|]+)\|\|/g
let puzzle = {
    unhinted: []
}
let def = {
    date: d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(),
    guessed: [],
    hinted: [],
    guesses: 0,
    solved: false,
    blockhintused: false,
    hints: 0,
}
let user_data = JSON.parse(localStorage.game ?? JSON.stringify(def))

let streak = JSON.parse(localStorage.history ?? "{}")

const save = () => {
    streak[user_data.date] = {
        guesses: user_data.guesses,
        hints: user_data.hints,
        numWords: puzzle.blocked.length,
        solved: user_data.solved
    }
    localStorage.game = JSON.stringify(user_data)
    localStorage.history = JSON.stringify(streak)
}

const s = (str) => {
    return str !== 1 ? "s" : ""
}

const es = (str) => {
    return str !== 1 ? "es" : ""
}

function choose(choices) {
    return choices[Math.floor(Math.random() * choices.length)]
}

const hintmsg = () => {
    return `${user_data.hints} Hint${user_data.hints !== 1 ? "s" : ""} Used`
}

function conf() {
    confetti();
    confetti.reset();
    let duration = 1000;
    let animationEnd = Date.now() + duration;
    let defaults = {
        startVelocity: 50,
        spread: 1000,
        ticks: 1000,
        zIndex: 0
    };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    let interval = setInterval(function () {
        let timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        let particleCount = 200 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: {
                x: randomInRange(0.1, 0.3),
                y: Math.random() - 0.2
            }
        }));
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: {
                x: randomInRange(0.7, 0.9),
                y: Math.random() - 0.2
            }
        }));
    }, 250);

}

const init = () => {
    if (user_data.date !== d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()) {
        user_data = def
    }
    puzzle.puzzle = puzzles[user_data.date]
    puzzle.puzzle.solutions = puzzle.puzzle.solutions.map(e => e.toLowerCase())
    puzzle.content = puzzle.puzzle.content
    puzzle.blocked = [...puzzle.content.matchAll(pipe)].map(e => e[1])
    puzzle.censored = puzzle.content.replace(pipe, `<span class='censor' data-sol="$1"><span>$1</span></span>`)
    $("#censoredText").html(puzzle.censored)
    $("#hintPopup .webname").html(puzzle.puzzle.hint.replace(pipe, "<span class='censor'><span>$1</span></span>"))
    $("#hintPopup .category").html(puzzle.puzzle.category)
    $("#numHints").html(hintmsg())
    $("#hint").prop("disabled", user_data.guesses < 5)
    if (user_data.guesses < 5) {
        $("#hint_wrapper").addClass("disabled")
    } else {
        $("#hint_wrapper").removeClass("disabled")
    }
    $("#numGuess").html(`${user_data.guesses} Guess${user_data.guesses !== 1 ? "es" : ""}`)
    let i = 0;
    for (let censor of $("#censoredText .censor")) {
        if (user_data.guessed.includes($(censor).data("sol").toString())) {
            $(censor).removeClass("censor").addClass("revealed")
        }
        $(censor).addClass(i.toString())
        if (!user_data.hinted.includes(i)) {
            puzzle.unhinted.push(i)
        } else {
            hint(i)
        }
        i++
    }
    for (let word of user_data.guessed) {
        $("#past").append(`<div class="pastGuess">${word}</div>`)
    }
    if (user_data.solved) {
        $(".pastGuess:last-of-type").html("👑 " + $(".pastGuess:last-of-type").html())
        $("#hint, #guess, #userGuess").prop("disabled", true)
        $("#hint_wrapper").addClass("disabled")
        $("#censoredText .censor").removeClass("censor").addClass("revealed")
        $("#nav__stats").click()
    }
    $("#past").animate({scrollTop: $("#past").prop('scrollHeight')})
    $("#userGuess").focus()

}

const guess = (word) => {
    if (user_data.guessed.includes(word)) {
        return
    }
    word = word.toLowerCase()
    for (e of $("#censoredText .censor")) {
        if (e.getAttribute("data-sol").toLowerCase() === word.toLowerCase()) {
            e.innerHTML = e.getAttribute("data-sol")
            e.classList.add("revealed")
            e.classList.remove("censor")
            if (user_data.hinted.includes(Number(e.classList[0]))) {
                user_data.hinted.splice(user_data.hinted.indexOf(Number(e.classList[0])), 1)
            }
            save()
        }
    }
    $("#userGuess").val("")
    $("#past").append(`<div class="pastGuess">${word}</div>`).animate({scrollTop: $("#past").prop('scrollHeight')})
    user_data.guessed.push(word)
    user_data.guesses++
    $("#numGuess").html(`${user_data.guesses} Guess${user_data.guesses !== 1 ? "es" : ""}`)
    $("#numHints").html(hintmsg())
    $("#hint").prop("disabled", user_data.guesses < 5)
    if (user_data.guesses < 5) {
        $("#hint_wrapper").addClass("disabled")
    } else {
        $("#hint_wrapper").removeClass("disabled")
    }
    if (puzzle.puzzle.solutions.includes(word) || !$("#censoredText .censor").length) {
        $("#censoredText .censor").removeClass("censor").addClass("revealed")
        $(".pastGuess:last-of-type").html("👑 " + word)
        conf()
        $("#hint, #guess, #userGuess").prop("disabled", true)
        $("#hint_wrapper").addClass("disabled")
        user_data.solved = true
    }
    save()
}

$("#userGuess").keyup((e) => {
    if (e.key === "Enter" && $("#userGuess").val()) {
        guess($("#userGuess").val())
    }
})

$("#guess").click(() => {
    if ($("#userGuess").val()) {
        guess($("#userGuess").val())
    }
})

$("#hintPopup .close").click(() => {
    $("#hintPopup").hide()
})

$("#blockhint").click(() => {
    $("#hintPopup").toggle().css("animation", "fadein ease 0.5s")
    $("#hintPopup #hintContent").css("animation", "in ease 0.5s")
    if (!user_data.blockhintused) {
        user_data.hints++
    }
    user_data.blockhintused = true
    $("#numHints").html(hintmsg())
    save()
})

const hint = (index) => {
    let element = $(`#censoredText .censor.${index}`)
    let hintlen = element.html().length >= 6 ? 2 : 1
    element.html(`${element.data("sol").toString().substring(0, hintlen)}<span>${element.data("sol").toString().substring(hintlen)}</span>`)
}

$("#letterhint").click(() => {
    let index = choose(puzzle.unhinted)
    if (index !== undefined && !$(`#censoredText .${index}`).hasClass("revealed")) {
        hint(index)
        user_data.hinted.push(index)
        puzzle.unhinted.splice(puzzle.unhinted.indexOf(index), 1)
        user_data.hints++
        $("#numHints").html(hintmsg())
        save()
    }
})

let generated = true
$("#nav__info, #infoModal .close").click(() => {
    $("#infoModal").toggle().css("animation", "fadein ease 0.5s")
    $("#infoModal .modal-content").css("animation", "in ease 0.5s")
    if (!generated){
        $('.h-captcha').prop("outerHTML", $('.h-captcha').prop("outerHTML"))
        generated = true
    }
})

$("#nav__settings, #settingsModal .close").click(() => {
    $("#settingsModal").toggle().css("animation", "fadein ease 0.5s")
    $("#settingsModal .modal-content").css("animation", "in ease 0.5s")
})

$("#nav__stats, #shareStats .close").click(() => {
    $("#shareStats").toggle().css("animation", "fadein ease 0.5s")
    $("#shareStats .modal-content").css("animation", "in ease 0.5s")

    let past = 0
    let i = 0
    let playstreak = 0
    let solvestreak = 0
    let bestplays = 0
    let bestwins = 0
    let winratio = 0

    for (let date in streak) {
        if (new Date(date) - new Date(past) <= 86400000) {
            playstreak++
        } else {
            playstreak = 1
            solvestreak = 0
        }
        if (streak[date].solved) {
            solvestreak++
        } else {
            solvestreak = 0
        }
        past = date
        winratio = (winratio * i + Number(streak[date].solved)) / (i + 1)
        i++
        bestplays = Math.max(bestplays, playstreak)
        bestwins = Math.max(bestwins, solvestreak)
    }

    $("#playstreak").html(playstreak)
    $("#winstreak").html(solvestreak)
    $("#bestplays").html(bestplays)
    $("#bestwins").html(bestwins)
    $("#winpercent").html(Math.floor(winratio * 100) + "%")

    let sharetext = `https://blockle.alingo.app/ ${(d.getMonth() + 1)}/${d.getDate()}/${d.getFullYear()}
${user_data.guessed.length} guess${es(user_data.guessed.length)} (${user_data.hints} hint${s(user_data.hints)})
${user_data.solved ? 100 : Math.floor((1 - ($("#censoredText .censor").length / puzzle.blocked.length)) * 100)}% complete
Play streak: ${playstreak}
Solve Streak: ${solvestreak}`
    $("#stats_today").val(sharetext)
    $("#share_stats").click(() => {
        navigator.clipboard.writeText(sharetext)
    })
})

let timeleft = setInterval(() => {
    let midnight = new Date()
    midnight.setHours(24, 0, 0, 0)
    let diff = Math.floor((midnight - new Date()) / 1000) // Difference in time in SECONDS
    $("#nextpuzzle span").html(
        Math.floor(diff / 3600).toString().padStart(2, "0") // hours
        + ":" + (Math.floor(diff / 60) % 60).toString().padStart(2, "0") // minutes
        + ":" + (diff % 60).toString().padStart(2, "0")) // seconds
}, 0)

$("#suggestBtn").click(() => {
    if (!$("#suggestionText").val().trim()) {
        return $("#suggError").html("Please fill out your suggestion").show()
    }
    else if (!$('[name=h-captcha-response]').val()){
        return $("#suggError").html("Please complete the hCaptcha.").show()
    }
    $("#suggError").hide()
    d = new Date()

    let timezone = d.toLocaleDateString('en-US', {
        day: '2-digit',
        timeZoneName: 'long',
    }).slice(4)

    fetch("https://discord.com/api/webhooks/1017228301909102674/Z6ONrH_jiEBPzP6oA6CJ6KLl_Hwxh6Mg8xK5w_8YYzEcBsHqcVH859JcJ6wKsmMYRA-c", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "embeds": [
                {
                    "author": {
                        "name": $("#suggestName").val() ? $("#suggestName").val() : "Anonymous"
                    },
                    "title": "New Suggestion!",
                    "color": 3066993,
                    "footer": {
                        "text": `Today ${d.getHours() % 12}:${d.getMinutes().toString().padStart(2, "0")} ${d.getHours() >= 12 ? "PM": "AM"} (${timezone})`
                    },
                    "fields": [
                        {
                            "name": "The Content:",
                            "value": $("#suggestionText").val(),
                            "inline": false
                        }
                    ],
                    "thumbnail": {
                        "url": "https://blockle.alingo.app/assets/icon.png"
                    }
                }
            ]
        })
    })
    $("#suggestName").val("")
    $("#suggestionText").val("")
    $('.h-captcha').prop("outerHTML", $('.h-captcha').prop("outerHTML"))
    generated = true
})

init()
