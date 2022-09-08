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


// NOTICE: No, don't skip over this. THis is IMPORTANT.
// Yes, you found the file with all the answers. There's nothing stopping you from cheating right now, but think about
// it. Why would you cheat? It doesn't benefit you in any way. By cheating, you are robbing yourself of the fun that
// comes with finding the solution to the puzzle. Don't cheat okay?

const puzzles = {
    "2022/9/7": {
        "content": "||1|| ||2|| ||3|| ||4|| testing",
        "hint": "https://bl||ock||le.||alingo||.app",
        "category": "Unknown",
        "solutions": ["https://blockle.alingo.app", "blockle"]
    },
    "2022/9/8": {
        "content": "||Run|| ||code|| live in your ||browser||. Write and ||run|| ||code|| in 50+ ||languages|| " +
            "online with ||Replit||, a powerful ||IDE||, ||compiler||, & ||interpreter||. ",
        "hint": "https://r||eplit||.com/",
        "category": "Hosting Site",
        "solutions": ["https://replit.com", "replit", "repl.it"]
    },
    "2022/9/9": {
        "content": "||Heroku|| is a ||platform|| as a ||service|| (PaaS) that enables ||developers|| to ||build||, " +
            "run, and operate ||applications|| entirely in the ||cloud||.",
        "hint": "https://h||erok||u.com",
        "category": "Hosting Site",
        "solutions": ["https://heroku.com", "heroku"]
    },
    "2022/9/10": {
        "content": "||Cool|| ||Math|| ||Games|| is a ||brain||-training site, for everyone, where ||logic||, " +
            "||thinking||, ||math|| meets fun ||games||. These ||games|| have no ||violence||, no empty ||action||, " +
            "just a lot of ||challenges|| that will make you forget you're getting a ||mental|| ||workout||!",
        "hint": "https://co||ol||m||ath||ga||mes||",
        "category": "Games",
        "solutions": ["https://coolmathgames.com", "cool math games", "coolmathgames", "coolmath games"]
    },
    "2022/9/11": {
        "content": "Online todo ||lists||/||planners|| to make ||school|| ||work|| easier.",
        "hint": "https://to||doli||ster.tk",
        "category": "Unknown (Yeah they seriously do this)",
        "solutions": ["https://todolister.tk", "todolist", "todolister"]
    },
    "2022/9/12": {
        "content": "||IMAGINE|| A ||PLACE||...where you can belong to a ||school|| ||club||, a ||gaming|| ||group||, " +
            "or a ||worldwide|| art ||community||. Where just you and a handful of ||friends|| can spend ||time|| " +
            "||together||. A ||place|| that makes it ||easy|| to ||talk|| every day and ||hang|| out more ||often||.",
        "hint": "https://d||iscor||d.gg",
        "category": "Forums.in",
        "solutions": ["discord", "https://discord.gg", "https://discord.com", "https://discordapp.com"]
    },
    "2022/9/13": {
        "content": "The ||Oregon|| ||Trail|| was developed as a ||computer|| ||game|| to teach ||school|| " +
            "||children|| about the realities of 19th-||century|| ||pioneer|| life on the ||Oregon|| ||Trail||. " +
            "(Note: Borrowed from Wikipedia)",
        "hint": "https://jamesfriend.com.au/pce-js/mecc/|o||reg||on-t||rai||l.html",
        "category": "games",
        "solutions": ["https://jamesfriend.com.au/pce-js/mecc/oregon-trail.html", "the oregon trail", "oregon trail"]
    },
    "2022/9/14": {
        "content": "Oh no! Your ||computer|| has been ||infected|| with a ||DEADLY|| ||virus||! What do you do? Join us " +
            "on a ||game|| where you can ||beat|| ||levels|| and defeat the ||virus|| once and for all!",
        "hint": "https://nov||irus||g||ame||.tk",
        "category": "Custom Block List. (Actual hint that I'll put in here: Game)",
        "solutions": ["https://novirusgame.tk", "novirusgame", "No Virus Game", "Virus Remover Game"]
    },
    "2022/9/15": {
        "content": "Try and deduce an ||obfuscated|| ||description|| of a ||webpage|| by ||guessing|| words to " +
            "||reveal|| them on the ||page||. A new ||puzzle|| is released ||every|| day",
        "hint": "https://bl||ockle.alingo||.app",
        "category": "Unknown (My personal hint: games)",
        "solutions": ["https://blockle.alingo.app", "blockle"]
    },
    "2022/9/16": {
        "content": "||Slack|| is a new way to ||communicate|| with your ||team||. It’s ||faster||, better ||organized||, " +
            "and more ||secure|| than email",
        "hint": "https://sl||ack||.com",
        "category": "forums.in",
        "solutions": ["slack", "https://slack.com"]
    },
    "2022/9/17": {
        "content": "The ||fastest|| way to combine your ||favorite|| ||tools|| and ||API||s to build the ||fastest|| " +
            "||sites||, ||stores||, and ||apps|| for the ||web||.",
        "hint": "https://net||lify||.app",
        "category": "Ads Blocked (This is inaccurate. Actual Hint: Hosting Site)",
        "solutions": ["netlify", "https://netlify.com"]
    },
    "2022/9/18": {
        "content": "||Open|| ||Source|| enables Microsoft ||products|| and ||services|| to bring choice, ||technology|| " +
            "and ||community|| to our customers.",
        "hint": "https://microsoft.gi||thub||.io/",
        "category": "Games",
        "solutions": ["https://microsoft.github.io/"]
    },
    "2022/9/19": {
        "content": "||F||´ (or ||F|| Prime) is a ||software|| ||framework|| for the ||rapid|| development and " +
            "deploy||ment|| of embedded ||systems|| and spaceflight ||applications||. Originally developed at ||NASA||" +
            "’s ||Jet|| ||Propulsion|| ||Laboratory||",
        "hint": "https://na||sa||.gi||thub||.io/||f||prime",
        "category": "Games (Personal Hint: Programming Language)",
        "solutions": ["fprime", "f`", "https://nasa.github.io/fprime"]
    },
    "2022/9/20": {
        "content": "Freenom is the world&apos;s first and only free domain provider. Our mission is to bring people online and help countries develop their digital economy",
        "hint": "https://fr||een||om.com",
        "category": "security.nettools (Personal Hint: Register)",
        "solutions": ["freenom", "https://freenom.com"]
    },
    "2022/9/21": {
        "content": "Hangouts bring conversations to life with photos, emoji, and even group video calls for free. Connect with friends across computers, Android, and Apple devices",
        "hint": "https://ha||ngouts||.goo||gle||.com",
        "category": "forums.in",
        "solutions": ["google hangouts", "hangouts", "google chat", "https://hangouts.google.com"]
    },
    "2022/9/22": {
        "content": "||Cloudflare|| ||Pages|| is a JAMstack ||platform|| for ||front|| ||end|| ||developers|| to " +
            "||collaborate|| and ||deploy|| web||sites||.",
        "hint": "https://p||ages||.dev",
        "category": "Allowed Staff Only (Personal Hint: What does this and Heroku have in common?)",
        "solutions": ["Cloudflare pages", "https://pages.dev", "pages.dev", "https://pages.cloudflare.com"]
    },
    "2022/9/23": {
        "content": "The 2020 ||Census|| marked the 24th ||count|| of the U.S. ||population|| and the first time " +
            "that ||households|| were invited to ||respond|| to the ||census|| ||online||.",
        "hint": "https://2020cen||cus||.gov",
        "category": "Unknown (I know, they actually blocked a government website)",
        "solutions": ["2020 census", "https://2020census.gov", "2020 u.s. census"]
    }
}


